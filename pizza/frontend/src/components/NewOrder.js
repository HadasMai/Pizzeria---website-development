import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../csscomponent/NewOrder.css";
import { PizzaContext } from "./PizzaContext";
import Wrapper from "./Wrapper";

import blackOlivesImage from '../images/BlackOlives.png';
import greenOlivesImage from '../images/GreenOlives.png';
import mushroomImage from '../images/Mushrooms.png';
import onionImage from '../images/Onion.png';
import cornImage from '../images/Corn.png';
import tunaImage from '../images/Tuna.png';

const NewOrder = () => {
    const { addedpizza, error, selectedIngredients, ingredients, addNewPizza, handleCheckboxChange, setIngredients, setError, pizzaError, setPizzaError } = useContext(PizzaContext);
    const navigate = useNavigate();

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        var url = '/api/getIngredients';
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => response.json())
            .then(json => {
                console.log(json); // Print the JSON response
                setIngredients(json || []); // Assuming the response has an `ingredients` field
                const ingredientsWithImages = json.map(ingredient => {
                    let image;
                    switch (ingredient.nameProduct.toLowerCase()) {
                        case 'black olives':
                            image = blackOlivesImage;
                            break;
                        case 'green olives':
                            image = greenOlivesImage;
                            break;
                        case 'mushrooms':
                            image = mushroomImage;
                            break;
                        case 'onion':
                            image = onionImage;
                            break;
                        case 'corn':
                            image = cornImage;
                            break;
                        case 'tuna':
                            image = tunaImage;
                            break;
                        default:
                            image = null;
                    }
                    return { ...ingredient, image };
                });
                setIngredients(ingredientsWithImages);
            })
            .catch(error => setError(error));
    }, [setIngredients, setError]);

    const goToCart = () => {
        navigate('/cart');
    };

    const handleAddPizza = () => {
        if (selectedIngredients.length < 2) {
            setPizzaError("You need to select at least 2 ingredients");
        } else {
            setPizzaError("");
            addNewPizza();
            setSuccessMessage("Pizza added to your cart successfully!");
            setTimeout(() => {
                setSuccessMessage("");
            }, 3000);
        }
    };

    return (
        <Wrapper>
            <div className="col-12 text-start">
                <Link to="/home">
                    <h2>Home🏠</h2>
                </Link>
                <Link to="/cart">
                    <h2>your cart🛒</h2>
                </Link>
            </div>
            <div className="container-fluid">
                <div className="row d-flex justify-content-center align-items-center min-vh-100">
                    <div className="w-100">
                        {error && <p className="text-danger">{error}</p>}
                        <form className="card p-2 w-50 mx-auto" onSubmit={e => e.preventDefault()}>
                            <h2>Choose ingredient</h2>
                            {pizzaError && (
                                <div className="alert alert-danger" role="alert">
                                    {pizzaError}
                                </div>
                            )}
                            {successMessage && (
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            )}
                            <div className="list-group mb-3">
                                {ingredients.map((ingredient, index) => (
                                    <label key={index} className="list-group-item d-flex align-items-center">
                                        <input
                                            className="form-check-input me-3"
                                            type="checkbox"
                                            value={ingredient.nameProduct}
                                            checked={selectedIngredients.includes(ingredient.nameProduct)}
                                            onChange={handleCheckboxChange}
                                        />
                                        <img src={ingredient.image} alt={ingredient.nameProduct} style={{ width: '50px', marginRight: '10px' }} />
                                        {ingredient.nameProduct}
                                    </label>
                                ))}
                            </div>
                            <button type="button" onClick={handleAddPizza} className="btn btn-primary mb-2 w-100">Add pizza to your cart</button>
                            <div>{addedpizza.length} Pizza Added</div>
                            <button type="button" onClick={goToCart} className="btn btn-secondary w-100">Go to cart</button>
                        </form>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NewOrder;
