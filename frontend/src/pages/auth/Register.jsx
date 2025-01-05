import { useState,useEffect } from "react"
import {Link , useLocation,useNavigate} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import Loader from "../../components/Loader"
import {toast} from 'react-toastify'
import {setCredentials} from '../../redux/features/auth/authSlice'
import {useRegisterMutation} from "../../redux/api/userApiSlice"

const Register = () => {

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const dispatch = useDispatch();
    const navigate =useNavigate();

    const [register, {isLoading}] = useRegisterMutation();
    const {userInfo} = useSelector(state => state.auth);

    const {search} =useLocation()
    const sp =  new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/" 

    useEffect(()=>{
      if(userInfo){
        navigate(redirect)
      }
    },[userInfo,redirect,navigate])

    const submitHandler = async(e) => {
      e.preventDefault();
        if(password !== confirmPassword){
          toast.error("Password does not match!")
        }
        else{
          try {
            const res = await register({username,email,password}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
            toast.success("User successfully registerd");
          } catch (error) {
            console.log(error)
            toast.error(error.data.message)
          }
        }
    }

   return (
    <section className="pl-[10rem] flex flex-wrap bg-black h-[100vh]">
      <div className="mr-[4rem] mt-[3rem]">
          <h1 className="text-xl font-semibold mb-4 text-white">Register</h1>

          <form onSubmit={submitHandler} className="container w-[30rem]">
          <div className="my-[1rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white "
            >
              Name 
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter name..."
              required 
             value={username}
             onChange={(e) => setUsername(e.target.value)}
            />
            </div>
            <div className="my-[1rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white "
            >
              Email 
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter email..."
             value={email}
             onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className="my-[1rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white "
            >
              Password 
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter Password.."
             value={password}
             onChange={(e) => setPassword(e.target.value)}
            />
           </div>

          <div className="my-[1rem]">       
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-white"
            >
              Confirm Password 
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              className="mt-1 p-2 border rounded w-full"
              placeholder="Enter password again.."
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
            />
           </div>
            <button disabled={isLoading} type="submit" 
            className="text-white bg-pink-500 rounded cursor-pointer px-2 py-1">
             {isLoading ? "Registering" : "Register"}
            </button>

            {isLoading && <Loader /> }
          </form>

          <div className="mt-2">
            <p className="text-white">
                Already have an account? {" "} 
              <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
            </p>
          </div>
      </div>
      <div className="flex items-center">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-sign-up-4489360-3723267.png"
          alt=""
          className="h-[24rem] w-[28rem] xl:block md:hidden sm:hidden rounded-xl"
        />
        </div>
    </section>
  )
}

export default Register;