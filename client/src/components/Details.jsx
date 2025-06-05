import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import useUsers from "../hooks/useUsers";

function Details() {
  const { getUserData, getFollowing } = useCurrentUser();
  const { getUserFollowing, getUserFollowers } = useUsers();
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [error, setError] = useState(false);

  useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
      })

      .catch((err) => setError(true));
  }, []);

  useEffect(() => {
    getUserFollowers(user?.id).then((number) => setFollowers(number));
    getUserFollowing(user?.id).then((number) => setFollowings(number));
  }, [user]);

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
    return "";
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
     
    </div>
  );
}
export default Details;
