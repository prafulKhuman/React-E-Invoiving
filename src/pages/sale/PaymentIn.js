
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SortableTable from "../../components/Table/SortableTable";
import Report from "../../components/report/Report";
import PaymentInOut from "../../components/PaymentInOut/PaymentInOut";
import {useAddPaymentInOutMutation , useFetchPaymentInOutQuery , useDeletePaymentInOutMutation} from "../../redux";
import swal from "sweetalert";

function PaymentIn() {
	const [AddPaymentInOut] = useAddPaymentInOutMutation();
	const { data, error, isFetching } = useFetchPaymentInOutQuery();
	const [DeletePaymentInOut] = useDeletePaymentInOutMutation();
	const [searchTerm, setSearchTerm] = useState("");
	const [printData , setPrintData] = useState([]);

	
	const handleSubmit =async(key)=>{
		console.log(key);
		const response = await AddPaymentInOut(key);
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
				const response = await DeletePaymentInOut(ID);
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

		item.TransectionType === "Payment-In" ?
			item.Amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.Date.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.receiptno.toLowerCase().includes(searchTerm.toLowerCase())  ||
			item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())
			: ""
	);

	const handlePeintInvoice =(key)=>{
		
		const filteredPrintData = data?.filter((item) =>
			item.id === key 
		);

		setPrintData(filteredPrintData);
		//console.log(printData , " print");
	};

	// eslint-disable-next-line no-unused-vars
	let Data = [];
	// eslint-disable-next-line no-unused-vars
	let content;
	if (isFetching) {
	
		content = <Skeleton count={5} height={40} /> ;
	}
	else if (error) {
		console.log(error);
	} else {
		
		Data = filteredData?.map((item, index) => ({
			ID : index+1 ,
			PartyName : item.PartyName ,
			receiptno : item.receiptno ,
			Description : item.Description ,
			Date : item.timestamp ,
			Amount : item.Amount ,
			Action : item.id
		}));
	}
	
	const config = [
		{
			label: "ID",
			render: (Data) => Data.ID,
			sortValue: (Data) => Data.ID,
		},
		{
			label: "Receipt No",
			render: (Data) => Data.receiptno,
			sortValue: (Data) => Data.receiptno,
		},
		{
			label: "Party Name",
			render: (Data) => Data.PartyName,
			sortValue: (Data) => Data.PartyName,

		},
		{
			label: "Description",
			render: (Data) => Data.Description,
			sortValue: (Data) => Data.Description,

		},
		{
			label: "Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date,

		},
		{
			label: "Amount",
			render: (Data) => Data.Amount,
			sortValue: (Data) => Data.Amount,

		},
		{
			label: "Action",
			render: (Data) => Data.Action,
			sortValue: (Data) => Data.Action,

		}
	];

	const keyfn = (item) => item.ID;

	return (
		<>
		

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span className=" font-weight-bold">Payment In</span>
							<div className="invoice_No mr-3 " >
								<Report file="PAYMENT-IN" data={Data} config={config}/>
							</div>
						</div>

					</div>

					<div className="card mt-3 " >
						<div className="card-header">

							<span className=" font-weight-bold"> TRANSACTIONS   </span>
							<div className="item_right row">
								
								<div className="col">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className=" bi bi-search"/></span>
										</div>
										<input type="text" onChange={handleSearch} className="form-control" placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
									</div>
								</div>
								<div className="col-5 ">
									{" "}
									<PaymentInOut file="Payment-In" AddData={handleSubmit}/>
									{" "}
								</div>
								
							</div>

							
						</div>
						<div className="card-body panel_height">

							{content || <SortableTable data={Data} config={config} keyfn={keyfn}  ID={handleDeleteRow} file={"PAYMENT-IN"} billInfo={printData} printID={handlePeintInvoice}  /> }


						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default PaymentIn;
