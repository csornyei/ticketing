import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from '@csornyei-ticketing/common';

import { User } from "../models/user";

const router = Router();

router.post('/api/users/signup',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be valid!'),
        body('password')
            .trim()
            .isLength({ min: 4, max: 20 })
            .withMessage('Password must be between 4 and 20 characters')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new BadRequestError("E-mail is already in use!");
        }

        const user = User.build({
            email,
            password
        });

        await user.save();

        // Generate JWT
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_SECRET_KEY!
        );

        // Store it on session object
        req.session = {
            jwt: userJwt
        };

        res.status(201).send(user);
    });

export { router as signupRouter };