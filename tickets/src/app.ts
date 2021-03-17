import express from 'express';
import 'express-async-errors';
import { json } from 'express';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@csornyei-ticketing/common';

import { CreateTicketRouter } from './routes/new';
import { ShowTicketRouter } from './routes/show';

const app = express();
// express is aware it's behind a proxy and trust it
app.set('trust proxy', true);
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
}));
app.use(currentUser);
app.use(CreateTicketRouter);
app.use(ShowTicketRouter);

app.all('*', async () => {
    throw new NotFoundError();
})
app.use(errorHandler);

export default app;
