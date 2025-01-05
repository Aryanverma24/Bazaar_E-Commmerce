import { useGetTopProductsQuery } from "../../redux/api/productApiSlice"
import Message from "../../components/Message"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import moment from "moment"
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore
} from "react-icons/fa"


const ProductCarousel = () => {
    const {data : products, isLoading , isError} = useGetTopProductsQuery();

    console.log(products)

    const settings = {
        dots : false,
        infinite : true,
        speed : 500,
        slidesToShow : 1,
        slidesToScroll : 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed : 3000
    }
  return (
   <div className=" mt-2 mb-3 mr-[1rem] px-4 xl:block lg:block md:block">
      { isLoading ? null : isError ? (
          <Message variants='danger'>
            {isError?.data?.message || isError.message}
          </Message>
      ) : <Slider {...settings}
        className="xl:w-[30rem] lg:w-[25rem] md:w-[20rem] sm:w-[15rem] sm:block" >

          {
          products.map(({image,_id,description,countInStock,brand,category,createdAt,name,price,numReviews,rating,quantity}) => (
            <div key={_id}>
              <img src={image} alt={name} className="w-full object-cover rounded-xl h-[20rem]"/>

              <div className="flex justify-between w-[15rem] text-white mt-2" >
                <div className="one">
                  <h2>{name}</h2>
                  <p className="hover:text-pink-500 mb-1">&#8377; {price}</p> <br />
                  <p className="w-[15rem] text-sm px-2 text-white mt-1">{description.substring(0,150)}...</p>
                </div>

                <div className="flex justify-between w-[18rem] border-l-2 border-gray-400 border-opacity-15">
                  <div className="one ml-3">
                  
                  <h1 className="flex items-center mb-3 w-[18rem]">
                      <FaStore className="mr-[1rem] text-white "/>Brand : {brand} 
                  </h1>

                  <h1 className="flex items-center mb-3 w-[180rem]">
                      <FaClock className="mr-[1rem] text-white "/>Added : {" "} {moment(createdAt).fromNow()}
                  </h1>

                  <h1 className="flex items-center mb-3 w-[18rem]">
                    <FaStar className="mr-[1rem] text-white "/>Reviews : {" "} {numReviews} 
                  </h1>

                  <h1 className="flex items-center mb-3 w-[18rem]">
                    <FaStar className="mr-[1rem] text-white "/>Rating : {" "} {Math.round(rating)} 
                  </h1>
                    
                  <h1 className="flex items-center mb-3 w-[18rem]">
                    <FaShoppingCart className="mr-[1rem] text-white "/>Quantity : {" "} {quantity} 
                  </h1>
                  
                  <h1 className="flex items-center mb-3 w-[18rem]">
                    <FaBox className="mr-[1rem] text-white "/>Stock : {" "} {countInStock} 
                  </h1>  
                  </div>
                </div>
              </div>
            </div>
          ) )
          }

        </Slider>}


   </div>
  )
}

export default ProductCarousel