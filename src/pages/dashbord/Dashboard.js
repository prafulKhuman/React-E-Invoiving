import Charts from "../../utility/charts/Charts";
import Linecharts from "../../utility/charts/Linecharts";
import { useFatchSalePaymentQuery, useFetchExpenseQuery, useFatchPurchasePaymentQuery, useFatchSaleInvoiceQuery, useFetchPurchaseBillQuery } from "../../redux";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function Dashboard() {
	const { user } = useUserAuth();
	const salePayment = useFatchSalePaymentQuery();
	const purchasePayment = useFatchPurchasePaymentQuery();
	const saleOrder = useFatchSaleInvoiceQuery();
	const expenses = useFetchExpenseQuery();
	const purchaseOrder = useFetchPurchaseBillQuery();

	const filterPayIn = salePayment.data?.filter((item) => item.UID === user.uid);

	const totalPayIn = filterPayIn?.reduce(getTotalSale, 0);
	function getTotalSale(total, num) {
		return total + num.total;
	}

	const filterPayOut = purchasePayment.data?.filter((item) => item.UID === user.uid);
	const totalPayOut = filterPayOut?.reduce(getTotalPayOut, 0);
	function getTotalPayOut(total, num) {
		return total + num.total;
	}

	const totalReceived = filterPayIn?.reduce(getTotalR, 0);
	function getTotalR(total, num) {
		return total + num.Received;
	}

	const totalPaid = filterPayOut?.reduce(getTotalP, 0);
	function getTotalP(total, num) {
		return total + num.Paid;
	}

	const filterExp = expenses.data?.filter((item) => item.UID === user.uid);
	const totalExp = filterExp?.reduce(getTotalExp, 0);
	function getTotalExp(total, num) {
		return total + parseInt(num.ExpAmount);
	}

	const Sub = (totalPayIn - totalPayOut - totalExp);
	const Case = (totalReceived - totalPaid - totalExp);

	const filterOrder = saleOrder.data?.filter((item) => item[2].UID === user.uid);
	const saleLength = filterOrder?.length;

	const filterPurchaseOrder = purchaseOrder.data?.filter((item) => item[2].UID === user.uid);
	const purchaseLength = filterPurchaseOrder?.length;
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

											<h3 className="text-primary number">₹{totalPayIn || <div className="spinner-border" role="status">
												<span className="sr-only">Loading...</span>
											</div>
											}</h3>
											<p className="stat-text ">Total Receive</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-secondary number">₹{totalPayOut || <div className="spinner-border" role="status">
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

											<h3 className="text-success number">{saleLength || <div className="spinner-border" role="status">
												<span className="sr-only">Loading...</span>
											</div>
											}</h3>
											<p className="stat-text">Sale Order</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-danger number">{purchaseLength || <div className="spinner-border" role="status">
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
											{saleOrder.isFetching
												? <><div className="spinner-border m-5" role="status">
													<span className="sr-only">Loading...</span>
												</div></>
												: <Charts />}
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

											{purchaseOrder.isFetching
												? <><div className="spinner-border m-5" role="status">
													<span className="sr-only">Loading...</span>
												</div></>
												: <Linecharts />}
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

											<h3 className="text-primary number">₹{purchaseLength
												? (Sub > 0 ? Sub : 0)
												: <div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text ">Profit</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-secondary number">₹{purchaseLength
												? (Sub < 0 ? Sub : 0)
												: <div className="spinner-border" role="status">
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

											<h3 className="text-success number">₹{purchaseLength
												? (Case > 0 ? Case : 0)
												: <div className="spinner-border" role="status">
													<span className="sr-only">Loading...</span>
												</div>
											}</h3>
											<p className="stat-text">Cash In Hand</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-danger number">₹{totalExp || <div className="spinner-border" role="status">
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
