import { createApi , fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { addDoc , collection , deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const PartiesApi = createApi({
	reducerPath: "Parties" ,
	baseQuery: fakeBaseQuery(),
	tagTypes:["Parties"],
	endpoints(builder){
		return{
			FetchParties: builder.query({
				async queryFn(){
					try{
						const partiesRef = collection(db,"Parties");
						const querySnapshot = await getDocs(partiesRef);
						let Parties = [];
						querySnapshot?.forEach((doc)=>{
							Parties.push({
								id: doc.id,
								...doc.data(),

							});
						});
						return { data: Parties};
					} catch (err){
						const errorMessage = err.message;
						return{ error: errorMessage};
					}
				},
				providesTags:["Parties"],
			}),
			DeleteParties: builder.mutation({
				async queryFn(id){
					try{
						await deleteDoc(doc(db, "Parties" , id));
						return { data : "ok"};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				invalidatesTags: ["Parties"],
			}),
			AddParties: builder.mutation({
				async queryFn(Parties){
					try{
						await addDoc(collection(db,"Parties"),{
							...Parties,
							
						});
						return{ data: "ok"};
					}
					catch (err){
						return { error : err};
					}
				
				},
				invalidatesTags: ["Parties"],
                
			}),
			
            
		};
	}
});

export const {
	useAddPartiesMutation ,
	useDeletePartiesMutation ,
	useFetchPartiesQuery
} = PartiesApi ;

export {PartiesApi};