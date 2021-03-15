import { Router } from 'express';
import jwt from 'jsonwebtoken';



const router = Router();

router.get('/api/users/currentuser', (req, res) => {
    if (!req.session?.jwt) { // === !req.session || !req.session.jwt
        return res.send({ currentUser: null });
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET_KEY!);
        res.send({ currentUser: payload });
    } catch (error) {
        return res.send({ currentUser: null });
    }
});

export { router as currentUserRouter };