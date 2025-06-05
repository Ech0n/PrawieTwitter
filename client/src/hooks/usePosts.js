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

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load posts");
    else {
      return data.posts;
    }
  };

  const getPostsByUser = async (id) => {
    

    const response = await fetch(`http://localhost:3000/posts/owner/${id}`, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load posts");
    else {

      return data;
      
    }
  };

  return { getPosts, getPostsByUser };
}
