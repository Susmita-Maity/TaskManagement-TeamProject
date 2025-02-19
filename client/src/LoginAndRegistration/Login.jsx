import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils';
import styles from './Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                
                localStorage.setItem('token', data.accessToken);
                
                navigate('/tasks');
            } else {
               
                setError(data.message || 'Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.heading}>Login</h2>
            {error && <p className={styles.errorMessage}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.loginForm}>
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
                <button type="submit" disabled={isLoading} className={styles.button}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className={styles.registerLink}>
                Don't have an account? <a href="/register">Register here</a>.
            </p>
        </div>
    );
};

export default Login;
