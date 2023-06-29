import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
    const { id } = useParams();
    const [mobile, setmobile] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handlemobileChange = (e) => {
        setmobile(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_HOST}/changePassword`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id,
                mobile,
                newPassword,
                confirmNewPassword
            })
        });
        const data = await res.json();
        console.log("Data : ", data);
        if (res.status == 200) {
            window.alert("Password Changed Successfully");
            window.location.href = "/";
        }
        else {
            window.alert(data.error);
        }
    };

    return (
        <>
            {/* Create ChangePassword form using bootstrap and card */}
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <form onSubmit={handleSubmit}>
                            <div className="card">
                                <div className="card-header">
                                    <h1>Change Password</h1>
                                </div>
                                <div className="card-body">
                                    <div className="form-group mb-3">
                                        <label>Mobile Number</label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            placeholder="Enter Mobile Number"
                                            value={mobile}
                                            onChange={handlemobileChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter New Password"
                                            value={newPassword}
                                            onChange={handleNewPasswordChange}
                                        />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Confirm New Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm New Password"
                                            value={confirmNewPassword}
                                            onChange={handleConfirmNewPasswordChange}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <input type="submit" className="btn btn-primary" value="ChangePassword" />
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

export default ChangePassword;
