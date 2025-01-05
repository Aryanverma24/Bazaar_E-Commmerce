import { useGetTopProductsQuery } from "../redux/api/productApiSlice"
import Loader from "./Loader";
import SmallProduct from "../pages/Product/SmallProduct";
import ProductCarousel from "../pages/Product/ProductCarousel";

const Header = () => {
    const {data , isLoading , error} = useGetTopProductsQuery();
    console.log(data);

    if(isLoading){
        return <Loader />
    }
    if(error){
        return <h1>Error</h1>
    }

  return (
    <>
        <div className="flex justify-evenly">
            <div className="xl:block sm:hidden md:hidden lg:hidden">
                <div className="grid grid-cols-3">
                    {data.map((product)=>(
                        <div key={product._id}>
                            <SmallProduct product={product} />
                        </div>
                    ))}
                </div>
            </div>
            <ProductCarousel />
        </div>
    </>
  )
}

export default Header