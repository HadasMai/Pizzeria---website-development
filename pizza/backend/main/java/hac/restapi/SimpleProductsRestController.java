package hac.restapi;


import hac.prod.Products;
import hac.prod.ProductsRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

/*
 * a REST CONTROLLER with the @RestController annotation : returns JSON data.
 * Based on PathVariable, RequestMapping, GetMapping, PostMapping, PutMapping, DeleteMapping annotations
 *
 *  To see this example, Visit the pages:
 * http://localhost:8080/api/42
 * http://localhost:8080/api/author/someone/year/2000
 * If Spring MVC receives a request which doesn't have a mapping,
 * it considers the request not to be allowed and returns
 * a 405 METHOD NOT ALLOWED back to the client.
 */
@RestController
@RequestMapping("/api")
public class SimpleProductsRestController {
    private static final Logger logger = LogManager.getLogger(SimpleProductsRestController.class);
//    private static List<String> localGirlNames;
//    @PostMapping(value = "/girlnames")
//    public ResponseEntity<String> saveGirlNames(@RequestBody List<String> girlNames) {
//        localGirlNames = girlNames;
//        logger.info("Received girl names: " + girlNames);
//        return ResponseEntity.ok("Girl names saved successfully!");
//    }
//
//    @GetMapping(value = "/girlnames")
//    public ResponseEntity<List<String>> getGirlNames() {
//        if (localGirlNames == null || localGirlNames.isEmpty()) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//        }
//        return ResponseEntity.ok(localGirlNames);
//    }
    @GetMapping(value = "/getIngredients")
    public ArrayList<Products> getRoot() {

        return ProductsRepository.getAllProducts();
    }

    @PostMapping(value = "")
    public ArrayList<Products> get() {
        return ProductsRepository.getAllProducts();

    }
    /** a special error handler for MethodArgumentTypeMismatchException such as /api/author/someone/year/2000a,
     * see https://www.baeldung.com/exception-handling-for-rest-with-spring
     * @param ex - the exception
     * @return a response entity with a bad request
     */
    @ExceptionHandler({MethodArgumentTypeMismatchException.class, IllegalArgumentException.class})
    public ResponseEntity<String> handleAllExceptions(Exception ex) {
        return ResponseEntity.badRequest().body("Invalid request: " + ex.getMessage());
    }

}
