import Charts from "../../utility/charts/Charts";
import Linecharts from "../../utility/charts/Linecharts";


function Dashboard() {
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

											<h3 className="text-primary number">29.75 M</h3>
											<p className="stat-text ">Total Receive</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-secondary number">51.25 K</h3>
											<p className="stat-text">Total Pay</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-6 pl-xl-2">
								<div className="row">
									<div className="col-sm-6 pr-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-success number">166.89 M</h3>
											<p className="stat-text">Sale Order</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-danger number">1,250k</h3>
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
										Bar Chart
									</div>
									<div className="card-body">

										<div id="container">
											<Charts/>
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
									Area Chart
									</div>
									<div className="card-body">

										<div id="container">
											<Linecharts/>
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

											<h3 className="text-primary number">29.75 M</h3>
											<p className="stat-text ">Profit</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-secondary number">51.25 K</h3>
											<p className="stat-text">Loss</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-6 pl-xl-2">
								<div className="row">
									<div className="col-sm-6 pr-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-success number">166.89 M</h3>
											<p className="stat-text">Cash In Hand</p>
										</div>
									</div>
									<div className="col-sm-6 pl-sm-2 statistics-grid">
										<div className="card card_border border-primary-top p-4">

											<h3 className="text-danger number">1,250k</h3>
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
