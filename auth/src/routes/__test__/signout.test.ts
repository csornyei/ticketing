import request from 'supertest';
import app from '../../app';

const VALID_USER = {
    email: 'test@test.com',
    password: 'valid'
};

it('clears the cookie after signing out', async () => {
    await request(app)
        .post('/api/users/signup')
        .send(VALID_USER)
        .expect(201);

    const response = await request(app)
        .post('/api/users/signout')
        .send({})
        .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
    expect(response.get('Set-Cookie')[0]).toEqual(
        'express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
    );
});