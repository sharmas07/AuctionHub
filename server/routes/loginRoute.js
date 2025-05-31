import express from "express";
import * as dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import prisma from '../prisma/client.js';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

router.route('/').get((req, res) => {
    res.send('Hello from auction hub login');
});

router.route('/').post(async (req, res) => {
    try {
        const { email, password } = req.body; 
        
        let user = await prisma.user.findUnique({
            where: { email }
        });
        
        if (!user) {
            return res.json({
                success: false,
                msg: "Enter valid credentials"
            });
        }
        
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.json({
                success: false,
                msg: "Enter valid credentials"
            });
        }
        
        const payload = {
            user: {
                id: user.id,
                username: user.username
            }
        };
        
        const authToken = jwt.sign(payload, jwtSecret);
        return res.status(201).json({
            success: true,
            authToken
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
