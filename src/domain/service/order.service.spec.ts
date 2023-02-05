import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service Unit Test", () => {
    it("Should sum total of a order", () => {

        const item = new OrderItem("1", "Item 1", 100, "1", 1);
        const item2 = new OrderItem("2", "Item 2", 200, "1", 2);
        const item3 = new OrderItem("3", "Item 3", 300, "1", 3);

        const order = new Order("1", "1", [item]);
        const order2 = new Order("2", "1", [item2, item3]);

        const orders = [order, order2]

        const total = OrderService.sumOrdersPrices(orders);

        expect(total).toBe(1400);

    });

    it("Should place a order", () =>{

        const customer = new Customer("1", "Eduardo");

        const item = new OrderItem("1", "Item 1", 100, "1", 1);

        const order = OrderService.placeOrder(customer, [item]);

        expect(customer.rewardPoints).toBe(50);

        expect(order.total()).toBe(100);

    });
});