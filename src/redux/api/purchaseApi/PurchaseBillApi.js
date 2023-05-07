import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const PurchaseBillApi = createApi({
	reducerPath: "PurchaseBill",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["PurchasBill"],
	endpoints (builder) {
		return {
			FetchPurchaseBill: builder.query({
				async queryFn () {
					try {
						const PurchasRef = collection(db, "PurchasBill");
						const querySnapshot = await getDocs(PurchasRef);
						const Purchas = [];
						querySnapshot?.forEach((doc) => {
							Purchas.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data()
							});
						});
						return { data: Purchas };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["PurchasBill"]
			}),
			DeletePurchaseBill: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "PurchasBill", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["PurchasBill"]
			}),
			AddPurchaseBill: builder.mutation({
				async queryFn (Purchas) {
					try {
						await addDoc(collection(db, "PurchasBill"), {
							...Purchas,
							timestamp: formattedDate
						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["PurchasBill"]
			})
		};
	}
});
export const {
	useFetchPurchaseBillQuery,
	useAddPurchaseBillMutation,
	useDeletePurchaseBillMutation
} = PurchaseBillApi;

export { PurchaseBillApi };
