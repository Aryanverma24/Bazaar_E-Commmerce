import { createSlice } from "@reduxjs/toolkit";

const fovoriteSlice = createSlice({
    name : 'fovorites',
    initialState : [],
    reducers : {
        addToFavorites : (state,action) => {
            if(!state.some((product) => product._id === action.payload._id)){
                state.push(action.payload);
            }
        },
        removeFromFovorites : (state,action) => {
            return state.filter((product) =>  product._id !== action.payload._id)
        },
        setFavorites : (state,action) => {
            return action.payload;
        }
    }
})

export const {addToFavorites,removeFromFovorites,setFavorites} = fovoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default fovoriteSlice.reducer;
