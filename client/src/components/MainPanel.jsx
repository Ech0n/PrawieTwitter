import React, {useState} from "react";
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

function likeThePost(){
  // TODO zrobić wysłanie polubienia do bazy
  // TODO dodać możliwość usunięcia polubienia
}



export function Note({ note }) {
  const [showComments, setShowComments] = useState(false);
  function toggleComments(){
    setShowComments(prev => !prev);
  }

  function CommentsSection(){
    return(
        <div id="notes-box">
          <div className="comments-header-section">
            <h1 className="comments-header-text">Komentarze</h1>
            <button className=" blue-button" onClick={toggleComments}>Zamknij komentarze</button>
          </div>


          <div className="comment">
            <p>Super!</p>
          </div>
          <div className="comment">
            <p>Ciekawe</p>
          </div>
          <div className="comment">
            <p>Czekam na więcej!</p>
          </div>


        </div>
    );
  }

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
        <span>2</span>  {/* TODO podpiąć realną liczbę */}
        <button onClick={likeThePost} className="post-icons"><img className="post-icons" src={HeartIcon} alt={"Heart shaped like icon"}/></button>
        {/* TODO zrobić, żeby się zmieniła ikonka serduszka na pełne serce, jeśli aktualny użytkownik polubił post */}
        {showComments && <CommentsSection />}
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
