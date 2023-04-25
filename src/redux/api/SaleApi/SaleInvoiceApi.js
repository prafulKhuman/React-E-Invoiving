import { createApi , fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { db } from "../../../firebase";
import { addDoc , collection, getDocs , doc , deleteDoc } from "firebase/firestore";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);


const SaleInvoiceApi = createApi({
	reducerPath: "SaleInvoice" ,
	baseQuery : fakeBaseQuery(),
	tagTypes : ["SaleInvoice"],
	endpoints(builder){
		return{
			DeleteSaleInvoice : builder.mutation({
				async queryFn(id){
					try{
						await deleteDoc(doc(db, "SaleInvoice" , id));
						return { data : "ok"};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				invalidatesTags :["SaleInvoice"],
			}),
			FatchSaleInvoice : builder.query({
				async queryFn(){
					try{

						const invoiceRef = collection(db , "SaleInvoice");
						const querySnapshot = await getDocs(invoiceRef);
						let invoice = [] ;
						querySnapshot?.forEach((doc)=>{
							invoice.push({
								Id : doc.id,
								timestamp: doc.timestamp,
								...doc.data()
							});
						});

						return {data : invoice};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				providesTags:["SaleInvoice"]
			}),
			AddSaleInvoice : builder.mutation({
				async queryFn(invoice){
					try{
						await addDoc(collection(db , "SaleInvoice"),{
							...invoice,
							timestamp : formattedDate ,
						});
						return{ data: "ok"};

					}catch(err){
						return{error :err};
					}
				},
				invalidatesTags:["SaleInvoice"]
			}),
		};
	}


});

export const {
	useAddSaleInvoiceMutation ,
	useFatchSaleInvoiceQuery ,
	useDeleteSaleInvoiceMutation 
} = SaleInvoiceApi ;

export {SaleInvoiceApi};