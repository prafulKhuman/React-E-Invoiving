import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const PurchaseReturnApi = createApi({
	reducerPath: "PurchaseReturn",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["PurchaseReturn"],
	endpoints (builder) {
		return {
			FetchPurchaseReturn: builder.query({
				async queryFn () {
					try {
						const returnRef = collection(db, "PurchaseReturn");
						const querySnapshot = await getDocs(returnRef);
						const Preturn = [];
						querySnapshot?.forEach((doc) => {
							Preturn.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data()
							});
						});
						return { data: Preturn };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["PurchaseReturn"]
			}),
			DeletePurchaseReturn: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "PurchaseReturn", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["PurchaseReturn"]
			}),
			AddPurchaseReturn: builder.mutation({
				async queryFn (Preturn) {
					try {
						await addDoc(collection(db, "PurchaseReturn"), {
							...Preturn,
							timestamp: formattedDate
						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["PurchaseReturn"]
			})
		};
	}
});
export const {
	useFetchPurchaseReturnQuery,
	useDeletePurchaseReturnMutation,
	useAddPurchaseReturnMutation
} = PurchaseReturnApi;

export { PurchaseReturnApi };
