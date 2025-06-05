import React, { useEffect, useState } from "react";
import "../postsStyles.css";

import usePosts from "../hooks/usePosts.js";
import { Notes } from "./Notes.jsx";
import { useCurrentUser } from "../hooks/useCurrentUser.js";

function Posts() {
  const { getPostsByUser } = usePosts();
  const { getUserData } = useCurrentUser();
  const [posts, setPosts] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getUserData().then((data) => setUser(data));
  }, []);

  useEffect(() => {
    if (user?.id) {
      getPostsByUser(user?.id).then((data) => setPosts(data));
    }
  }, [user]);

  return (
    <div>
      <div className="postsContainer">
        <h1>My posts</h1>
        <Notes notes={posts} />
      </div>
    </div>
  );
}

export default Posts;
