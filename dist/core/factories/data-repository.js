"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The Creator class declares the factory method that is supposed to return an
 * object of a Product class. The Creator's subclasses usually provide the
 * implementation of this method.
 */
class DataRepository {
    /**
     * Also note that, despite its name, the Creator's primary responsibility is
     * not creating products. Usually, it contains some core business logic that
     * relies on Product objects, returned by the factory method. Subclasses can
     * indirectly change that business logic by overriding the factory method
     * and returning a different type of product from it.
     */
    someOperation() {
        // Call the factory method to create a Product object.
        const product = this.init();
        // Now, use the product.
        return `Creator: The same creator's code has just worked with ${product.list}`;
    }
}
