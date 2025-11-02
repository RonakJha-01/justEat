import userModel from "../models/userModel.js";

//add to cart

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "Missing userId or itemId" });
        }

        // Normalize itemId to string
        const normalizedItemId = String(itemId);

        // Use MongoDB's $inc to increment the quantity
        const updateResult = await userModel.updateOne(
            { _id: userId },
            { $inc: { [`cartObject.${normalizedItemId}`]: 1 } }
        );

        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ success: false, message: "User not found or cart not updated" });
        }

        res.json({ success: true, message: "Item quantity updated in cart" });
    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



//remove from cart
const removeFromCart = async(req,res)=>{
      try {
        let userData = await userModel.findById(req.body.userId);
        let cartObject = await userData.cartObject;
        if (cartObject[req.body.itemId]>0){
            cartObject[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartObject});
        res.json({success:true,message:"Item removed"})
      } catch (error) {
        console.log(error);
        res.json({ success: false, message:"Error" });
      }
}


//get cart data
const getCart = async(req,res)=>{
      try {
        let userData = await userModel.findById(req.body.userId);
        let cartObject = await userData.cartObject;
        res.json({success:true,cartObject});
      } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
      }
}

export {addToCart,removeFromCart,getCart};