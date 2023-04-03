// import Sidebar from "../../components/sidebar/Sidebar";
// import Header from "../../components/header/Header";
import SortableTable from "../../components/Table/SortableTable";
import Form from "../../components/forms/Form";
import Report from "../../components/report/Report";


function SaleInvoice() {
	
	const data = [

		{
			Date: "01/02/2023", Invoice_No: 1, Party_Name: "Praful khuman", Type: "Sale", Amount: 10500, Balance: 500, Due_Date: "01/03/2023", Status: "Paid" , 
		},
		{
			Date: "02/02/2023", Invoice_No: 2, Party_Name: "jeenal", Type: "Purchase", Amount: 500, Balance: 200, Due_Date: "06/03/2023", Status: "UnPaid", 
		},
		{
			Date: "01/02/2023", Invoice_No: 1, Party_Name: "Praful khuman", Type: "Sale", Amount: 10500, Balance: 500, Due_Date: "01/03/2023", Status: "Paid", 
		},
		{
			Date: "02/02/2023", Invoice_No: 2, Party_Name: "jeenal", Type: "Purchase", Amount: 500, Balance: 200, Due_Date: "06/03/2023", Status: "UnPaid", 
		},

	];

	const config = [
		{
			label: "Date",
			render: (data) => data.Date,
			sortValue: (data) => data.Date,
		},
		{
			label: "Invoice No",
			render: (data) => data.Invoice_No,
		},
		{
			label: "Party Name",
			render: (data) => data.Party_Name,
			sortValue: (data) => data.Party_Name,

		},
		{
			label: "Type",
			render: (data) => data.Type,
			sortValue: (data) => data.Type,

		},
		{
			label: "Amount",
			render: (data) => data.Amount,
			sortValue: (data) => data.Amount,

		},
		{
			label: "Balance",
			render: (data) => data.Balance,
			sortValue: (data) => data.Balance,

		},
		{
			label: "Due Date",
			render: (data) => data.Due_Date,
			sortValue: (data) => data.Due_Date,

		},
		{
			label: "Status",
			render: (data) => data.Status,
			sortValue: (data) => data.Status,

		},
		

	];

	const keyfn = (item) => item.name;

	return (
		<>
			{/* <Header />
			<Sidebar /> */}

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span>Payment In</span>
							<div className="invoice_No mr-3 " >
								<Report />
							</div>
						</div>
						<div className="card-body row ml-2">

							<div className="card panel col-mg-3" style={{ backgroundColor: "#cce6ff" }}>
								<h6 className="card-title">Paid</h6>
								<h5 className="card-text"> ₹ 30000</h5>
							</div>
							<span className="ml-3 mr-3 mt-4">+</span>
							<div className="card panel col-mg-3 " style={{ backgroundColor: "#ccf2ff" }}>
								<h6 className="card-title">Unpaid</h6>
								<h5 className="card-text"> ₹ 30000</h5>
							</div>
							<span className="ml-3 mr-3 mt-4">+</span>
							<div className="card panel col-mg-3" style={{ backgroundColor: "#ffebe6" }}>
								<h6 className="card-title">Overdue</h6>
								<h5 className="card-text"> ₹ 30000</h5>
							</div>
							<span className="ml-3 mr-3 mt-4">=</span>
							<div className="card panel col-mg-3" style={{ backgroundColor: "#cce6ff" }}>
								<h6 className="card-title">Total</h6>
								<h5 className="card-text"> ₹ 30000</h5>
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
									<Form file="Sale-Invoice" />
									{" "}
								</div>
							</div>

						</div>
						<div className="card-body panel_height">
							

							<div>
								<SortableTable data={data} config={config} keyfn={keyfn} file={"Invoice"}/>
							</div>
							

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleInvoice;
