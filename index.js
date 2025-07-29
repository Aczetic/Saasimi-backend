
import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db.js';
import userModel from './models/userModel.js';

dotenv.config();
const app = express();
connectDB();


app.post('/sign-up', async(req,res)=>{
    try{ // todo : check for duplicacy of username and email
       const user = await userModel.create({fullName:'Ananya Singh' , userName:'first' , email:'hello@world.com' , password:'1234134'});
        res.status(201).json({success:true , message:'USER_CREATED_SUCCESSFULLY'})
    }catch(e){
        console.log(e.name,e.message);
        res.status(500).json({success:false , message:'SERVER_ERROR'})
    }
})





app.listen(process.env.PORT , ()=>console.log( `The backend is running at port ${process.env.PORT}`))