import mongoose from 'mongoose';

import { natsWrapper } from './nats-wrapper';
import app from "./app";
import { TicketCreatedListener } from './events/listeners/ticket-created';
import { TicketUpdatedListener } from './events/listeners/ticket-updated';

const start = async () => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY must be defined')
    }
    try {
        if (!process.env.NATS_CLUSTER_ID) {
            throw new Error('NATS Cluser ID must be provided!');
        }
        if (!process.env.NATS_URL) {
            throw new Error('NATS URL must be provided!');
        }
        if (!process.env.NATS_CLIENT_ID) {
            throw new Error('NATS Client ID must be provided!');
        }
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        });
        process.on("SIGINT", () => natsWrapper.client.close());
        process.on("SIGTERM", () => natsWrapper.client.close());

        new TicketCreatedListener(natsWrapper.client).listen();
        new TicketUpdatedListener(natsWrapper.client).listen();

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
        console.log('Orders Service is listening on port 3000');
    });
}

start();
