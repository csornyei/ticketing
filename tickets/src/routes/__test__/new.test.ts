import request from 'supertest';
import app from '../../app';
import Ticket from '../../models/ticket';

describe('POST /api/tickets -- creating new ticket', () => {
    it('has a route handler listening', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({});

        expect(response.status).not.toEqual(404);
    });

    describe('authorization', () => {
        it('if user is not signed in returns not authorized', async () => {
            const response = await request(app)
                .post('/api/tickets')
                .send({});

            expect(response.status).toEqual(401);
        });

        it('if user is signed in not returns not authorized', async () => {
            const response = await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send({});

            expect(response.status).not.toEqual(401);
        });

    });

    describe('input validation', () => {
        it('returns an error if an invalid title is provided', async () => {
            await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send({
                    title: '',
                    price: 10
                })
                .expect(400);

            await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send({
                    price: 10
                })
                .expect(400);
        });

        it('return an error if an invalid price is provided', async () => {
            await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send({
                    title: 'Ticket',
                    price: 'ten'
                })
                .expect(400);

            await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send({
                    title: 'Ticket',
                    price: -10
                })
                .expect(400);

            await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send({
                    title: 'Ticket',
                })
                .expect(400);
        });

        it('creates a ticket with valid parameters', async () => {
            let tickets = await Ticket.find({});
            expect(tickets.length).toEqual(0);

            const TICKET = {
                title: 'Valid Ticket',
                price: 10
            }


            await request(app)
                .post('/api/tickets')
                .set('Cookie', global.signin())
                .send(TICKET)
                .expect(201);

            tickets = await Ticket.find({});
            expect(tickets.length).toEqual(1);
            expect(tickets[0].title).toEqual(TICKET.title);
            expect(tickets[0].price).toEqual(TICKET.price);
        });
    })
})
