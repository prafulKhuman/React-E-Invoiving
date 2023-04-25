import { createApi , fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { db } from "../../../firebase";
import { addDoc , collection, getDocs , doc , deleteDoc , updateDoc } from "firebase/firestore";



const SalePaymentApi = createApi({
	reducerPath: "SalePayment" ,
	baseQuery : fakeBaseQuery(),
	tagTypes : ["SalePayment"],
	endpoints(builder){
		return{
			DeleteSalePayment : builder.mutation({
				async queryFn(id){
					try{
						await deleteDoc(doc(db, "SalePayment" , id));
						return { data : "ok"};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				invalidatesTags :["SalePayment"],
			}),
			FatchSalePayment : builder.query({
				async queryFn(){
					try{

						const paymentRef = collection(db , "SalePayment");
						const querySnapshot = await getDocs(paymentRef);
						let payment = [] ;
						querySnapshot?.forEach((doc)=>{
							payment.push({
								id : doc.id,
								...doc.data()
							});
						});

						return {data : payment};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				providesTags:["SalePayment"]
			}),
			UpdateSalePayment : builder.mutation({
				async queryFn({id , updatedPayment}){
					
					try{
						await updateDoc(doc(db , "SalePayment" , id) ,{
							...updatedPayment
						});
						return {data: "ok"} ;
					} catch (err) {
						return {error : err};
					}
				},
				invalidatesTags:["SalePayment"],
			}),
			AddSalePayment : builder.mutation({
				async queryFn(payment){
					try{
						await addDoc(collection(db , "SalePayment"),{
							...payment,
							
						});
						return{ data: "ok"};

					}catch(err){
						return{error :err};
					}
				},
				invalidatesTags:["SalePayment"]
			}),
		};
	}


});

export const {
	useAddSalePaymentMutation ,
	useDeleteSalePaymentMutation ,
	useFatchSalePaymentQuery ,
	useUpdateSalePaymentMutation
} = SalePaymentApi ;

export {SalePaymentApi};