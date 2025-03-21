import React from "react";
import ReactDOM from "react-dom/client";
import logo from "./logo.svg";
import "./styles.css";

function Sidebar() {
  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>Home</li>
        <li>Notifications</li>
        <li>Messages</li>
        <li>Bookmarks</li>
        <li>Settings</li>
      </ul>
    </div>
  );
}

function Search() {
  function handleSearch(e) {
    if (e.key === "Enter") {
      console.log(e.target.value);
      e.target.value = "";
    }
  };
  return (
    <div id="search-box">
      <textarea onKeyDown ={handleSearch} rows="1" placeholder="Search" />
    </div>
  );
}

function Post() {
  function handelResizing(e) {
    e.target.style.height = 'inherit';
    const computed = window.getComputedStyle(e.target);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                 + parseInt(computed.getPropertyValue('padding-top'), 10)
                 + e.target.scrollHeight
                 + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                 + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    e.target.style.height = `${height}px`;
  };
  return (
    <div id="post-box">
      <textarea onChange={handelResizing} placeholder="What's happening?" />
      <button>Post</button>
    </div>
  )
}

function Note({ note }) {
  return (
    <div className="note">
      <div className="note-header">
        <span className="note-name">{note.name}</span>
        <span className="note-handle">{note.handle}</span>
      </div>
      <div className="note-content">{note.content}</div>
    </div>
  );
}

function Notes() {
  const dummyNotes = [
    { id: 1, name: "User 0", handle: "@user0", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 2, name: "User 0", handle: "@user0", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    { id: 3, name: "User 0", handle: "@user0", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  ];
  
  return (
    <div id="notes-box">
      {dummyNotes.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}

function Details() {
  const details = {
    Name: "User",
    Username: "@user0",
    Notes: 1000,
    Joined: "2021-01-01",
    Followers: 100,
    Following: 200,
    Description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  };
  const followersWithNumberOfFollowsDescending = [
    { topic: "@user4", followers: "120K" },
    { topic: "@user5", followers: "85K" },
    { topic: "@user6", followers: "45K" },
  ];
  return (
    <div id="details-box">
      <h2>User details</h2>
      <div id="basic-details-box">
        <h3>Basic</h3>
        <ul>
          {Object.entries(details).map(([key, value], index) => (
            <li key={index}>
              <span className="details-topic">{key}: </span>
              <span className="details-content">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div idd="followers-details-box">
        <h3>Followers</h3>
        <ul>
          {followersWithNumberOfFollowsDescending.map((follower, index) => (
            <li key={index}>
              <span className="details-topic">{follower.topic}: </span>
              <span className="details-sections">{follower.followers} Followers</span>
            </li>
          ))}
        </ul>
      </div>
      <div id="calendar-details-box">
        <h3>Activity (calendar like on GitHub)</h3>
      </div>
    </div>
  );
}

function MainPanel() {
  return (
    <div id="main-panel">
      <Search />
      <Post />
      <Notes />
    </div>
  );
}

function App() {
  return (
    <div id="app-container">
      <Sidebar />
      <MainPanel />
      <Details />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
export default App;
