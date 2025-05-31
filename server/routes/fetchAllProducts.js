import express from "express";
import prisma from '../prisma/client.js';
const router = express.Router();

// endpoint for explore page
router.get('/', async (req, res) => {
    try {
        const allProducts = await prisma.product.findMany();
        res.status(201).json(allProducts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
