import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { SaleOrderApi } from "./api/SaleOrderApi";
import { SaleInvoiceApi } from "./api/SaleInvoiceApi";
import { PaymentInOutApi } from "./api/PaymentInOutApi";
import { SaleReturnApi } from "./api/SaleReturnApi";
import { PartiesApi } from "./api/PartiesApi";


export const store = configureStore({
	reducer:{
		[SaleOrderApi.reducerPath] : SaleOrderApi.reducer ,
		[SaleInvoiceApi.reducerPath] : SaleInvoiceApi.reducer ,
		[PaymentInOutApi.reducerPath] : PaymentInOutApi.reducer ,
		[SaleReturnApi.reducerPath] : SaleReturnApi.reducer ,
		[PartiesApi.reducerPath] : PartiesApi.reducer
	},
	middleware:(getDefaultMiddleware)=>{
		return getDefaultMiddleware()
			.concat(SaleOrderApi.middleware)
			.concat(SaleInvoiceApi.middleware)
			.concat(PaymentInOutApi.middleware) 
			.concat(SaleReturnApi.middleware)
			.concat(PartiesApi.middleware);
	},
});
setupListeners(store.dispatch);

export {
	useAddSaleOrderMutation,
	useFetchSaleOrderQuery,
	useDeleteSaleOrderMutation
} from "./api/SaleOrderApi";

export {
	useAddSaleInvoiceMutation ,
	useFatchSaleInvoiceQuery ,
	useDeleteSaleInvoiceMutation
} from "./api/SaleInvoiceApi";

export {
	useAddPaymentInOutMutation ,
	useDeletePaymentInOutMutation ,
	useFetchPaymentInOutQuery
} from "./api/PaymentInOutApi";

export {
	useFetchSaleReturnQuery ,
	useAddSaleReturnMutation ,
	useDeleteSaleReturnMutation
} from "./api/SaleReturnApi";

export {
	useAddPartiesMutation ,
	useDeletePartiesMutation ,
	useFetchPartiesQuery
} from "./api/PartiesApi";