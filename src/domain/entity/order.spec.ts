import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
    it("should throw error when id is empty", () => {
       
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });


    it("should throw error when CustomerId is empty", () => {
       
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });


    it("should throw error when Order does not have Items", () => {
       
        expect(() => {
            let order = new Order("123", "123", []);
        }).toThrowError("Orders should have items");
    });

    it("calculate total", () => {
        const item = new OrderItem("1", "Geladeira", 5000, "1", 1);
        const item2 = new OrderItem("2", "Fogão", 3000, "1", 2);
        let order = new Order("123", "123", [item, item2]);
        
       
        expect(order.total()).toBe(11000);
    });

    it("should quantity be greater than 0", () => {  
        expect(() =>{
            const item = new OrderItem("1", "Geladeira", 5000, "1", 0);
            let order = new Order("123", "123", [item]);
        }).toThrowError("Item quantity should be greater than 0");
    });
    
    
})