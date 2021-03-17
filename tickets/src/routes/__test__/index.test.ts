import request from 'supertest';
import app from '../../app';

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcd',
            price: 20
        });
}

describe('GET /api/tickets/ - return all tickets', () => {
    it('listening on the route handler', async () => {
        await request(app)
            .get('/api/tickets')
            .send()
            .expect(200);
    });

    it('can fetch a list of tickets', async () => {
        await createTicket();
        await createTicket();
        await createTicket();
        await createTicket();

        const response = await request(app)
            .get('/api/tickets')
            .send()
            .expect(200);

        expect(response.body.length).toEqual(4);
    })
})
