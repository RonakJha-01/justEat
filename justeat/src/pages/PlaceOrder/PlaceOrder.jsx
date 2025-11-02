import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const{getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
    const navigate = useNavigate();

  const [data, setData] = useState({
    firstName:"",
    lastName:"",
    contactNumber:"",
    streetName:"",
    city:"",
    state:""
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    
    setData(data=>({...data,[name]:value}))
  }


  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
   
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount() + 15,
    }

   try {
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    
    if (response.data.success) {
      
      toast.success("Order confirmed! Let's keep that hunger adventure going. Discover more!")
      alert("Payment Successful!");
      navigate('/');
    
    } else {
      alert("Error placing order. Please try again.");
    }
  } catch (error) {
    console.log(error);
    alert("Error placing order. Please try again.");
  }
}


useEffect(()=>{
  if (!token) {
    navigate('/cart')
    toast.info("Please login to place order")
  } else if(getTotalCartAmount()===0) {
    navigate('/cart')
    toast.info("Your cart is empty. Add items to place an order.")
  }
},[token])


  return (
   <form onSubmit={placeOrder} className="place-order">
    <div className="place-order-left">
      <p className="title">Delivery information</p>
      <div className="multi-fields">
        <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
        <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
      </div>
      <input required name='contactNumber' onChange={onChangeHandler} value={data.contactNumber} type="number" placeholder='Your Contact Number' />
      <input required name='streetName' onChange={onChangeHandler} value={data.streetName} type="text" placeholder='Street Name' />
      <div className="multi-fields">
        <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
        <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
      </div>
    </div>
    <div className="place-order-right">
       <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>

            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
             <hr/> 
          
          <div className="cart-total-details">
            <p>Delivery fee</p>
            <p>₹{15}</p>
          </div>
          <hr/>

          <div className="cart-total-details">
            <p>Grand Total</p>
            <p>₹{getTotalCartAmount() + 15}</p>
          </div>

          </div>

          <button type='submit'>Pay</button>

        </div>
    </div>
   </form>
  )
}

export default PlaceOrder
