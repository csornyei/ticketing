import request from 'supertest';
import app from '../../app';

describe('POST /api/tickets -- creating new ticket', () => {
    it('has a route handler listening', async () => {
        const response = await request(app)
            .post('/api/tickets')
            .send({});

        expect(response.status).not.toEqual(404);
    });

    it('can only accessed if the user is signed in', async () => {

    });
    it('returns an error if an invalid title is provided', async () => {

    });

    describe('invalid inputs', () => {
        it('return an error if an invalid price is provided', async () => {

        });

        it('creates a ticket with valid parameters', async () => {

        });
    })

    it('has a route handler listening', async () => {

    });
})
