
import SortableTable from "../../components/Table/SortableTable";
import Form from "../../components/forms/Form";
import { useAddSaleInvoiceMutation, useFatchSaleInvoiceQuery , useDeleteSaleInvoiceMutation} from "../../redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import Report from "../../components/report/Report";
import swal from "sweetalert";

function SaleInvoice() {
	const [AddSaleInvoice] = useAddSaleInvoiceMutation();
	const { data, error, isFetching } = useFatchSaleInvoiceQuery();
	const [DeleteSaleInvoice] = useDeleteSaleInvoiceMutation();
	const [searchTerm, setSearchTerm] = useState("");
	const [printData , setPrintData] = useState([]);


	const handlesubmit =async (row) => {
		const response = await AddSaleInvoice(row);
		if(response.data === "ok"){
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!",
			});
		}
	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleDeleteRow=async (ID)=>{
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteSaleInvoice(ID);
				if (response.data === "ok") {
					swal("Data Deleted Success", {
						icon: "success",
					});
				}
			} else {
				swal("Your Data is safe!");
			}
		});
		
	};

	const filteredData = data?.filter((item) =>
		item[1].PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].DueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].Total.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].Advance.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(item[1].Total - item[1].Advance).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(item[1].Total - item[1].Advance === 0 ? "Paid" : "Unpaid").toLowerCase().includes(searchTerm.toLowerCase())

	);

	console.log(filteredData , "sale") ;
	const handlePeintInvoice =(key)=>{
		
		const filteredPrintData = data?.filter((item) =>
			item.Id == key 
		);

		setPrintData(filteredPrintData);
		
	};

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40} /> ;
	}
	else if (error) {
		console.log(error);
	} else {
		Data = filteredData?.map((item, index) => ({

			Id: index + 1,
			Party_Name: item[1].PartyName,
			Order_No: item[1].ID,
			Date: item.timestamp,
			Due_Date: item[1].DueDate,
			Total_Amount: item[1].Total,
			Advance: parseInt(item[1].Advance),
			Balance: item[1].Total - parseInt(item[1].Advance),
			Status: (item[1].Total - parseInt(item[1].Advance) === 0 ? "Paid" : "Unpaid"),
			Action: item.Id

		}));
	}

	
	const totalPaid = Data?.reduce(getPaid , 0);
	function getPaid(total , num){
		return total + num.Advance ;
	}

	const totalUnPaid = Data?.reduce(getUnPaid , 0);
	function getUnPaid(total , num){
		return total + num.Balance ;
	}
	// // const SumPaidUnPaid = filteredData?.reduce(getReceived , 0);
	// // function getReceived(total , num){
	// // 	return total + parseInt(num.Advance) ;
	// }
	
	const config = [
		{
			label: "#",
			render: (Data) => Data.Id,
			sortValue: (Data) => Data.Id,
		},
		{
			label: "Party Name",
			render: (Data) => Data.Party_Name,
			sortValue: (Data) => Data.Party_Name,
		},
		{
			label: "Invoice No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No,

		},
		{
			label: "Invoice Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date,

		},
		{
			label: "Due Date",
			render: (Data) => Data.Due_Date,
			sortValue: (Data) => Data.Due_Date,

		},
		{
			label: "Total Amount",
			render: (Data) => Data.Total_Amount,
			sortValue: (Data) => Data.Total_Amount,

		},
		{
			label: "Received",
			render: (Data) => Data.Advance,
			sortValue: (Data) => Data.Advance,

		},
		{
			label: "Balance",
			render: (Data) => Data.Balance,
			sortValue: (Data) => Data.Balance,

		},
		{
			label: "Status",
			render: (Data) => Data.Status,
			sortValue: (Data) => Data.Status,

		},
		{
			label: "Action",
			render: (Data) => Data.Action,
		},


	];

	const keyfn = (item) => item.Id;



	return(
		<>
			{/* <Header />
			<Sidebar /> */}

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span className="lead font-weight-bold">Payment</span>
							<div className="invoice_No mr-3 " >
								<Report file="SALE-INVOICE" data={Data} config={config}/>

							</div>
						</div>
						<div className="card-body row ml-2">

							<div className="card panel col-mg-3" style={{ backgroundColor: "#cce6ff" }}>
								<h6 className="card-title">Paid</h6>
								<h5 className="card-text"> ₹ {totalPaid}</h5>
							</div>
							<span className="ml-3 mr-3 mt-4">+</span>
							<div className="card panel col-mg-3 " style={{ backgroundColor: "#ccf2ff" }}>
								<h6 className="card-title">Unpaid</h6>
								<h5 className="card-text"> ₹ {totalUnPaid}</h5>
							</div>
							
							<span className="ml-3 mr-3 mt-4">=</span>
							<div className="card panel col-mg-3" style={{ backgroundColor: "#cce6ff" }}>
								<h6 className="card-title">Total</h6>
								<h5 className="card-text"> ₹ {totalPaid + totalUnPaid}</h5>
							</div>

						</div>
					</div>

					<div className="card mt-3 ">
						<div className="card-header">

							<span className=" font-weight-bold"> TRANSACTIONS   </span>

							<div className="item_right row">

								<div className="col">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className=" bi bi-search" /></span>
										</div>
										<input type="text" className="form-control" onChange={handleSearch} placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
									</div>
								</div>
								<div className="col-5 ">
									{" "}
									<Form file="Sale-Invoice" onsubmit={handlesubmit} />
									{" "}
								</div>
							</div>

						</div>
						<div className="card-body panel_height">


							<div>
								{content || <SortableTable data={Data} config={config} keyfn={keyfn}  ID={handleDeleteRow} file={"Sale-Invoice"}   billInfo={printData} printID={handlePeintInvoice}/> }
							</div>


						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleInvoice;
