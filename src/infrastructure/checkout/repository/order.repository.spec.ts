import { Sequelize } from "sequelize-typescript";

import OrderItem from "../../../domain/checkout/entity/order_item";
import ProductModel from "../../product/sequelize/product.model";
import CustomerModel from "../../customer/sequelize/customer.model";
import Address from "../../../domain/customer/value-object/address";
import Customer from "../../../domain/customer/entity/customer";

import OrderItemModel from "../sequelize/order-item.model";
import OrderRepository from "./order.repository";
import Order from "../../../domain/checkout/entity/order";
import Product from "../../../domain/product/entity/product";
import OrderModel from "../sequelize/order.model";
import CustomerRepository from "../../customer/repository/customer.repository";
import ProductRepository from "../../product/repository/product.repository";



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
    const customer = new Customer("1", "Eduardo");
    const address = new Address("Rua dos um", 118, "122000", "São José dos Campos");
    customer.setAddress(address);
    await customerRepository.create(customer);

    //Product
    const productRepository = new ProductRepository();
    const product = new Product("1", "TV", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", "1", [orderItem]);
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

it("should find a order", async () => {
  const customerRepository = new CustomerRepository();
  const customer = new Customer("1", "Eduardo Miron");
  const address = new Address("Rua dos um", 118, "122000", "São José dos Campos");
  customer.setAddress(address);
  await customerRepository.create(customer);
  const productRepository = new ProductRepository();
  const product = new Product("1", "Geladeira", 10);
  await productRepository.create(product);

  const orderItem = new OrderItem(
    "1",
    product.name,
    product.price,
    product.id,
    1
  );
  const order = new Order("1", "1", [orderItem]);
  const orderRepository = new OrderRepository();
  await orderRepository.create(order);
  const foundOrder = await orderRepository.find("1");

  expect(order).toStrictEqual(foundOrder);
});

it("should find all orders", async () => {
  const customerRepository = new CustomerRepository();
  const customer = new Customer("1", "Eduardo");
  const address = new Address("Rua dos um", 118, "122000", "São José dos Campos");
  customer.setAddress(address);
  await customerRepository.create(customer);

  const productRepository = new ProductRepository();
  const product = new Product("1", "Forno", 10);
  await productRepository.create(product);

  const orderItem = new OrderItem(
    "1",
    product.name,
    product.price,
    product.id,
    2
  );
  const order = new Order("1", "1", [orderItem]);
  const orderRepository = new OrderRepository();
  await orderRepository.create(order);

  const product2 = new Product("2", "Microondas", 20);
  await productRepository.create(product2);

  const orderItem2 = new OrderItem(
    "2",
    product2.name,
    product2.price,
    product2.id,
    1
  );
  const order2 = new Order("2", "1", [orderItem2]);
  await orderRepository.create(order2);
  const foundAllOrders = await orderRepository.findAll();

  expect(foundAllOrders).toHaveLength(2);
});


it("should update a order", async () => {
  const customerRepository = new CustomerRepository();
  const customer = new Customer("1", "Eduardo");
  const address = new Address("Rua dos um", 118, "122000", "São José dos Campos");
  customer.setAddress(address);
  await customerRepository.create(customer);

  const productRepository = new ProductRepository();
  const product = new Product("1", "Macbook", 10);
  await productRepository.create(product);

  const orderItem = new OrderItem(
    "1",
    product.name,
    product.price,
    product.id,
    2
  );

  const order = new Order("1", "1", [orderItem]);

  const orderRepository = new OrderRepository();
  await orderRepository.create(order);

  product.changeName("Alexa");

  const orderItemUp = new OrderItem(
    "1",
    product.name,
    product.price,
    product.id,
    4
  );
  const orderUp = new Order("1", "1", [orderItemUp]);

  await orderRepository.update(orderUp);

  const orderModel = await OrderModel.findOne({
    where: { id: order.id },
    include: ["items"],
  });

  console.log(orderModel?.toJSON())

  expect(orderModel.toJSON()).toStrictEqual({
    id: "1",
    customer_id: customer.id,
    total: orderUp.total(),
    items: [
      {
        id: orderItemUp.id,
        name: orderItemUp.name,
        price: orderItemUp.price,
        quantity: orderItemUp.quantity,
        order_id: order.id,
        product_id: orderItemUp.productId,
      },
    ],
  });
});

});