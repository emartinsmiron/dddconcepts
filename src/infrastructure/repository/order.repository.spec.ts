import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItem from "../../domain/entity/order_item";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepository from "./customer.repository";
import ProductRepository from "./product.repository";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderRepository from "./order.repository";



describe("Order repository test", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: true,
      sync: { force: true },
    });
    
    sequileze.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("Should create a new Order", async () =>{
    //Customer
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Eduardo");
    const address = new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos");
    customer.setAddress(address);
    await customerRepository.create(customer);

    //Product
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel?.total).toStrictEqual(20);
  
    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(), 
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ]
    });
  });

});