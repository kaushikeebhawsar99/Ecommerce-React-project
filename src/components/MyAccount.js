import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "./styles/MyAccounts.css";

function MyAccount() {
    const location = useLocation(); //useLocation is used to access user
    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [error, setError] = useState('');
    const user_id = useSelector(state => state.auth.sessionKey);
    // Function to fetch user details after logging in
    const fetchUserData = async () => {
        try {
            // Fetch the logged-in user details
            const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/user/${user_id}`, {
                method: 'GET',
                headers: {
                    'Authorization': process.env.REACT_APP_JWT_TOKEN,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const userData = await response.json();
                console.log('My accounts user data: ',userData.data);
                setUserData(userData.data);
            } else {
                throw new Error('Failed to fetch user details');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to fetch user details');
        }
    };

    useEffect(() => {
        // Fetch user details when the component mounts
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the user details
            const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/user/${userData._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': process.env.REACT_APP_JWT_TOKEN,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                alert('User details updated successfully');
            } else {
                setError('Failed to update user details');
            }
        } catch (err) {
            setError('Failed to update user details');
        }
    };

    return (
        <div className='my-accounts-container'>
            <Typography variant="h4" gutterBottom>My Account</Typography>
            {error && <Typography variant="body1" color="error">{error}</Typography>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="First Name"
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Last Name"
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button variant="contained" color="primary" type="submit">
                    Update
                </Button>
            </form>
        </div>
    );
}

export default MyAccount;
