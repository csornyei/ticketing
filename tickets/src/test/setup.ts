import { MongoMemoryServer } from "mongodb-memory-server";
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): Promise<string[]>;
        }
    }
}

let mongo: MongoMemoryServer;
beforeAll(async () => {
    process.env.JWT_SECRET_KEY = "test";

    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = async () => {
    const VALID_USER = {
        email: 'test@test.com',
        password: 'valid'
    };

    const response = await request(app)
        .post('/api/users/signup')
        .send(VALID_USER)
        .expect(201);

    const cookie = response.get('Set-Cookie');

    return cookie;
};