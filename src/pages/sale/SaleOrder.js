import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SortableTable from "../../components/Table/SortableTable";
import OrderForm from "../../containers/sale/OrderForm";

function SaleOrder() {
	const data = [

		{
			Id: 1,
			Party_Name: "Khuman Praful",
			Order_No: 1,
			Date: "01/02/2023",
			Due_Date: "02/02/2023",
			Total_Amount: 500,
			Balance: 200,
			Type: "Case",
			Status: "Unpaid",
			Action: "Print",
		},

	];

	const config = [
		{
			label: "#",
			render: (data) => data.Id,
			sortValue: (data) => data.Id,
		},
		{
			label: "Party Name",
			render: (data) => data.Party_Name,
			sortValue: (data) => data.Party_Name,
		},
		{
			label: "Order No",
			render: (data) => data.Order_No,
			sortValue: (data) => data.Order_No,

		},
		{
			label: "Order Date",
			render: (data) => data.Date,
			sortValue: (data) => data.Date,

		},
		{
			label: "Due Date",
			render: (data) => data.Due_Date,
			sortValue: (data) => data.Due_Date,

		},
		{
			label: "Total Amount",
			render: (data) => data.Total_Amount,
			sortValue: (data) => data.Total_Amount,

		},
		{
			label: "Balance",
			render: (data) => data.Balance,
			sortValue: (data) => data.Balance,

		},
		{
			label: "Transection Type",
			render: (data) => data.Type,
			sortValue: (data) => data.Type,

		},
		{
			label: "Status",
			render: (data) => data.Status,
			sortValue: (data) => data.Status,

		},
		{
			label: "Action",
			render: (data) => data.Action,

		},

	];

	const keyfn = (item) => item.name;

	return (
		<>
			<Header />
			<Sidebar />

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span>Sale Order</span>
							<div className="invoice_No mr-3 ">
								<i className="bi bi-printer-fill fa-2x" />
							</div>
						</div>

					</div>

					<div className="card mt-3 ">
						<div className="card-header">

							<span> TRANSACTIONS   </span>
							<div className="item_right row">
								
								<div className="col">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className=" bi bi-search"/></span>
										</div>
										<input type="text" className="form-control" placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
									</div>
								</div>
								<div className="col-5 ">
									{" "}
									<OrderForm />
									{" "}
								</div>
							</div>

							

						</div>
						<div className="card-body panel_height">

							<SortableTable data={data} config={config} keyfn={keyfn} file={"Invoice"}/>

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleOrder;
