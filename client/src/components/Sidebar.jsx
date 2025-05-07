import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div id="sidebar">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        <li>
          <Link to="/" className="link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/notifications" className="link">
            Notifications
          </Link>
        </li>
        <li>
          <Link to="/messages" className="link">
            Messages
          </Link>
        </li>
        <li>
          <Link to="/bookmarks" className="link">
            Bookmarks
          </Link>
        </li>
        <li>
          <Link to="/userSettings" className="link">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
