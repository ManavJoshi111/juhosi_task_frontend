import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [ID, setID] = useState('');
    const [password, setPassword] = useState('');

    const handleIDChange = (e) => {
        setID(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_HOST}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ID,
                password
            })
        });
        const data = await res.json();
        if (res.status === 400 || res.status === 401 || !data) {
            window.alert(data.message);
        }
        else {
            window.alert("Login Successful");
            if (data.admin == 1) {
                localStorage.setItem('admin', 1);
                localStorage.setItem('ID', ID);
                navigate('/admin');
            }
            else {
                localStorage.setItem('admin', 0);
                localStorage.setItem('ID', ID);
                navigate('/user/' + ID);
            }
        }
    };

    return (
        <div className="container mt-4">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="ID">Enter ID:</label>
                    <input
                        type="ID"
                        className="form-control mt-1"
                        id="ID"
                        placeholder="Enter ID"
                        value={ID}
                        onChange={handleIDChange}
                    />
                </div>

                <div className="form-group mt-2">
                    <label htmlFor="password">Enter Password:</label>
                    <input
                        type="password"
                        className="form-control mt-1"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Login;
