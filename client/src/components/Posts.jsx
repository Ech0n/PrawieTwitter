import React from 'react';
import "../postsStyles.css"

function Posts() {

    return (
        <div>
            <div className="postsContainer">
                <h1>My posts</h1>
                <div className="post">
                    <p>Title @user0 2000-01-01 00:01</p>
                    <p>Example text of example post with example title.</p>
                </div>
                <div className="post">
                    <p>Title @user0 2000-01-01 00:01</p>
                    <p>Example text of example post with example title.</p>
                </div>
                <div className="post">
                    <p>Title @user0 2000-01-01 00:01</p>
                    <p>Example text of example post with example title.</p>
                </div>
            </div>
        </div>
    )
}

export default Posts