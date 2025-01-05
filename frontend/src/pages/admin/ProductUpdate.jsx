import { useState , useEffect   } from "react"
import { useNavigate, useParams } from "react-router"
import AdminMenu from '../admin/AdminMenu'
import {
    useUpdateProductMutation ,
    useDeleteProductMutation,
    useGetProductByIdQuery,
    useUploadProductImageMutation,
} from "../../redux/api/productApiSlice"

import {useFetchCategoriesQuery} from '../../redux/api/CategoryApiSlice'
import { toast } from "react-toastify"

const ProductUpdate = () => {
    const params= useParams(); 

    const {data : productData} = useGetProductByIdQuery(params._id);
    console.log(productData)

    const [image,setImage] = useState(productData?.image || "");
    const [name,setName] = useState(productData?.name || "")
    const [description,setDescription]=useState(productData?.description || "")
    const [price,setPrice] = useState(productData?.price || "")
    const [category,setCategory] = useState(productData?.category || "")
    const [stock,setStock] = useState(productData?.countInStock || "")
    const [brand,setBrand] = useState(productData?.brand || "");
    const [quantity,setQuantity]= useState(productData?.quantity || "");
    const navigate = useNavigate();

    const {data : categories = []} = useFetchCategoriesQuery()
    const [uploadProduct] = useUploadProductImageMutation();
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    useEffect(() => {
      if(productData && productData._id){
        setName(productData.name);
        setBrand(productData.brand);
        setCategory(productData.category);
        setDescription(productData.description);
        setImage(productData.image);
        setPrice(productData.price);
        setQuantity(productData.quantity);
      }
    },[productData])

    const uploadFileFolder = async (e)=>{
     const formdata = new FormData();
     formdata.append("image",e.target.files[0]);
     try {
      const res = await uploadProduct(formdata).unwrap();
      toast.success("Item added Sucessfully!")
      setImage(res.image);

     } catch (error) {
      toast.error("Error on updating image!!")
     }
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const formData = new FormData()
        formData.append("image", image);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("quantity", quantity);
        formData.append("brand", brand);
        formData.append("countInStock", stock);
        console.log(formData.name)
        const  {data}  = await updateProduct({productId : params._id , formData});
      
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.success(`product successfully updated!!`);
          navigate("/admin/allproductlist");
        }
      } catch(error) {
        console.error(error);
        toast.error("Product create failed. Try Again.");
      }
    };

    const handledelete = async(e) => {
      try {
        let alert = window.confirm("Are you sure to delete this product!");
        if(!alert) return;
         
        const {data} = await deleteProduct(params.id);
        toast.success(`"${data.name}" is deleted!!`)
 
          navigate("/admin/allproductlist");
      } catch (error) {
        console.error(error);
        toast.error("error while deleting file!!")
      }
    }

  return (
   <>
    <div className="container xl:mx-[9rem] sm:mx-0 text-white ">
      <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="p-2 md:w-3/4">
          <div className="h-12 text-center font-semibold hover:text-pink-500"> 
              Update product
            </div>
            {image && (
              <div className="text-center">
                <img src={image} alt="product" 
                className="block w-[30%] rounded-lg focus:ring-2
                focus:ring-pink-500 mx-auto"/>
              </div>
            )}

            <div className="mb-2">
              <label className="text-white py-1.5 px-2 block w-full text-center rounded-lg cursor-pointer font-bold">
              {image ? image.name : "Upload image"}
              <input type="file"
              name= "image"
              accept="image/"
              onChange={uploadFileFolder}
              className="text-white rounded-sm ml-5" />
              </label>
            </div>

                <div className="p-2">
                  <div className="flex flex-wrap">
                    <div className="one">
                      <label htmlFor="name">Name</label> <br />
                      <input type="text"
                      className="p-2 mt-1 mb-1 w-[25rem] border rounded-lg bg-[#101011] text-white mr-[3rem]"
                      value={name} 
                      onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="two">
                      <label htmlFor="name">Price</label> <br />
                      <input type="text"
                      className="p-2 mt-1 mb-1 w-[25rem] border rounded-lg bg-[#101011] text-white mr-[3rem]"
                      value={price} 
                      onChange={(e)=>setPrice(e.target.value)}/>
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    <div className="one">
                      <label htmlFor="name">Quantity</label> <br />
                      <input type="number"
                      className="p-2 mt-1 mb-1 w-[25rem] border rounded-lg bg-[#101011] text-white mr-[3rem]"
                      value={quantity} 
                      onChange={(e)=>setQuantity(e.target.value)}/>
                    </div>
                    <div className="two">
                      <label htmlFor="name">Brand</label> <br />
                      <input type="text"
                      className="p-2 mt-1 mb-1 w-[25rem] border rounded-lg bg-[#101011] text-white mr-[3rem]"
                      value={brand} 
                      onChange={(e)=>setBrand(e.target.value)}/>
                    </div>
                  </div>

                  <div className="flex flex-col">
                  <label htmlFor="" className=" text-white">
                    Description
                  </label>
                  <textarea type="text"
                  className="mt-[1rem] w-[25rem] bg-[#101011] text-white rounded-lg"
                  value={description}
                  onChange={(e)=>setDescription(e.target.value)}>
                  </textarea>
                  </div>
                  

                  <div className="flex justify-between">
                    <div>
                      <label htmlFor="name block">Count in Stock</label>
                      <input type="text"
                      className="mt-[1rem] bg-[#101011] w-[25rem] ml-[0.5rem] px-2 py-1 border rounded-lg text-white"
                      value={stock}
                      onChange={e=> setStock(e.target.value)} />
                    </div>

                    <div>
                      <label>Category</label>
                      <select placeholder="Choose Category"
                      onChange={e => setCategory(e.target.value)}
                      value={category}
                      className="px-2 py-1 mt-[1rem] ml-[1rem] text-white bg-[#101011] rounded-lg w-[25rem]">
                        {categories?.map((c )=> (
                            <option value={c._id} key={c._id}>
                              {c.name}
                            </option>
                        ))     }
                      </select>
                    </div>
                  </div>
                        <div className="">
                          <button
                           onClick={handleSubmit}
                          className="px-2 ml-[2rem] py-1 mt-3 text-lg rounded-lg bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
                            Update
                          </button>

                          <button
                          onClick={handledelete}
                         className=" ml-[2rem] px-2 py-1 mt-3 text-lg rounded-lg bg-red-600 hover:bg-red:800  focus:ring-2 focus:ring-outline-none  focus:outline-none focus:ring-2-bg-red-500 hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                </div>
            </div>
       </div>

    </div>
   </>
)
}

export default ProductUpdate