import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";

const CategoryApi = createApi({
	reducerPath: "Category",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Category"],
	endpoints (builder) {
		return {
			FetchCategory: builder.query({
				async queryFn () {
					try {
						const CategoryRef = collection(db, "Category");
						const querySnapshot = await getDocs(CategoryRef);
						const Category = [];
						querySnapshot?.forEach((doc) => {
							Category.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data()
							});
						});
						return { data: Category };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["Category"]
			}),
			DeleteCategory: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "Category", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["Category"]
			}),
			AddCategory: builder.mutation({
				async queryFn (Category) {
					try {
						await addDoc(collection(db, "Category"), {
							...Category

						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["Category"]
			})
		};
	}
});
export const {
	useAddCategoryMutation,
	useFetchCategoryQuery,
	useDeleteCategoryMutation
} = CategoryApi;

export { CategoryApi };
