import React, {useEffect, useState} from "react";

import { Search } from "./Search";
import { Notes } from "./Notes";
import { useCurrentUser } from "../hooks/useCurrentUser.js";
import usePosts from '../hooks/usePosts.js';  

function Post() {
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState(null);
  const [postError, setPostError] = useState("");
  const { getUserData } = useCurrentUser();

  useEffect(() => {
    getUserData()
      .then((user) => {
        if (user && user.id) {
          setOwnerId(user.id);
        } else {
          setPostError("You must be logged in to post.");
        }
      })
      .catch(() => {
        setPostError("Could not fetch user data. Please log in.");
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

    setPostError(""); 

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
        alert("Post created successfully!");
        setContent(""); 
        // Optionally, trigger a refresh of the posts list here
      } else {
        alert(`Failed to create post: ${responseData.message || responseData.error || "Unknown error"}`);
        setPostError(responseData.message || responseData.error || "Unknown error");
      }
    } catch (error) {
      alert(`Error creating post: ${error.message}`);
      setPostError(error.message);
    }
  };

  return (
    <div id="post-box">
      <textarea
        onChange={(e) => {
          handleResizing(e);
          setContent(e.target.value);
        }}
        value={content}
        placeholder="What's happening?"
      />
      <button onClick={handlePostSubmit}>Post</button>
      {postError && <p style={{ color: "red" }}>{postError}</p>}
    </div>
  );
}

export function CommentsSection({postId, onCommentCount}){
    const [comments, setComments] = useState([])
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        (async () => {
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

    }, []);
    if(error!==""){
        return <p>Error: {error}</p>
    }
    if (loading){
        return <p>Fetching comments...</p>
    }

    return(
        <div key={postId} id="notes-box">
            <div className="comments-header-section">
                <h1 className="comments-header-text">Komentarze</h1>
            </div>

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
