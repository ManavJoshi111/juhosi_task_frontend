import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        id: '',
        order_date: '',
        company: '',
        orderOwner: '',
        item: '',
        count: '',
        weight: '',
        requests: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const setDetailsData = async () => {
        const res = await fetch(`${process.env.REACT_APP_HOST}/details/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const data = await res.json();
        console.log("Data : ", data);
        if (res.status == 200) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                company: data.id,
                orderOwner: data.name
            }));
        }
        else {
            window.alert(data.error);
        }
    }
    useEffect(() => {
        if (!localStorage.getItem('login')) {
            window.alert("You are not logged in. Please login to continue");
            window.location.href = "/";
        }
        else {
            setDetailsData();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`${process.env.REACT_APP_HOST}/details`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: formData.id,
                order_date: formData.order_date,
                company: formData.company,
                orderOwner: formData.orderOwner,
                item: formData.item,
                count: formData.count,
                weight: formData.weight,
                requests: formData.requests
            })
        });
        const data = await res.json();
        console.log("Data : ", data);
        if (res.status == 200) {
            window.alert(data.message);
        }
        else {
            window.alert(data.error);
        }
    };

    if (formData.company == '') {
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
    else {

        return (
            <>
                <div className="container mt-3">
                    <NavLink className='m-auto btn btn-primary' to={`/data/${id}`}>View Data</NavLink>
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-8">
                            <form onSubmit={handleSubmit}>
                                <div className="card">
                                    <div className="card-header">
                                        <h1>Details</h1>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group mb-3">
                                            <label>Order Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                placeholder="Enter Order Date"
                                                name="order_date"
                                                value={formData.order_date}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Company</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                placeholder=""
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Order Owner</label>
                                            <input
                                                type="text"
                                                readOnly
                                                className="form-control"
                                                placeholder=""
                                                name="orderOwner"
                                                value={formData.orderOwner}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Item</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Item"
                                                name="item"
                                                value={formData.item}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Count</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Count"
                                                name="count"
                                                value={formData.count}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Weight</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Enter Weight"
                                                name="weight"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3">
                                            <label>Requests</label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Enter Requests"
                                                name="requests"
                                                value={formData.requests}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="form-group mb-1">
                                            <input type="submit" className="btn btn-primary" value="Submit" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="mb-2"></div>
            </>
        );
    }
};

export default Details;
