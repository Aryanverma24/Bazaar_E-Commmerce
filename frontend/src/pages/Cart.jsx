import { Link, useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"
import { addToCart,removeFromCart } from "../redux/features/Cart/CartSlice"
import { FaTrash } from 'react-icons/fa'

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart;
    console.log(cartItems)

    const addToCartHandler = (product,qty) => {
        dispatch(addToCart({...product,qty}))
    }

    const removeFromCartHandler = (productID) => {
        dispatch(removeFromCart(productID));
    }

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping')
    }

  return (
    <>
        <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
            {cartItems.length === 0 ? (
                <>
                    <div className="text-white text-lg">Your Cart is empty <Link to='/shop' className="text-pink-500">Go to Shop</Link></div>
                </>
            ) : (
                <>
                    <div className="flex flex-col w-[80%]">
                        <h1 className="text-2xl font-semibold mb-[2rem] text-pink-500 text-center">Shopping Cart</h1>

                        {cartItems.map((item) => (
                           <>
                           <div className="flex gap-5" key={item._id}>
                            <Link to={`/product/${item._id}`} className="w-[95%]">
                                <div className="hover:bg-stone-800 mb-[1rem] p-4 hover:rounded-xl">
                            <div key={item._id} className="flex flex-center">
                            <div className="w-[8rem] h-[8rem]">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg"/>
                            </div>
                            <div className="text-white ml-8 font-mono">
                                <p className="text-xl">{item.name.substring(0,50)}....</p>
                                <p className="text-pink-500">{item.brand}</p>
                                <p >&#8377; {item.price}</p>
                            </div>
                            </div> 
                                </div>
                            </Link>
                             <div className="w-24 ">
                                <select 
                                className="p-1 border rounded text-black w-full"
                                value={item.qty}
                                onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                >
                                    {[...Array(item.countInStock).keys()].map((x) => (
                                        <option key={x+1} value={x+1}>
                                            {x+1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <button className="text-red-500 mr-[5rem]" onClick={() => removeFromCartHandler(item._id) } >
                                    <FaTrash className="ml-[1rem]" />
                                </button>
                            </div>
                           </div>
                           </>
                        ))} 
                            <div className="mt-8 w-[40rem] ml-[2rem]">
                                <div className="p-4 rounded-xl">
                                    <h2 className="text-xl text-white font-semibold ">
                                        Items ({cartItems.reduce((acc,item) => acc + Number(item.qty)  , 0)}) </h2>

                                        <h3 className="text-lg mt-1 font-semibold text-pink-500">
                                            &#8377; {cartItems.reduce((acc,item)=> acc + Number(item.qty ) * Number(item.price) , 0 ).toFixed(1)}
                                        </h3>
                                </div>
                            </div>
                                <div className="flex justify-center ">
                                <button className="text-white bg-pink-500 rounded-full w-[50%] text-lg px-2 py-1 mt-2"
                                disabled={cartItems.length===0}
                                onClick={checkoutHandler}
                                >
                                    Proceed to Checkout
                                </button>
                                </div>
                            
                    </div>
                </>
            ) }
        </div>
    </>
  )
}

export default Cart