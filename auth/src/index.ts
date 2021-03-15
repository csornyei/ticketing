import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
// express is aware it's behind a proxy and trust it
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: true
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_SECRET_KEY) {
        throw new Error('JWT_SECRET_KEY must be defined')
    }
    try {
        await mongoose.connect('mongodb://ticketing-auth-mongo-srv:27017/auth', {
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
