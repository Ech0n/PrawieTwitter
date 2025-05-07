import { useState } from 'react';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);

        try {
            return await fetchLogin(email, password);
        } catch (err) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}


const fetchLogin = async (email, password) => {
    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.log(data);
        throw new Error(data.error || 'Login failed');
    }

    return data;
}
