import { createSlice } from "@reduxjs/toolkit"
import { updateCart } from "../../../Utils/Cart";

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
            return updateCart(state,item);
        } ,
        removeFromCart : (state,action)  => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload)
            return updateCart(state)
        },

        saveShipppingAddress : (state,action) => {
            state.shippingAddress = action.payload;
            localStorage.setItem('cart',JSON.stringify(state));
        },
        savePaymentMethod : (state,action) => {
            state.paymentMethod = action.payload;
            localStorage.setItem('cart',JSON.stringify(state));
        },
        clearCartItems : (state,action) => {
            state.cartItems =[];
            localStorage.setItem('cart',JSON.stringify(state));
        },
        reserCart : state => (state = initialState),

    }
})

export const {
    addToCart,
    removeFromCart,
    saveShipppingAddress,
    savePaymentMethod,
    clearCartItems,
    reserCart
} = cartSlice.actions

export default cartSlice.reducer;