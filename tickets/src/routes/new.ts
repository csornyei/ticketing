import { Router, Request, Response } from 'express';

const router = Router();

router.post('/api/tickets', (req: Request, res: Response) => {
    res.status(201).send({});
});

export { router as CreateTicketRouter }