import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@csornyei-ticketing/common';

import { queueGroupName } from './queue-group-name';
import Ticket from '../../models/ticket';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    readonly subject = Subjects.OrderCreated;
    readonly queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        const ticket = await Ticket.findById(data.ticket.id);

        if (!ticket) {
            throw new Error('NO TICKET');
        }

        ticket.set({ orderId: data.id });
        await ticket.save();

        msg.ack();
    }
}