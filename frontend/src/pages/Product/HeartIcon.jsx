import { useEffect } from 'react'
import {FaHeart , FaRegHeart} from 'react-icons/fa'
import {useSelector,useDispatch} from 'react-redux'
import {
      addToFavorites,
      removeFromFovorites,
      setFavorites
    } from '../../redux/features/Favorite/FavoriteSlice' 

import {
  addFavoritesToLocalStorage,
  removeFavoritesFromLocalStorage,
  getFavoritesFromLocalStorage
} from '../../Utils/LocalStorage'


const HeartIcon = ({product}) => {

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id )

  useEffect(()=>{
    const favoriteFromLocal = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoriteFromLocal));
  },[])

  const toggleFavorites = () => {
    if(isFavorite) {
      dispatch(removeFromFovorites(product))
      removeFavoritesFromLocalStorage(product._id);
    }else{
      dispatch(addToFavorites(product));
      addFavoritesToLocalStorage(product);
    }
  }

  return (
    <div onClick={toggleFavorites} className='absolute top-2 right-5 cursor-pointer ' >
      { isFavorite ? (<FaHeart  className='text-pink-500' />) : 
      (<FaRegHeart className='text-black' /> )} 
    </div>
  )
}

export default HeartIcon