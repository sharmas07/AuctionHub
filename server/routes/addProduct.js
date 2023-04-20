import express from "express";
import dotenv from 'dotenv'
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();

import Product from "../mongodb/models/product.js";
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
 upload.single("image") ,
async (req, res)=>{
    
    try { 
        const {product_name, initial_price, current_price, last_bidder, userid, creator} = req.body
        // creates a new product in db
        const newProduct = await Product.create({
            userid,
            product_name,
            creator,
            initial_price,
            current_price,
            last_bidder,
            image_url: req.file.path
        })
        res.status(201).json(newProduct)
        
    } catch (error) {
        console.log(error);
    }
})

export default router;