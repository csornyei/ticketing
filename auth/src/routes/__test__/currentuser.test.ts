import request from 'supertest';
import app from '../../app';

const VALID_USER = {
    email: 'test@test.com',
    password: 'valid'
};

it('responds with the current user\'s details', async () => {
    const cookie = await global.signin();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser).toBeDefined();
    expect(response.body.currentUser.email).toEqual(VALID_USER.email);
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
})