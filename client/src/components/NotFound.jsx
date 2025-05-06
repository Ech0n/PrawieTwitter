import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404 – Nie znaleziono strony</h1>
            <p style={styles.text}>Ups! Taka strona nie istnieje.</p>
            <Link to="/" style={styles.link}>← Wróć na stronę główną</Link>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '4rem',
    },
    title: {
        fontSize: '3rem',
        marginBottom: '1rem',
    },
    text: {
        fontSize: '1.2rem',
        marginBottom: '2rem',
    },
    link: {
        color: '#007bff',
        textDecoration: 'none',
    }
};
