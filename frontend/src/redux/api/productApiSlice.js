import { PRODUCT_URL , UPLOAD_URL } from "../constant";
import {apiSlice} from "./apiSlice"

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getProduct : builder.query({
            query : ({keyword}) => ({
                url : `${PRODUCT_URL}`,
                params : { keyword }
            }),
            keepUnusedDataFor :5,
            providesTags : ["product"]
        }),

        getProductById : builder.query({
            query : (productId) =>`${PRODUCT_URL}/${productId}`,
            providesTags : (result,error,productId) => [{type : "product" , id :  productId}]
        }),

        allProducts : builder.query({
            query : () => `${PRODUCT_URL}/allProducts`
        }),

        getProductDetails : builder.query({
            query : (productId) => ({
                url : `${PRODUCT_URL}/${productId}`
            }),
            keepUnusedDataFor : 5,
        }),

        createProduct : builder.mutation({
            query : (productData) => ({
                url : `${PRODUCT_URL}`,
                method : "POST",
                body : productData
            }),
            invalidatesTags : ["product"]
        }),

        updateProduct : builder.mutation({
            query: ({productId , formData}) => ({
                url : `${PRODUCT_URL}/${productId}`,
                method : "PUT",
                body: formData
            })
        }),
        
        uploadProductImage : builder.mutation({
            query : (data) => ({
                url : `${UPLOAD_URL}`,
                method : "POST",
                body : data
            })
        }),

        deleteProduct : builder.mutation({
            query : (productId) => ({
                url : `${PRODUCT_URL}/${productId}`,
                method : "DELETE"
            }),
            providesTags : ["product"],
        }),

        createReview : builder.mutation({
            query : (data) => ({
                url : `${PRODUCT_URL}/${data.productId}/reviews`,
                method : "POST",
                body : data
            })
        }),

        getTopProducts : builder.query({
            query : () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor : 5,
        }),

        getNewProduct : builder.query({
            query : () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor : 5
        }),
        getFilteredProducts : builder.query({
            query : ({checked,radio}) => (
                {
                    url : `${PRODUCT_URL}/filtered-product`,
                    method: "POST",
                    body: {checked,radio}
                }
            )
        })
    })
})

export const 
{
    useGetProductQuery,
    useGetProductByIdQuery,
    useGetProductDetailsQuery,
    useCreateReviewMutation,
    useDeleteProductMutation,
    useGetNewProductQuery,
    useGetTopProductsQuery,
    useAllProductsQuery,
    useCreateProductMutation,
    useUploadProductImageMutation,
    useUpdateProductMutation,
    useGetFilteredProductsQuery
} = productApiSlice