import { createSlice } from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],

    },
    reducers:{
        addToCart:(state,action)=>{
             const itemPresent = state.cart.find((item)=>item._id === action.payload._id);
             // check if item is already present in the cart
            if(itemPresent){
                itemPresent.quantity++
            }
            else{
                state.cart.push({...action.payload,quantity:1})
            }
        },
        removeFromCart:(state,action)=>{
            const removeItem = state.cart.filter((item)=>item._id !== action.payload._id);
            state.cart= removeItem
        },
        incrementQuantity:(state,action)=>{
            const itemPresent=state.cart.find((item)=>item._id===action.payload._id)
            itemPresent.quantity++;
        },
        decrementQuantity:(state,action)=>{
            const itemPresent=state.cart.find((item)=>item._id===action.payload._id);
            if(itemPresent.quantity===1){
                const removeItem = state.cart.filter((item)=>item._id !== action.payload._id);
                state.cart= removeItem
            }
            else{
                itemPresent.quantity--;
            }
        },
        cleanCart:(state)=>{
            state.cart=[];
        }
    }
});
export const{addToCart,removeFromCart,incrementQuantity,decrementQuantity,cleanCart} = cartSlice.actions;
export default cartSlice.reducer;