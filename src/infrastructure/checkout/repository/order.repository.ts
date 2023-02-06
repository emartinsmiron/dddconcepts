import Order from "../../../domain/checkout/entity/order";
import OrderItem from "../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "../sequelize/order-item.model";
import OrderModel from "../sequelize/order.model";


export default class OrderRepository implements OrderRepositoryInterface{
 
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {id: entity.id}
      }
    );
  }
  async find(id: string): Promise<Order> {
    let orderModel;
    try{
        orderModel = await OrderModel.findOne({where: {id: id},  include: ["items"],rejectOnEmpty: true});
    } catch(error){
        throw new Error("Customer Not Found");
    }
    const orderItems = orderModel.items.map((item) => {
      let orderItem = new OrderItem(
      item.id,
      item.name,
      item.price,
      item.product_id,
      item.quantity
      );
      return orderItem;
    });
    return new Order(orderModel.id, 
                            orderModel.customer_id,
                            orderItems);
  }
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    const orders = orderModels.map((orderModel) => {
      const orderItems = orderModel.items.map((item) => {
       let orderItem = new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
       );
      return orderItem;
    });
    return new Order(orderModel.id, 
                            orderModel.customer_id,
                            orderItems);
    });
  return orders;
  }
}