import express from "express";
import Product from "../mongodb/models/product.js";
const router = express.Router();

router.post('/',async (req, res)=>{
    
    try { 
        const {product_name, initial_price, current_price, last_bidder, userid, creator} = req.body
        // creates a new product in db
        const newProduct = await Product.create({
            userid,
            product_name,
            creator,
            initial_price,
            current_price,
            last_bidder
        })
        res.status(201).json(newProduct)
        
    } catch (error) {
        console.log(error);
    }
})

export default router;