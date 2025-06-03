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

  const getFollowers = async (userId) => {
    const response = await fetch(`http://localhost:3000/followers/${userId}`, {
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

    return data.followers;
  };

  return { getUserData, getFollowers};
}
