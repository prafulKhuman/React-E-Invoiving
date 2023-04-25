import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { SaleInvoiceApi } from "./api/SaleApi/SaleInvoiceApi";
import { PaymentInOutApi } from "./api/paymentApi/PaymentInOutApi";
import { SaleReturnApi } from "./api/SaleApi/SaleReturnApi";
import { PartiesApi } from "./api/partiesApi/PartiesApi";
import { IteamApi } from "./api/itemApi/IteamApi";
import {PurchaseBillApi} from "./api/purchaseApi/PurchaseBillApi";
import { SalePaymentApi } from "./api/SalePaymentApi/SalePaymentApi";
import { PurchaseReturnApi } from "./api/purchaseApi/PurchaseReturnApi";
import { PurchasePaymentApi } from "./api/SalePaymentApi/PurchasePaymentApi";



export const store = configureStore({
	reducer:{
	
		[SaleInvoiceApi.reducerPath] : SaleInvoiceApi.reducer ,
		[PaymentInOutApi.reducerPath] : PaymentInOutApi.reducer ,
		[SaleReturnApi.reducerPath] : SaleReturnApi.reducer ,
		[PartiesApi.reducerPath] : PartiesApi.reducer ,
		[IteamApi.reducerPath] : IteamApi.reducer ,
		[PurchaseBillApi.reducerPath]:PurchaseBillApi.reducer,
		[SalePaymentApi.reducerPath]:SalePaymentApi.reducer,
		[PurchaseReturnApi.reducerPath]:PurchaseReturnApi.reducer,
		[PurchasePaymentApi.reducerPath]:PurchasePaymentApi.reducer,
	},
	middleware:(getDefaultMiddleware)=>{
		return getDefaultMiddleware()
			.concat(SaleInvoiceApi.middleware)
			.concat(PaymentInOutApi.middleware) 
			.concat(SaleReturnApi.middleware)
			.concat(PartiesApi.middleware)
			.concat(IteamApi.middleware)
			.concat(PurchaseBillApi.middleware)
			.concat(SalePaymentApi.middleware)
			.concat(PurchasePaymentApi.middleware)
			.concat(PurchaseReturnApi.middleware) ;
	},
});
setupListeners(store.dispatch);


export {
	useAddSaleInvoiceMutation ,
	useFatchSaleInvoiceQuery ,
	useDeleteSaleInvoiceMutation
} from "./api/SaleApi/SaleInvoiceApi";

export {
	useAddPaymentInOutMutation ,
	useDeletePaymentInOutMutation ,
	useFetchPaymentInOutQuery
} from "./api/paymentApi/PaymentInOutApi";

export {
	useFetchSaleReturnQuery ,
	useAddSaleReturnMutation ,
	useDeleteSaleReturnMutation
} from "./api/SaleApi/SaleReturnApi";

export {
	useAddPartiesMutation ,
	useDeletePartiesMutation ,
	useFetchPartiesQuery
} from "./api/partiesApi/PartiesApi";

export {
	useAddItemMutation ,
	useDeleteItemMutation ,
	useFetchItemQuery 
} from "./api/itemApi/IteamApi";


export{
	useFetchPurchaseBillQuery,
	useAddPurchaseBillMutation,
	useDeletePurchaseBillMutation
} from "./api/purchaseApi/PurchaseBillApi";


export{
	useFetchPurchaseReturnQuery,
	useDeletePurchaseReturnMutation,
	useAddPurchaseReturnMutation
} from "./api/purchaseApi/PurchaseReturnApi";


export{
	useAddSalePaymentMutation ,
	useDeleteSalePaymentMutation ,
	useFatchSalePaymentQuery ,
	useUpdateSalePaymentMutation
} from "./api/SalePaymentApi/SalePaymentApi";


export{
	useAddPurchasePaymentMutation ,
	useDeletePurchasePaymentMutation ,
	useFatchPurchasePaymentQuery ,
	useUpdatePurchasePaymentMutation
} from "./api/SalePaymentApi/PurchasePaymentApi";