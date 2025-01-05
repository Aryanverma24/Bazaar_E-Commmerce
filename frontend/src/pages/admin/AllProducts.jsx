import { useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice.js";
import AdminMenu from "./AdminMenu.jsx";
import Loader from "../../components/Loader.jsx";

const AllProducts = () => {

  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error while loading products!</div>;
  }

  return (
    <div className="container mx-[9rem] max-w-[88%] text-white">
      <div className="flex flex-col md:flex-row">
        <div className="p-3">
          <div className="ml-[2rem] text-3xl font-bold h-12">
            All <span className="text-pink-600">Products</span> ({products.length})
          </div>
          <div className="flex flex-wrap gap-12 ml-[4rem] p-[2rem]">
            {products?.map((product) => (
              <Link
                key={product._id}
                to={`/admin/product/update/${product._id}`}
                className="block mb-2 overflow-hidden"
              >
                
                

                <div className="flex justify-center ml-[1rem] w-[70%]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[10rem] object-cover rounded-lg hover:scale-110 mb-2"
                  />
                </div>

                <div className=" flex pr-[2rem] flex-col ">
                  <div className="px-2  flex justify-between">
                    <h5 className="text-xl font-semibold mb-2">
                      {product?.name?.substring(0,20)}...{""}
                    </h5>
                    <p className="p-2 text-gray-200 text-sm font-light">
                      {moment(product.createAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                  <p className="text-gray-400 xl:w-[20rem] md:w-[15rem] sm:w-[10rem] text-sm">
                    {product?.description?.substring(0, 160)}...{" "}
                  </p>

                  <div className="flex justify-between mt-[1rem]">
                    <Link
                      to={`/admin/product/update/${product._id}`}
                      className="inline-flex  items-center px-2  py-1.5 text-sm font-medium text-center text-white bg-pink-700 hover:bg-pink-800 rounded-lg focus:ring-4
                        focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700
                        dark:focus:ring-pink-700"
                    >
                      Update Product
                      <svg
                        className="w-3.5 h-3.5 ml-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                    <p>&#8377;{product?.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="md:w-1/8 p-3 mt-2">
        <AdminMenu />
        </div>
       
      </div>
    </div>
  );
};
export default AllProducts;
