import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import prisma from '../prisma/client.js';

const router = express.Router();

// endpoint to fetch user specific products
router.get('/', fetchuser, async (req, res) => {
    const userId = req.user.id;
    try {
        const userProducts = await prisma.product.findMany({
            where: { userId }
        });
        
        res.status(201).json(userProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
