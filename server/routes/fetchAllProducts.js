import express from "express";
import Product from "../mongodb/models/product.js";
const router = express.Router();

// endpoint for explore page
router.get('/',async (req, res)=>{
    try {
        const AllProducts = await Product.find()
        res.status(201).json(AllProducts)
        
    } catch (error) {
        console.log(error);
    }
})

export default router;