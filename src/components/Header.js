import React from 'react'
import './styles/Header.css';
import logo from '../assets/logo.png';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';//for flash sale
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../redux/authSlice';
import ManageProducts from './ManageProducts';
import { useLocation } from "react-router-dom"

function Header() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user_role = useSelector(state => state.auth.role);

  const location = useLocation(); //useLocation is used to access user
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user_role:", user_role);

  const cart = useSelector(state => state.cart.cart);
  const navigate = useNavigate();
  const navigateToCart = () => {
    navigate("/cart");
  }

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  // dashboard MUI 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className='header'>
        {/* image logo */}
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img
              style={{ width: 250, height: 60, marginTop: 10 }}
              className='image'
              src={logo}
              alt='Logo' />
          </Link>
        </div>
        {/* search bar */}
        <div className='header-input-container'>
          <input className='header-input' type="text" placeholder='search Products' />
          <SearchOutlinedIcon style={{ color: 'white', marginLeft: 4, marginTop: 2 }} />
        </div>

        {/* nav links */}
        <nav className='navbar'>
          <ul className='navbar-ul'>
            <li className='navbar-li'><Link style={{ textDecoration: 'none' }} to="/" className='header-text'>HOME</Link></li>
            <li className='navbar-li'><Link style={{ textDecoration: 'none' }} to="/products" className='header-text'>PRODUCTS</Link></li>

            {/* dashboard MUI used */}
            <div>
              <Button style={{ color: 'white', padding: '8.5px' }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Dashboard
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {/* <MenuItem  component={Link} to="/orders" onClick={handleClose}>View Orders</MenuItem> */}

                <MenuItem onClick={handleClose}>
                  {/* <Link to="/my_account" style={{ textDecoration: 'none', color: 'inherit' }}>My Account</Link> */}
                  <Link to = '/my_account' style={{ textDecoration: 'none', color: 'inherit' }}>My Account</Link>
                </MenuItem>

                {isAuthenticated && user_role === 'admin' && (
                  <MenuItem onClick={handleClose}>
                    <Link to="/manage_products" style={{ textDecoration: 'none', color: 'inherit' }}>Manage Products</Link>
                  </MenuItem>
                )}

                {isAuthenticated && user_role === 'admin' && (
                  <MenuItem onClick={handleClose}>
                    <Link to="/manage_users" style={{ textDecoration: 'none', color: 'inherit' }}>Manage Users</Link>
                  </MenuItem>
                )}

                {/* {isAuthenticated && user_role === 'admin' && <MenuItem component={ManageProducts} to="/manage_products" onClick={handleClose}>Manage Products</MenuItem>} */}
                {/* {isAuthenticated && user_role === 'admin' && <MenuItem component={Link} to="/manage_users" onClick={handleClose}>Manage Users</MenuItem>} */}

                {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
              </Menu>
            </div>

            {!isAuthenticated && <li className='navbar-li'><Link style={{ textDecoration: 'none' }} to="/registration" className='header-text'>REGISTER</Link></li>}

            {!isAuthenticated && <li className='navbar-li'><Link style={{ textDecoration: 'none' }} to="/login" className='header-text'>LOGIN</Link></li>}
            {/* {isAuthenticated && <button onClick={handleLogout} className='logout-button'>Logout</button>} */}
            {/* {isAuthenticated && <div><LogoutIcon/><span>Logout</span></div>} */}
            {/* {isAuthenticated && <Button  size="small" color="warning" variant="outlined" onClick={handleLogout} startIcon={<LogoutIcon />}>LOGOUT</Button>} */}
          </ul>
        </nav>



        {/* cart */}
        <div onClick={navigateToCart} className='cart'>
          <ShoppingCartIcon className='cart-icon' />
          <span className='cart-num'>{cart.length}</span>
        </div>



      </div>
      {/* <div className='header-bottom'>
      <p className='header-bottom-text'>Clothing</p>
      <p className='header-bottom-text'>Jewelry</p>
      <p className='header-bottom-text'>Electronics</p>
      <p className='header-bottom-text'>Appliances</p>
      <p className='header-bottom-text'>Bags</p>
      <p className='header-bottom-text'>Flash Sale<BoltIcon style={{fontSize:"18px"}}/></p>


    </div> */}
    </div>
  )
}

export default Header
