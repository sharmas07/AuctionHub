import mongoose from "mongoose";

const connectDB = (uri)=>{
    mongoose.set('strictQuery', true);
    mongoose.connect(uri)
        .then(()=>{ console.log('connected to MongoDB');})
        .catch((err)=>{ console.log(err);})
}

export default connectDB;
