
// adding items into favorites
export const addFavoritesToLocalStorage = (product) => {
    const favorites = getFavoritesFromLocalStorage();
    if(!favorites.some((p)=>p._id === product._id)){
        favorites.push(product)
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}

// remove from local Storage

export const removeFavoritesFromLocalStorage = (productId) => {
    const favorites = getFavoritesFromLocalStorage();
    const updateFavorites = favorites.filter((product)=> product._id !== productId);
    localStorage.setItem("favorites",JSON.stringify(updateFavorites));
}



// retrieve favorites from local storage
export const getFavoritesFromLocalStorage =() => {
    const favoritesJSON = localStorage.getItem('favorites') ;
    return favoritesJSON ? JSON.parse(favoritesJSON) : []   
}