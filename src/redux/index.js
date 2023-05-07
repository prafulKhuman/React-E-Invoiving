import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { SaleOrderApi } from "./api/SaleApi/SaleOrderApi";
import { SaleInvoiceApi } from "./api/SaleApi/SaleInvoiceApi";
import { PaymentInOutApi } from "./api/paymentApi/PaymentInOutApi";
import { SaleReturnApi } from "./api/SaleApi/SaleReturnApi";
import { PartiesApi } from "./api/partiesApi/PartiesApi";
import { IteamApi } from "./api/itemApi/IteamApi";
import { PurchaseBillApi } from "./api/purchaseApi/PurchaseBillApi";
import { SalePaymentApi } from "./api/SalePaymentApi/SalePaymentApi";
import { PurchaseReturnApi } from "./api/purchaseApi/PurchaseReturnApi";
import { PurchasePaymentApi } from "./api/SalePaymentApi/PurchasePaymentApi";
import { StockApi } from "./api/itemApi/StockApi";
import { CategoryApi } from "./api/expensesApi/CategoryApi";
import { ExpenseApi } from "./api/expensesApi/ExpensesApi";

export const store = configureStore({
	reducer: {

		[SaleInvoiceApi.reducerPath]: SaleInvoiceApi.reducer,
		[SaleOrderApi.reducerPath]: SaleOrderApi.reducer,
		[PaymentInOutApi.reducerPath]: PaymentInOutApi.reducer,
		[SaleReturnApi.reducerPath]: SaleReturnApi.reducer,
		[PartiesApi.reducerPath]: PartiesApi.reducer,
		[IteamApi.reducerPath]: IteamApi.reducer,
		[PurchaseBillApi.reducerPath]: PurchaseBillApi.reducer,
		[SalePaymentApi.reducerPath]: SalePaymentApi.reducer,
		[PurchaseReturnApi.reducerPath]: PurchaseReturnApi.reducer,
		[PurchasePaymentApi.reducerPath]: PurchasePaymentApi.reducer,
		[StockApi.reducerPath]: StockApi.reducer,
		[CategoryApi.reducerPath]: CategoryApi.reducer,
		[ExpenseApi.reducerPath]: ExpenseApi.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware()
			.concat(SaleInvoiceApi.middleware)
			.concat(SaleOrderApi.middleware)
			.concat(PaymentInOutApi.middleware)
			.concat(SaleReturnApi.middleware)
			.concat(PartiesApi.middleware)
			.concat(IteamApi.middleware)
			.concat(PurchaseBillApi.middleware)
			.concat(SalePaymentApi.middleware)
			.concat(PurchasePaymentApi.middleware)
			.concat(StockApi.middleware)
			.concat(CategoryApi.middleware)
			.concat(ExpenseApi.middleware)
			.concat(PurchaseReturnApi.middleware);
	}
});
setupListeners(store.dispatch);

export {
	useAddSaleInvoiceMutation,
	useFatchSaleInvoiceQuery,
	useDeleteSaleInvoiceMutation
} from "./api/SaleApi/SaleInvoiceApi";

export {
	useAddSaleOrderMutation,
	useFetchSaleOrderQuery,
	useDeleteSaleOrderMutation
} from "./api/SaleApi/SaleOrderApi";

export {
	useAddPaymentInOutMutation,
	useDeletePaymentInOutMutation,
	useFetchPaymentInOutQuery
} from "./api/paymentApi/PaymentInOutApi";

export {
	useFetchSaleReturnQuery,
	useAddSaleReturnMutation,
	useDeleteSaleReturnMutation
} from "./api/SaleApi/SaleReturnApi";

export {
	useAddPartiesMutation,
	useDeletePartiesMutation,
	useFetchPartiesQuery
} from "./api/partiesApi/PartiesApi";

export {
	useAddItemMutation,
	useDeleteItemMutation,
	useFetchItemQuery,
	useUpdateItemMutation
} from "./api/itemApi/IteamApi";

export {
	useFetchPurchaseBillQuery,
	useAddPurchaseBillMutation,
	useDeletePurchaseBillMutation
} from "./api/purchaseApi/PurchaseBillApi";

export {
	useFetchPurchaseReturnQuery,
	useDeletePurchaseReturnMutation,
	useAddPurchaseReturnMutation
} from "./api/purchaseApi/PurchaseReturnApi";

export {
	useAddSalePaymentMutation,
	useDeleteSalePaymentMutation,
	useFatchSalePaymentQuery,
	useUpdateSalePaymentMutation
} from "./api/SalePaymentApi/SalePaymentApi";

export {
	useAddPurchasePaymentMutation,
	useDeletePurchasePaymentMutation,
	useFatchPurchasePaymentQuery,
	useUpdatePurchasePaymentMutation
} from "./api/SalePaymentApi/PurchasePaymentApi";

export {
	useDeleteStockMutation,
	useAddStockMutation,
	useFetchStockQuery
} from "./api/itemApi/StockApi";

export {
	useAddCategoryMutation,
	useFetchCategoryQuery,
	useDeleteCategoryMutation
} from "./api/expensesApi/CategoryApi";

export {
	useFetchExpenseQuery,
	useAddExpensesMutation,
	useDeleteExpensesMutation
} from "./api/expensesApi/ExpensesApi";
