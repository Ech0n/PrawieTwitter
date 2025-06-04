import React, { useEffect, useState } from "react";
import useUsers from "../hooks/useUsers";
import { Link } from "react-router-dom";

export function Search() {
  const [text, setText] = useState("");
  const { getTopUsers } = useUsers();
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    if (text === "") setTopUsers([]);
    else setTopUsers(getTopUsers(text));
  }, [text]);

  return (
    <div style={{ position: "relative" }}>
      <input
        id="search-box"
        type="text"
        value={text}
        placeholder="Search"
        style={{
          boxSizing: "border-box",
          display: "block",
          width: "calc(100%)",
          padding: "1rem",
          margin: "0 0 1rem 0",
        }}
        onChange={(e) => {
          setText(e.target.value);
          console.log(topUsers);
        }}
      />
      <div
        style={{
          height: "auto",
          width: "100%",
          background: "#474747",
          position: "absolute",
        }}
      >
        {topUsers?.map((user, index) => (
          <div key={"user" + index} style={{ backgroundColor: "transparent" }}>
            <Link
              id="link"
              to={`/user/${user.id}`}
              style={{
                backgroundColor: "transparent",
                padding: "1rem",
                textDecoration: "none",
                display: "block",
                width: "100%",
                height: "100%",
              }}
            >
              {user.username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
