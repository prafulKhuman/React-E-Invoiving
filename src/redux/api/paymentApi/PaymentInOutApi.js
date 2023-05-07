import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const PaymentInOutApi = createApi({
	reducerPath: "PaymentInOut",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["PaymentInOut"],
	endpoints (builder) {
		return {
			FetchPaymentInOut: builder.query({
				async queryFn () {
					try {
						const paymentRef = collection(db, "PaymentInOut");
						const querySnapshot = await getDocs(paymentRef);
						const PaymentInfo = [];
						querySnapshot?.forEach((doc) => {
							PaymentInfo.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data()

							});
						});
						return { data: PaymentInfo };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				providesTags: ["PaymentInOut"]
			}),
			DeletePaymentInOut: builder.mutation({
				async queryFn (id) {
					try {
						await deleteDoc(doc(db, "PaymentInOut", id));
						return { data: "ok" };
					} catch (err) {
						const errorMessage = err.message;
						return { error: errorMessage };
					}
				},
				invalidatesTags: ["PaymentInOut"]
			}),
			AddPaymentInOut: builder.mutation({
				async queryFn (Transaction) {
					try {
						await addDoc(collection(db, "PaymentInOut"), {
							...Transaction,
							timestamp: formattedDate
						});
						return { data: "ok" };
					} catch (err) {
						return { error: err };
					}
				},
				invalidatesTags: ["PaymentInOut"]

			})

		};
	}
});

export const {
	useAddPaymentInOutMutation,
	useDeletePaymentInOutMutation,
	useFetchPaymentInOutQuery
} = PaymentInOutApi;

export { PaymentInOutApi };
