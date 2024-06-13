package hac.orders;

import java.util.List;
import java.util.UUID;

/**
 * The Order class represents a pizza order with customer details and a list of pizzas.
 * Each order is assigned a unique order ID upon creation.
 */
public class Order {
    // Private fields to store order and customer information
    private String orderId;
    private String firstName;
    private String lastName;
    private String street;
    private String houseNumber;
    private String city;
    private String phone;
    private List<String> pizzas;

    /**
     * Constructor to initialize an Order object with customer details and a list of pizzas.
     * Generates a unique order ID for each order.
     *
     * @param firstName    The first name of the customer.
     * @param lastName     The last name of the customer.
     * @param street       The street address of the customer.
     * @param houseNumber  The house number of the customer.
     * @param city         The city of the customer.
     * @param phone        The phone number of the customer.
     * @param pizzas       The list of pizzas included in the order.
     */
    public Order(String firstName, String lastName, String street, String houseNumber, String city, String phone, List<String> pizzas) {
        this.orderId = UUID.randomUUID().toString(); // Generate a unique order ID
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.houseNumber = houseNumber;
        this.city = city;
        this.phone = phone;
        this.pizzas = pizzas;
    }

    // Getters and Setters

    /**
     * Returns the order ID.
     *
     * @return The unique order ID.
     */
    public String getOrderId() {
        return orderId;
    }

    /**
     * Returns the first name of the customer.
     *
     * @return The customer's first name.
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of the customer.
     *
     * @param firstName The customer's first name.
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Returns the last name of the customer.
     *
     * @return The customer's last name.
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of the customer.
     *
     * @param lastName The customer's last name.
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Returns the street address of the customer.
     *
     * @return The customer's street address.
     */
    public String getStreet() {
        return street;
    }

    /**
     * Sets the street address of the customer.
     *
     * @param street The customer's street address.
     */
    public void setStreet(String street) {
        this.street = street;
    }

    /**
     * Returns the house number of the customer.
     *
     * @return The customer's house number.
     */
    public String getHouseNumber() {
        return houseNumber;
    }

    /**
     * Sets the house number of the customer.
     *
     * @param houseNumber The customer's house number.
     */
    public void setHouseNumber(String houseNumber) {
        this.houseNumber = houseNumber;
    }

    /**
     * Returns the city of the customer.
     *
     * @return The customer's city.
     */
    public String getCity() {
        return city;
    }

    /**
     * Sets the city of the customer.
     *
     * @param city The customer's city.
     */
    public void setCity(String city) {
        this.city = city;
    }

    /**
     * Returns the phone number of the customer.
     *
     * @return The customer's phone number.
     */
    public String getPhone() {
        return phone;
    }

    /**
     * Sets the phone number of the customer.
     *
     * @param phone The customer's phone number.
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    /**
     * Returns the list of pizzas in the order.
     *
     * @return The list of pizzas.
     */
    public List<String> getPizzas() {
        return pizzas;
    }

    /**
     * Sets the list of pizzas in the order.
     *
     * @param pizzas The list of pizzas.
     */
    public void setPizzas(List<String> pizzas) {
        this.pizzas = pizzas;
    }

}


//This Java class, Order, represents a pizza order with customer details and a list of pizzas.
// It is designed to handle and store order information including a unique order ID, customer name, address,
// phone number, and the list of pizzas in the order.
//
//Components and Methods
//        Fields
//
//orderId: A unique identifier for the order, generated using UUID.
//firstName: The first name of the customer.
//lastName: The last name of the customer.
//street: The street address of the customer.
//houseNumber: The house number of the customer.
//city: The city of the customer.
//        phone: The phone number of the customer.
//pizzas: A list of pizzas included in the order.
//Constructor
//
//Order(String firstName, String lastName, String street, String houseNumber,
// String city, String phone, List<String> pizzas): Initializes a new Order object
// with the provided customer details and list of pizzas. It also generates a unique order ID.
//        Getters
//
//String getOrderId(): Returns the order ID.
//String getFirstName(): Returns the first name of the customer.
//        String getLastName(): Returns the last name of the customer.
//        String getStreet(): Returns the street address of the customer.
//        String getHouseNumber(): Returns the house number of the customer.
//        String getCity(): Returns the city of the customer.
//String getPhone(): Returns the phone number of the customer.
//        List<String> getPizzas(): Returns the list of pizzas in the order.
//Setters
//
//void setFirstName(String firstName): Sets the first name of the customer.
//void setLastName(String lastName): Sets the last name of the customer.
//void setStreet(String street): Sets the street address of the customer.
//void setHouseNumber(String houseNumber): Sets the house number of the customer.
//void setCity(String city): Sets the city of the customer.
//void setPhone(String phone): Sets the phone number of the customer.
//void setPizzas(List<String> pizzas): Sets the list of pizzas in the order.