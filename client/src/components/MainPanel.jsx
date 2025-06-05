import React, {useEffect, useState} from "react";

import { Search } from "./Search";
import { Notes } from "./Notes";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import usePosts from '../hooks/usePosts.js';  

function Post() {
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState(null);
  const [postSubmitError, setPostSubmitError] = useState(""); // Renamed from postError
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const { getUserData } = useCurrentUser();

  useEffect(() => {
    getUserData()
      .then((user) => {
        if (user && user.id) {
          setOwnerId(user.id);
        }
        // If user or user.id is null/undefined, ownerId remains null
      })
      .catch(() => {
        // Error fetching user, ownerId remains null
      })
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
        // Optionally, trigger a refresh of the posts list here
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
    return null; // Or a loading spinner
  }

  if (!ownerId) {
    return null; // Don't render the component if user is not logged in
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
            .catch(() => {
                // Error fetching user, commentOwnerId remains null
            })
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
    }, [postId, onCommentCount]); // Added onCommentCount to dependencies, though it might be stable

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
                    // owner_id is handled by the backend based on the logged-in user
                }),
            });
            const responseData = await response.json();
            if (response.ok) {
                // Add the new comment to the list and update count
                // The backend returns the created comment (owner_id, post_id, content)
                // To display it immediately, we might need more info like username, or make assumptions
                // For now, let's re-fetch or add it simply
                const newComment = { ...responseData, owner_id: commentOwnerId }; // Assuming responseData has content and post_id
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
            {/* add here functionality of adding comments */}
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
