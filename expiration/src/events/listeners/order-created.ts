import { Listener, OrderCreatedEvent, Subjects } from '@csornyei-ticketing/common';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from '../../queues/expirationQueue';
import { queueGroupName } from './queueGroupName';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    readonly queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        await expirationQueue.add({
            orderId: data.id
        });

        msg.ack();
    }
}