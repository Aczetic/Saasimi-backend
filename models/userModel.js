import mongoose from 'mongoose';


const userSchema = mongoose.Schema({
    fullName:{type:String , required:true },
    userName:{type:String , required:true , unique:true},
    email:{type:String, required:true , unique:true},
    password:{type:String , required:true}
})

const userModel = mongoose.model('user' , userSchema);

export default userModel;