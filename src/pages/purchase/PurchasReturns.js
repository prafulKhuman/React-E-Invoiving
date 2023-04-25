import{ useFetchPurchaseReturnQuery,useDeletePurchaseReturnMutation,useAddPurchaseReturnMutation} from "../../redux";
import { useFatchPurchasePaymentQuery  , useUpdatePurchasePaymentMutation} from "../../redux";

import SortableTable from "../../components/Table/SortableTable";
import Form from "../../components/forms/Form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState , useEffect} from "react";
import Report from "../../components/report/Report";
import swal from "sweetalert";
function PurchasReturn()
{
	const [AddPurchaseReturn]=useAddPurchaseReturnMutation();
	const {data,error,isFetching}=useFetchPurchaseReturnQuery();
	const[DeletePurchaseReturn]=useDeletePurchaseReturnMutation();

	
	const [UpdatePurchasePayment] = useUpdatePurchasePaymentMutation();
	const PurchasePayment = useFatchPurchasePaymentQuery();


	const [searchTerm,setSearchTerm] = useState("");
	const [printData , setPrintData] = useState([]);
	const [rows , setrows] = useState([]);

	useEffect(()=>{
		if(PurchasePayment.data){
			const data=PurchasePayment.data;
			setrows(data);
		}
	},[PurchasePayment]);

	const handlesubmit =async (row) =>{
		const response =await AddPurchaseReturn(row);  
		if(response.data === "ok"){
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!",
			});
		}

		const filter = rows?.filter((item) => item.partyName === row[1]?.PartyName);

		if (filter) {
			/* eslint-disable no-unused-vars */
			const id = filter[0].id;
			let Paid ;
			let Unpaid ;
			
			if(filter[0].Pending >= row[1].Total){
				Unpaid = filter[0].Unpaid - row[1].Total ;
				Paid = filter[0].Paid ;
			} else{
				let Sub = row[1].Total - filter[0].Unpaid ;
				Unpaid = 0 ;
				Paid = filter[0].Paid - Sub ;
			}
			
			
			const updatedPayment = {
				partyName: filter[0].partyName,
				total: filter[0].total - row[1].Total,
				Paid: Paid ,
				Unpaid: Unpaid
			};

			await UpdatePurchasePayment({id , updatedPayment});
			
		} else {
			//
		}  
	};
	const filteredData =data?.filter((item)=>
		item[1].PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
	item[1].ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
	item.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
	item[1].DueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
	item[1].Total.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
	item[1].Advance.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
	(item[1].Total - item[1].Advance).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
	(item[1].Total - item[1].Advance === 0 ? "Paid" : "Unpaid").toLowerCase().includes(searchTerm.toLowerCase())

	);
	const handleSearch = (e) =>{
		setSearchTerm(e.target.value);
	};
	const handleDeleteRow = async (ID) =>{
		await DeletePurchaseReturn(ID);
	};
	const handlePeintInvoice = (key) =>{
		const filteredPrintData = data?.filter((item)=>
			item.id === key
		);
		setPrintData(filteredPrintData);
	};
	let Data = [];
	let content;
	if (isFetching){
		content = <Skeleton count={5} height={40} />;
	}
	else if(error){
		console.log("error");
	}
	else{
		Data = filteredData?.map((item,index)=>({
			Id:index+1,
			Party_Name:item[1].PartyName,
			Order_No:item[1].ID,
			Date:item.timestamp,
			Due_Date:item[1].DueDate,
			Total_Amount:item[1].Total,
			Advance:item[1].Advance,
			Balance:item[1].Total-parseInt(item[1].Advance),
			Status:(item[1].Total-parseInt(item[1].Advance)===0 ? "paid":"Unpaid"),
			Action: item.Id
		}));

	}

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
			label: "Ref No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No,

		},
		{
			label: "Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date,

		},
		{
			label: "Due Date ",
			render: (Data) => Data.Due_Date,
			sortValue: (Data) => Data.Due_Date,

		},
		{
			label: "Amount",
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

	return (
		<>
		
			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span className=" font-weight-bold">Purchase Return</span>
							<div className="invoice_No mr-3 " >
								<Report file="PURCHASE-RETURN" data={Data} config={config}/>

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
											<span className="input-group-text"><i className=" bi bi-search"/></span>
										</div>
										<input type="text" className="form-control" onChange={handleSearch} placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
									</div>
								</div>
								
								<div className="col-5 ">
									
									{" "}
									<Form file="Purchase-Return" onsubmit={handlesubmit}/>
									{" "}
								</div>
							</div>
						</div>
						<div className="card-body panel_height">
							{content || <SortableTable data={Data} config={config} keyfn={keyfn} file={"Sale-Order"} ID={handleDeleteRow}  billInfo={printData} printID={handlePeintInvoice}/> }
						</div>
					</div>

				</div>
			</div>

		</>
	);

}
export default PurchasReturn;