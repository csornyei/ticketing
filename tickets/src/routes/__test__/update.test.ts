import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import { natsWrapper } from '../../nats-wrapper';

const createTicket = async () => {
    const cookie = global.signin();
    const createResponse = await request(app)
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send({
            title: 'abcd',
            price: 20
        });
    return { cookie, createResponse };
}

describe('PUT /api/tickets/:id - update a tickets', () => {
    it('returns a 404 if the id not exist', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();
        const response = await request(app)
            .put(`/api/tickets/${id}`)
            .set('Cookie', global.signin())
            .send({
                title: 'abcd',
                price: 20
            });

        expect(response.status).toEqual(404);
    });

    describe('authorization', () => {
        it('returns a 401 if the user is not signed in', async () => {
            const id = new mongoose.Types.ObjectId().toHexString();
            const response = await request(app)
                .put(`/api/tickets/${id}`)
                .send({
                    title: 'abcd',
                    price: 20
                });

            expect(response.status).toEqual(401);
        });

        it('returns a 401 if the user not own the ticket', async () => {
            const id = new mongoose.Types.ObjectId().toHexString();

            const { createResponse } = await createTicket();

            const response = await request(app)
                .put(`/api/tickets/${createResponse.body.id}`)
                .set('Cookie', global.signin())
                .send({
                    title: 'abcd',
                    price: 20
                });

            expect(response.status).toEqual(401);
        });
    });

    describe('input validation', () => {
        it('return a 400 on invalid parameters', async () => {
            const { cookie, createResponse } = await createTicket();

            await request(app)
                .put(`/api/tickets/${createResponse.body.id}`)
                .set('Cookie', cookie)
                .send({
                    title: '',
                    price: 20
                })
                .expect(400);

            await request(app)
                .put(`/api/tickets/${createResponse.body.id}`)
                .set('Cookie', cookie)
                .send({
                    title: 'abcd',
                    price: -20
                })
                .expect(400);
        });
    })

    describe('updates the ticket', () => {
        it('returns the ticket on success', async () => {
            const { cookie, createResponse } = await createTicket();

            const response = await request(app)
                .put(`/api/tickets/${createResponse.body.id}`)
                .set('Cookie', cookie)
                .send({
                    title: 'new title',
                    price: 50
                })
                .expect(200);

            expect(response.body.title).toEqual('new title');
            expect(response.body.price).toEqual(50);

            const updatedResponse = await request(app)
                .get(`/api/tickets/${createResponse.body.id}`)
                .send();

            expect(updatedResponse.body.title).toEqual('new title');
            expect(updatedResponse.body.price).toEqual(50);
        });

    })

    it('publish an event', async () => {
        const { cookie, createResponse } = await createTicket();

        const response = await request(app)
            .put(`/api/tickets/${createResponse.body.id}`)
            .set('Cookie', cookie)
            .send({
                title: 'new title',
                price: 50
            })
            .expect(200);

        expect(natsWrapper.client.publish).toHaveBeenCalled();
    });

})
