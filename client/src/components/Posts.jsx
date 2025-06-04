import React, { useEffect, useState } from 'react';
import "../postsStyles.css"

import usePosts from '../hooks/usePosts.js';
import { Notes } from './Notes.jsx';

function Posts() {
    const {getPosts} = usePosts();
    const [posts, setPosts] = useState(null);
    useEffect(()=>{
        getPosts().then((data)=>console.log(data)).catch((err)=>console.log(err));
    },[])
    const dummyNotes = [
        {
            id: 1,
            name: "User 1",
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
                <Notes />
            </div>
        </div>
    )
}

export default Posts