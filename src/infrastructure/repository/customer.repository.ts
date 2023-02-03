import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface{

    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zipcode,
            city: entity.address.city,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
          });
    }
    async update(entity: Customer): Promise<void> {

        await CustomerModel.update({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zipcode: entity.address.zipcode,
            city: entity.address.city,
            active: entity.isActive,
            rewardPoints: entity.rewardPoints,
          },{
            where:{id: entity.id}
          });
       
    }
    async find(id: string): Promise<Customer> {
        let customerModel;
        try{
            customerModel = await CustomerModel.findOne({where: {id: id}, rejectOnEmpty: true});
        } catch(error){
            throw new Error("Customer Not Found");
        }
        const customer = new Customer(customerModel.id, customerModel.name);
        customer.setAddress(new Address( customerModel.street, customerModel.number, customerModel.zipcode, customerModel.city));

        return customer;

    }
    
    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();
    
        const customers = customerModels.map((customerModels) => {
          let customer = new Customer(customerModels.id, customerModels.name);
          customer.addRewardPoints(customerModels.rewardPoints);
          const address = new Address(
            customerModels.street,
            customerModels.number,
            customerModels.zipcode,
            customerModels.city
          );
          customer.setAddress(address);
          if (customerModels.active) {
            customer.activate();
          }
          return customer;
        });
    
        return customers;
      }
    
}