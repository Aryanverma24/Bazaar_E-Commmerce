import { toast } from "react-toastify"
import {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
    useUpdateCategoryMutation,
} from "../../redux/api/CategoryApiSlice.js"
import CategoryForm from '../../components/CategoryForm.jsx'
import { useState } from "react"
import Modal from "../../components/Modal.jsx"
import AdminMenu from "./AdminMenu.jsx"

const Category = () => {
    
    const {data : categories, isLoading, isError} = useFetchCategoriesQuery();
    
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setmodalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation(); 
    const [updateCategory] = useUpdateCategoryMutation();

    const handleCreateCategory = async (e) => {
        e.preventDefault();
        if(!name){
            toast.error("Category name is required!")
            return 
        }
        try {
            const result =await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error)
            }else{
                setName("")
                toast.success(`${result.name} is created`)
            }
        } catch (error) {
            console.error(error)
            toast.error("Creating category failed!")  
        }
    } 

    const handleDeleteCategory = async (e) => {
       
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap();
            if(result.error){
                toast.error(result.error)
            }else{
                toast.success(`${result.name} removed successfully!`);
                setSelectedCategory(null);
                setmodalVisible(false);
            }
        } catch (error) {
            console.log(error)
            toast.error("Category deletion failed, try again!!")
        }
    }

  return (
    <div className="flex flex-col ml-[10rem] md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
            <div className="h-12 text-white">Manage Category..</div>

            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
            <br />
            <hr />

            {isLoading ? (
                <div>Loading...</div>
            ) : isError ? (
                <div>Error fetching categories</div>
            ) : (
                <div className="flex flex-wrap">
                    {categories?.map((category) => (
                        <div key={category._id}>
                            <button className="bg-black border px-3 py-2 rounded-lg m-3 text-pink-500 hover:bg-pink-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" 
                            onClick={ () => {{
                                setmodalVisible(true)
                                setSelectedCategory(category)
                                setUpdatingName(category.name)
                                }}}>{category.name}</button>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={modalVisible} onClose={() => setmodalVisible(false)}>
                <CategoryForm 
                value={updatingName}
                setValue={(value)=>setUpdatingName(value)}
                buttonText="Cancel"
                handleDelete={handleDeleteCategory}
                    />
            </Modal>
        </div>
    </div>
  )
}

export default Category