import React from 'react'
import "./styles/Order.css"
import { useLocation } from "react-router-dom"

function Order() {
  const location = useLocation(); //useLocation is used to access previous order
  console.log("previous orders: ",location.state)
  return (
    <div className='orders'>
      <div>
        <h2>
          <b>Your previous orders:</b>
        </h2>
        {location.state.orders.map((order) => (
          <div key={order._id}>
          <div>
            <div className='order-container'>
              <img style={{width:140, height:140}} src={order.image}></img>
              
              <div className='order-description'>
                <p>{order.title}</p>
                <p>{order.description.length >80 ? order.description.substr(0,80) :order.description }</p>
                <p>Total price: ${order.price*order.quantity}</p>
              </div>

              <div className='order-button-container'>
                <button className='order-button'>Return products</button>
                <button className='order-button'>Download invoice</button>
                <button className='order-button'>Rate product</button>
              </div>
            </div>
          </div>
          <div style={{ borderBottom: '1px solid lightgray', marginBottom: '20px' , marginTop:'20px'}}></div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
