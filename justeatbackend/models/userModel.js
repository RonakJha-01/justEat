import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type:String, required:true},
    email:{ type:String, required:true, unique:true},
    password:{ type:String, required:true},
    cartObject:{ type:Object, default:{}}
}, {minimize:false})

const userModel = mongoose.models.user || mongoose.model("user", userSchema); // if model already exists use it else create new model.
 export default userModel;