import { Link } from "react-router-dom"
import HeartIcon from './HeartIcon'

const SmallProduct = ({product}) => {
  return (
    <div className="w-[15rem] mt-[1rem] ml-[3rem] p-2 text-white hover:text-pink-200">
        <div className="relative  w-9/12">
            <img 
                src={product.image} 
                alt={product.name} 
                className="h-auto rounded w-[12rem]" />
               <HeartIcon product={product} />

            <div className=" mt-[1rem] w-[10rem]">
                <Link to={`/product/${product._id}`}>
                     <h2 className="flex justify-between text-sm font-medium items-center">
                     <div >{product.name.substring(0, 18)}{product.name.length > 18 ? '...' : ''}</div>
                    <span className=" text-pink-800 bg-pink-100 text-sm font-medium mr-1 px-1 py-0.6 rounded-xl dark:text-pink-300 dark:bg-pink-900">&#8377; {product.price}</span>
                    </h2>
                 </Link>
                </div>
        </div>
    </div>
  )
}

export default SmallProduct