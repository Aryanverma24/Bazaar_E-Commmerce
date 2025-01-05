import { useState } from "react"
import { Link } from "react-router-dom"
import Rating from "./Rating"
import Loader from "../../components/Loader"
import { useGetTopProductsQuery} from '../../redux/api/productApiSlice'
import SmallProduct from "./SmallProduct"

const ProductTab = ({product, loadingProductReview,userInfo,rating,setRating,comment,setComment,submitHandler}) => {

    const {data,isLoading} = useGetTopProductsQuery()
    const [active,setActive] = useState(1)

    if(isLoading) {
        return <Loader />;
    }

    const handleTabClick =(tabIndex)=>{
        setActive(tabIndex)
    }

  return (
    <div className="text-white flex flex-col md:flex-row">
        <section className='mr-[5rem]'>
            <div className={`flex-1 p-4 cursor-pointer text-lg ${active===1 ? "font-bold" : ""}`}
            onClick={()=>handleTabClick(1)}>
                Write Your Review...
            </div>

            <div className={`flex-1 p-4 cursor-pointer text-lg ${active===2 ? "font-bold" : ""}`}
            onClick={()=>handleTabClick(2)}>
                All Reviews
            </div>

            <div className={`flex-1 p-4 cursor-pointer text-lg ${active===3 ? "font-bold" : ""}`}
            onClick={()=>handleTabClick(3)}>
                Related Products
            </div>
        </section>

        <section>
            {active===1 &&
            <div className="mt-4">
                {userInfo ?
                <form 
                onSubmit={submitHandler}
                >
                    <div className="my-2">
                        <label htmlFor="rating" className="block mb-2 text-lg">Rating</label>
                        <select 
                            id="rating"
                            required
                            value={rating}
                            onChange={(e)=> setRating(e.target.value)}
                            className=" p-2 border rounded-lg xl:w-[30rem] text-black"
                        >
                              <option value="" >Select</option>
                              <option value="1">Inferior</option>
                              <option value="2">Decent</option>
                              <option value="3">Great</option>
                              <option value="4">Excellent</option>
                              <option value="5">Exceptional</option>
                        </select>
                    </div>
                    <div className="my-2">
                        <label htmlFor="comment" className="block text-xl mb-2"> Write Comment</label>
                        <textarea id="comment" rows='3' cols='5'  required value={comment} onChange={(e)=> setComment(e.target.value)} 
                        className="border  rounded-sm w-full py-4 px-3 pb-5" placeholder="write your review here....."></textarea>
                    </div>

                    <button type="submit"
                    disabled={loadingProductReview}
                    className="px-4 py-2 rounded-lg text-white bg-pink-600">Submit</button>
                </form> :
                <p>Please <Link to='/login'>Sign up</Link> to write a review</p>
                }
            </div>
            }
        </section>

        <section>
            {active===2 && (
                <>
                    <div>{product.reviews.length===0 && <p>No Reviews</p>}</div>

                    <div >
                        {product.reviews.map((review) => (
                            <div key={review._id}
                            className="bg-[#1a1a1a] p-4 rounded-lg ml-[2rem] xl:ml-[3rem] sm:ml-[0rem] sm:w-[15rem] mb-5">
                                <div className="flex justify-between mb-2">
                                <strong className="text-[#b0b0b0]">{review.name.substring(0,1).toUpperCase()}{review.name.substring(1)}</strong>
                                <p className="text-[#b0b0b0]">{review.createdAt.substring(0,10)}</p>
                                </div>
                                <p className="text-white">{review.comment}</p>
                                <Rating value={review.rating} />
                            </div>
                        ) )}
                    </div>
                </>
            )}
        </section>

        <section>
          {active === 3 && (
                <section className="flex flex-wrap gap-4">
                  {!data ? (
                      <Loader />
                    ) : (
                      data.map((product) => (
                   <div
                           key={product._id}
                          className="flex-[1_1_calc(33.33%-1rem)] max-w-[33.33%] sm:flex-[1_1_calc(50%-1rem)] sm:max-w-[50%] md:flex-[1_1_calc(25%-1rem)] md:max-w-[25%]"
                          >
                          <SmallProduct product={product} />
                        </div>
                   ))
                 )}
                    </section>
            )}
        </section>
    </div>
  )
}

export default ProductTab