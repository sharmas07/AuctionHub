import express from "express";
import prisma from '../prisma/client.js';

const router = express.Router();

router.get('/get/:_id', async (req, res) => {
    try {
        const productId = req.params._id;
        
        const history = await prisma.bidHistory.findUnique({
            where: { productId }
        });
        
        res.json(history);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.post('/post/:_id', async (req, res) => {
    try {
        const productId = req.params._id;
        const { Bidder, Amount, timestamp } = req.body;
        
        const updatedDocument = await prisma.bidHistory.upsert({
            where: { productId },
            update: {
                history: {
                    push: { Bidder, Amount, timestamp }
                }
            },
            create: {
                productId,
                history: [{ Bidder, Amount, timestamp }],
                product: {
                    connect: { id: productId }
                }
            }
        });
        
        res.json(updatedDocument);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
