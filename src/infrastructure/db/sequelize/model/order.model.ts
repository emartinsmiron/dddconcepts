import { Table, Model, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import OrderItemModel from "./order-item.model";

@Table({
  tableName: "orders",
  timestamps: false,
})
export default class OrderModel extends Model {

  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  @ForeignKey(() => CustomerModel)
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @Column({ allowNull: false })
  declare total: number;

  @Column({ allowNull: false })

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

}