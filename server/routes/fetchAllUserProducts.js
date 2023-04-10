import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Product from "../mongodb/models/product.js";
const router = express.Router();

// endpoint to fetch user specific products
router.get('/',fetchuser,async (req, res)=>{
    const userid = req.user.id
    try {
        const userProducts = await Product.find({userid})
        res.status(201).json(userProducts)
        
    } catch (error) {
        console.log(error);
    }
})

export default router;