import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import Order from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("123", "Eduardo");
customer.setAddress(new Address("Rua dos Lilazes", 118, "12240-110", "São José dos Campos"));
customer.activate();

const item = new OrderItem("1", "Geladeira", 5000);
const item2 = new OrderItem("2", "Fogão", 3000);

const order = new Order("1", "123", [item, item2]);

