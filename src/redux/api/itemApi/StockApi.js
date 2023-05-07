import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const StockApi = createApi({
	reducerPath: "Stock",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Stock"],
	endpoints (builder) {
		return {
			FetchStock: builder.query({
				async queryFn () {
					try {
						const StockRef = collection(db, "Stock");
						const querySnapshot = await getDocs(StockRef);
						const Stock = [];
						querySnapshot?.forEach((doc) => {
							Stock.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data()

							});
						});
						return { data: Stock };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["Stock"]
			}),

			DeleteStock: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "Stock", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["Stock"]
			}),
			AddStock: builder.mutation({
				async queryFn (Stock) {
					try {
						await addDoc(collection(db, "Stock"), {
							...Stock,
							timestamp: formattedDate

						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["Stock"]

			})

		};
	}
});

export const {
	useDeleteStockMutation,
	useAddStockMutation,
	useFetchStockQuery
} = StockApi;

export { StockApi };
