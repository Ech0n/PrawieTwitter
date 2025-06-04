import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUsers from "../hooks/useUsers";
import { useCurrentUser } from "../hooks/useCurrentUser";
import usePosts from "../hooks/usePosts";

export default function UserPanel() {
  const { id } = useParams();
  const { getUser } = useUsers();
  const [user, setUser] = useState(null);
  const [loggedUser, setLoggedUser] = useState(null);
  const { getUserData, getFollowing, follow, unfollow } = useCurrentUser();
  const {getPostsByUser} = usePosts();
  const [followMessage, setFollowMessage] = useState("");
  const [isFollowed, setIsFollowed] = useState(false);
  const [error, setError] = useState(null);
  const [followCount, setFollowCount] = useState(0);
  const [posts, setPosts] = useState();

  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res);
    });
  }, [isFollowed]);

  useEffect(() => {
    getUserData().then((res) => {
      setLoggedUser(res);
      getFollowing(res.id).then((following) =>{
        setFollowCount(following.length);
        if(following.includes(user?.username)) setIsFollowed(true);
        else setIsFollowed(false);
      }
      );
      getPostsByUser(id).then((res)=>{
        setPosts(res);
        console.log(res);
      })
    });

  }, [user]);

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
          <p>{followCount }</p>
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
      {loggedUser?.id != id ? (
        <div>
          <button
            style={{
              padding: "1rem",
              border: "solid white",
            }}
            onClick={() => {
              if (!loggedUser) {
                setFollowMessage("You have to sign in to follow!");
              } else if(!isFollowed) {

                follow(id).then(()=>setIsFollowed(true)).catch((err) => {
                  setError(err);
                  console.log(err);
                  
                });
              }
              else{
                unfollow(id).then(()=>setIsFollowed(false)).catch((err)=>{
                  setError(err);
                  console.log(err);
                  setIsFollowed(false);
                })
              }
            }}
          >
            {isFollowed ? "Unfollow" : "Follow"}
          </button>
          <p style={{ color: "#d99b9a", padding: "1rem" }}>{error?.message || followMessage}</p>

        </div>
      ) : (
        ""
      )}
    </div>
  );
}
