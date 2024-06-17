package hac.prod;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * The ProductsRepository class provides methods to manage a list of products.
 * It includes methods to find, update, add, and retrieve products.
 */
public class ProductsRepository {
    // A static list to store products, initialized with some default products
    private static final ArrayList<Products> list = new ArrayList<>(Arrays.asList(
            new Products("Green olives"),
            new Products("Black olives"),
            new Products("mushrooms"),
            new Products("Onion"),
            new Products("corn"),
            new Products("tuna")
    ));

    /**
     * Finds a product by its name.
     *
     * @param id The ID of the product (which is incorrectly used as the name in this example).
     * @return The product if found, null otherwise.
     */
    public static Products findProductsById(Long id) {
        Products products = null;
        // Some code to find a product in the list
        for (Products b : list) {
            if (b.getNameProduct().equals(id)) {
                // Return a copy of the product
                products = new Products(b.getNameProduct());
                break;
            }
        }
        return products;
    }

    /**
     * Updates an existing product in the list.
     *
     * @param p The product to update.
     * @return A copy of the updated product.
     */
    public static Products updateProduct(Products p) {
        synchronized (list) {
            for (Products products : list) {
                if (products.getNameProduct().equals(p.getNameProduct())) {
                    products.setNameProduct(p.getNameProduct());
                    break;
                }
            }
        }
        return new Products(p.getNameProduct());
    }

    /**
     * Returns the list of all products.
     *
     * @return The list of all products.
     */
    public static ArrayList<Products> getAllProducts() {
        return list;
    }

    /**
     * Finds products by their name.
     *
     * @param productName The name of the product.
     * @return A list of products matching the given name.
     */
    public static ArrayList<Products> findProductsByName(String productName) {
        ArrayList<Products> res = new ArrayList<>();
        for (Products p : list) {
            if (p.getNameProduct().equals(productName)) {
                res.add(new Products(p.getNameProduct()));
            }
        }
        return res;
    }

    /**
     * Adds a new product to the list.
     *
     * @param bk The product to add.
     */
    public static synchronized void addProducts(Products bk) {
        list.add(bk);
    }
}

/**
 * This class provides a repository for managing products, including methods to
 * find, update, add, and retrieve products from a static list.
 *
 * Components and methods used:
 * - list: A static list initialized with some default products.
 * - findProductsById(Long id): Finds and returns a product by its "ID" (misused as name here).
 * - updateProduct(Products p): Updates an existing product in the list.
 * - getAllProducts(): Returns the list of all products.
 * - findProductsByName(String productName): Finds and returns a list of products by their name.
 * - addProducts(Products bk): Adds a new product to the list.
 *
 * The class ensures thread safety for the update and add operations using synchronization.
 */
