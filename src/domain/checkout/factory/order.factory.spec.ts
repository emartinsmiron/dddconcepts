import {v4 as uuid} from "uuid";
import OrderFactory from "./order.factory";
describe("Checkout factory tests", ()=>{
    it("It should create a order", ()=>{
        const props = {
            id: uuid(),
            customerId: uuid(),
            items: [{
                        id: uuid(),
                        name: "Geladeira",
                        price: 1000,
                        quantity: 2,
                        orderId: uuid(),
                        productId: uuid(),
                    }]
        }
        const order = OrderFactory.create(props);
        expect(order.id).toBe(props.id);
        expect(order.customerId).toBe(props.customerId);
        expect(order.items.length).toBe(1);

    
    });
});