import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./styles/ManageUsers.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function ManageUsers() {
    const [users, setusers] = useState([]);
    const [newuser, setNewuser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [editingUserId, setEditingUserId] = useState(null); // State for the ID of the user being edited
    // Function to fetch users from the API
    const fetchusers = async () => {
        // try {
        //     const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newusers', {
        //       method: 'GET',
        //       headers: new Headers({
        //         'Authorization': process.env.REACT_APP_JWT_TOKEN,
        //         'Content-Type': 'application/json'
        //       })
        //     });
        //     if (response.ok) {
        //       const data = await response.json();
        //       setusers(data.data); // Update state with the received data
        //     } else {
        //       console.error('Failed to fetch users:', response.statusText);
        //     }
        //   } catch (error) {
        //     console.error('Error fetching users:', error);
        //   }


        fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/user', {
            method: 'GET',
            headers: new Headers({
                'Authorization': process.env.REACT_APP_JWT_TOKEN,
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setusers(data.data)
            })
        // .then(data=>setusers(data.data))


    };

    // Fetch users when the component mounts
    useEffect(() => {
        fetchusers();
        // console.log(users);
    }, [,users]);//to load the updated user without refreshing the page again

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/user', {
                method: 'POST',
                headers: {
                    'Authorization': process.env.REACT_APP_JWT_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newuser),
            });
            if (response.ok) {
                //fetchusers(); // Refresh users list after adding a new user
                const addeduser = await response.json(); // Parse response as JSON
                const updatedUserState = [...users, addeduser];
                setusers(updatedUserState); // Append the added user to the users array
                setNewuser({
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: ''

                }); // Clear the form fields
            } else {
                console.error('Error adding user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    // Function to handle input changes in the form
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewuser({ ...newuser, [name]: value });
    };

    // Function to handle delete button click
    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': process.env.REACT_APP_JWT_TOKEN,
                },
            });
            if (response.ok) {
                // Filter out the deleted user from the users array
                const updatedUsers = users.filter(user => user._id !== userId);
                setusers(updatedUsers);
            } else {
                console.error('Error deleting user:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    // Function to handle edit button click
    const handleEdit = (user) => {
        setNewuser({
            // _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password
        });
        setEditingUserId(user._id); // Store the ID of the user being edited
    };

    // Function to handle form submission when editing a user
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/user/${editingUserId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': process.env.REACT_APP_JWT_TOKEN,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newuser),
            });
            if (response.ok) {
                // Update the user data in the users array
                const updatedUsers = users.map(user => {
                    if (user._id === editingUserId) {
                        return newuser;
                    }
                    return user;
                });
                setusers(updatedUsers);
                setNewuser({  // Clear the form fields
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: ''
                });
                setEditingUserId(null); // Clear the editing user ID
            } else {
                console.error('Error updating user:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className='manage-user-container'>
            <Typography variant="h4" gutterBottom>Manage Users</Typography>
            {/* Add user Form */}
            <form  onSubmit={editingUserId ? handleEditSubmit : handleSubmit}>
                <TextField style={{ padding: '10px' }}
                    name="email"
                    label="Email"
                    type="email"
                    value={newuser.email}
                    onChange={handleInputChange}
                    required
                />
                <TextField style={{ padding: '10px' }}
                    name="firstName"
                    label="FirstName"
                    value={newuser.firstName}
                    onChange={handleInputChange}
                    required
                />
                <TextField style={{ padding: '10px' }}
                    name="lastName"
                    label="LastName"
                    value={newuser.lastName}
                    onChange={handleInputChange}
                    required
                />
                <TextField style={{ padding: '10px' }}
                    name="password"
                    label="Password"
                    value={newuser.password}
                    onChange={handleInputChange}
                    required
                />
                <Button style={{ padding: '10px', margin: '15px', backgroundColor: "#d84c6f" }} type="submit" variant="contained" color="primary">Add user</Button>
            </form>

            {/* users Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {console.log(users)} */}
                        {users.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleEdit(user)} style={{ padding: '8px', margin: '5px' }} variant="contained" color="primary"><EditIcon/> Edit</Button>
                                    <Button onClick={() => handleDelete(user._id)} style={{ padding: '8px', margin: '5px' }} variant="contained" color="secondary"><DeleteIcon/> Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ManageUsers;
