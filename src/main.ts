import Customer from './domain/entity/customer';
import OrderItem from './domain/entity/order_item';
import Order from './domain/entity/order';
import Address from './domain/entity/address';

let customer = new Customer("123", "testando");
const address = new Address("rua", 2, "79400", "cx");

customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "item 1", 20,"p1",2);
const item2 = new OrderItem("2", "item 1", 10,"p2",3);


const order = new Order("1", "123", [item1, item2]);