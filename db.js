import mongoose from 'mongoose';


async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('The DB is connected successfully');
    }catch(e){
        console.log(e);
        process.exit(1);
    }
}


export default connectDB;