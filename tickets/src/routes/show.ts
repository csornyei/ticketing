import { Router, Request, Response } from 'express';
import { NotFoundError } from '@csornyei-ticketing/common';

import Ticket from '../models/ticket';

const router = Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        throw new NotFoundError();
    }

    res.status(200).send(ticket);
});

export { router as ShowTicketRouter };