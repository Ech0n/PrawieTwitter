import React, { useState } from "react";
import logo from "../logo.svg";
import "../login.css";
import { useLogin } from "../hooks/useLogin.js";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    const result = await login(email, password);
    if (result) {
      navigate('/');
    }
  };

  return (
      <div className="sign">
        <img src={logo} alt="logo" className="logo" />
        <div className="sign-panel">
          <h1>Sign In</h1>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p>
            No account? <a href="/register">Sign up</a>
          </p>
        </div>
      </div>
  );
}
