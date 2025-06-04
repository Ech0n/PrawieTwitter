export function useCurrentUser() {
  const getUserData = async () => {
    const response = await fetch("http://localhost:3000/auth/current-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }
    console.log(data.user);
    return data.user;
  };

  const getFollowing = async (userId) => {
    const response = await fetch(`http://localhost:3000/followers/following/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Login failed");
    }

    return data.following;
  };

  const follow = async (id) => {
    let res = await fetch(`http://localhost:3000/followers/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials: "include",
    });

    const data = await res.json();

    if(res.ok){
      return "OK";
    }
    else{
      throw new Error(data.error || "could not follow "); 
    }
    
  }

  const unfollow = async (id) => {
    let res = await fetch(`http://localhost:3000/followers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials: "include",
    });

    const data = await res.json();

    if(res.ok){
      return "OK";
    }
    else{
      throw new Error(data.error || "could not unfollow "); 
    }
    
  }


  return { getUserData, getFollowing, follow, unfollow};
}

