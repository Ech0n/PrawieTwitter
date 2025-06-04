import React, {useEffect, useState} from "react";

import { Search } from "./Search";
import { Notes } from "./Notes";


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
