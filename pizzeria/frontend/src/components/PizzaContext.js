import React, { useState, createContext } from 'react';

// Create a new context for the Pizza app
export const PizzaContext = createContext();

const PizzaProvider = ({ children }) => {
    // State to store the added pizzas
    const [addedpizza, setAddedPizza] = useState([]);
    // State to store the user's first name
    const [firstName, setFirstName] = useState("");
    // State to store the user's last name
    const [lastName, setLastName] = useState("");
    // State to store the user's street address
    const [street, setStreet] = useState("");
    // State to store the user's house number
    const [houseNumber, setHouseNumber] = useState("");
    // State to store the user's city
    const [city, setCity] = useState("");
    // State to store the user's phone number
    const [phone, setphone] = useState("");
    // State to store the list of ingredients
    const [ingredients, setIngredients] = useState([]);
    // State to store the selected ingredients for the current pizza
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    // State to store any general errors
    const [error, setError] = useState("");
    // State to store errors specific to the pizza selection
    const [pizzaError, setPizzaError] = useState(""); // State for pizza-specific errors
    // State to show or hide the pizza form
    const [showpizzaform, setShowPizzaForm] = useState(true);
    // State to store validation errors for the form fields
    const [errors, setErrors] = useState({ firstName: "", lastName: "", street: "", houseNumber: "", city: "", phone: "", ingredients: "" });

    // Function to add a new pizza with selected ingredients
    const addNewPizza = () => {
        setAddedPizza([...addedpizza, { ingredients: selectedIngredients }]); // Add new pizza to the list
        setSelectedIngredients([]); // Clear selected ingredients
        localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients)); // Store selected ingredients in local storage
    };

    // Function to handle changes in the ingredient checkboxes
    const handleCheckboxChange = (event) => {
        const value = event.target.value; // Get the value of the checkbox
        // Add or remove the ingredient from the selected ingredients list
        if (selectedIngredients.includes(value)) {
            setSelectedIngredients(selectedIngredients.filter(item => item !== value));
        } else {
            setSelectedIngredients([...selectedIngredients, value]);
        }
        localStorage.setItem("selectedIngredients", JSON.stringify(selectedIngredients)); // Update local storage with the new selection

        // Clear the error message if at least one ingredient is selected
        if (selectedIngredients.length >= 1) {
            setPizzaError("");
        }
    };

    return (
        <PizzaContext.Provider value={{
            addedpizza, errors, showpizzaform, error, selectedIngredients, ingredients,
            phone, city, houseNumber, street, lastName, firstName, addNewPizza, handleCheckboxChange,
            setErrors, setShowPizzaForm, setSelectedIngredients, setIngredients,
            setphone, setCity, setHouseNumber, setStreet, setLastName, setFirstName, setAddedPizza, setError, pizzaError, setPizzaError,
        }}>
            {children}
        </PizzaContext.Provider>
    );
}

export default PizzaProvider;

/**
 * This context provider manages the state for the pizza ordering application. It includes state variables and functions
 * to handle user inputs, ingredient selections, and form validations.
 *
 * Components and hooks used:
 * - useState: For managing local state such as user information, selected ingredients, and errors.
 * - createContext: For creating a context to share state across components.
 *
 * Key state variables and their purposes:
 * - addedpizza: List of added pizzas with their selected ingredients.
 * - firstName, lastName, street, houseNumber, city, phone: User's personal and address information.
 * - ingredients: List of available ingredients fetched from the server.
 * - selectedIngredients: Ingredients selected for the current pizza.
 * - error: General error messages.
 * - pizzaError: Specific error messages related to pizza ingredient selection.
 * - showpizzaform: Boolean to show or hide the pizza form.
 * - errors: Validation errors for the form fields.
 *
 * Key functions and their purposes:
 * - addNewPizza: Adds a new pizza with selected ingredients to the list of added pizzas.
 * - handleCheckboxChange: Handles changes in the ingredient checkboxes, updating the selected ingredients and local storage.
 *
 * The context provider wraps its children with the PizzaContext.Provider, passing down the state variables and functions
 * to be used in other components.
 */
