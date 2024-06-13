import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Wrapper from "./Wrapper";
import { PizzaContext } from "./PizzaContext";

/**
 * Cart component for displaying and editing the list of added pizzas
 * @returns {JSX.Element} The cart page
 */
const Cart = () => {
    // React Router hooks for navigation and retrieving location state
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state; // State passed from the previous route







    // State variables for managing the pizza being edited, total price, and error messages
    const [pizzaedit, setPizzaEdit] = useState(null);
    const [pricepizza, setPricePizza] = useState(0);
    const [pizzaError, setPizzaError] = useState("");

    // Destructuring values from PizzaContext
    const { addedpizza, ingredients, setAddedPizza, selectedIngredients, updateSelectedIngredients } = useContext(PizzaContext);

    /**
     * Calculate the total price of the pizzas in the cart.
     * Each pizza has a base price of 10 plus 2 for each ingredient.
     * This function updates the state with the calculated price.
     * @returns {number} The total price of all pizzas in the cart
     */
    const calculaPizzaPrice = () => {
        let price = 0;
        for (const pizza of addedpizza) {
            price += 10 + (pizza.ingredients.length * 2); // Base price + price per ingredient
        }
        setPricePizza(price);
        return price;
    };

    /**
     * Navigate to the infoClient page for order details
     */
    const buyPizza = () => {
        navigate('/infoClient');
    };

    /**
     * Set the pizza to be edited and update selected ingredients in the context
     * This function opens the modal for editing the pizza ingredients.
     * @param {object} pizza - The pizza object to be edited
     * @param {number} index - The index of the pizza in the addedpizza array
     */
    const editIngredient = (pizza, index) => {
        setPizzaEdit({ ...pizza, index });
        updateSelectedIngredients(pizza.ingredients);
    };

    /**
     * Handle changes in the ingredient checkboxes in the edit modal
     * This function updates the ingredients of the pizza being edited.
     * @param {object} e - The event object from the checkbox input
     */
    const handleCheckboxChangeingredients = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setPizzaEdit((prev) => ({
                ...prev,
                ingredients: [...prev.ingredients, value]
            }));
        } else {
            if (pizzaedit.ingredients.length === 2) {
                setPizzaError("Must contain minimum 2 ingredients");
                e.target.checked = true;
                return;
            }
            setPizzaEdit((prev) => ({
                ...prev,
                ingredients: prev.ingredients.filter((ingredient) => ingredient !== value)
            }));
        }
        setPizzaError("");
    };

    /**
     * Save the changes made to the pizza being edited
     * This function updates the addedpizza array and recalculates the total price.
     */
    const saveChanges = () => {
        const newPizzaList = [...addedpizza];
        newPizzaList[pizzaedit.index] = { ...pizzaedit };
        setAddedPizza(newPizzaList);
        updateSelectedIngredients(pizzaedit.ingredients);
        setPizzaEdit(null);
        calculaPizzaPrice();
    };

    /**
     * Close the edit modal without saving changes
     */
    const closeWithoutChanges = () => {
        setPizzaEdit(null);
    };

    /**
     * Delete a pizza from the cart
     * This function removes the pizza from the addedpizza array and recalculates the total price.
     * @param {number} index - The index of the pizza to be deleted in the addedpizza array
     */
    //spaces
    const deletePizza = (index) => {
        let newPizzaList = [...addedpizza];
        newPizzaList.splice(index, 1);
        setAddedPizza(newPizzaList);
        calculaPizzaPrice();
    };

    // Calculate the total price whenever the addedpizza array changes
    useEffect(() => {
        calculaPizzaPrice();
    }, [addedpizza]);

    return (
        <Wrapper>
            <div className="row bg-light">
                <div className="col-12 text-start">
                    <Link to="/home">
                        <h2>Home🏠</h2>
                    </Link>
                    <Link to="/newOrder">
                        <h2>Add more pizzas➕</h2>
                    </Link>
                </div>
                <div className="container">
                    <h1>Your cart 🛒</h1>
                    <div className="col card">
                        <h2>Pizzas 🍕 List:</h2>
                        {addedpizza.map((pizza, index) => (
                            <div className="card p-2 mb-2 d-flex justify-content-between align-items-center" key={index}>
                                <div>
                                    <div>Pizza {index + 1}</div>
                                    <div>{pizza.ingredients.map((ingredient, idx) => (
                                        <span key={idx}>{ingredient + (idx < pizza.ingredients.length - 1 ? ", " : "")}</span>
                                    ))}</div>
                                </div>
                                <button onClick={() => editIngredient(pizza, index)} data-bs-toggle="modal" data-bs-target="#editModal" className="btn btn-primary">Edit</button>
                                <button className="btn btn-danger" onClick={() => deletePizza(index)}>Delete</button>
                            </div>
                        ))}
                        <div>Price: {pricepizza}</div>
                        <button className="btn btn-primary" onClick={buyPizza}>Buy</button>
                    </div>
                </div>
            </div>

            {pizzaedit && (
                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="edit" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="edit">Edit Ingredients</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeWithoutChanges}></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="d-flex justify-content-evenly">
                                        {ingredients.map((ingredient, index) => (
                                            <div key={index}>
                                                <label className="form-check-label">
                                                    <input
                                                        type="checkbox" className="form-check-input me-2"
                                                        value={ingredient.nameProduct}
                                                        checked={pizzaedit.ingredients.includes(ingredient.nameProduct)}
                                                        onChange={handleCheckboxChangeingredients}
                                                    />
                                                    <img src={ingredient.image} alt={ingredient.nameProduct} style={{ width: '50px', marginRight: '10px' }} />
                                                    {ingredient.nameProduct}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-danger">
                                        {pizzaError}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeWithoutChanges}>Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={saveChanges}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Wrapper>
    );
}

export default Cart;
