import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Wrapper from './Wrapper';

const OldOrder = () => {
    // State to hold the order ID entered by the user
    const [orderId, setOrderId] = useState('');
    // State to hold the details of the fetched order
    const [orderDetails, setOrderDetails] = useState(null);
    // State to hold any error messages
    const [error, setError] = useState('');

    // Function to handle changes in the input field for order ID
    const handleInputChange = (e) => {
        setOrderId(e.target.value);
    };

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Fetch order details from the server using the entered order ID
            const response = await fetch(`/api/getOrder/${orderId}`);
            if (response.ok) {
                const data = await response.json();
                setOrderDetails(data); // Set the fetched order details
                setError(''); // Clear any previous error messages
            } else {
                setOrderDetails(null); // Clear previous order details
                setError('Order not found'); // Set error message
            }
        } catch (err) {
            setOrderDetails(null); // Clear previous order details
            setError('Error fetching order details'); // Set error message
        }
    };

    return (
        <Wrapper>
            <div className="col-12 text-start">
                <Link to="/home">
                    <h2>Home🏠</h2>
                </Link>
            </div>
            <div className="container">
                <div className="row">
                </div>
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6">
                        <h2>This is the Old order page</h2>
                        <form onSubmit={handleSubmit} className="mt-3">
                            <div className="mb-3">
                                <label htmlFor="orderId" className="form-label">Order ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="orderId"
                                    value={orderId}
                                    onChange={handleInputChange}
                                    placeholder="Enter your Order ID"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Get Order Details</button>
                        </form>
                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {orderDetails && (
                            <div className="card mt-3">
                                <div className="card-body">
                                    <h5 className="card-title">Order Details</h5>
                                    <p className="card-text"><strong>Order ID:</strong> {orderDetails.orderId}</p>
                                    <p className="card-text">
                                        <strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}
                                    </p>
                                    <p className="card-text">
                                        <strong>Address:</strong> {orderDetails.street} {orderDetails.houseNumber}, {orderDetails.city}
                                    </p>
                                    <p className="card-text"><strong>Phone:</strong> {orderDetails.phone}</p>
                                    <p className="card-text"><strong>Pizzas:</strong></p>
                                    <ul className="list-group">
                                        {orderDetails.pizzas.map((pizza, index) => (
                                            <li key={index} className="list-group-item">{pizza}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default OldOrder;

/**
 * This React component allows users to retrieve and display details of a previous order
 * by entering the order ID. The component interacts with the server to fetch order details
 * and displays them if found.
 *
 * Components and hooks used:
 * - useState: For managing local state such as order ID, order details, and error messages.
 * - useContext: For accessing state and actions from PizzaContext.
 *
 * Key functions and their purposes:
 * - handleInputChange: Updates the order ID state as the user types in the input field.
 * - handleSubmit: Handles the form submission to fetch order details from the server.
 *
 * Conditional rendering is used to display error messages and order details based on
 * the state. The form allows users to input an order ID and submit to fetch the details.
 */
