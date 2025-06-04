import React,{ useEffect, useState } from "react";
import CommentIcon from "../icons/chat-box.png";
import HeartIcon from "../icons/heart.png"
import FullHeartIcon from "../icons/full-heart.png"
import {CommentsSection} from "./MainPanel.jsx";


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
        <span className="note-name">{note.name}</span>
        <span className="note-metadata">{note.username}</span>
        <span className="note-metadata">{note.creationTime}</span>
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

export function Notes() {
  const dummyNotes = [
    {
      id: 1,
      name: "User 0",
      username: "@user0",
      creationTime: "2024-01-01 14:15",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      name: "User 0",
      username: "@user0",
      creationTime: "2024-01-01 14:15",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      name: "User 0",
      username: "@user0",
      creationTime: "2024-01-01 14:15",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  return (
    <div id="notes-box">
      {dummyNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}