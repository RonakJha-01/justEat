import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";



//placing user order for frontend 
const placeOrder = async (req,res)=>{

    const frontend_url = "https://just-eat-8uut.onrender.com";
    
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            payment:true
        })

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        res.json({success:true,message:"Order placed successfully", orderId: newOrder._id })
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message,})
        
    }
}

//user order for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

//listing all orders for admin panel
const listOrders = async(req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }

}

//for updating order status by admin
const updateStatus = async(req,res)=>{
      try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Order status updated successfully"})
      } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
      }
}

export {placeOrder,userOrders,listOrders,updateStatus};