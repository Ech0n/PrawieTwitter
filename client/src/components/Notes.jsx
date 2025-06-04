import React,{ useEffect, useState } from "react";
import CommentIcon from "../icons/chat-box.png";
import HeartIcon from "../icons/heart.png"
import FullHeartIcon from "../icons/full-heart.png"
import { CommentsSection } from "./MainPanel";

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