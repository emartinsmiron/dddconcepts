import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Product from "../../../../domain/entity/product";
import ProductModel from "./product.model";
import Order from "../../../../domain/entity/order";
import OrderModel from "./order.model";

@Table({
  tableName: "order-items",
  timestamps: false,
})
export default class OrderItemModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  @ForeignKey(() => ProductModel)
  declare productId: string;

  @BelongsTo(() => ProductModel)
  declare product: ProductModel;

  @Column({ allowNull: false })
  @ForeignKey(() => OrderModel)
  declare orderId: string;

  @BelongsTo(() => OrderModel)
  declare order: OrderModel;

  @Column({ allowNull: false })
  declare quantity: number;

  @Column({ allowNull: false })
  declare name: String;

  @Column({ allowNull: false })
  declare price: number;

}