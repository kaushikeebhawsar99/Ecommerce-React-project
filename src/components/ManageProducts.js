import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "./styles/ManageProducts.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [editingProductId, setEditingProductId] = useState(null); // State for the ID of the product being edited
  // Function to fetch products from the API
  const fetchProducts = async ()=>{
    // try {
    //     const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newProducts', {
    //       method: 'GET',
    //       headers: new Headers({
    //         'Authorization': process.env.REACT_APP_JWT_TOKEN,
    //         'Content-Type': 'application/json'
    //       })
    //     });
    //     if (response.ok) {
    //       const data = await response.json();
    //       setProducts(data.data); // Update state with the received data
    //     } else {
    //       console.error('Failed to fetch products:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching products:', error);
    //   }


    fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/newProducts', {
      method: 'GET',
      headers: new Headers({
        'Authorization': process.env.REACT_APP_JWT_TOKEN,
        'Content-Type': 'application/json'
      })
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
     setProducts(data.data)})
    // .then(data=>setProducts(data.data))


  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
    // console.log(products);
  }, [,products]);//to load the updated product without refreshing the page again

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/newProducts', {
        method: 'POST',
        headers: {
          'Authorization': process.env.REACT_APP_JWT_TOKEN,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        //fetchProducts(); // Refresh products list after adding a new product
        const addedProduct = await response.json(); // Parse response as JSON
        const updatedProductState = [...products, addedProduct];
      setProducts([updatedProductState]); // Append the added product to the products array
        setNewProduct({
         
          title: '',
          price: '',
          description: '',
          category: '',
          image: ''
        }); // Clear the form fields
      } else {
        console.error('Error adding product:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Function to handle input changes in the form
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  // Function to handle delete button click
  const handleDelete = async (productId) => {
    try {
        const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/newProducts/${productId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': process.env.REACT_APP_JWT_TOKEN,
            },
        });
        if (response.ok) {
            // Filter out the deleted product from the product array
            const updatedProducts = products.filter(product => product._id !== productId);
            setProducts(updatedProducts);
        } else {
            console.error('Error deleting product:', response.statusText);
        }
    } catch (error) {
        console.error('Error deleting product:', error);
    }
};

// Function to handle edit button click
const handleEdit = (product) => {
    setNewProduct({
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image
    });
    setEditingProductId(product._id); // Store the ID of the product being edited
};

// Function to handle form submission when editing a product
const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await fetch(`https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/newProducts/${editingProductId}`, {
            method: 'PUT',
            headers: {
                'Authorization': process.env.REACT_APP_JWT_TOKEN,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        if (response.ok) {
            // Update the product data in the products array
            const updatedProducts = products.map(product => {
                if (product._id === editingProductId) {
                    return newProduct;
                }
                return product;
            });
            setProducts(updatedProducts);
            setNewProduct({  // Clear the form fields
                title: '',
                price: '',
                description: '',
                category: '',
                image:''
            });
            setEditingProductId(null); // Clear the editing product ID
        } else {
            console.error('Error updating product:', response.statusText);
        }
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

  

  return (
    <div className='manage-product-container'>
      <Typography variant="h4" gutterBottom>Manage Products</Typography>
      {/* Add Product Form */}
      <form onSubmit={editingProductId ? handleEditSubmit : handleSubmit}>
        <TextField style={{padding: '10px'}}
          name="title"
          label="Title"
          value={newProduct.title}
          onChange={handleInputChange}
          required
        />
        <TextField style={{padding: '10px'}}
          name="price"
          label="Price"
          type="number"
          value={newProduct.price}
          onChange={handleInputChange}
          required
        />
        <TextField style={{padding: '10px'}}
          name="description"
          label="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          required
        />
        <TextField style={{padding: '10px'}}
          name="category"
          label="Category"
          value={newProduct.category}
          onChange={handleInputChange}
          required
        />
        <TextField style={{padding: '10px'}}
          name="image"
          label="Image URL"
          value={newProduct.image}
          onChange={handleInputChange}
          required
        />
        <Button style={{padding: '10px', margin:'15px', backgroundColor:"#d84c6f"}} type="submit" variant="contained" color="primary">Add Product</Button>
      </form>

      {/* Products Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {console.log(products)} */}
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.image}</TableCell>
                <TableCell>
                  <Button  onClick={() => handleEdit(product)}  style={{padding: '8px', margin:'5px'}} variant="contained" color="primary"><EditIcon/> Edit</Button>
                  <Button  onClick={() => handleDelete(product._id)}   style={{padding: '8px', margin:'5px'}} variant="contained" color="secondary"><DeleteIcon/> Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ManageProducts;
