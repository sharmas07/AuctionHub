import express from "express";
import * as dotenv from 'dotenv';
import {body, validationResult} from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Replace MongoDB model with Prisma client
import prisma from '../prisma/client.js'

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
const router = express.Router();

router.get('/',(req,res)=>{
    res.send('Hello from auction hub signup')
})

// create a user, NO login required
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
        
        // check if provided email already exists using Prisma
        if (!email) throw new Error('Invalid Email');
        
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });
            if (user) return res.json({success:false,message:'email already exists try login'});
        
        } catch (error) {
            console.log('error inside email check', error.message);
        }
        
        const salt = await bcrypt.genSalt(5);
        const securedPassword = await bcrypt.hash(password, salt) // To encrypt password
        
        // create and store a new user using Prisma
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: securedPassword
            }
        });
        
        const data = {
            user:{
                id: newUser.id,
                username: newUser.username
            }
        }   
        const authToken = jwt.sign(data, jwtSecret); // generates a authentication token and send it to client
        res.status(201).json({success: true, authToken});
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: 'Server error'});
    }
})

export default router
