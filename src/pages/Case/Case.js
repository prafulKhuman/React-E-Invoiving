import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SortableTable from "../../components/Table/SortableTable";


function Case() {
	const data = [

		{
			Id:1,
			Transaction_Type:"Sale",
			Party_Name:"Khuman Praful",
			Date:"01/02/2023",
			Amount:200
		},
		{
			Id:2,
			Transaction_Type:"Purchase",
			Party_Name:"Jeenal",
			Date:"02/02/2023",
			Amount:500
		},

	];

	const config = [
		{
			label: "#",
			render: (data) => data.Id,
			sortValue: (data) => data.Id,
		},
		{
			label: "Transaction Type",
			render: (data) => data.Transaction_Type,
			sortValue: (data) => data.Transaction_Type,
		},
		{
			label: "Party Name",
			render: (data) => data.Party_Name,
			sortValue: (data) => data.Party_Name,

		},
		{
			label: "Transaction Date",
			render: (data) => data.Date,
			sortValue: (data) => data.Date,

		},
		{
			label: "Amount",
			render: (data) => data.Amount,
			sortValue: (data) => data.Amount,

		}

	];

	const keyfn = (item) => item.name;

	return (
		<>
			<Header />
			<Sidebar />

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header ">
							<div className="row">
								<div className="col-3 mt-2">
									<h5><label>Case In Hand - </label> <span style={{color:"green"}}> ₹ 1000</span></h5>
								</div>
                                
								<div className="invoice_No mr-3 col-1" >
									<i className="bi bi-printer-fill fa-2x"  />
								</div>
							</div>
						</div>

					</div>

					<div className="card mt-3 " >
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
								
							</div>

							
						</div>
						<div className="card-body panel_height">

							<SortableTable data={data} config={config} keyfn={keyfn} />

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default Case;
