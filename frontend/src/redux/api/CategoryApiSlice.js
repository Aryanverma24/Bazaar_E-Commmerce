import { CATEGORY_URL } from "../constant.js";
import { apiSlice } from "./apiSlice.js";

export const CategoryApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ( {
        createCategory : builder.mutation({
            query : (newCategory)=> ({
                url : `${CATEGORY_URL}`,
                method : "POST",
                body : newCategory
            }),
        }),

        updateCategory: builder.mutation({
            query: ({ categoryId, updatedCategory }) => ({
              url: `${CATEGORY_URL}/${categoryId}`,
              method: "PUT",
              body: updatedCategory,
            }),
          }),

        deleteCategory : builder.mutation({
            query : (categoryId) => ({
                url : `${CATEGORY_URL}/${categoryId}`,
                method : "DELETE",
            }),
        }),

        fetchCategories :builder.query({
            query : () => ({
                url : `${CATEGORY_URL}/categories`
            })
        })
    })
})


export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useFetchCategoriesQuery
} = CategoryApiSlice ;