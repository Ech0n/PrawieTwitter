import React from "react";
import logo from "../logo.svg";
import "../login.css";

export default function Login() {
  return (
    <div className="sign">
      <img src={logo} alt="logo" className="logo" />
      <div className="sign-panel">
        <h1>Sign In</h1>
        <form>
          <input type="text" placeholder="Login" />
          <input type="password" placeholder="Password" />
          <input type="submit" value="Sign In" />
        </form>
        <p>
          No account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}
