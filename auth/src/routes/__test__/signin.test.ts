import request from 'supertest';
import app from '../../app';

const VALID_USER = {
    email: 'test@test.com',
    password: 'valid'
};

const INVALID_USER = {
    email: 'test@test.com',
    password: 'invalid'
}

describe('Successful sign in', () => {
    it('responds with a cookie when valid credentials are supplied', async () => {
        await request(app)
            .post('/api/users/signup')
            .send(VALID_USER)
            .expect(201);

        const response = await request(app)
            .post('/api/users/signin')
            .send(VALID_USER)
            .expect(200);

        expect(response.get('Set-Cookie')).toBeDefined();
    });
});

describe('Unsuccessful sign in', () => {
    it('fails when an email that not exist is supplied', async () => {
        await request(app)
            .post('/api/users/signin')
            .send(VALID_USER)
            .expect(400);
    });

    it('fails when an password incorrect is supplied', async () => {
        await request(app)
            .post('/api/users/signup')
            .send(VALID_USER)
            .expect(201);

        await request(app)
            .post('/api/users/signin')
            .send(INVALID_USER)
            .expect(400);
    })
});
