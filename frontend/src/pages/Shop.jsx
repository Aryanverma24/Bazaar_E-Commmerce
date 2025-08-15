import { useEffect,useState } from "react"
import { useDispatch,useSelector } from "react-redux"
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice"
import {setCategories,setChecked,setProducts} from "../redux/features/shop/ShopSlice"
import Loader from "../components/Loader"
import { useFetchCategoriesQuery } from "../redux/api/CategoryApiSlice"
import ProductCard from "./Product/ProductCard"

const Shop = () => {

    const dispatch = useDispatch();
    const { categories,products,radio,checked } = useSelector(state => state.shop)
    const categoriesQuery = useFetchCategoriesQuery();

    const [priceFilter,setPriceFilter] = useState('')

    const filterProductsQuery = useGetFilteredProductsQuery({
        radio,checked
    })

    useEffect(()=>{
        if(!categoriesQuery.isLoading){
            dispatch(setCategories(categoriesQuery.data))
        }
    },[categoriesQuery.data,dispatch])
useEffect(() => {
    if (!checked.length || !radio.length) {
        if (!filterProductsQuery.isLoading && filterProductsQuery.data) { // ✅ added check
            const filterProducts = filterProductsQuery.data.filter((product) => {
                return (
                    product.price.toString().includes(priceFilter) ||
                    product.price === parseInt(priceFilter, 10)
                );
            });
            dispatch(setProducts(filterProducts));
        }
    }
}, [
    checked.length,
    radio.length,
    priceFilter,
    filterProductsQuery.data, // ✅ only re-run when data changes
    filterProductsQuery.isLoading,
    dispatch
]);

    const handleBrandClick = (brand) => {
        const productsByBrand = filterProductsQuery.data?.filter((product) => product.brand === brand)
        dispatch(setProducts(productsByBrand));
    }

    const handleCheck = (value,id) => {
        const updatedChecked = value ? [...checked,id] : checked.filter((c) => c !== id)
        dispatch(setChecked(updatedChecked));
    }

    const uniqueBrands = [
        ...Array.from(
            new Set(filterProductsQuery.data?.map((x) => x.brand).filter((brand) => brand !== undefined))
        )
    ]

    const handlePriceFilter = e => {
        setPriceFilter(e.target.value)
    }

    if (categoriesQuery.isLoading || filterProductsQuery.isLoading) {
   return <Loader />;
}
  return (
    <>
        <div className="container mx-auto text-white">
            <div className="flex md:flex-row ml-[2rem]">
                <div className="bg-[#151515] p-3 mt-2 mb-2 ">
                    <h2 className="h4 bg-black text-center py-2 rounded-full mb-2 w-44">
                        Filter By Categories
                    </h2>

                    <div className="p-5 w-[15rem]">
                        {categories?.map((c) => (
                            <div key={c._id} className="mb-4 flex items-center">
                                <div className="mr-2">
                                <input type="checkbox"
                                id="red-checkbox" 
                                onChange={(e) => handleCheck(e.target.checked,c._id)}
                                className="h-4 w-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600  dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                </div>
                                <label htmlFor="pink-checkbox"
                                    className="ml-2 text-sm font-medium text-white dark:text-gray-300"
                                >
                                    {c.name.substring(0,1).toUpperCase()}{c.name.substring(1)}
                                </label>
                            </div>
                        ))}
                    </div>
                    <h2 className="h4 text-center py-2 rounded-full bg-black mb-2">Filter by Brands</h2>

                    <div className="p-5">
                        {uniqueBrands.map((brand) => (
                            <>
                                <div className="flex items-center mr-4 mb-5">
                                    <input type="radio" id={brand} name="brand" onChange={() => handleBrandClick(brand) } 
                                    className="text-pink-500 bg-gray-100 border-gray-300 focus:ring-pink-600 rounded-full dark:focus:ring-pink-600 focus:ring-2 transition-colors "/>
                                    <label htmlFor={brand} className="text-white ml-4">
                                        {brand}
                                    </label>
                                </div>
                            </>
                        ))}
                    </div>
                     <h2 className="h4 text-center py-2 rounded-full bg-black mb-2">Filter by Price</h2>
                     <div className="p-5 w-[15rem]">
                        <input type="text" placeholder="Enter Price" value={priceFilter} onChange={handlePriceFilter} className="rounded-xl bg-[#151212] text-pink-500 focus:ring-pink-600 focus:ring-2 "  />
                     </div>

                     <div className="p-5 pt-0">
                        <button className="w-full border rounded-full py-1 text-pink-500 border-pink-500 my-4 hover:bg-pink-600 hover:text-white " onClick={() => window.location.reload()}>Reset</button>
                     </div>
                </div>

                <div className="p-3 w-auto" >
                        <h2 className="h4 text-center mb-2" >{products?.length} Products</h2>
                        <div className="flex flex-wrap">
                            {products?.length === 0 ?
                            (
                                <>
                                <Loader />
                                </>
                            ) : (
                                <>
                                    {products?.map((product) => (
                                        <>
                                            <div className="p-3" key={product._id}>
                                                <ProductCard  product={product} />
                                            </div>
                                        </>
                                    ))}
                                </>
                            )}
                        </div>
                </div>

            </div>
        </div>
    </>
  )
}

export default Shop