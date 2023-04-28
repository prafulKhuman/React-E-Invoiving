import { createApi , fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { addDoc , collection , deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const SaleOrderApi = createApi({
	reducerPath: "SaleOrder" ,
	baseQuery: fakeBaseQuery(),
	tagTypes:["SaleOrder"],
	endpoints(builder){
		return{
			FetchSaleOrder: builder.query({
				async queryFn(){
					try{
						const orderRef = collection(db,"SaleOrder");
						const querySnapshot = await getDocs(orderRef);
						let order = [];
						querySnapshot?.forEach((doc)=>{
							order.push({
								id: doc.id,
								timestamp: doc.timestamp,
								...doc.data(),

							});
						});
						return { data: order};
					} catch (err){
						const errorMessage = err.message;
						return{ error: errorMessage};
					}
				},
				providesTags:["SaleOrder"],
			}),
			DeleteSaleOrder: builder.mutation({
				async queryFn(id){
					try{
						await deleteDoc(doc(db, "SaleOrder" , id));
						return { data : "ok"};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				invalidatesTags: ["SaleOrder"],
			}),
			AddSaleOrder: builder.mutation({
				async queryFn(order){
					try{
						await addDoc(collection(db,"SaleOrder"),{
							...order,
							timestamp : formattedDate ,
						});
						return{ data: "ok"};
					}
					catch (err){
						return { error : err};
					}
				
				},
				invalidatesTags: ["SaleOrder"],
                
			}),
			
            
		};
	}
});

export const {
	useAddSaleOrderMutation ,
	useFetchSaleOrderQuery ,
	useDeleteSaleOrderMutation
} = SaleOrderApi ;

export {SaleOrderApi};
