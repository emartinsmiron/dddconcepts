import ProductFactory from "./product.factory";

describe("Product Factory unit test", () =>{

    it("Should create product a by factory", () =>{
        const product = ProductFactory.create("a", "Product A", 1);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product A");
        expect(product.price).toBe(1);
        expect(product.constructor.name).toBe("Product");
    });

    it("Should create product b by factory", () =>{
        const product = ProductFactory.create("b", "Product B", 100);
        expect(product.id).toBeDefined();
        expect(product.name).toBe("Product B");
        expect(product.price).toBe(100);
        expect(product.constructor.name).toBe("ProductB");
        });
});