import React from 'react'; // Import React, the core library for building user interfaces.
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom for navigation.
import Wrapper from './Wrapper'; // Import a custom Wrapper component for consistent layout or styling.

/**
 * Home component that serves as the main landing page of the application.
 * It provides navigation options to different sections like creating a new order,
 * viewing old orders, and accessing the cart.
 * @returns {JSX.Element} The Home page component
 */
const Home = () => {
    // useNavigate is a hook provided by react-router-dom.
    // It returns a function that can be used to navigate programmatically.
    const navigate = useNavigate();

    return (
        <Wrapper> {/* Wrapper component for consistent layout and styling */}
            {/* Main heading for the Home page */}
            <h2>Home🏠</h2>

            {/* Container for navigation buttons */}
            <div className="buttons-container">
                {/* Button to navigate to the new order page.
                    onClick handler uses navigate function to go to /newOrder route.
                    className applies Bootstrap classes for styling and layout. */}
                <button
                    onClick={() => navigate('/newOrder')}
                    className={`col mt-2 btn btn-primary mx-3`}
                >
                    newOrder {/* Text displayed on the button */}
                </button>

                {/* Link to navigate to the old orders page.
                    The 'to' prop defines the target route.
                    className applies Bootstrap classes for styling and layout. */}
                <Link to={'/oldOrder'} className={'col mt-2 btn btn-secondary mx-2'}>
                    oldOrder {/* Text displayed on the link */}
                </Link>

                {/* Link to navigate to the cart page.
                    The 'to' prop defines the target route.
                    className applies Bootstrap classes for styling and layout. */}
                <Link to={'/cart'} className={'col mt-2 btn btn-secondary mx-2'}>
                    your cart {/* Text displayed on the link */}
                </Link>
            </div>
        </Wrapper>
    );
}

export default Home; // Export the Home component as the default export of the module.
