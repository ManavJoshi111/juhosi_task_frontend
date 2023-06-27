import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
    const { ID } = useParams();
    const [formData, setFormData] = useState({
        orderdate: '',
        company: '',
        owner: '',
        item: '',
        quantity: '',
        weight: '',
        request_for_shipment: '',
        tracking_id: '',
        shipment_size: '',
        box_count: '',
        specification: '',
        checklist_quantity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...formData,
            ID: ID
        };
        const res = await fetch(`${process.env.REACT_APP_HOST}/customer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const resData = await res.json();
        if (res.status === 400 || !resData) {
            window.alert(resData.error);
        }
        else {
            window.alert("Order Placed Successfully");
        }
    };

    return (
        <div className="container">
            <h1>User Component</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="orderdate" className="form-label">Order Data:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="orderdate"
                        name="orderdate"
                        value={formData.orderdate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="company" className="form-label">Company:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="owner" className="form-label">Owner:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="owner"
                        name="owner"
                        value={formData.owner}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="item" className="form-label">Item:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="item"
                        name="item"
                        value={formData.item}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="weight" className="form-label">Weight:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="request_for_shipment" className="form-label">Request for Shipment:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="request_for_shipment"
                        name="request_for_shipment"
                        value={formData.request_for_shipment}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tracking_id" className="form-label">Tracking ID:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tracking_id"
                        name="tracking_id"
                        value={formData.tracking_id}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="shipment_size" className="form-label">Shipment Size (LxBxH):</label>
                    <input
                        type="text"
                        className="form-control"
                        id="shipment_size"
                        name="shipment_size"
                        value={formData.shipment_size}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="box_count" className="form-label">Box Count:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="box_count"
                        name="box_count"
                        value={formData.box_count}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="specification" className="form-label">Specification:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="specification"
                        name="specification"
                        value={formData.specification}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="checklist_quantity" className="form-label">Checklist Quantity:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="checklist_quantity"
                        name="checklist_quantity"
                        value={formData.checklist_quantity}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default User;
