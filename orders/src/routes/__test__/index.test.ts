import request from 'supertest';
import app from '../../app';
import { Order, OrderStatus } from '../../models/orders';
import { Ticket } from '../../models/ticket';
import { showOrderRouter } from '../show';
// Add test about auth and validation

const buildTicket = async () => {
    const ticket = Ticket.build({
        title: 'concert',
        price: 20
    });
    await ticket.save();

    return ticket;
}


it('it fetches orders for a user', async () => {
    // Create 3 tickets
    const ticketOne = await buildTicket();
    const ticketTwo = await buildTicket();
    const ticketThree = await buildTicket();

    const userOne = global.signin();
    const userTwo = global.signin();
    // Create one order as User #1
    await request(app)
        .post('/api/orders')
        .set('Cookie', userOne)
        .send({ ticketId: ticketOne.id })
        .expect(201);
    // Create two order as User #2
    const { body: orderTwo } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketTwo.id })
        .expect(201);
    const { body: orderThree } = await request(app)
        .post('/api/orders')
        .set('Cookie', userTwo)
        .send({ ticketId: ticketThree.id })
        .expect(201);
    // Make request to get orders for User #2
    const savedOrders = await Order.find({});

    const { body } = await request(app)
        .get('/api/orders')
        .set('Cookie', userTwo)
        .send()
        .expect(200);

    // Expect to only get the orders for User #2
    expect(body.length).toEqual(2);
    expect(body[0].id).toBe(orderTwo.id);
    expect(body[1].id).toBe(orderThree.id);
    expect(body[0].ticket.id).toBe(ticketTwo.id);
    expect(body[1].ticket.id).toBe(ticketThree.id);
});