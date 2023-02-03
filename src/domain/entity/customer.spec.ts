import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
    it("should throw error when id is empty", () => {
       
        expect(() =>{
            let customer = new Customer("", "Eduardo");
        }).toThrowError("Id is required");
    });


    it("should throw error when name is empty", () => {
       
        expect(() =>{
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should throw error when change name to empty", () => {
       
        expect(() =>{
            let customer = new Customer("123", "Eduardo");
            customer.changeName("");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {
       //Triple A

       //Arrange
        let customer = new Customer("123", "Eduardo");

        //Act
        customer.changeName("Fabiana");

        //Assert
        expect(customer.name).toBe("Fabiana");
    });


    it("should activate customer", () => {
        //Triple A
 
        //Arrange
         let customer = new Customer("123", "Eduardo");
         customer.setAddress(new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos"));
 
        //Act
        customer.activate();

         //Assert
         expect(customer.isActive).toBe(true);
     });

     it("should throw error on activation when customer address not set", () => {
        //Triple A
 
        //Arrange
         let customer = new Customer("123", "Eduardo");
         customer.setAddress(new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos"));
 
        //Act
        customer.activate();

         //Assert
         expect(() =>{
            let customer = new Customer("123", "Eduardo");
            customer.activate();
         }).toThrowError("Customer doesn`t have address");
     });

     it("should deactivate customer", () => {
        //Triple A
 
        //Arrange
         let customer = new Customer("123", "Eduardo");
         customer.setAddress(new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos"));
 
        //Act
        customer.activate();

         //Assert
         expect(customer.isActive).toBe(true);

         customer.deactivate();

         //Assert
         expect(customer.isActive).toBe(false);

     });

     it("should add reward points", () => {
         let customer = new Customer("123", "Eduardo");

         expect(customer.rewardPoints).toBe(0);

         customer.addRewardPoints(5);
      
         expect(customer.rewardPoints).toBe(5);

     });
})