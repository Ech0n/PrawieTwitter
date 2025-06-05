import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

function Details() {
  const { getUserData, getFollowing } = useCurrentUser();
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const [error, setError] = useState(false);

  const buttonStyle = {
    border: "1px solid white",
    margin: "1rem auto",
    width: "100px",
    height: "50px",
    boxSizing: "border-box",
    padding: "0",
  };

  const aStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
        return getFollowing(data.id);
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
    return ("");
  }

  return (
    <div id="details-box">
      <h2>User details</h2>
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
    </div>
  );
}
export default Details;
