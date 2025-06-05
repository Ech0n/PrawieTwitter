import React, { useEffect, useState } from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Sidebar() {
  const { getUserData, getFollowing } = useCurrentUser();
  const [user, setUser] = useState();
  const { logout } = useLogin();
  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
  })}, [])
  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        {user ? (
          <li>
            <Link to="/posts" className="link">
              My posts
            </Link>
          </li>
        ) : (
          ""
        )}
        {user ? (
          <li>
            <Link to="/userSettings" className="link">
              Settings
            </Link>
          </li>
        ) : (
          ""
        )}
        {user ? (
          <li className="link"
            onClick={() => {
              logout().then(() => {
                window.location.reload();
              });
            }}
          >
            Logout
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
