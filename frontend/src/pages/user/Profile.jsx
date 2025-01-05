import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation, userApiSlice } from "../../redux/api/userApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username), setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const dispatch = useDispatch();

  const submitHandler = async (e) =>{
      e.preventDefault();

      if(password !== confirmPassword){
        toast.error("Password does not match!")
      }
      else{
        try {
          const res = await updateProfile(
            {
            _id : userInfo._id ,
             username ,
             email ,
             password 
            }).unwrap();
            dispatch(setCredentials({...res}));
            toast.success("Profile updated successfully!")
        } catch (error) {
          toast.error(error?.data?.message || error.error)
        }
      }
  }

  return (
    <div className="container mx-auto p-4 bg-black h-[100vh]">
      <div className="flex justify-center align-center md:flex md:space-x-4 mt-[5rem]">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            Update Profile
          </h2>

          <form onSubmit={submitHandler}>
            <div className="mb-2">
              <label className="block text-white mb-2">Name </label>
              <input
                type="text"
                className="form-input px-4 py-1 rounded-sm w-full"
                placeholder="Enter name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="form-input px-4 py-1 rounded-sm w-full"
                value={email}
                placeholder="enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-white mb-2">Password </label>
              <input
                type="password"
                className="form-input px-4 py-1 rounded-sm w-full"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label className="block text-white mb-2">Confirm Password </label>
              <input
                type="password"
                className="form-input px-4 py-1 rounded-sm w-full"
                placeholder="enter password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

          <div className="flex justify-between">
          <button
              disabled={loadingUpdateProfile}
              type="submit"
              className="text-white mb-2 bg-pink-600 hover:bg-pink-700 rounded-lg mt-2 px-4 py-1"
            >
              {loadingUpdateProfile ? "Updating..." : "Update Profile"}
            </button>

            <Link to="user-order"
            className="bg-pink-600 mb-2 text-white mt-2 rounded-lg px-4 py-1 hover:bg-pink-700">My Orders</Link>
          </div>
          {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
