import Product from "./product";

describe("Product unit tests", () => {
    it("should throw error when id is empty", () => {
       
        expect(() => {
            let product = new Product("", "Monitor", 200);
        }).toThrowError("Id is required");
    });

    it("should throw error when name is empty", () => {
       
        expect(() => {
            let product = new Product("12", "", 200);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than 0", () => {
       
        expect(() => {
            let product = new Product("12", "Televisor", 0);
        }).toThrowError("Invalid price");
    });


    it("should change name", () => {
        let product = new Product("12", "Televisor", 1000);
        product.changeName("Televisor LG");
        expect(product.name).toBe("Televisor LG");
    });
    
    it("should throw error when change name to empty", () => {
        expect(() =>{
            let product = new Product("12", "Televisor", 1000);
            product.changeName("");

        }).toThrowError("Name is required");
    });
    
})