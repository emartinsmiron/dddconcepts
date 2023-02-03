import { Sequelize } from "sequelize-typescript";
import customerRepository from "./customer.repository";
import customerModel from "../db/sequelize/model/customer.model";
import customer from "../../domain/entity/customer";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe("Customer repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequileze.addModels([CustomerModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Eduardo");
    const address = new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos");
    customer.setAddress(address);

    customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: "1"}});

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zipcode,
      city: address.city,
    });

  });

  it("Should return erro when user is not found", () =>{
    const customerRepository = new CustomerRepository();
    expect(async () =>{
      await customerRepository.find("2");
    }).rejects.toThrowError("Customer Not Found");
    

  });


  it("Should return find a customer", async () =>{
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Eduardo");
    const address = new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos");
    customer.setAddress(address);

    customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({where: {id: "1"}});
    const customerEntity = await customerRepository.find(customer.id);

    expect(customerModel.toJSON()).toStrictEqual({
      id: customerEntity.id,
      name: customerEntity.name,
      active: customerEntity.isActive,
      rewardPoints: customerEntity.rewardPoints,
      street: customerEntity.address.street,
      number: customerEntity.address.number,
      zipcode: customerEntity.address.zipcode,
      city: customerEntity.address.city,
    });

  });

  it("Should find all customers", async () =>{
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Eduardo");
    const customer2 = new Customer("2", "Eduardo");
    const address = new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos");
    customer.setAddress(address);
    customer2.setAddress(address);

    customerRepository.create(customer);
    customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers.length).toBe(2);

  });

});