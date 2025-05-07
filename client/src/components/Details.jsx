import React from 'react'

function Details() {
  const details = {
    Name: "User",
    Username: "@user0",
    Notes: 1000,
    Joined: "2021-01-01",
    Followers: 100,
    Following: 200,
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  };
  const followersWithNumberOfFollowsDescending = [
    { topic: "@user4", followers: "120K" },
    { topic: "@user5", followers: "85K" },
    { topic: "@user6", followers: "45K" },
  ];
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
          {followersWithNumberOfFollowsDescending.map((follower, index) => (
            <li key={index}>
              <span className="details-topic">{follower.topic}: </span>
              <span className="details-sections">
                {follower.followers} Followers
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div id="calendar-details-box">
        <h3>Activity (calendar like on GitHub)</h3>
      </div>
    </div>
  );
}
export default Details;