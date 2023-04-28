import { createApi , fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { addDoc , collection , deleteDoc, doc, getDocs} from "firebase/firestore";
import { db } from "../../../firebase";
const date = new Date();
const options = { day: "2-digit", month: "short", year: "numeric", hour: "numeric", minute: "numeric", second: "numeric", hour12: true };
const formattedDate = date.toLocaleString("en-US", options);

const ExpenseApi = createApi({
	reducerPath: "Expenses",
	baseQuery : fakeBaseQuery(),
	tagTypes:["Expenses"],
	endpoints(builder){
		return {
			FetchExpense:builder.query({
				async queryFn(){
					try{
						const ExpenseRef = collection(db,"Expenses");
						const querySnapshot = await getDocs(ExpenseRef);
						let Expense = [];
						querySnapshot?.forEach((doc)=>{
							Expense.push({
								id:doc.id,
								timestamp:doc.timestamp,
								...doc.data(),
							});
						});
						return {data:Expense};
					}catch(err){
						const errorMessage = err.message;
						return{error:errorMessage};
					}

				},
				providesTags:["Expenses"],
			}),
			DeleteExpenses:builder.mutation({
				async queryFn(id){
					try{
						await deleteDoc(doc(db,"Expenses",id));
						return{data:"ok"};
					}
					catch(err){
						const errorMessage = err.message;
						return{error:errorMessage};
					}
				},
				invalidatesTags:["Expenses"],
			}),
			AddExpenses:builder.mutation({
				async queryFn(Expense){
					try{
						await addDoc(collection(db,"Expenses"),{
							...Expense,
							timestamp:formattedDate,

						});
						return{data:"ok"};
					}
					catch(err){
						return{error:err};
					}
				},
				invalidatesTags:["Expenses"],
			}),
		};
	}
});
export const{
	useFetchExpenseQuery,
	useAddExpensesMutation,
	useDeleteExpensesMutation
}= ExpenseApi;

export {ExpenseApi};