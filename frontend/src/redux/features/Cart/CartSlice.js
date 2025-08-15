import { createSlice } from "@reduxjs/toolkit"


const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : [], shippingAddress : {}, paymentMethod : 'PayPal'};


const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers : {
        addToCart : (state,action) => {
            const {user, numOfRating , rating , newOFReviews , reviews , ...item} = action.payload;
            const existingItems = state.cartItems.find((x) => x._id === item._id )

            if(existingItems){
                state.cartItems = state.cartItems.map((x) => x._id === existingItems._id ? item : x);
            }
            
            else{
                state.cartItems = [...state.cartItems,item];
            }
        } 
    }

})