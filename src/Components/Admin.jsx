import React, { useState, useEffect } from 'react'

const Admin = () => {
    const [data, setData] = useState(undefined);
    const fetchData = async () => {
        if (localStorage.getItem('admin') == 0) {
            window.alert("You are not authorized to view this page");
            window.location.href = '/';
        }
        const response = await fetch(`${process.env.REACT_APP_HOST}/admin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const content = await response.json();
        setData(content.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (data) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1>Details: </h1>
                        <table className="table table-bordered">
                            <thead className='table-dark'>
                                <tr className=''>
                                    <th scope="row">Item/Customer</th>
                                    <th scope="row">Customer1</th>
                                    <th scope="row">Customer2</th>
                                    <th scope="row">Total</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                <tr className='table-secondary'>
                                    <th>Quantity</th>
                                    <td>{data.customer1[0] ? data.customer1[0] : 0}</td>
                                    <td>{data.customer2[0]}</td>
                                    <td>{data.total[0]}</td>
                                </tr>
                                <tr className='table-secondary'>
                                    <th>Weight</th>
                                    <td>{data.customer1[1] ? data.customer1[1] : 0}</td>
                                    <td>{data.customer2[1]}</td>
                                    <td>{data.total[1]}</td>
                                </tr>
                                <tr className='table-secondary'>
                                    <th>Box Count</th>
                                    <td>{data.customer1[2] ? data.customer1[2] : 0}</td>
                                    <td>{data.customer2[2]}</td>
                                    <td>{data.total[2]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <center>
                <div className="spinner-border mt-5 display-1 text-primary" role="status">
                </div>
                <br />
                <br />
                <span className="">Loading...</span>
            </center>
        )
    }
}

export default Admin;