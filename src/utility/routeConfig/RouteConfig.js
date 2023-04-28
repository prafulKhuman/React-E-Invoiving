import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
const Dashboard = lazy(() => import("../../pages/dashbord/Dashboard"));
const SaleInvoice = lazy(() => import("../../pages/sale/SaleInvoice"));
const PaymentIn = lazy(() => import("../../pages/sale/PaymentIn"));
const SaleReturn = lazy(() => import("../../pages/sale/SaleReturn"));
const PurchaseBill = lazy(() => import("../../pages/purchase/PurchaseBill"));
const Items = lazy(() => import("../../pages/Items/Items"));
const PaymentOut = lazy(() => import("../../pages/purchase/PaymentOut"));
const PurchaseReturn = lazy(() => import("../../pages/purchase/PurchasReturns"));
const Expanses = lazy(() => import("../../pages/Expenses/Expenses"));
const Case = lazy(() => import("../../pages/Case/Case"));
const Header = lazy(() => import("../../components/header/Header"));
const Sidebar = lazy(() => import("../../components/sidebar/Sidebar"));
const Custommer = lazy(()=>import("../../pages/parties/Custommer"));
const Seller = lazy(()=> import("../../pages/parties/Seller") );
const SaleOrder = lazy(()=>import("../../pages/sale/SaleOrder"));

const RouteConfig = () => {

	return (

		<>
			<Header />
			<Sidebar />
			<Suspense fallback={<div className="se-pre-con"></div>}>

				<Routes>

					<Route key={"/"} path="/" element={<Dashboard />} />
					<Route key={"SaleInvoice"} path="/SaleInvoice" element={<SaleInvoice />} />
					<Route key={"PaymentIn"} path="/PaymentIn" element={<PaymentIn />} />
					<Route key={"SaleOrder"} path="/SaleOrder" element={<SaleOrder />} />
					<Route key={"SaleReturn"} path="/SaleReturn" element={<SaleReturn />} />
					<Route key={"PurchaseBill"} path="/PurchaseBill" element={<PurchaseBill />} />
					<Route key={"Custommer"} path="/Custommer" element={<Custommer />} />
					<Route key={"Items"} path="/Items" element={<Items />} />
					<Route key={"PaymentOut"} path="/PaymentOut" element={<PaymentOut />} />
					<Route key={"Seller"} path="/Seller" element={<Seller />} />
					<Route key={"PurchaseReturn"} path="/PurchaseReturn" element={<PurchaseReturn />} />
					<Route key={"Expanses"} path="/Expanses" element={<Expanses />} />
					<Route key={"Cash"} path="/Cash" element={<Case />} />
				</Routes>
			</Suspense>
		</>

	);

};

export default RouteConfig;
