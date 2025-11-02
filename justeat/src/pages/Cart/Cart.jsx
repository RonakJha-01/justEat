import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import {useNavigate} from 'react-router-dom'; 
const Cart = () => {
  const {cartItems,food_list,removeFromCart, getTotalCartAmount,url} = useContext(StoreContext);

  const navigate = useNavigate();


  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>

        <br />
        <hr />

        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0 ){  // item._id is the quantity of the item
            return(
              <div key={item._id}> 
              <div className='cart-items-title cart-items-item'> 
              <img src={url+"/images/"+item.image} alt="" />
              <p>{item.name} </p>
              <p>₹{item.price} </p>
              <p>{cartItems[item._id]} </p> 
              <p>₹{item.price * cartItems[item._id]} </p>
              <p onClick={()=> removeFromCart(item._id) } className='cross'>X</p>

              </div>
              <hr />
              </div>
            )
          }
          return null;
        }
         ) }
       
            </div>

      <div className="cart-bottom">
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
            <p>₹{getTotalCartAmount()===0?0:+15}</p>
          </div>
          <hr/>

          <div className="cart-total-details">
            <p>Grand Total</p>
            <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+15}</p>
          </div>

          </div>

          <button onClick={()=>navigate('/order')} >Proceed</button>

        </div>

        <div className="cart-promocode">
          <div>
            <p>Use your promocode here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>



      </div>
      
    </div>
  )
}

export default Cart
