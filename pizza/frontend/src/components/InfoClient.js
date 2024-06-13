// The InfoClient component is a React component that handles the client's order
// information in a pizza ordering application. It allows users to input their personal details,
// validates the input, saves the details in cookies, and submits the order to the server.
// Below is a detailed explanation of the component, including its functionality, structure, and usage.
//
// Overview
// The InfoClient component:
//
//     Retrieves and displays user information from cookies.
//     Validates the user input before submitting the order.
//     Submits the order to the server.
//     Displays an order confirmation upon successful submission.
//     Imports
// useContext, useState, useEffect from React: For managing state and side effects.
//     Link, useNavigate from react-router-dom: For navigation.
//     PizzaContext: Context to access shared state.
//     Wrapper: A layout component.
//     Cookies from js-cookie: To handle cookies.

import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PizzaContext } from "./PizzaContext";
import Wrapper from "./Wrapper";
import Cookies from 'js-cookie';

const InfoClient = () => {
    // State and Context
    // Context Values: Access various state variables and setters from PizzaContext.
    //     Local State:
    //     orderSubmitted: A boolean indicating if the order has been submitted.
    //     orderDetails: Stores the details of the submitted order.
    // Destructure state and functions from the PizzaContext
    const {
        errors,
        firstName,
        lastName,
        street,
        houseNumber,
        city,
        phone,
        addedpizza,
        setFirstName,
        setLastName,
        setStreet,
        setHouseNumber,
        setCity,
        setphone,
        setErrors,
        setAddedPizza
    } = useContext(PizzaContext);

    // Local state to manage order submission status and details
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const navigate = useNavigate();

    // useEffect Hook
    // This hook runs on component mount and whenever addedpizza or orderSubmitted changes. It performs the following:
    //
    //     Ensures that at least one pizza is added to the cart. If not, it sets an error and redirects to /newOrder.
    //     Loads user information from cookies and sets the state accordingly.
    // useEffect hook to load user data from cookies and handle empty cart scenario
    useEffect(() => {
        if (!orderSubmitted && addedpizza.length === 0) {
            setErrors({ ...errors, ingredients: "You need to add at least one pizza to the cart" });
            navigate('/newOrder');
        }

        // Load user details from cookies
        const savedFirstName = Cookies.get('firstName');
        const savedLastName = Cookies.get('lastName');
        const savedStreet = Cookies.get('street');
        const savedHouseNumber = Cookies.get('houseNumber');
        const savedCity = Cookies.get('city');
        const savedPhone = Cookies.get('phone');

        // Update state with loaded user details
        if (savedFirstName) setFirstName(savedFirstName);
        if (savedLastName) setLastName(savedLastName);
        if (savedStreet) setStreet(savedStreet);
        if (savedHouseNumber) setHouseNumber(savedHouseNumber);
        if (savedCity) setCity(savedCity);
        if (savedPhone) setphone(savedPhone);
    }, [addedpizza, setErrors, navigate, setFirstName, setLastName, setStreet, setHouseNumber, setCity, setphone, orderSubmitted]);
    // Form Validation
    // The validateForm function checks if all the required fields are filled correctly. If not, it sets the corresponding errors.
    // Function to validate form inputs
    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        // Validate each input field and set corresponding error messages
        if (!firstName || firstName.trim() === "") {
            newErrors.firstName = "The first name is required";
            isValid = false;
        }
        if (!lastName || lastName.trim() === "") {
            newErrors.lastName = "The last name is required";
            isValid = false;
        }
        if (!street || street.trim() === "") {
            newErrors.street = "The street is required";
            isValid = false;
        }
        if (!houseNumber || houseNumber.trim() === "") {
            newErrors.houseNumber = "The house number is required";
            isValid = false;
        }
        if (!city || city.trim() === "") {
            newErrors.city = "The city is required";
            isValid = false;
        }
        if (!phone || phone.trim() === "" || phone.length !== 10) {
            newErrors.phone = "The phone number is required and must be 10 digits";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    // Submit Order
    // The submitOrder function performs the following:
    //
    //     Validates the form.
    //     Prepares the order object.
    //     Saves the user information in cookies.
    //     Sends the order to the server.
    //     Handles the server response and updates the state accordingly.
    // Function to handle order submission
    const submitOrder = async () => {
        if (!validateForm()) {
            return;
        }

        // Prepare order object with user details and added pizzas
        const order = {
            firstName,
            lastName,
            street,
            houseNumber,
            city,
            phone,
            pizzas: addedpizza.map(p => p.ingredients.join(", ")),
        };

        // Save user details in cookies for future sessions
        Cookies.set('firstName', firstName, { expires: 7 });
        Cookies.set('lastName', lastName, { expires: 7 });
        Cookies.set('street', street, { expires: 7 });
        Cookies.set('houseNumber', houseNumber, { expires: 7 });
        Cookies.set('city', city, { expires: 7 });
        Cookies.set('phone', phone, { expires: 7 });

        try {
            console.log("Sending order:", order);
            const response = await fetch('/api/createOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(order)
            });
            console.log("Response status:", response.status);
            if (response.ok) {
                const orderData = await response.json();
                console.log("Order submitted successfully:", orderData);
                setOrderDetails(orderData);
                setOrderSubmitted(true);
                setAddedPizza([]); // Clear the cart
            } else {
                alert('Failed to submit order');
            }
        } catch (error) {
            console.error('Error submitting order:', error);
        }
    };

    // Render Function
    // The component conditionally renders based on whether the order has been submitted:
    //
    //     If the order is submitted, it displays the order confirmation details.
    //     Otherwise, it displays the order form.
    // Conditional rendering based on order submission status
    if (orderSubmitted) {
        return (
            <Wrapper>
                <div>
                    <h2>Order Confirmation</h2>
                    <p>Your order has been placed!</p>
                    <p>Order ID: {orderDetails.orderId}</p>
                    <p>Name: {orderDetails.firstName} {orderDetails.lastName}</p>
                    <p>Address: {orderDetails.street} {orderDetails.houseNumber}, {orderDetails.city}</p>
                    <p>Phone: {orderDetails.phone}</p>
                    <p>Pizzas:</p>
                    <ul>
                        {orderDetails.pizzas.map((pizza, index) => (
                            <li key={index}>{pizza}</li>
                        ))}
                    </ul>
                    <div className="col-12 text-start">
                        <Link to="/home">
                            <h2>Home🏠</h2>
                        </Link>
                    </div>
                </div>
            </Wrapper>
        );
    }

    // Render order form for user to fill out
    return (
        <Wrapper>
            <div>
                <div className="col-12 text-start">
                    <Link to="/home">
                        <h2>Home🏠</h2>
                    </Link>
                </div>
                <form className="card p-2 w-50 mx-auto" onSubmit={(e) => { e.preventDefault(); submitOrder(); }}>
                    <p className="form-item">
                        <label>First Name</label>
                        <input required className="form-control"
                               placeholder="Enter First Name"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)} />
                        <span>{errors.firstName}</span>
                    </p>
                    <p className="form-item">
                        <label>Last Name</label>
                        <input required className="form-control"
                               placeholder="Enter Last Name"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)} />
                        <span>{errors.lastName}</span>
                    </p>
                    <p className="form-item">
                        <label>Street</label>
                        <input required className="form-control"
                               placeholder="Enter Street"
                               value={street}
                               onChange={(e) => setStreet(e.target.value)} />
                        <span>{errors.street}</span>
                    </p>
                    <p className="form-item">
                        <label>House Number</label>
                        <input required className="form-control"
                               placeholder="Enter House Number"
                               value={houseNumber}
                               onChange={(e) => setHouseNumber(e.target.value)} />
                        <span>{errors.houseNumber}</span>
                    </p>
                    <p className="form-item">
                        <label>City</label>
                        <input required className="form-control"
                               placeholder="Enter City"
                               value={city}
                               onChange={(e) => setCity(e.target.value)} />
                        <span>{errors.city}</span>
                    </p>
                    <p className="form-item">
                        <label>Phone Number</label>
                        <input required className="form-control"
                               placeholder="Enter Phone number"
                               value={phone}
                               onChange={(e) => setphone(e.target.value)}
                               type="tel" />
                        <span>{errors.phone}</span>
                    </p>
                    <button type="submit" className="btn btn-primary">Submit Order</button>
                </form>
            </div>
        </Wrapper>
    );
};

export default InfoClient;
