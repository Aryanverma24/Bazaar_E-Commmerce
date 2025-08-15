import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaRegArrowAltCircleLeft,
  FaShoppingCart,
  FaClock,
  FaStore,
  FaStar,
} from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";
import Rating from "./Rating";
import ProductTab from "./ProductTab";

import { addToCart } from "../../redux/features/Cart/CartSlice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

    const submitHandler =async(e)=> {
      e.preventDefault();
      console.log('btn clicked')
      try {
        await createReview({
          productId,rating,comment
        }).unwrap();
        refetch();
        toast.success('Review created Successfully!')
        setRating(0)
        setComment("")
      } catch (error) {
        const errorMessage = error?.data?.message || error.message;
        console.log(errorMessage)
        if (errorMessage === "Product is already reviewed!") {
          toast.error("You have already reviewed this product.");
        } else {
          toast.error(errorMessage);
        }
      }
    }

    const AddToCartHandler = () => {
      dispatch(addToCart({...product,qty}))
      navigate('/cart')
    }

  return (
    <>
      <div className="ml-[6rem] flex justify-start gap-x-[40%] font-semibold pt-3 text-pink-500">
        <Link to="/">
          <FaRegArrowAltCircleLeft className="text-2xl  hover:text-pink-700" />
        </Link>
        <h2 className="text-3xl  text-white">
          Product <span className="text-pink-500">Details</span>
        </h2>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variants="danger">
          {" "}
          error?.data?.message || error.message
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative mt-[2rem] ml-[8rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-[20rem] rounded-xl"
              />
            </div>

            <div className="ml-[3rem] flex flex-col justify-between">
              <h2 className="font-semibold  text-white">{product.name}</h2>
              <p className="xl:w-[45rem]  text-[#B0B0B0]">
                {product.description.substring(0,480)}...
              </p>
              <p className="text-4xl font-extrabold my-4 font-serif text-pink-500">
                &#8377;{product.price}
              </p>
              <div className="flex">
                <div className="flex flex-col justify-between w-[20rem]">
                  <div className="one">
                    <h1 className="text-white flex  mb-6">
                      <FaStore className="text-white  mt-1 mr-2" /> Brand : {"  "}{" "}
                      {product.brand}
                    </h1>
                  </div>
                  <div className="one">
                    <h1 className="text-white flex  mb-6">
                      <FaClock className="text-white mt-1 mr-4" /> Created At :{" "}
                      {"  "} {moment(product.createdAt).fromNow()}
                    </h1>
                  </div>
                  <div className="one">
                    <h1 className="text-white flex  mb-6">
                      <FaStar className="text-white mt-1 mr-2" /> No. of Reviews :{" "}
                      {"  "} {product.numReviews}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-col justify-between w-[20rem]">
                  <div className="two">
                    <h1 className="text-white flex  mb-6">
                      <FaStar className="text-white mt-1 mr-2" /> Rating : {"  "}{" "}
                      {product.rating}
                    </h1>
                  </div>
                  <div className="two">
                    <h1 className="text-white flex  mb-6">
                      <FaShoppingCart className="text-white mt-1 mr-4" /> Quantity :{" "}
                      {"  "} {[product.quantity]}
                    </h1>
                  </div>
                  <div className="two">
                    <h1 className="text-white flex  mb-6">
                      <FaBox className="text-white  mt-1 mr-2" /> Count in Stock :{" "}
                      {"  "} {product.countInStock}
                    </h1>
                  </div>
                </div>
              </div>




            {/* rating........ */}
              <div className="flex flex-wrap justify-between">
                <Rating 
                    value={product.rating} 
                    text={`${product.numReviews} reviews`}
                 />
                {product.countInStock > 0 && 
                <div >
                  <select 
                    value={qty}
                    onChange={(e)=> setQty(e.target.value)}
                    className="rounded-xl text-black p-2 w-[5rem]"
                    >
                      {[...Array(product.countInStock).keys()].map((x)=>(
                        <option key={x+1} value={x+1}>
                          {x+1}
                        </option>
                      ))}
                  </select>
                </div>
                }
              </div>

                <div className="btn-container">
                  <button
                  onClick={AddToCartHandler}
                  disabled={product.countInStock===0}
                  className="bg-pink-600 text-white py-2 px-4 mt-6 md:mt-0 rounded-lg"
                  >
                    Add To Cart
                  </button>
                </div>
            </div>
            <div className="flex flex-wrap justify-between items-start mt-[4rem] ml-[5rem]">
                  {/* products tabs */}
                  <ProductTab 
                    product={product}
                    loadingProductReview={loadingProductReview}
                    userInfo={userInfo}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    submitHandler={submitHandler}
                  />
                </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
