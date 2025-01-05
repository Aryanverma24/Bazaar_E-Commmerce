import React from 'react'
import {Link,useParams} from "react-router-dom"
import { useGetProductQuery } from './redux/api/productApiSlice'
import  Loader from "./components/Loader"
import Header from './components/Header'
import Message from './components/Message'
import Product from './pages/Product/Product'

const Home = () => {

    const {keyword} = useParams();
    const {data , isLoading , isError} = useGetProductQuery({keyword});
  return (
    <>
    {!keyword ? <Header /> : null}

    {isLoading ? <Loader /> : isError ? (
      <Message variants='danger'>
        {isError?.data?.Message || isError.Message }
      </Message>
    ) : (
    <>
      <div className='flex justify-between items-center '>
        <h1 className="ml-[20rem] mt-[2rem] text-[3rem] text-white">
          Special Product
        </h1>
        <Link to='/shop' 
        className='bg-pink-600 mr-[25rem] text-[1.5rem] font-semibold text-white rounded-full px-5 py-2 mt-[2rem]' >
        Shop
        </Link>
      </div>
      <div>
        <div className="grid grid-cols-3  ml-[7rem] mt-[1rem]">
          {data.products.map((product)=> (
            <div key={product._id}>
                <Product product={product} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='text-white text-3xl text-center m-[2rem]'>Laptops</h2>
          <div className='grid grid-cols-3 ml-[6rem]'>
           
          </div>
      </div>
    </>
    )}
    </>
  )
}

export default Home