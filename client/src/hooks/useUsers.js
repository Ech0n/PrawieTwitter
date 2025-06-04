import React, { useEffect, useState } from "react";

export default function useUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((data) => setUsers(data.users)));
  }, []);

  const getUser = async (id) => {
    let res = await fetch(`http://localhost:3000/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await res.json();

    return data;
    

  };

  const getTopUsers = (username) => {
    if (!users) return [];
    let topUsers = users.slice(0, 5);
    return topUsers;
  };

  return { users, getTopUsers, getUser };
}
