import React from 'react'
import "./styles/Cart.css"
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { incrementQuantity, decrementQuantity, removeFromCart, cleanCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import emptyCartGif from '../assets/emptyCart.gif';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const incrementItemQuantity = (item) => {
    dispatch(incrementQuantity(item));
  }
  const decrementItemQuantity = (item) => {
    dispatch(decrementQuantity(item));
  }
  const removeItemFromCart = (item) => {
    dispatch(removeFromCart(item));
  }
  //Using map function and reduce method and summing up the quantity of each item in the cart
  //total = item.quantity * item.price, and using the reduce method: adding the current and previous values in the cart to get the total
  //reduce method takes two arguments: current and previous value, and returns a new value(initially it is 0))
  const sumtotal = cart.map((item) => item.quantity * item.price).reduce((current, prev) => current + prev, 0);
  const total = parseFloat(sumtotal.toFixed(2));//rounded off to 2 decimal places and then converted to a number
  const discount = total * 0.1;
  // Round off the discount to 2 decimal places
  const roundedDiscount = parseFloat(discount.toFixed(2));
  const charges = parseFloat((total * 0.13).toFixed(2));

  const navigate = useNavigate();

  //initial order state
  const order = [...cart];

  const placeOrder = (item) => {
    toast.success("Order has been placed successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light"
    });
    // setTimeout is used to delay the execution of the function until the user clicks on the button
    setTimeout(() => {
      navigate("/orders", {
        state: { orders: order }//pushing order to the orders state

      })
    }, 5000);

    // cleaning the cart after 4 seconds
    setTimeout(() => {
      dispatch(cleanCart());
    }, 5500);
  }




  console.log("total", total);
  return (
    <div >
      <Header />
      <div className='cart-main'>
        <ToastContainer />

        {/* Check if cart is empty? */}
        {total === 0 ? (
          <div className="empty-cart-container">
            <h2>Your cart is empty</h2>
            <img src={emptyCartGif} alt="Empty Cart GIF" />
            <Link to="/" className="back-to-home-btn">Back to Home</Link>
          </div>
        ) : (
          <div>
            {/**************Left part of cart where the product is render *************8*/}
            <div className='cart-left'>
              {cart.map((item, index) => ( 
                <div key={index}>
                  <div className='cart-container'>

                    {/* image */}
                    <div>
                      <img src={item.image} style={{ width: "140px", height: "140px" }} />
                    </div>

                    {/* description */}
                    <div className='cart-description'>
                      <p><b>{item.title.length > 60 ? item.title.substr(0, 60) : item.title}</b></p>
                      <p style={{ marginTop: 8 }}>{item.description.length > 90 ? item.description.substr(0, 90) : item.description}</p>
                      <p style={{ marginTop: 8 }}><b>Price: ${item.price}</b></p>
                    </div>

                    {/* Buttons */}
                    <div className='cart-button-container'>
                      <div className='cart-button'>
                        <div onClick={() => decrementItemQuantity(item)} style={{ cursor: "pointer" }}><RemoveCircleOutlineIcon /></div>
                        <div style={{ fontSize: 18, fontWeight: 500, padding: 10 }}>{item.quantity}</div>
                        <div onClick={() => incrementItemQuantity(item)} style={{ cursor: "pointer" }}><AddCircleOutlineIcon /></div>
                      </div>
                      <div>
                        <button onClick={() => removeItemFromCart(item)} className='remove-button'>Remove</button>
                        <h5 style={{ marginTop: "8px" }}>Total price: ${item.price * item.quantity}</h5>
                      </div>
                    </div>
                  </div>
                  <div style={{ borderBottom: '1px solid lightgray', marginBottom: '20px' ,marginTop:'20px' }}></div>
                </div>

              ))}
            </div>

            {/********************** right part of cart where subtotal and checkout button available ***************8*/}
            <div className='cart-right'>
              {/* location info and button */}
              <div className='cart-location-container'>
                <div>
                  <LocationOnIcon className='cart-location' /><span>Select your location</span>
                </div>
                <input type='text' placeholder='Enter Postal Code' />
                <button style={{ marginTop: 8, marginLeft: 8 }}>Enter</button>
              </div>
              {/* coupon info and description */}
              {/* <div></div> */}


              {/* subtotal and checkout button */}
              <div className='cart-total-checkout'>
                <div className='cart-price-section' >
                  <h5 style={{ marginTop: 0 }}>Price Details:</h5>
                  <h5 style={{ marginTop: 0 }}>${total}</h5>
                </div>
                <div className='cart-price-section'>
                  <h5 style={{ marginTop: 0 }}>Discounts (10%):</h5>
                  <h5 style={{ marginTop: 0 }}>- ${roundedDiscount}</h5>
                </div>
                <div className='cart-price-section'>
                  <h5 style={{ marginTop: 0 }}>GST/HST Tax(13%):</h5>
                  <h5 style={{ marginTop: 0 }}>${charges}</h5>
                </div>

                <div className='cart-price-section'>
                  <h3 style={{ marginTop: 0 }}>Grand Total:</h3>
                  <h3 style={{ marginTop: 0 }}>${parseFloat(((total - roundedDiscount)+charges).toFixed(2))}</h3>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'end' }}>
                {/* <button className='remove-button'>Proceed to Checkout</button> */}
                <button onClick={placeOrder} className='place-order-button'>Place Order</button>
              </div>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default Cart
