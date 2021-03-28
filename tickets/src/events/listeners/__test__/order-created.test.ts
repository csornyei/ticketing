import { OrderCreatedListener } from "../order-created";
import { natsWrapper } from '../../../nats-wrapper';
import Ticket from "../../../models/ticket";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@csornyei-ticketing/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new OrderCreatedListener(natsWrapper.client);

    const ticket = Ticket.build({
        title: 'concert',
        price: 100,
        userId: mongoose.Types.ObjectId().toHexString()
    });
    await ticket.save();

    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        status: OrderStatus.Created,
        userId: mongoose.Types.ObjectId().toHexString(),
        expiresAt: "next monday",
        version: 0,
        ticket: {
            id: ticket.id,
            price: ticket.price,
        }
    }

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, data, msg, ticket };
}

it('sets the orderId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const sentEvent = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(sentEvent.id).toEqual(data.ticket.id);
    expect(sentEvent.orderId).toEqual(data.id);
})