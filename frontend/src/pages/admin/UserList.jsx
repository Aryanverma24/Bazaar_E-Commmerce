import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { LuTrash2 } from "react-icons/lu";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/userApiSlice.js";
import Message from "../../components/Message.jsx";
import AdminMenu from "./AdminMenu.jsx";


const UserList = () => {
  const { data: user, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updatreUser] = useUpdateUserMutation();

  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editUserEmail, setEditUserEmail] = useState("");
  
  useEffect(()=>{
      refetch();
  },[refetch])

  const deleteHandler = async (id , user_name) => {
    if(window.confirm(`Are you sure to delete ${user_name}`))
       try {
        await deleteUser(id);
        refetch();
        toast.success(`${user_name} removed`)
       } catch (error) {
            toast.error(error.data.message || error.error)
       }
  }

    const toggleEdit = (id,username,email) => {
        
        setEditUserId(id);
        setEditUsername(username);
        setEditUserEmail(email);
    }

    const updateHandler = async (id)=> {
        try {
            await updatreUser( {
                userId : id,
                username : editUsername,
                email : editUserEmail,
            })
            setEditUserId(null);
            refetch();

        } catch (error) {
            toast.error(error.data.message || error.error)
        }
    }
  return (
    <div className="p-4 bg-black h-[100vh]">
      <AdminMenu />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variants={"danger"}>{error?.data.message || " "}</Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto text-white text-center">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Admin</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td>
                    { editUserId === user._id ? (
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={editUsername}
                          onChange={(e) => setEditUsername(e.target.value)}
                          className="px-2 py-1 border-rounded-lg text-black font-semibold"
                        />
                  <button
                          onClick={() => updateHandler(user._id)}
                          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
                        >
                        <CiEdit />
                     </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        {user.username}{" "}
                        <button onClick={()=>toggleEdit(user._id,user.username,user.email,)}>
                            <CiEdit className="ml-[1rem]"/>
                        </button>
                      </div>
                    )}
                  </td>

                  <td>
                    
                    {editUserId === user._id ? (
                      <div className="flex">
                        <input
                          type="text"
                          value={editUserEmail}
                          onChange={(e) => setEditUserEmail(e.target.value)}
                          className="px-2 py-1 w-full border-rounded-lg text-black font-semibold"
                        />
                        <button
                          onClick={() => updateHandler(user._id)}
                          className="px-4 py-2 rounded-lg ml-2 text-white bg-blue-500"
                        >
                          <CiEdit />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        {user.email}{" "}
                        <button
                          onClick={() =>
                            toggleEdit(user._id, user.usernmae, user.email)
                          }
                        >
                          <CiEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>

                  <td className="flex items-center px-4 py-2 justify-center">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>

                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                        <div className="flex">
                            <button onClick={()=>deleteHandler(user._id,user.username)} 
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded">
                                    <LuTrash2 />
                            </button>
                        </div>
                    ) } 
                  </td>
                </tr>
              ))}
            </tbody>
          </table> 
        </div>
      )}
    </div>
  );
};

export default UserList;
