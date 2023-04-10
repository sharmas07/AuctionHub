import express from "express";
import * as dotenv from 'dotenv';
import {body, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../mongodb/models/user.js'

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hello from auction hub signup')
})

// create a user , NO login required
router.post('/',[
    body('username').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5})
],async(req, res)=>{
    // throws a validation errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({errors:errors.array()})
    }
    try {
        const {username, email, password} = req.body; 
        // check if provided email already exist
        if (!email) throw new Error('Invalid Email');
        try {
            const user = await User.findOne({ email });
            if (user) return res.json({success:false,message:'email already exists try login'});
        
        } catch (error) {
            console.log('error inside email check', error.message);
        }
        const salt = await bcrypt.genSalt(5);
        const securedPassword = await bcrypt.hash(password, salt) // To encrypt password
        // create and store a new user
        const newUser = await User.create({
            username,
            email,
            password:securedPassword
        })
        const data = {
            user:{
                id: newUser._id,
                username: newUser.username
            }
        }   
        const authToken = jwt.sign(data, jwtSecret); // generates a authenticatoin token and send it to client
        res.status(201).json({success: true,authToken});
    } catch (error) {
        res.status(501).json(error)
    }
})

export default router