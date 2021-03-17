import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@csornyei-ticketing/common';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();
// express is aware it's behind a proxy and trust it
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

export default app;
