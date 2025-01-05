import { useState } from "react"
import { useNavigate } from "react-router-dom"
import 
{
    useCreateProductMutation,
    useUploadProductImageMutation
} from '../../redux/api/productApiSlice.js'

import { useFetchCategoriesQuery } from "../../redux/api/CategoryApiSlice"
import { toast } from "react-toastify"
import AdminMenu from "./AdminMenu.jsx"


const ProductList = () => {

    const [name,setName] = useState('');
    const [image,setImage] = useState('');
    const [description,setDescription] = useState('');
    const [category,setCategory] = useState('');
    const [quantity,setQuantity] = useState('');
    const [price,setPrice] = useState('');
    const [brand,setBrand] = useState('');
    const [stock,setStock] = useState(0);
    const [imageUrl ,setImageUrl ] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const {data : categories} = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData()
      productData.append("image", image);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);
      console.log(productData.name)
      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error("Product create failed. Try Again.");
      } else {
        toast.success(`${data.name} is created`);
        navigate("/");
      }
    } catch(error) {
      console.error(error);
      toast.error("Product create failed. Try Again.");
    }
  };


    const uploadFileHandler = async (e) => {

      const formData = new FormData();
      formData.append("image", e.target.files[0]);

        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success(res.message);
          setImage(res.image);
          setImageUrl(res.image);

        } catch (error) {
          toast.error(error?.data?.message || error.error)          
        }
    }

  return (
    <div className="container xl:mx-[9rem] sm:mx-[0] text-white">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
            <div className="h-12">Create Product</div>

            {imageUrl && (
              <div className="text-center">
                <img src={imageUrl} alt="product" className="block mx-auto max-h-[200px]" />
              </div>
            )}
            <div>
              <label className="border w-full block text-white py-5 px-4 rounded-lg font-bold cursor-pointer text-center">
                {image ? image.name : "upload image"}

                <input 
                  type="file" 
                   onChange={uploadFileHandler} 
                   name="image"
                   accept="image/*"
                   className={ !image ? "hidden" : "text-white"}
                  />
              </label>
            </div>

            <div className="p-2">
              <div className="flex flex-wrap">

                <div className="one">
                  <label htmlFor="name">Name</label> <br />
                  <input type="text" className=" mt-2 px-4 py-1.5 mb-2 w-[25rem] border rounded-lg text-white bg-[#101011]" value={name} onChange={e => setName(e.target.value)} />
                </div>

                <div className="two ml-10">
                  <label htmlFor="name block">Price</label> <br />
                  <input type="number" className="mt-2 px-4 py-1.5 mb-2 w-[25rem] border rounded-lg text-white bg-[#101011]" value={price} onChange={e => setPrice(e.target.value)} />
                </div>

              </div>

               <div className="flex flex-wrap">

                <div className="one">
                  <label htmlFor="name block">Quantity</label> <br />
                  <input type="number" className=" mt-2 px-4 py-1.5 mb-2 w-[25rem] border rounded-lg text-white bg-[#101011]" value={quantity} onChange={e => setQuantity(e.target.value)} />
                </div>

                <div className="two ml-10">
                  <label htmlFor="name block">Brand</label> <br />
                  <input type="text" className="mt-2 px-4 py-1.5 mb-2 w-[25rem] border rounded-lg text-white bg-[#101011]" value={brand} onChange={e => setBrand(e.target.value)} />
                </div>
              </div>

              <label htmlFor="" className="my-2">Description</label>
              <textarea className="mt-2 border rounded-lg bg-[#101011] cursor-pointer text-white w-[92%] p-2 mb-2"
              value={description} onChange={e =>setDescription(e.target.value)}></textarea>

              <div className="flex space-between">
                <div>
                     <label htmlFor="name block">Count in Stock</label> <br />
                     <input type="number" className="mt-2 text-white border px-4 py-1.5 w-[30rem] mb-2 rounded-lg bg-[#101011]" 
                     value={stock} onChange={e=>setStock(e.target.value)}/>
                </div>

                <div className="ml-[2rem]">
                  <label htmlFor="name block">Category</label> <br />
                <select 
                onChange={e=>setCategory(e.target.value)}
                className="mt-2 px-3 py-1.5 rounded-lg text-white bg-[#101011]"
                placeholder="Choose category">

                    {categories?.map(c=>(
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button onClick={handleSubmit} className="bg-pink-600 mt-2 px-4 py-1 font-blod rounded-lg text-white hover:bg-pink-700">Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList