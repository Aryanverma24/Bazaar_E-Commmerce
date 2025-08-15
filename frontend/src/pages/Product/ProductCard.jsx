import { toast } from "react-toastify"
import { useDispatch,useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addToCart } from "../../redux/features/Cart/CartSlice"
import { AiOutlineShoppingCart } from "react-icons/ai"
import HeartIcon from "./HeartIcon"
import { current } from "@reduxjs/toolkit"

const ProductCard = ({product}) => {

  const dispatch = useDispatch();

  console.log(product);

  return (
    <div className="max-w-sm relative rounded-lg bg-[#1A1A1A] dark:bg-gray-800 shadow dark:border-gray-700">
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-16 right-1 bg-pink-100 text-pink-800 rounded-full mr-2 px-2.5 py-0.5 font-medium text-sm dark:bg-pink-900 dark:text-pink-300">
            {product?.brand}
          </span>
          <img 
              src={product.image} alt={product.name} 
              className="w-full cursor-pointer rounded-2xl"  
              style={{height : "170px"  , objectFit : "cover"}}/>
        </Link>
              <HeartIcon product={product} />

        <div className="p-3">
          <div className="flex justify-between">
            <h5 className="mb-2 text-sm text-white dark:text-white">
              {product.name.substring(0,25)}...
            </h5>

            <p className="font-semibold text-pink-500 ml-1">
              {product?.price?.toLocaleString("en-IN",{
                style: "currency",
                currency: "INR"
              })}
            </p>

            <p className="mb-3 font-normal text-[#CFCFCF]">
              {product?.desciption?.substring(0,60)}...
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductCard