import React from 'react';
import "../postsStyles.css"
import {Note} from "./MainPanel.jsx";

function Posts() {
    // TODO zamiast przykładowych postów pobrać prawdziwe danego użytkownika
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
        <div>
            <div className="postsContainer">
                <h1>My posts</h1>
                {dummyNotes.map((note) => (
                    <Note key={note.id} note={note} />
                ))}
            </div>
        </div>
    )
}

export default Posts