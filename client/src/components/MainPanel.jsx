import React, {useEffect, useState} from "react";

import { Search } from "./Search";
import { Notes } from "./Notes";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import usePosts from '../hooks/usePosts.js';  

function Post() {
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState(null);
  const [postSubmitError, setPostSubmitError] = useState("");
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { getUserData } = useCurrentUser();

  useEffect(() => {
    getUserData()
      .then((user) => {
        if (user && user.id) {
          setOwnerId(user.id);
        }
      })
      .catch(() => {})
      .finally(() => {
        setIsLoadingUser(false);
      });
  }, [getUserData]);

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

  const handlePostSubmit = async () => {
    if (!ownerId) {
      alert("User not loaded or not logged in. Cannot create post.");
      return;
    }
    if (!content.trim()) {
      alert("Post content cannot be empty.");
      return;
    }

    setPostSubmitError("");

    try {
      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify({
          owner_id: ownerId,
          content: content,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        setContent("");
      } else {
        const errorMsg = responseData.message || responseData.error || "Unknown error";
        alert(`Failed to create post: ${errorMsg}`);
        setPostSubmitError(errorMsg);
      }
    } catch (error) {
      alert(`Error creating post: ${error.message}`);
      setPostSubmitError(error.message);
    }
  };

  if (isLoadingUser) {
    return null;
  }

  if (!ownerId) {
    return null;
  }

  return (
    <div className="post-box">
      <textarea
        onChange={(e) => {
          handleResizing(e);
          setContent(e.target.value);
        }}
        value={content}
        placeholder="What's happening?"
      />
      <button onClick={handlePostSubmit}>Post</button>
      {postSubmitError && <p style={{ color: "red" }}>{postSubmitError}</p>}
    </div>
  );
}

export function CommentsSection({postId, onCommentCount}){
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


function MainPanel() {
  const { getPosts } = usePosts();
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    getPosts()
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      id="main-panel"
      style={{
        padding: "1rem",
        paddingTop: "0",
      }}
    >
      <Search />
      <Post />
      <Notes notes={notes} />
    </div>
  );
}

export default MainPanel;
