import express from 'express';
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
const router = express.Router();

const userExistsMiddleware =async (req,res,next)=>{
    try{
        const user = await userModel.findOne({
            $or:[
                {userName:req.body.userName},
                {email:req.body.email},
            ]
        })
        if(user != {}){
            req.user = user;
        }
        next();    
    }catch(e){
        console.log(e);
        req.status(500).json({success:false, message:'SERVER_ERROR'})
    }
}

router.post('/sign-up',userExistsMiddleware,async (req,res)=>{
    try{
        if(req.user){
            res.status(409).json({success:false , message:'USER_EXISTS'})
        }else{
            const hashedPassword = bcrypt.hashSync(req.body.password,10);
            
            await userModel.create({...req.body,password:hashedPassword});
            res.status(201).json({success:true, message:'SIGN_UP_SUCCESSFUL'})
        }
    }catch(e){
        console.log(e);
        res.status(500).json({success:false, message:'SERVER_ERROR'})
    }
})


router.post('/login',userExistsMiddleware,async (req,res)=>{
    try{
        if(req.user){

            if(bcrypt.compareSync(req.body.password,req.user.password))
                res.status(202).json({success:true, message:'LOG_IN_SUCCESSFUL'})
            else{
                res.status(400).json({success:false,message:'WRONG_PASSWORD'})
            }
            
        }else{
            await userModel.create({...req.body});
            res.status(409).json({success:false , message:'USER_DOES_NOT_EXIST'})
        }
    }catch(e){
        console.log(e);
        res.status(500).json({success:false, message:'SERVER_ERROR'})
    }
})



export default router;