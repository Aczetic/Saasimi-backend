
import express from 'express';
import dotenv from 'dotenv'
import connectDB from './db.js';
import userModel from './models/userModel.js';
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
connectDB();


app.use('/auth', authRoutes)





app.listen(process.env.PORT , ()=>console.log( `The backend is running at port ${process.env.PORT}`))