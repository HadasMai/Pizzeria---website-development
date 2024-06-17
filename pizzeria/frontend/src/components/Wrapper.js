// src/components/Wrapper.js
import React from 'react';
import { Link } from 'react-router-dom';
import pizzaLogo from '../images/pizzaLogo.png';

/**
 * Wrapper component that provides a common layout and styling for the application.
 * It includes a header with the pizza store's logo and name.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be wrapped.
 * @returns {JSX.Element} The rendered wrapper component.
 */
const Wrapper = ({ children }) => {
    return (
        <div>
            {/* Header section with the pizza store logo and name */}
            <div className="text-center p-5 mb-2 bg-danger-subtle text-emphasis-danger"
                 style={{ backgroundImage: `url(${pizzaLogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="text-white">
                    <h2>Hadas & Odaya</h2>
                    <h6>pizza store</h6>
                </div>
            </div>
            {/* Rendering the child components */}
            {children}
        </div>
    );
};

export default Wrapper;

/**
 * This component serves as a layout wrapper for other components in the application.
 * It includes a header with a background image, which is the logo of the pizza store.
 * The header displays the name "Hadas & Odaya" and a subtitle "pizza store".
 *
 * Components and hooks used:
 * - React: For creating the functional component.
 *
 * Props:
 * - children: The child components passed to the Wrapper to be displayed within the layout.
 *
 * Styling:
 * - The header section is styled with a background image (pizzaLogo), centered and covering the entire header area.
 * - The text within the header is styled to be white and centered.
 */
