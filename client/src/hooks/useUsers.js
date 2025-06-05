import React, { useEffect, useState } from "react";

export default function useUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((data) => setUsers(data.users)));
  }, []);

  const getUser = async (id) => {
    let res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();

    return data;
  };
  
  const getUserFollowers = async (id)=>{
    if(!id) return 0;
    let res = await fetch(`http://localhost:3000/api/followers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
 
    return data.followers.length;
  }

  const getUserFollowing = async (id) => {
    if (!id) return 0;
    let res = await fetch(`http://localhost:3000/api/followers/following/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();
 
    return data.following.length;
  }

 const getTopUsers = (username) => {
  if (!users || !Array.isArray(users)) return [];

  const input = username.toLowerCase();

  const scoredUsers = users.map(user => {
    const name = user.username.toLowerCase();
    let score = 0;

    // +10 punktów jeśli input występuje gdziekolwiek w nazwie
    if (name.includes(input)) score += 10;

    // +1 punkt za każdy wspólny znak na początku
    for (let i = 0; i < Math.min(name.length, input.length); i++) {
      if (name[i] === input[i]) {
        score += 1;
      } else {
        break;
      }
    }

    return { user, score };
  });

  return scoredUsers
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(entry => entry.user);
};


  return { users, getTopUsers, getUser, getUserFollowers, getUserFollowing };
}
