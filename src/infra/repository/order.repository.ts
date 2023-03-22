import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";


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

    await OrderModel.update({
      total: entity.total(),
    },{
      where: {id: entity.id},
    })

    const orderItems = entity.items.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      product_id: item.productId,
      quantity: item.quantity,
      order_id: entity.id, 
    }));

    await OrderItemModel.bulkCreate(orderItems, {
      updateOnDuplicate: ['name', 'price', 'product_id', 'quantity'],
    });
  }

  async find(id: string): Promise<Order> {
    const order_model = await OrderModel.findOne({
        where: {id: id},
        include: ["items"],
    });
    const items = order_model.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );
    });
    const order = new Order(
        order_model.id,
        order_model.customer_id,
        items
      )

    return order;
  }
  
  async findAll(): Promise<Order[]> {
    const orders_model = await OrderModel.findAll({
      include: ["items"],
    })
    const orders = orders_model.map((order_model)=>{
      return new Order(
          order_model.id, 
          order_model.customer_id, 
          order_model.items.map((item) =>{
            return new OrderItem(
              item.id, item.name, item.price, item.product_id, item.quantity
            )
          })
        )
    })
    return orders
  }

}
