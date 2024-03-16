import React from 'react'
import './styles/ProductItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';

function ProductItem({item}) {
  const cart=useSelector((state)=> state.cart.cart);
  const dispatch = useDispatch();
  const addItemToCart=(item) =>{
    dispatch(addToCart(item));
  }
  const removeItemFromCart=(item)=>{
    dispatch(removeFromCart(item));
  }
  
  return (
    <div className='productItem'>
        {/* image of the product */}
      <img className="productImage" src={item.image}/>
      {/* title of the product */}
      <p className='product-text'><b>{item.title.length>30 ?item.title.substr(0,30): item.title}</b></p>
      {/* description of the product */}
      <p className='product-text'>{item.description.length>90 ?item.description.substr(0,90): item.description}</p>
      <p className='product-price'><b>Price: ${item.price}</b></p>
      {/* add to cart button */}
      {cart.some((x)=>x._id ===item._id)?(
        <button className='add-to-cart' onClick={()=>removeItemFromCart(item)}>Remove</button>
      ):(
        <button className='add-to-cart' onClick={()=>addItemToCart(item)}>Add to cart</button>
      )}
      
    </div>
  )
}

export default ProductItem
