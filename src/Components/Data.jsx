import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Data = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(undefined);
    const getUserData = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_HOST}/data/${id}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            setUserData(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    const exportToCSV = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_HOST}/data/csv/${id}`, {
                method: "GET",
                headers: {
                    Accept: "text/csv",
                },
            });
            if (!res.ok) {
                throw new Error('Failed to fetch CSV file');
            }
            const blob = await res.blob();

            const downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = 'query_results.csv';
            downloadLink.click();
        }
        catch (err) {
            console.log(err);
            window.alert("Failed to fetch CSV file");
        }
    }
    useEffect(() => {
        getUserData();
    }, []);
    if (!userData) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
                <div className="spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
                <br />
                <h2>Loading</h2>
            </div>
        )
    }
    return (
        <>
            {/* generate a table having columns orderdate,user_id, username, orderitem, count, weight, request,  */}
            <div className="container">
                <button className="btn btn-primary mt-2" onClick={exportToCSV}>Export to CSV</button>
                <div className="row">
                    <div className="col-12">
                        <h1 className="text-center">User Data</h1>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Order Item</th>
                                    <th scope="col">Count</th>
                                    <th scope="col">Weight</th>
                                    <th scope="col">Request</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    userData.map((item, index) => {
                                        if (index != userData.length - 1) {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{
                                                            new Date(item.order_date).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })
                                                        }</td>
                                                        <td>{userData[userData.length - 1].id}</td>
                                                        <td>{userData[userData.length - 1].name}</td>
                                                        <td>{item.item}</td>
                                                        <td>{item.count}</td>
                                                        <td>{item.weight}</td>
                                                        <td>{item.requests}</td>
                                                    </tr>
                                                </>
                                            )
                                        }
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Data;