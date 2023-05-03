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
const Case = lazy(() => import("./../../pages/Case/Case"));
const Header = lazy(() => import("../../components/header/Header"));
const Sidebar = lazy(() => import("../../components/sidebar/Sidebar"));
const Custommer = lazy(()=>import("../../pages/parties/Custommer"));
const Seller = lazy(()=> import("../../pages/parties/Seller") );
const SaleOrder = lazy(()=>import("../../pages/sale/SaleOrder"));
const Login = lazy(() => import("../../components/Auth/Login"));
const Register = lazy(() => import("../../components/Auth/Register"));

import ProtectedRoute from "./ProtectedRout";

const RouteConfig = () => {

	return (

		<>
			
			<Suspense fallback={<div className="se-pre-con"></div>}>

				<Routes>

					
					<Route key={"/"} path="/" element={<Login />} />
					<Route key={"/SignUp"} path="/SignUp" element={<Register />} />
					<Route key={"/Home"} path="/Home" element={<ProtectedRoute><Header/><Sidebar/><Dashboard /></ProtectedRoute>} />
					<Route key={"SaleInvoice"} path="/SaleInvoice" element={<ProtectedRoute><Header/><Sidebar/><SaleInvoice /></ProtectedRoute>} />
					<Route key={"PaymentIn"} path="/PaymentIn" element={<ProtectedRoute><Header/><Sidebar/><PaymentIn /></ProtectedRoute>} />
					<Route key={"SaleOrder"} path="/SaleOrder" element={<ProtectedRoute><Header/><Sidebar/><SaleOrder /></ProtectedRoute>} />
					<Route key={"SaleReturn"} path="/SaleReturn" element={<ProtectedRoute><Header/><Sidebar/><SaleReturn /></ProtectedRoute>} />
					<Route key={"PurchaseBill"} path="/PurchaseBill" element={<ProtectedRoute><Header/><Sidebar/><PurchaseBill /></ProtectedRoute>} />
					<Route key={"Custommer"} path="/Custommer" element={<ProtectedRoute><Header/><Sidebar/><Custommer /></ProtectedRoute>} />
					<Route key={"Items"} path="/Items" element={<ProtectedRoute><Header/><Sidebar/><Items /></ProtectedRoute>} />
					<Route key={"PaymentOut"} path="/PaymentOut" element={<ProtectedRoute><Header/><Sidebar/><PaymentOut /></ProtectedRoute>} />
					<Route key={"Seller"} path="/Seller" element={<ProtectedRoute><Header/><Sidebar/><Seller /></ProtectedRoute>} />
					<Route key={"PurchaseReturn"} path="/PurchaseReturn" element={<ProtectedRoute><Header/><Sidebar/><PurchaseReturn /></ProtectedRoute>} />
					<Route key={"Expanses"} path="/Expanses" element={<ProtectedRoute><Header/><Sidebar/><Expanses /></ProtectedRoute>} />
					<Route key={"Cash"} path="/Cash" element={<ProtectedRoute><Header/><Sidebar/><Case /></ProtectedRoute>} />
				</Routes>
			</Suspense>
		</>

	);

};

export default RouteConfig;
