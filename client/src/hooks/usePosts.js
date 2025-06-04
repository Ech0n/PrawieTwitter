import React from "react";

export default function usePosts() {
  const getPosts = async () => {
    const response = await fetch("http://localhost:3000/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json()
    if(!response.ok) throw new Error(data.error || "Could not load posts");
    else{
        return data.posts;
    }
  };

  const getPostByUser = async (id) => {
    const response = await fetch(`http://localhost:3000/posts?owner_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json()
    if(!response.ok) throw new Error(data.error || "Could not load posts");
    else{
        return data.posts;
    }
  }

  return { getPosts, getPostByUser };
}
