// LoginForm.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import './LoginForm.css';

const LoginForm = () => {
    const { setIsLoggedIn, setUserRole } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('role', data.user.role);
                setIsLoggedIn(true);
                setUserRole(data.user.role);
                data.user.role === 'admin' ? navigate('/AdminHomePage') : navigate('/dashboard');
            } else {
                const message = await response.text();
                setErrorMessage(message);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setErrorMessage('Failed to log in. Please try again.');
        }
    };

    const handleSignup = () => {
        navigate('/signup');
    };

    return (
        <div className="logo">
            <div className="login-container">
                <h2>Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Login</button>
                </form>
                <button onClick={handleSignup} className="signup-button">
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
