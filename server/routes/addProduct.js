import express from "express";
import dotenv from 'dotenv';
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import prisma from '../prisma/client.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "AuctionHubProducts",
  },
});

const upload = multer({ storage: storage });

router.post('/',
 upload.single('image'),
async (req, res) => {
    try { 
        const {added_time, bid_time, product_name, initial_price, current_price, last_bidder, userid, creator} = req.body
        
        const newProduct = await prisma.product.create({
            data: {
                userId: userid,
                productName: product_name,
                creator,
                initialPrice: initial_price,
                currentPrice: current_price,
                lastBidder: last_bidder,
                bidTime: bid_time,
                addedTime: added_time,
                imageUrl: req.file?.path || '',
                user: {
                    connect: { id: userid }
                }
            }
        });
        
        console.log(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
