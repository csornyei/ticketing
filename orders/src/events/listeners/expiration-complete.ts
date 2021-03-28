import { Listener, ExpirationCompleteEvent, Subjects, OrderStatus } from '@csornyei-ticketing/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../models/orders';
import { natsWrapper } from '../../nats-wrapper';
import { OrderCancelledPublisher } from '../publishers/order-cancelled';
import { queueGroupName } from './queue-group-name';

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
    readonly subject = Subjects.ExpirationComplete;
    readonly queueGroupName = queueGroupName;

    async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
        const order = await Order.findById(data.orderId).populate('ticket');

        if (!order) {
            throw new Error('Order not found!');
        }
        if (order.status !== OrderStatus.Complete) {
            order.set({
                status: OrderStatus.Cancelled
            });
            await order.save();

            await new OrderCancelledPublisher(natsWrapper.client).publish({
                id: order.id,
                version: order.version,
                ticket: {
                    id: order.ticket.id
                }
            });
        }

        msg.ack();
    }
}