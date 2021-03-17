import jwt from 'jsonwebtoken';
import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";

import app from '../app';

declare global {
    namespace NodeJS {
        interface Global {
            signin(): string[];
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

global.signin = () => {
    // Build JWT payload
    const id = mongoose.Types.ObjectId().toHexString()
    const JWT_PAYLOAD = {
        id,
        email: 'test@test.com'
    };
    // Create a JWT
    const token = jwt.sign(JWT_PAYLOAD, process.env.JWT_SECRET_KEY!);
    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };
    // Turn the session to base64 encoded JSON
    const base64 = Buffer.from(JSON.stringify(session)).toString('base64');
    // Return a string thats the cookie with the encoded data
    return [`express:sess=${base64}`];
};