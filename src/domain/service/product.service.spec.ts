import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product Service Unit Test", () =>{
    it("Should increase absolute prices of all products", () =>{

        const product = new Product("1", "Mesa Notebook", 100);
        const product2 = new Product("2", "Monitor", 200);
        const products = [product, product2];

        ProductService.increasePrice(products, 100);

        expect(product.price).toBe(200);
        expect(product2.price).toBe(300);

    });

    it("Should decrease absolute prices of all products", () =>{

        const product = new Product("1", "Mesa Notebook", 110);
        const product2 = new Product("2", "Monitor", 200);
        const products = [product, product2];

        ProductService.decreasePrice(products, 100);

        expect(product.price).toBe(10);
        expect(product2.price).toBe(100);

    });

    it("Should increase percentage prices of all products", () =>{

        const product = new Product("1", "Mesa Notebook", 100);
        const product2 = new Product("2", "Monitor", 200);
        const products = [product, product2];

        ProductService.increasePercentagePrice(products, 10);

        expect(product.price).toBe(110);
        expect(product2.price).toBe(220);

    });

    it("Should decrease percentage prices of all products", () =>{

        const product = new Product("1", "Mesa Notebook", 100);
        const product2 = new Product("2", "Monitor", 200);
        const products = [product, product2];

        ProductService.decreasePercentagePrice(products, 10);

        expect(product.price).toBe(90);
        expect(product2.price).toBe(180);

    });
});