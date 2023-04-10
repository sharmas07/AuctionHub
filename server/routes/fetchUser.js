import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import User from "../mongodb/models/user.js";

const router = express.Router();

router.get('/',fetchuser,async (req, res)=>{
    try {
        const _id = req.user.id
        let user = await User.findById({_id}).select("-password");
        res.status(201).send(user)
      
    } catch (error) {
        console.log(error);
        res.status(404).send(error)
    }
}) 

export default router;