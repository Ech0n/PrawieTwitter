import React, { useEffect, useState } from "react";

export default function useUsers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json().then((data) => setUsers(data)));
  }, []);


  const getTopUsers = (username)=>{
    
  };

  return {users, getTopUsers};
}
