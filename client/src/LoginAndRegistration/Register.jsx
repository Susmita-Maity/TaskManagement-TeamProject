import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils';
import styles from './Register.module.css';

const Register = () => {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            navigate('/login'); // Redirect to login page after successful registration
        } else {
            setError(data.message || 'Registration failed');
        }
    };

    return (
        <div className={styles.registerContainer}>
            <h2 className={styles.heading}>Register</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.registerForm}>
                <div className={styles.inputGroup}>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button}>
                    Register
                </button>
            </form>
            <p className={styles.loginLink}>
                Already have an account? <a href="/login">Login here</a>.
            </p>
        </div>
    );
};

export default Register;
