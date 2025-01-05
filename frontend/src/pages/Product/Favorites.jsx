import { useSelector } from "react-redux"
import { selectFavoriteProduct } from '../../redux/features/Favorite/FavoriteSlice.js'
import Product from "./Product"

const Favorites = () => {

    const favorites = useSelector(selectFavoriteProduct) 
   console.log(favorites)
  return (
    <div className='ml-[7rem]'>
        <h1 className="text-[2rem] font-bold ml-[3rem] mt-[2rem] text-white">
            FAVORITE <span className="text-pink-500">PRODUCTS</span>
        </h1>
        <div className="flex flex-wrap">
            {favorites && favorites.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}

export default Favorites