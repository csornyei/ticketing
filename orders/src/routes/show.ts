import { Router, Request, Response } from 'express';

const router = Router();

router.get('/api/orders/:id', async (req: Request, res: Response) => {
    res.send({});
});

export { router as showOrderRouter };