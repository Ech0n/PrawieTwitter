import React,{ useEffect, useState } from "react";
import CommentIcon from "../icons/chat-box.png";
import HeartIcon from "../icons/heart.png"
import FullHeartIcon from "../icons/full-heart.png"
import { useCurrentUser } from "../hooks/useCurrentUser.js";

function CommentsSection({postId, onCommentCount}){
    const [comments, setComments] = useState([])
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const [newCommentContent, setNewCommentContent] = useState("");
    const [commentOwnerId, setCommentOwnerId] = useState(null);
    const [commentSubmitError, setCommentSubmitError] = useState("");
    const [isCommenterLoading, setIsCommenterLoading] = useState(true);
    const { getUserData } = useCurrentUser();

    useEffect(() => {
        getUserData()
            .then((user) => {
                if (user && user.id) {
                    setCommentOwnerId(user.id);
                }
            })
            .catch(() => {})
            .finally(() => {
                setIsCommenterLoading(false);
            });
    }, [getUserData]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:3000/comments/${postId}`);
                if (response.ok){
                    const data = await response.json();
                    setComments(data);
                    onCommentCount?.(data.length);
                } else {
                    setError("Couldn't get comments.")
                }
            } catch(e){
                setError(e.message)
            } finally {
                setLoading(false)
            }
        })();
    }, [postId, onCommentCount]);

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

            {comments.length === 0 ? (<p>No comments yet</p>) : (
                comments.map((comment => (
                    <div className="comment">
                        <p>{comment.content}</p>
                        {/* TODO można dodać autora postu, bo jest zwracane comment.owner_id   */}
                        {/*  TODO jeszcze polubienia postów trzeba dodać - można użyć comment.likes_count */}
                    </div>
                )))
            )}

        </div>
    );
}


export function Note({ note }) {
  const [showComments, setShowComments] = useState(false);
  const [postLikes, setPostLikes] = useState(0);
  const [likesError, setLikesError] = useState("");
  const [commentsCount, setCommentsCount] = useState(-1);
  const [isPostLiked, setIsPostLiked] = useState(false)
  function toggleComments(){
    setShowComments(prev => !prev);
  }
  function toggleLikeThePost(){
    // TODO zrobić wysłanie polubienia do bazy
    
    setIsPostLiked(prev => !prev);
  }

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
        <span className="note-metadata">{note.username}</span>
        <span className="note-metadata">{note.createdAt.split("T")[0]}</span>
      </div>
      <div className="note-content">{note.content}</div>
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