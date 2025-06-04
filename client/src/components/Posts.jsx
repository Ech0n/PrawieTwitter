import React, { useEffect, useState } from 'react';
import "../postsStyles.css"

import usePosts from '../hooks/usePosts.js';
import { Notes } from './Notes.jsx';

function Posts() {
    
    

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