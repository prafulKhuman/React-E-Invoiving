import { lazy, Suspense } from "react";
import { Routes, Route} from "react-router-dom";
const Dashboard = lazy(()=>import("../../pages/dashbord/Dashboard"));
const SaleInvoice = lazy(()=>import("../../pages/sale/SaleInvoice"));
const PaymentIn = lazy(()=>import("../../pages/sale/PaymentIn"));
const SaleOrder = lazy(()=>import("../../pages/sale/SaleOrder"));
const SaleReturn = lazy(()=>import("../../pages/sale/SaleReturn"));
const PurchaseBill = lazy(()=>import("../../pages/purchase/PurchaseBill"));
const Parties = lazy(()=>import("../../pages/parties/Parties"));
const Items = lazy(()=>import("../../pages/Items/Items"));
const PaymentOut = lazy(()=>import("../../pages/purchase/PaymentOut")); 
const PurchaseOrder = lazy(()=>import("../../pages/purchase/PurchaseOrder"));
const PurchaseReturn = lazy(()=>import("../../pages/purchase/PurchasReturns"));
const Expanses = lazy(()=>import("../../pages/Expenses/Expenses"));
const Case = lazy(()=>import("../../pages/Case/Case"));
 

const RouteConfig = () => {

	return(
		<Suspense fallback={
			<div className="se-pre-con"></div>
		}>
			<Routes>
				<Route key={"/"} path="/" element={<Dashboard/>} />
				<Route key={"SaleInvoice"} path="/SaleInvoice" element={<SaleInvoice/>} />
				<Route key={"PaymentIn"} path="/PaymentIn" element={<PaymentIn/>} />
				<Route key={"SaleOrder"} path="/SaleOrder" element={<SaleOrder/>} />
				<Route key={"SaleReturn"} path="/SaleReturn" element={<SaleReturn/>} />
				<Route key={"PurchaseBill"} path="/PurchaseBill" element={<PurchaseBill/>} />
				<Route key={"Parties"} path="/Parties" element={<Parties/>} />
				<Route key={"Items"} path="/Items" element={<Items/>} />
				<Route key={"PaymentOut"} path="/PaymentOut" element={<PaymentOut/>} />
				<Route key={"PurchaseOrder"} path="/PurchaseOrder" element={<PurchaseOrder/>} />
				<Route key={"PurchaseReturn"} path="/PurchaseReturn" element={<PurchaseReturn/>} />
				<Route key={"Expanses"} path="/Expanses" element={<Expanses/>} />
				<Route key={"Cash"} path="/Cash" element={<Case/>} />
			</Routes>
		</Suspense>
	);

};

export default RouteConfig;
