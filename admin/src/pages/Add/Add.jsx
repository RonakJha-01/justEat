import React, { useEffect, useState } from 'react'
import './Add.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {



           const [image, setImage] = useState(false);
           const [data, setData] = useState({
            name:'',
            description:'',
            price:'',
            category:'Indian Cusine'
           })

           const onChangeHandler = (event) =>{
            const name = event.target.name;
            const value = event.target.value;
            setData(data=>({...data, [name]: value}))
           }

           const onSubmitHandler = async (event) =>{
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', data.name)
            formData.append('description', data.description)
            formData.append('price', Number(data.price))
            formData.append('category', data.category)
            formData.append('image', image)

            const response = await axios.post(`${url}/api/food/add`, formData);

            if (response.data.success) {
              setData({
                 name:'',
                 description:'',
                 price:'',
                 category:'Indian Cusine'
              }) 
              setImage(false)
              toast.success(response.data.message)
              
            } else {
              toast.error(response.data.message)
            }
           }



  return (
    <div className='add'>
        <form className="flex-col" onSubmit={onSubmitHandler}>
            <div className="add-img flex-col">
                <p>Upload Food Image</p>
            
            <label htmlFor="image">
                <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required/>
            </div>

            <div className="add-product-name flex-col">
              <p>Food Name</p>
              <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Product Name' required />
            </div>

            <div className="add-product-description flex-col">
              <p>Food Description</p>
              <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write about your food' required></textarea>
            </div>

            <div className="add-category-price">
              <div className="add-category flex-col">
                <p>Food Category</p>
                <select onChange={onChangeHandler} name="category">
                  <option value="Indian Cuisine">Indian Cuisine</option>
                  <option value="Chinese">Chinese</option>
                  <option value="Street Tadka">Street Tadka</option>
                  <option value="Salad">Salad</option>
                  <option value="Fast Food">Fast Food</option>
                  <option value="South Indian">South Indian</option>
                  <option value="Ice-Cream">Ice-Cream</option>
                </select>
              </div>
              <div className="add-price flex-col">
                <p>Food Price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₹' required />
              </div>
            </div>

             <button type='submit' className='add-btn'>Add</button>

        </form>
     
    </div>
  )
}

export default Add
