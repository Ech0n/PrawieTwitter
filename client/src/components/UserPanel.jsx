import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { useCurrentUser } from "../hooks/useCurrentUser";

export default function UserPanel() {
  const { id } = useParams();
  const { getUser } = useUsers();
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const {getUserData, getFollowers} = useCurrentUser();
  const [followMessage, setFollowMessage] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);

  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res);
    });
  }, []);

  useEffect(() => {
    getUserData().then((res) => {
      setLoggedUser(res);
      getFollowers(res.id).then((followers)=>setIsFollowed(followers.some((user)=>user.id===id)));
    });
  },[]);

  return (
    <div
      style={{
        width: "40vw",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
        {user?.username}
      </h2>
      <div
        style={{
          margin: "1.5rem",
          display: "flex",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div>
          <p>Followers</p>
          <p>{user?.followers_count}</p>
        </div>
        <div>
          <p>Following</p>
          <p>{user?.following_count}</p>
        </div>
        <div>
          <p>Posts</p>
          <p>{user?.notes_count}</p>
        </div>
      </div>
      { loggedUser?.id != id ?
      <div>
        <button style={{
            padding: "1rem",
            border: "solid white"
        }} onClick={()=>{
            if(!loggedUser){
                setFollowMessage("You have to sign in to follow!")
            }




        }} >{isFollowed ? "Unfollow" : "Follow"}</button>
        <p style={{color: "#d99b9a", padding: "1rem"}}>{followMessage}</p>
      </div> : ""
    } 
    </div>
  );
}
