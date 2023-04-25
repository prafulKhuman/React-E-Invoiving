import { createApi , fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { addDoc , collection , deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";


const IteamApi = createApi({
	reducerPath: "Item" ,
	baseQuery: fakeBaseQuery(),
	tagTypes:["Item"],
	endpoints(builder){
		return{
			FetchItem: builder.query({
				async queryFn(){
					try{
						const ItemRef = collection(db,"Item");
						const querySnapshot = await getDocs(ItemRef);
						let Items = [];
						querySnapshot?.forEach((doc)=>{
							Items.push({
								id: doc.id,
								...doc.data(),

							});
						});
						return { data: Items};
					} catch (err){
						const errorMessage = err.message;
						return{ error: errorMessage};
					}
				},
				providesTags:["Parties"],
			}),
			DeleteItem: builder.mutation({
				async queryFn(id){
					try{
						await deleteDoc(doc(db, "Item" , id));
						return { data : "ok"};
					}catch(err){
						const errorMessage = err.message;
						return{ error : errorMessage};
					}
				},
				invalidatesTags: ["Item"],
			}),
			AddItem: builder.mutation({
				async queryFn(Item){
					try{
						await addDoc(collection(db,"Item"),{
							...Item,
							
						});
						return{ data: "ok"};
					}
					catch (err){
						return { error : err};
					}
				
				},
				invalidatesTags: ["Item"],
                
			}),
			
            
		};
	}
});

export const {
	useAddItemMutation ,
	useDeleteItemMutation ,
	useFetchItemQuery 
} = IteamApi ;

export {IteamApi};