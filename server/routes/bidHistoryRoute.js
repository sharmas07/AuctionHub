import express from "express";
import bidHistoryModel from "../mongodb/models/bidHistoryModel.js";
const router = express.Router();

router.get('/get/:_id',async (req, res)=>{
    try {
        const productId = req.params._id;
        const History = await bidHistoryModel.findOne({productId});
        res.json(History);
        
    } catch (error) {
        console.log(error);
    }
})

router.post('/post/:_id',async (req, res)=>{
    try {
        const productId = req.params._id
        const {Bidder, Amount, timestamp} = req.body
        const updatedDocument = await bidHistoryModel.findOneAndUpdate(
            { productId },
            { $push: { History: { Bidder, Amount, timestamp } } },
            { new: true, upsert: true, useFindAndModify: false }
          ).exec();
        res.json(updatedDocument);
        
    } catch (error) {
        console.log(error);
    }
})

export default router;