import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

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
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ID,
                password
            })
        });
        const data = await res.json();
        console.log("Data : ", data);
        if (res.status == 200) {
            window.alert("Login Successful");
            localStorage.setItem("login", 1);
            navigate(`/details/${ID}`);
        }
        else {
            window.alert(data.error);
        }
    };

    return (
        <>
            {/* Create login form using bootstrap and card */}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h1>Login</h1>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label>ID</label>
                                        <input
                                            type="ID"
                                            className="form-control"
                                            placeholder="Enter ID"
                                            value={ID}
                                            onChange={handleIDChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter Password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input type="submit" className="btn btn-primary me-3" value="Login" />
                                        <NavLink type="button" className="btn btn-primary" to={`/changepassword/${ID}`} >
                                            Change Password
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
