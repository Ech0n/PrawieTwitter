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
