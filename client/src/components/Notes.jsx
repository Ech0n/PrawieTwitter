import React,{ useEffect, useState } from "react";
import CommentIcon from "../icons/chat-box.png";
import HeartIcon from "../icons/heart.png"
import FullHeartIcon from "../icons/full-heart.png"
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import useUsers from "../hooks/useUsers.js"; // Add this import


export function Note({ note }) {
  // console.log("Rendering Note component with note:", note);
  const [showComments, setShowComments] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [likesError, setLikesError] = useState("");
  const [commentsCount, setCommentsCount] = useState(-1);
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [user, setUser] = useState(null);
  const [author, setAuthor] = useState(null);
  const { getUserData: getCurrentUserData } = useCurrentUser();
  const { getUser } = useUsers();

  useEffect(() => {
    getCurrentUserData()
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch(() => {
        setUser(null); 
      });
  }, []);

  // Fetch post author
  useEffect(() => {
    if (note.owner_id) {
      getUser(note.owner_id).then((user) => setAuthor(user));
    }
  }, []);

  // Fetch comments count on mount
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/comments/${note.id}`);
        if (response.ok) {
          const data = await response.json();
          setCommentsCount(data.length);
        } else {
          setCommentsCount(0);
        }
      } catch {
        setCommentsCount(0);
      }
    })();
  }, []);

  function CommentsSection({postId, onCommentCount}){
    const [comments, setComments] = useState([])
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [newCommentContent, setNewCommentContent] = useState("");
    const [commentOwnerId, setCommentOwnerId] = useState(null);
    const [commentSubmitError, setCommentSubmitError] = useState("");
    const [isCommenterLoading, setIsCommenterLoading] = useState(true);
    const { getUserData } = useCurrentUser();
    const { getUser } = useUsers();

    useEffect(() => {
        getUserData()
            .then((_user) => {
                if (_user && _user.id) {
                    setCommentOwnerId(_user.id);
                }
            })
            .catch(() => {})
            .finally(() => {
                setIsCommenterLoading(false);
            });
    }, [getUserData]);

    useEffect(() => {
        let cancelled = false;
        if (isCommenterLoading) return;

        (async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:3000/comments/${postId}`);
                if (response.ok){
                    const data = await response.json();
                    if (!cancelled) setComments(data);
                } else {
                    if (!cancelled) setError("Couldn't get comments.")
                }
            } catch(e){
                if (!cancelled) setError(e.message)
            } finally {
                if (!cancelled) setLoading(false)
            }
        })();
        return () => { cancelled = true; };
    }, [isCommenterLoading, postId]);

    const handleCommentSubmit = async () => {
        if (!commentOwnerId) {
            alert("You must be logged in to comment.");
            return;
        }
        if (!newCommentContent.trim()) {
            alert("Comment content cannot be empty.");
            return;
        }
        setCommentSubmitError("");

        try {
            const response = await fetch(`http://localhost:3000/comments/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    content: newCommentContent,
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                const newComment = { ...responseData, owner_id: commentOwnerId };
                setComments(prevComments => [...prevComments, newComment]);
                onCommentCount?.(comments.length + 1);
                setNewCommentContent("");
            } else {
                const errorMsg = responseData.message || responseData.error || "Unknown error";
                alert(`Failed to create comment: ${errorMsg}`);
                setCommentSubmitError(errorMsg);
            }
        } catch (error) {
            alert(`Error creating comment: ${error.message}`);
            setCommentSubmitError(error.message);
        }
    };


    if(error!==""){
        return <p>Error: {error}</p>
    }
    if (loading){
        return <p>Fetching comments...</p>
    }

    function handleResizing(e) {
      e.target.style.height = "inherit";
      const computed = window.getComputedStyle(e.target);
      const height =
        parseInt(computed.getPropertyValue("border-top-width"), 10) +
        parseInt(computed.getPropertyValue("padding-top"), 10) +
        e.target.scrollHeight +
        parseInt(computed.getPropertyValue("padding-bottom"), 10) +
        parseInt(computed.getPropertyValue("border-bottom-width"), 10);
      e.target.style.height = `${height}px`;
    }

    // Helper to render a single comment with author and date
    function CommentItem({ comment }) {
      const [author, setAuthor] = useState(null);

      useEffect(() => {
        if (comment.owner_id) {
          getUser(comment.owner_id).then((user) => setAuthor(user));
        }
      }, [comment.owner_id]);

      return (
        <div className="comment">
          <div style={{ display: "flex", alignItems: "center", marginBottom: 4 }}>
            <span style={{ fontWeight: "bold", marginRight: 10 }}>
              {author?.username || "Unknown"}
            </span>
            <span style={{ color: "#888", fontSize: "0.9em" }}>
              {comment.createdAt ? comment.createdAt.split("T")[0] : ""}
            </span>
          </div>
          <p>{comment.content}</p>
        </div>
      );
    }

    return(
        <div key={postId} id="notes-box" style={{marginTop: "1rem"}}>
            {!isCommenterLoading && commentOwnerId && (
                <div className="post-box">
                  <textarea
                    value={newCommentContent}
                    onChange={(e) => {
                      handleResizing(e);
                      setNewCommentContent(e.target.value);
                    }}
                    placeholder="Write a comment..."
                  />
                  <button onClick={handleCommentSubmit}>Post</button>
                  {commentSubmitError && <p style={{ color: "red" }}>{commentSubmitError}</p>}
                </div>
            )}

            {comments.length === 0 ? ("") : (
                comments.map((comment, idx) => (
                    <CommentItem key={idx} comment={comment} />
                ))
            )

          }</div>
      );
  }

  function toggleComments(){
    setShowComments(prev => !prev);
  }

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await fetch(`http://localhost:3000/post_likes/${note.id}`);
        const data = await res.json();
        setPostLikes(data.likes);
        
      } catch (e) {
        setLikesError(e.message); // Corrected from e.error to e.message
      }
    };

    const checkLikeStatus = async () => {
        // if (user) {
        try {
            const response = await fetch(`http://localhost:3000/post_likes/status/${note.id}`, {credentials: "include"});
            if (response.ok) {
                const data = await response.json();
                setIsPostLiked(data.isLiked);
            } else {
                setIsPostLiked(false); // Default to false if status can't be fetched
            }
        } catch (error) {
            console.error("Failed to fetch like status:", error);
            setIsPostLiked(false); // Ensure default state in case of error
        }
        // } else {
        //     setIsPostLiked(false); // If no user, default to not liked
        // }
    };


    fetchLikes();
    checkLikeStatus();
  }, []); // Depend on note.id and user to refetch when the post changes or user logs in/out

  const toggleLikeThePost = async () => {
    if (user != null) {
      try {
        await fetch(`http://localhost:3000/post_likes/${note.id}`, {
          method: "POST",
          credentials: "include",
        });
        // Optimistically update the like count and status
        setPostLikes(prevLikes => isPostLiked ? prevLikes - 1 : prevLikes + 1);
        setIsPostLiked(prev => !prev);
      } catch (error) {
        setLikesError(error.message);
        // Optionally revert the optimistic update in case of error
        // setPostLikes(prevLikes => isPostLiked ? prevLikes + 1 : prevLikes - 1);
        // setIsPostLiked(prev => !prev);
      }
    }
  };

  useEffect(() => {
      (async () => {
          try {
              const res = await fetch(`http://localhost:3000/post_likes/${note.id}`);
              const data = await res.json();
              setPostLikes(data.likes)
          } catch(e){
              setLikesError(e.error)
          }
      })();
  }, [postLikes]);

  return (
    <div className="note">
      <div className="note-header">
        <span className="note-metadata" style={{ fontWeight: "bold" }}>
          {author?.username || note.username || "Unknown"}
        </span>
        <span className="note-metadata">{note.createdAt.split("T")[0]}</span>
      </div>
      <div className="note-content">{note.content}</div>
      {note.photo_path && (
         <img className="note-image" style={{ maxWidth: "100%", marginTop: "1rem" }} src={`http://localhost:3000/${note.photo_path}`}  alt="real Post Image"/>
        // <img
        //   className="note-image"
        //   style={{ maxWidth: "100%", marginTop: "1rem" }}
        //   src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80"
        //   alt="Post Image"
        // />
      )}
      <div className="note-bottom-part">
        <button onClick={toggleComments} className="post-icons"><img className="post-icons" src={CommentIcon} alt="comment icon"/></button>
        <span>{commentsCount===-1 ?"Unknown" : commentsCount}</span>
        <button onClick={toggleLikeThePost} className="post-icons"><img className="post-icons" src={isPostLiked ? FullHeartIcon : HeartIcon} alt={"Heart shaped like icon"}/></button>
        <span>{likesError==="" ? postLikes : "Unknown"}</span>
        {showComments && <CommentsSection key={note.id} postId={note.id} onCommentCount={(count) => setCommentsCount(count)}/>}
      </div>

    </div>
  );
}

export function Notes({notes}) {


  return (
    <div id="notes-box">
      {notes?.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}