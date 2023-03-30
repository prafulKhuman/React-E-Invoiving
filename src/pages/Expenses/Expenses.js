import ExpensesFrom from "../../containers/Expense/ExpensesFrom";
import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SortableTable from "../../components/Table/SortableTable";

function Expenses() {
	const data = [

		{
			category: "abc",
			Amount: "10000"
		},
		{
			category: "xyz",
			Amount: "20000"
		},

	];
	const config = [
		{
			label: "Category",
			render: (data) => data.category,
			sortValue: (data) => data.category,
		},
		{
			label: "Amount",
			render: (data) => data.Amount,
			sortValue: (data) => data.Amount,
		}

	];
	const Edata = [

		{

			Id: 1, Date: "01/02/2023", EXP_No: 1, Party_Name: "Praful khuman", Type: "Sale", Amount: 10500, Balance: 500, Due_Date: "01/03/2023", status: "Paid",
		},
		{
			Id: 2, Date: "02/02/2023", EXP_No: 2, Party_Name: "jeenal", Type: "Purchase", Amount: 500, Balance: 200, Due_Date: "06/03/2023", status: "UnPaid",
		},

	];

	const Econfig = [
		{
			label: "#",
			render: (Edata) => Edata.Id,
			sortValue: (Edata) => Edata.Id,
		},
		{
			label: "Date",
			render: (Edata) => Edata.Date,
			sortValue: (Edata) => Edata.Date,
		},
		{
			label: "Exp No",
			render: (Edata) => Edata.EXP_No,
			sortValue: (Edata) => Edata.EXP_No,
		},
		{
			label: "Party Name",
			render: (Edata) => Edata.Party_Name,
			sortValue: (Edata) => Edata.Party_Name,

		},
		{
			label: "Type",
			render: (Edata) => Edata.Type,
			sortValue: (Edata) => Edata.Type,

		},
		{
			label: "Amount",
			render: (Edata) => Edata.Amount,
			sortValue: (Edata) => Edata.Amount,

		},
		{
			label: "Balance",
			render: (Edata) => Edata.Balance,
			sortValue: (Edata) => Edata.Balance,

		},
		{
			label: "Due Date",
			render: (Edata) => Edata.Due_Date,
			sortValue: (Edata) => Edata.Due_Date,

		},
		{
			label: "Status",
			render: (Edata) => Edata.status,
			sortValue: (Edata) => Edata.status,

		},

	];
	const keyfn = (item) => item.name;

	return (
		<>
			<Header />
			<Sidebar />
			<div className="main-content">
				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card ">
								<div className="card-header">

									<h4 >Expenses</h4>
									<div className="invoice_No item_right" >
										<ExpensesFrom />
									</div>



								</div>
								<div className="input-group invoice_No mt-3   ">
									<div className="input-group-prepend">
										<span className="input-group-text ml-5"><i className=" bi bi-search" /></span>
									</div>
									<input type="text" className="form-control" placeholder="Search Parties" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body p_height">
									<div className="card-text ">
										
										<table className="table">
											<SortableTable data={data} config={config} keyfn={keyfn} />
										</table>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col">
											<h5 className="card-title">Category Name</h5>
										</div>
										<div className="card-text mr-5">
											<div className="col">Total</div>
										</div>
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
													<span className="input-group-text"><i className=" bi bi-search" /></span>
												</div>
												<input type="text" className="form-control" placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
											</div>
										</div>
									</div>
								</div>

								<div className="card-body  p_height">
									<div>
										<SortableTable data={Edata} config={Econfig} keyfn={keyfn} />
									</div>

								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</>
	);
}
export default Expenses;
