package hac.restapi;

import hac.orders.Order;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api")
public class OrderController {

    private Map<String, Order> orders = new HashMap<>();

    @PostMapping("/createOrder")
    public Order createOrder(@RequestBody Order order) {
        orders.put(order.getOrderId(), order);
        return order;
    }

    @GetMapping("/getOrder/{orderId}")
    public Order getOrder(@PathVariable String orderId) {
        return orders.get(orderId);
    }
}
