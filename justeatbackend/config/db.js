import mongoose from "mongoose";

export const connectDB = async () => {
     await mongoose.connect('mongodb+srv://ronak:8460@cluster0.e1qf5hn.mongodb.net/justeat').then(()=>console.log("database connected"));
    
}