import Charts from "../../utility/charts/Charts";
import Linecharts from "../../utility/charts/Linecharts";
import {useFatchSalePaymentQuery , useFetchExpenseQuery , useFatchPurchasePaymentQuery , useFatchSaleInvoiceQuery , useFetchPurchaseBillQuery} from "../../redux";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function Dashboard() {
	const {user} = useUserAuth();
	const SalePayment = useFatchSalePaymentQuery();
	const PurchasePayment = useFatchPurchasePaymentQuery();
	const SaleOrder = useFatchSaleInvoiceQuery();
	const Expenses = useFetchExpenseQuery();
	const PurchaseOrder = useFetchPurchaseBillQuery();
	

	
	
	

	const filterPayIn = SalePayment.data?.filter((item)=>item.UID === user.uid);
	
	const TotalPayIn = filterPayIn?.reduce(getTotalSale, 0);
	function getTotalSale(total, num) {
		return total + num.total;
	}

	const TotalReceived = filterPayIn?.reduce(getTotalR, 0);
	function getTotalR(total, num) {
		return total + num.Received;
	}

	const filterPayOut =  PurchasePayment.data?.filter((item)=>item.UID === user.uid);
	const TotalPayOut =filterPayOut?.reduce(getTotalPayOut, 0);
	function getTotalPayOut(total, num) {
		return total + num.total;
	}

	const TotalPaid =filterPayOut?.reduce(getTotalP, 0);
	function getTotalP(total, num) {
		return total + num.Paid;
	}

	const filterExp =  Expenses.data?.filter((item)=>item.UID === user.uid);
	const TotalExp = filterExp?.reduce(getTotalExp, 0);
	function getTotalExp(total, num) {
		return total + parseInt(num.ExpAmount);
	}

	const Sub = (TotalReceived - TotalPaid - TotalExp) ;

	const filterOrder =  SaleOrder.data?.filter((item)=>item[2].UID === user.uid);
	const SaleLength = filterOrder?.length ;

	const filterPurchaseOrder =  PurchaseOrder.data?.filter((item)=>item[2].UID === user.uid);
	const PurchaseLength = filterPurchaseOrder?.length ;
	return (
		<section>

			
			<div className="main-content">

				<div className="container-fluid content-top-gap">

					<div className="welcome-msg pt-3 pb-4">
						<h1>Hello, Welcome back</h1>

					</div>

					<div className="statistics">
						<div className="row">
							<div className="col-xl-6 pr-xl-2">
								<div className="row">
									<div className="col-sm-6 pr-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-primary number">₹{TotalPayIn ? TotalPayIn :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text ">Total Receive</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-secondary number">₹{TotalPayOut ? TotalPayOut :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text">Total Pay</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-6 pl-xl-2">
								<div className="row">
									<div className="col-sm-6 pr-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-success number">{SaleLength ? SaleLength :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text">Sale Order</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-danger number">{PurchaseLength ? PurchaseLength :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text">Purchased Order</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="chart mt-3">
						<div className="row">
							<div className="col-lg-6 pr-lg-2 chart-grid">
								<div className="card text-center card_border">
									<div className="card-header chart-grid__header">
										Sale Chart
									</div>
									<div className="card-body">

										<div id="container mr-8" >
											{SaleOrder.isFetching ? <><div className="spinner-border m-5" role="status">
												<span className="sr-only">Loading...</span>
											</div></> : <Charts />}
										</div>

									</div>
									<div className="card-footer text-muted chart-grid__footer">
										Updated Just Now
									</div>
								</div>
							</div>
							<div className="col-lg-6 pl-lg-2 chart-grid">
								<div className="card text-center card_border">
									<div className="card-header chart-grid__header">
									Purchase Chart
									</div>
									<div className="card-body">

										<div id="container">
											
											{PurchaseOrder.isFetching ? <><div className="spinner-border m-5" role="status">
												<span className="sr-only">Loading...</span>
											</div></> : <Linecharts/>}
										</div>

									</div>
									<div className="card-footer text-muted chart-grid__footer">
										Updated just now
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="statistics mt-3">
						<div className="row">
							<div className="col-xl-6 pr-xl-2">
								<div className="row">
									<div className="col-sm-6 pr-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-primary number">₹{PurchaseLength ? (Sub > 0 ? Sub : 0 ) :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text ">Profit</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-secondary number">₹{PurchaseLength ? (Sub < 0 ? Sub : 0 )  :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text">Loss</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-6 pl-xl-2">
								<div className="row">
									<div className="col-sm-6 pr-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-success number">₹{PurchaseLength ? (Sub > 0 ? Sub : 0 ) :
												<div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text">Cash In Hand</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-danger number">₹{TotalExp ? TotalExp :
												<div className="spinner-border" role="status">
												<span className="sr-only">Loading...</span>
											</div>
											}</h3>
											<p className="stat-text">Expanses</p>
										</div>
									</div>
									
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		</section>

	);
}

export default Dashboard;
