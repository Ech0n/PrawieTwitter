import { useState } from "react";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registerUser = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      return await fetchRegister(formData);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { registerUser, loading, error };
}

const fetchRegister = async (formData) => {
  const response = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: formData.email,
      username: formData.username,
      password: formData.password,
      password2: formData.password2,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Registration failed");
  }

  return data;
}
