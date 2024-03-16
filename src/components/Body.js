import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import './styles/Body.css';
import ProductItem from './ProductItem';

function Body() {
  const [products, setProducts] = useState([]);
  const username = useSelector(state => state.auth.username);
  const cart = useSelector(state => state.cart.cart);
  console.log(cart)
  useEffect(() => {
    const fetchProducts = async () => {
      fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newProducts', {
        method: 'GET',
        headers: new Headers({
          'Authorization': process.env.REACT_APP_JWT_TOKEN,
          'Content-Type': 'application/json'
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          setProducts(data.data)
        })
      // fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/products', {
      //   method: 'GET',
      //   headers: new Headers({
      //     'Authorization': process.env.REACT_APP_JWT_TOKEN,
      //     'Content-Type': 'application/json'
      //   })
      // })
      // .then(res=>res.json())
      // .then(data=>setProducts(data.data[0]))

      // fetch('https://fakestoreapi.com/products')
      // .then(res=>res.json())
      // // .then(data=>console.log(data))
      // .then(data=>setProducts(data))

    };
    fetchProducts();
  }, []);
  return (
    <div className='body'>
      <div className='bodyItems'>
        {products.map((item, index) => (
          <ProductItem item={item} key={index} /> //passing item with its id in the ProductItem Component; each item needs a unique key to identify itself.
        ))}
      </div>
    </div>
  )
}

export default Body
