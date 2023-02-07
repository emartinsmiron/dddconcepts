import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("", () => {
    it("should create a customer by factory", () =>{
        const customer = CustomerFactory.create("a", "Eduardo");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Eduardo");
   
        expect(customer.constructor.name).toBe("Customer");

    });

    it("should create a customer with a address by factory", () =>{
        const address = new Address("Rua dos um", 118, "122000", "São José dos Campos");
        const customer = CustomerFactory.createWithAddress("a", "Eduardo", address);
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("Eduardo");
        expect(customer.address).toBe(address);
        expect(customer.constructor.name).toBe("Customer");

    });
});