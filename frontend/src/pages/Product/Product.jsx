import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'


const Product = ({product}) => {
  return (
    <div className='text-white w-[15rem] ml-[2rem] mt-[2rem] p-2 relative'>
        <div className="relative">
            <img src={product.image} alt={product.name}
            className='rounded-xl w-[15rem] h-[15rem]' />
            <HeartIcon product={product} />
        </div>

        <div className="p-2">
            <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center ">
                <div className="text-md w-[8rem]">
                    {product.name.substring(0,18)}{product.name.length>18 ? "..." : "" }
                </div>
                <span className="text-pink-100 bg-pink-800 rounded-xl text-sm font-medium px-2.5 py-0.5 dark:text-pink-300 dark:bg-pink-900">&#8377; {product.price}</span>
            </h2>
            </Link>
        </div>
    </div>
  )
}

export default Product