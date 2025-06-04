import React, {useEffect, useState} from "react";
import CommentIcon from "../icons/chat-box.png";
import HeartIcon from "../icons/heart.png"
import FullHeartIcon from "../icons/full-heart.png"
import { Search } from "./Search";


function Post() {
  function handelResizing(e) {
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
  return (
    <div id="post-box">
      <textarea onChange={handelResizing} placeholder="What's happening?" />
      <button>Post</button>
    </div>
  );
}

function CommentsSection({postId, onCommentCount}){
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
        <div id="notes-box">
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
              const res = await fetch(`http://lokalhost:3000/post_likes/${note.id}`);
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

function Notes() {
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

function MainPanel() {
  return (
    <div id="main-panel" style={{
      padding: "1rem",
      paddingTop: "0"
    }} >
      <Search />
      <Post />
      <Notes />
    </div>
  );
}

export default MainPanel;
