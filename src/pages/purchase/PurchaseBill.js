import{ useFetchPurchaseBillQuery,useAddPurchaseBillMutation,useDeletePurchaseBillMutation } from "../../redux";
import { useAddPurchasePaymentMutation , useFatchPurchasePaymentQuery  , useUpdatePurchasePaymentMutation} from "../../redux";

import SortableTable from "../../components/Table/SortableTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Form from "../../components/forms/Form";
import Report from "../../components/report/Report";
import swal from "sweetalert";
import { useState , useEffect } from "react";

function PurchaseBill() {
	const [ AddPurchaseBill ] = useAddPurchaseBillMutation();
	const {data , error, isFetching } = useFetchPurchaseBillQuery();
	const [DeletePurchaseBill] = useDeletePurchaseBillMutation();
	
	const [AddPurchasePayment] = useAddPurchasePaymentMutation();
	const [UpdatePurchasePayment] = useUpdatePurchasePaymentMutation();
	const PurchasePayment = useFatchPurchasePaymentQuery();

	const [searchTerm , setSearchTerm] = useState("");
	const [printData , setPrintData] = useState([]);
	const [rows , setrows] = useState([]);

	useEffect(()=>{
		if(PurchasePayment.data){
			const data=PurchasePayment.data;
			setrows(data);
		}
	},[PurchasePayment]);


	const handlesubmit =async (row)=>{
		const Response = await AddPurchaseBill(row);
		if(Response.data === "ok"){
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!",
			});
		}
		const filter = rows?.filter((item) => item.partyName === row[1].PartyName);
		
		if (filter[0]?.partyName === row[1].PartyName) {
			const id = filter[0].id;
			const updatedPayment = {
				partyName: filter[0].partyName,
				total: filter[0].total + row[1].Total,
				Paid: filter[0].Paid + parseInt(row[1].Advance),
				Unpaid: filter[0].Unpaid + (row[1].Total - parseInt(row[1].Advance))
			};

			await UpdatePurchasePayment({id , updatedPayment});
			
		} else {
			const newPayment = {
				partyName: row[1].PartyName,
				total: row[1].Total,
				Paid: parseInt(row[1].Advance),
				Unpaid: row[1].Total - parseInt(row[1].Advance)
			};

			await AddPurchasePayment(newPayment);
			
		}

	};
	
	const filteredData = data?.filter((item) =>
		item[1]?.PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1]?.ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		item?.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1]?.DueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1]?.Total.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1]?.Advance.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(item[1]?.Total - item[1]?.Advance).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(item[1]?.Total - item[1]?.Advance === 0 ? "Paid" : "Unpaid").toLowerCase().includes(searchTerm.toLowerCase())

	);
	
	const handleSearch =(e)=>{
		setSearchTerm(e.target.value);
	};
	const handleDeleteRow=async (ID)=>{
		await DeletePurchaseBill(ID);
	};
	
	const handlePeintInvoice =(key)=>{
		const filteredPrintData = data?.filter((item) =>
			item.id === key 
		);

		setPrintData(filteredPrintData);
		
	};
	let Data=[];
	let content;
	if(isFetching){
		content = <Skeleton count={5} height={40}/>;
	}else if(error){
		console.log("error");
	}
	else{
		Data = filteredData?.map((item , index) =>({
			Id: index+1,
			Party_Name: item[1]?.PartyName,
			Order_No:item[1]?.ID,
			Date: item.timestamp,
			Due_Date:item[1]?.DueDate,
			Total_Amount:item[1]?.Total,
			Advance:item[1]?.Advance,
			Balance:item[1]?.Total-parseInt(item[1]?.Advance),
			Status:(item[1]?.Total -parseInt(item[1]?.Advance) === 0 ? "paid" : "Unpaid"),
			Action:item.id
		}));
		
	}
	
	
	const totalPaid = Data?.reduce(getPaid , 0);
	function getPaid(total , num){
		return total + parseInt(num.Advance) ;
	}

	const totalUnPaid = Data?.reduce(getUnPaid , 0);
	function getUnPaid(total , num){
		return total + parseInt(num.Balance) ;
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
			label: "Bill No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No,

		},
		{
			label: "Ref Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date,

		},
		{
			label: "Due Date",
			render: (Data) => Data.Due_Date,
			sortValue: (Data) => Data.Due_Date,

		},
		{
			label: "Amount",
			render: (Data) => Data.Total_Amount,
			sortValue: (Data) => Data.Total_Amount,

		},
		{
			label: "Paid",
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
							<div className="row">
								<div className="col">
									<h5 className="card-title">Purchase Bill</h5>
								</div>
								<div className="item_right mr-4">
									<Report file="PURCHASE-BILL" data={Data} config={config}/>
								</div>
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

					<div className="card mt-3">
						<div className="card-header">

							<span> TRANSACTIONS   </span>
							<div className="item_right row">
								
								<div className="col">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className=" bi bi-search"/></span>
										</div>
										<input type="text" className="form-control" placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" onChange={handleSearch} />
									</div>
								</div>
								<div className="col-5 ">
									{" "}
									<Form file="Purchase-Bill" onsubmit={handlesubmit}/>
									{" "}
								</div>
							</div>

						</div>
						<div className="card-body panel_height">

							{content || <SortableTable data={Data} config={config} keyfn={keyfn} file={"Purchase-Bill"} ID={handleDeleteRow}  billInfo={printData} printID={handlePeintInvoice}/> }

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default PurchaseBill;
