import mongoose from 'mongoose';

import app from "./app";

const start = async () => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY must be defined')
    }
    try {
        await mongoose.connect('mongodb://ticketing-tickets-mongo-srv:27017/tickets', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }
    app.listen(3000, () => {
        console.log('Auth Service is listening on port 3000');
    });
}

start();
