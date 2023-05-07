import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const SaleReturnApi = createApi({
	reducerPath: "SaleReturn",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["SaleReturn"],
	endpoints (builder) {
		return {
			FetchSaleReturn: builder.query({
				async queryFn () {
					try {
						const returnRef = collection(db, "SaleReturn");
						const querySnapshot = await getDocs(returnRef);
						const Return = [];
						querySnapshot?.forEach((doc) => {
							Return.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data()

							});
						});
						return { data: Return };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["SaleReturn"]
			}),
			DeleteSaleReturn: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "SaleReturn", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["SaleReturn"]
			}),
			AddSaleReturn: builder.mutation({
				async queryFn (Return) {
					try {
						await addDoc(collection(db, "SaleReturn"), {
							...Return,
							timestamp: formattedDate
						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["SaleReturn"]

			})

		};
	}
});

export const {
	useFetchSaleReturnQuery,
	useAddSaleReturnMutation,
	useDeleteSaleReturnMutation
} = SaleReturnApi;

export { SaleReturnApi };
