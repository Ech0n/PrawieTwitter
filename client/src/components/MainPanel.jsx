import React from "react";

function Search() {
  function handleSearch(e) {
    if (e.key === "Enter") {
      console.log(e.target.value);
      e.target.value = "";
    }
  }
  return (
    <div id="search-box">
      <textarea onKeyDown={handleSearch} rows="1" placeholder="Search" />
    </div>
  );
}

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

function Note({ note }) {
  return (
    <div className="note">
      <div className="note-header">
        <span className="note-name">{note.name}</span>
        <span className="note-metadata">{note.username}</span>
        <span className="note-metadata">{note.creationTime}</span>
      </div>
      <div className="note-content">{note.content}</div>
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
    <div id="main-panel">
      <Search />
      <Post />
      <Notes />
    </div>
  );
}

export default MainPanel;
