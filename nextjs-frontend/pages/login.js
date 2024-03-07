import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Image from 'next/image';

export default function LoginPage() {
    const router = useRouter();
    const { setToken, isAuthenticated } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isAuthenticated()) {
            router.push('/');
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://api-managewhistle.com/api/login/', {
                username,
                password,
            });

            // Assuming the token is returned in the response
            const token = response.data.token;

            // Store the token in context
            setToken(token);

            // Redirect to home page
            router.push('/');
        } catch (error) {
            console.error('Login error:', error);
            setErrorMessage('Incorrect credentials');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Layout>
            <div className='login-page-container'>
                <Image
                    priority
                    src="/images/logosinbackground.png"
                    height={150}
                    width={150}
                    alt=""
                />
                <h1>WHISTLE CODING DOCUMENTATION</h1>

                <h1>Login</h1>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                <div>
                    <input
                        className='login-input'
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <div style={{ display: 'flex' }}>
                        <input
                            className='login-input'
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className='eye-button' onClick={togglePasswordVisibility}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <button className='auth-button' onClick={handleLogin}>Login</button>
            </div>
        </Layout>
    );
}
