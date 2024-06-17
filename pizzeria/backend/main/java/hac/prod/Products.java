package hac.prod;

import java.io.Serializable;

/**
 * The Products class represents a product with a name.
 * It implements the Serializable interface for object serialization.
 */
public class Products implements Serializable {
    // Private field to store the product name
    private String nameProduct;

    /**
     * Default constructor for creating a Products object.
     */
    public Products() {
    }

    /**
     * Constructor to initialize a Products object with a product name.
     * Checks if the provided name is not empty.
     *
     * @param nameProduct The name of the product.
     */
    public Products(String nameProduct) {
        checkNotEmpty(nameProduct);
        this.nameProduct = nameProduct;
    }

    /**
     * Returns the name of the product.
     *
     * @return The product name.
     */
    public String getNameProduct() {
        return nameProduct;
    }

    /**
     * Sets the name of the product.
     * Checks if the provided name is not null.
     *
     * @param nameProduct The product name.
     */
    public void setNameProduct(String nameProduct) {
        checkNotNull(nameProduct);
        this.nameProduct = nameProduct;
    }

    /**
     * Checks if the provided object is not null.
     * Throws IllegalArgumentException if the object is null.
     *
     * @param o The object to check.
     */
    private void checkNotNull(Object o) {
        if (o == null) {
            throw new IllegalArgumentException("Null argument");
        }
    }

    /**
     * Checks if the provided string is not empty.
     * Throws IllegalArgumentException if the string is null or empty.
     *
     * @param s The string to check.
     */
    public void checkNotEmpty(String s) {
        if (s == null || s.isEmpty()) {
            throw new IllegalArgumentException("Empty argument");
        }
    }

    /**
     * Returns a string representation of the Products object.
     *
     * @return A string representation of the product.
     */
    @Override
    public String toString() {
        return "Name of Products [Product=" + nameProduct + "]";
    }
}

/**
 * This class represents a product with a name and provides methods to get and set the name.
 * It also includes validation to ensure that the name is neither null nor empty.
 * The class implements Serializable, allowing it to be serialized for storage or transmission.
 *
 * Components and methods used:
 * - Serializable: Implements the Serializable interface to allow object serialization.
 * - nameProduct: A private field to store the name of the product.
 * - Constructors: A default constructor and a parameterized constructor to initialize the product name.
 * - getNameProduct: Returns the name of the product.
 * - setNameProduct: Sets the name of the product after checking if it's not null.
 * - checkNotNull: Private method to check if an object is not null.
 * - checkNotEmpty: Public method to check if a string is not empty.
 * - toString: Overrides the toString method to provide a string representation of the product.
 */
