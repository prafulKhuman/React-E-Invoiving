
import SortableTable from "../../components/Table/SortableTable";
import PartiesFrom from "../../containers/Parties/PartiesFrom";
import Report from "../../components/report/Report";
function Parties() {
	
	const data = [

		{
			Party:"Khuman Praful",
			Amount:"10000"
		},
		{
			Party:"Kantesariya Jeenal",
			Amount:"20000"
		},

	];
	const config = [
		{
			label: "PARTY",
			render: (data) => data.Party,
			sortValue: (data) => data.Party,
		},
		{
			label: "Amount",
			render: (data) => data.Amount,
			sortValue: (data) => data.Amount,
		}

	];
	const partiesdata = [

		{
			transaction_type: "Sale",
			ref_no: 1,
			date: "01/02/2023",
			due_date: "02/02/2023",
			total: "300",
			balance: "100"

		},
		{
			transaction_type: "Sale",
			ref_no: 2,
			date: "01/02/2023",
			due_date: "02/02/2023",
			total: "500",
			balance: "400"
		}
		

	];
	const partiesconfig = [
		{
			label: "Transaction Type",
			render: (partiesdata) => partiesdata.transaction_type,
			sortValue: (partiesdata) => partiesdata.transaction_type,
		},
		{
			label: "Ref No ",
			render: (partiesdata) => partiesdata.ref_no,
			sortValue: (partiesdata) => partiesdata.ref_no,
		},
		{
			label: "Transaction Date",
			render: (partiesdata) => partiesdata.date,
			sortValue: (partiesdata) => partiesdata.date,
		},
		{
			label: "Due Date",
			render: (partiesdata) => partiesdata.due_date,
			sortValue: (partiesdata) => partiesdata.due_date,
		},
		{
			label: "Total",
			render: (partiesdata) => partiesdata.total,
			sortValue: (partiesdata) => partiesdata.total,
		},
		{
			label: "Balance",
			render: (partiesdata) => partiesdata.balance,
			sortValue: (partiesdata) => partiesdata.balance,
		}

	];

	const keyfn = (item) => item.name;

	return ( 
		<>
			
			<div className="main-content">

				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card">

								<div className="card-header">

									<h4 >Parties</h4>
									<div className="invoice_No item_right" >
										<PartiesFrom />
									</div>

									
									
								</div>
								<div className="input-group invoice_No mt-3   ">
									<div className="input-group-prepend">
										<span className="input-group-text ml-5"><i className=" bi bi-search" /></span>
									</div>
									<input type="text" className="form-control" placeholder="Search Parties" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body p_height">
									
									<div className="card-text"> 
									
										<SortableTable data={data} config={config} keyfn={keyfn} /> 
										
									</div>
									
								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col">
											<h5 className="card-title">Name - Khuman Praful</h5>
										</div>
										<div className="item_right mr-4">
											<Report/>
										</div>
									</div>
									
									<div className="card-text">		

										<div className="mt-1">
											<label>Phone - 7096984290</label>
										</div>
										<div className="mt-2">
											<label>Email - KhumanPraful11@gmail.com</label>
										</div>

															
									</div>
								</div>
							</div>
							<div className="card mt-3 panel_height">
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
								<div className="card-body">						
									<div>
										<SortableTable data={partiesdata} config={partiesconfig} keyfn={keyfn} /> 
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

export default Parties;