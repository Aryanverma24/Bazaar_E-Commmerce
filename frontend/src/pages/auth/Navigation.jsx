import "./Navigation.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate , useLocation } from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { FaStore } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import {useDispatch,useSelector} from "react-redux"
import {useLogoutMutation} from "../../redux/api/userApiSlice.js"
import {logout} from '../../redux/features/auth/authSlice.js'
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import FavoriteCount from "../Product/FavoriteCount.jsx";
import { FaProductHunt } from "react-icons/fa";

const Navigation = () => {

     const {userInfo} = useSelector(state=>state.auth)
    const {cartItems} = useSelector(state => state.cart);

     const dispatch = useDispatch();
     const navigate = useNavigate();
     
     const [logoutApiCall] = useLogoutMutation()

    const [sidebar,setSidebar] = useState(false);
    const [dropdown,setDropdown] = useState(false);

    function onHover() {
      setSidebar(true)
    }

    function onmouseLeave(){
      setSidebar(false)
    }

    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }

    const logoutHandler = async () => {
     try {
          await logoutApiCall().unwrap();
          dispatch(logout());
          navigate("/login");

     } catch (error) {
          console.error(error);
     }
    }

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
  return (
    <>
       <div className={`${sidebar ? "hidden" : "flex"}  z-40 xl:flex lg:flex md:hidden sm:hidden justify-between flex-col bg-black text-white flex h-[100vh] p-4 fixed w-[4%] hover:w-[15%]`
       }
       id="nav-container"
       onMouseOver={onHover} onMouseLeave={onmouseLeave}
       >
            <div className="flex flex-col justify-center space-y-2"
            id="nav-item-name">
                    <Link to="/"
                  className={`flex items-center ${isActive("/") ? "text-pink-500" : ""}`}>
                         <FaHome className="mr-2 mt-[3rem] icon"/>
                         <span className="hidden nav-item">HOME</span> {" "}
                    </Link>
                    <Link to="/shop"
                   className={`flex items-center ${isActive("/shop") ? "text-pink-500" : ""}`}>
                         <FaStore  className="mr-2 mt-[3rem] icon"/>
                         <span className="hidden nav-item">SHOP</span> {" "}
                    </Link>
                    <Link to="/cart" 
                  className={`flex items-center ${isActive("/cart") ? "text-pink-500" : ""} relative`}>
                         <FaCartArrowDown className="mr-2 mt-[3rem] icon"/>
                         <span className="hidden nav-item">CART</span> {" "}
                         <div className={`absolute top-8 ${sidebar ? "right-[4.5rem] top-12" : "-right-2"}`}>
                            {cartItems.length > 0 && (
                              <span>
                                <span className="text-white bg-pink-500 rounded-full px-1 py-0 text-sm">
                                  {cartItems.reduce((acc,item) => acc + Number(item.qty),0)}
                                </span>
                              </span>
                            )}
                         </div>
                    </Link>
                    <Link to="/favourite"
                    className={`flex items-center ${isActive("/favourite") ? "text-pink-500" : ""}`}>
                         <FaHeart className="mr-2 mt-[3rem] icon"/>
                         <span className="hidden nav-item">WISHLIST</span> {" "}
                         <FavoriteCount sidebar={sidebar}/>
                    </Link>
                    <Link to="/admin/allproductlist"
                    className={`flex items-center ${isActive("/admin/allproductlist") ? "text-pink-500" : ""}`}>
                         <FaProductHunt  className="mr-2 mt-[3rem] icon"/>
                         <span className="hidden nav-item">Products</span> {" "}
                       
                    </Link>
            </div>

            <div className="relative">
                    <button   onClick={toggleDropdown}
                    className="flex items-center text-gray-800 focus:outline-none">
                         {userInfo ? <span className="text-white">{userInfo.username}</span> : <></>}
                        {userInfo ? <IoIosArrowDown className="text-white ml-2"/> : " "}
                    </button>

          {dropdown && userInfo && (
          <ul
            className={`absolute right-0 mt-2 mr-14 space-y-2 bg-white text-gray-600 ${
              !userInfo.isAdmin ? "-top-20" : "-top-80"
            } `}
          >
            {userInfo.isAdmin && (
              <>
                <li>
                  <Link
                    to="/admin/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/productlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/categorylist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/orderlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/userlist"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Users
                  </Link>
                </li>
              </>
            )}

            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={logoutHandler}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
          {!userInfo && (
                  <ul >
                  <li className="mb-2">
                  <Link to="/login"
                      className="flex items-center transition-transform hover:translate-x-3">
                           <IoMdLogIn className="mr-2 mt-[1rem] bottom-icon"/>
                           <span className="hidden nav-item-bottom">Login</span> {" "}
                      </Link>
                  </li>
                  <li className="mb-2">
                  <Link to="/register"
                      className="flex items-center transition-transform hover:translate-x-3">
                           <FaUserCircle className="mr-2 mt-[1rem] bottom-icon"/>
                           <span className="hidden nav-item-bottom">Registration</span> {" "}
                      </Link>
                  </li>
              </ul>
          )} 
       </div>
    </>
  )
}

export default Navigation