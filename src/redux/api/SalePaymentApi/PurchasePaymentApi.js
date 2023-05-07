import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../../../firebase";
import { addDoc, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";

const PurchasePaymentApi = createApi({
	reducerPath: "PurchasePayment",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["PurchasePayment"],
	endpoints (builder) {
		return {
			DeletePurchasePayment: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "PurchasePayment", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["PurchasePayment"]
			}),
			FatchPurchasePayment: builder.query({
				async queryFn () {
					try {
						const paymentRef = collection(db, "PurchasePayment");
						const querySnapshot = await getDocs(paymentRef);
						const payment = [];
						querySnapshot?.forEach((doc) => {
							payment.push({
								id: doc.id,
								...doc.data()
							});
						});

						return { data: payment };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["PurchasePayment"]
			}),
			UpdatePurchasePayment: builder.mutation({
				async queryFn ({ id, updatedPayment }) {
					try {
						await updateDoc(doc(db, "PurchasePayment", id), {
							...updatedPayment
						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["PurchasePayment"]
			}),
			AddPurchasePayment: builder.mutation({
				async queryFn (payment) {
					try {
						await addDoc(collection(db, "PurchasePayment"), {
							...payment

						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["PurchasePayment"]
			})
		};
	}

});

export const {
	useAddPurchasePaymentMutation,
	useDeletePurchasePaymentMutation,
	useFatchPurchasePaymentQuery,
	useUpdatePurchasePaymentMutation
} = PurchasePaymentApi;

export { PurchasePaymentApi };
