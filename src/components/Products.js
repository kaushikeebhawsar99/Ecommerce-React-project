import React from 'react';
import { useSelector } from 'react-redux';
import Header from './Header';
import Body from './Body';

function Products() {
  const username = useSelector(state => state.auth.username);

  return (
    <div>
     <Header/>
      <Body/>
    </div>
  );
}

export default Products;
