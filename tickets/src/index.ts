import mongoose from 'mongoose';

import { natsWrapper } from './nats-wrapper';
import app from "./app";

const start = async () => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY must be defined')
    }
    try {
        await natsWrapper.connect('ticketing', 'abcd', 'http://nats-srv:4222');

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());
        if (!process.env.MONGO_URI) {
            throw new Error('MongoURI must be provided!');
        }
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log('Tickets Service is listening on port 3000');
    });
}

start();
