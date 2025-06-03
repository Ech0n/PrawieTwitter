import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Details() {
  const { getUserData, getFollowers } = useCurrentUser();
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const { logout } = useLogin();
  const [error, setError] = useState(false);

  const buttonStyle = {
    border: "1px solid white",
    margin: "1rem",
    width: "100px",
    height: "75px"
  };

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
        return getFollowers(data.id);
      })
      .then((data) => {
        setFollowers(data);
      })
      .catch((err) => setError(true));
  }, []);

  const details = {
    Name: user?.name,
    Username: user?.username,
    Notes: user?.notes_count,
    Joined: user?.createdAt.slice(0, 10),
    Followers: user?.followers_count,
    Following: user?.following_count,
    Description: user?.description,
  };

  if (error) {
    return (
      <div
        style={{ height: "100vh", textAlign: "center", padding: "1rem" }}
        id="details-box"
      >
        <p>You're not signed in</p>
        <button id="sign-in-button" style={buttonStyle}>
          <a href="/login">Sign in</a>
        </button>
        <button id="sign-up-button" style={buttonStyle}>
          <a href="/register">Sign up</a>
        </button>
      </div>
    );
  }

  return (
    <div id="details-box">
      <h2>User details</h2>
      {user ? (
        <button
          id="logout-button"
          onClick={() => {
            logout().then(() => {
              window.location.reload();
            });
          }}
          style={{...buttonStyle, padding:"1rem" }}
        >
          Logout
        </button>
      ) : (
        ""
      )}
      <div id="basic-details-box">
        <h3>Basic</h3>
        <ul>
          {Object.entries(details).map(([key, value], index) => (
            <li key={index}>
              <span className="details-topic">{key}: </span>
              <span className="details-content">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div id="followers-details-box">
        <h3>Followers</h3>
        <ul>
          {followers && followers.length > 0 ? (
            followers.map((follower, index) => (
              <li key={index}>
                <span className="details-topic">{follower.topic}: </span>
                <span className="details-sections">
                  {follower.followers} Followers
                </span>
              </li>
            ))
          ) : (
            <p>You don't have any followers</p>
          )}
        </ul>
      </div>
      <div id="calendar-details-box">
        <h3>Activity (calendar like on GitHub)</h3>
      </div>
    </div>
  );
}
export default Details;
