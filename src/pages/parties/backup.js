
import SortableTable from "../../components/Table/SortableTable";
import MainTable from "../../components/Table/MainTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PartiesFrom from "../../containers/Parties/PartiesFrom";
import swal from "sweetalert";
import { useState } from "react";
// import Report from "../../components/report/Report";


import { useAddPartiesMutation , useFetchPartiesQuery , useDeletePartiesMutation} from "../../redux";
import { useFatchSaleInvoiceQuery , useFetchPaymentInOutQuery , useFetchSaleReturnQuery} from "../../redux";
import { useFetchPurchaseBillQuery } from "../../redux";

function Parties() {
	const [AddParties] = useAddPartiesMutation();
	const [DeleteParties] = useDeletePartiesMutation();
	const {data , error, isFetching } = useFetchPartiesQuery();
	const SaleResponse = useFatchSaleInvoiceQuery();
	const PurchaseResponse = useFetchPurchaseBillQuery();
	const SaleReturnResponse = useFetchSaleReturnQuery();
	const PaymentInResponse = useFetchPaymentInOutQuery();
	const [openParty , setOpenParty] = useState();
	const [SaleInfo , setSaleInfo] = useState([]);
	const [SaleReturnInfo , setSaleReturnInfo] = useState([]);
	const [PaymentInfo , setPaymentInfo] = useState([]);
	const [Choise , setChoise] = useState();

	const [searchParties , setSearchParties] = useState("");



	

	let PartyData ;
	if(openParty){
		// eslint-disable-next-line no-unused-vars
		PartyData = openParty[0];
	}

	

	const handleSubmit =async(data)=>{
		const response = await AddParties(data);
		if(response.data === "ok"){
			swal({
				title: "Parties Added !! ",
				icon: "success",
				button: "Done!",
			});
		}
	};

	const handleDeleteParty =(key)=>{
		swal({
			title: "Are you sure?",
			text: "Once Converted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {

			if (willDelete) {
				const response = await DeleteParties(key);
				if (response.data === "ok") {
					swal({
						title: "Party Removed!",
						icon: "success",
						button: "Done!",
					});
					
				}
			} else {
				swal("Your Data  is safe!");
			}
		});
	
	};

	const handleSearchPaties =(e)=>{
		setSearchParties(e.target.value);
	};

	const filteredData = data?.filter((item) =>
		item.PartyName.toLowerCase().includes(searchParties.toLowerCase())
	);

	let Data = [];
	let content ;
	if(isFetching){
		// eslint-disable-next-line no-unused-vars
		content = <Skeleton count={5} height={40}/>;
	}else if(error){
		console.log("error");
	}else{ 
		// eslint-disable-next-line no-unused-vars
		Data = filteredData?.map((item , index) => ({
			Id : index+1 ,
			PartiesName : item.PartyName ,
			PhoneNo : item.PhoneNo ,
			Email : item.Email , 
			Address : item.BillingAddress ,
			Action : item.id

			
		}));
	}
	
	const configTable = [
		{
			label: "#",
			render: (Data) => Data.Id,
			
		},
		{
			label: "PARTY",
			render: (Data) => Data.PartiesName,
			
		},
		{
			label: "",
			render: (Data) => Data.Action,
			
		},
		

	];
	

	
	
	const handleOpenParty = (key) => {
		const filteredParty = Data?.filter((item) => item.PartiesName === key);
		setOpenParty(filteredParty);

		if(SaleResponse.data){
			const PartiesObj = SaleResponse.data?.filter((item) => item[1].PartyName === key);
			setSaleInfo(PartiesObj);
		}
		if(PaymentInResponse.data){
			const PaymentIn = PaymentInResponse.data?.filter((item) => item.PartyName === key);
			setPaymentInfo(PaymentIn);
			
		}
		if(SaleReturnResponse.data){

			
			
			const SaleReturn = SaleReturnResponse.data.filter((item) => item[1].PartyName === key);
			setSaleReturnInfo(SaleReturn);
			
			
		}

		if(PurchaseResponse.data){
			const Purchase = PurchaseResponse.data.filter((item) => item[1].PartyName === key);
			setSaleReturnInfo(Purchase);
		}
			

		
		
	};
	
	const handleChoise = (e) => {
		setChoise(e.target.value);
	};

	
	const SaleReturnData = SaleReturnInfo?.map((item, index) => ({

		Id: index + 1,
		Order_No: item[1].ID,
		Date: item.timestamp,
		Due_Date: item[1].DueDate,
		Total_Amount: item[1].Total,
		Advance: parseInt(item[1].Advance),
		Balance: item[1].Total - parseInt(item[1].Advance),
		
		

	}));
	const totalSaleReturn = SaleReturnData?.reduce(getSaleReturn , 0);
	function getSaleReturn(total , num){
		return total + num.Total_Amount ;
	}

	const ReturnBalance = SaleReturnData?.reduce(getReturnBalance , 0);
	function getReturnBalance(total , num){
		return total + num.Balance ;
	}

	const ReturnPaid = SaleReturnData?.reduce(getReturnPaid , 0);
	function getReturnPaid(total , num){
		return total + num.Advance ;
	}

	
	const SaleReturnconfig = [
		{
			label: "#",
			render: (SaleReturnData) => SaleReturnData.Id,
			sortValue: (SaleReturnData) => SaleReturnData.Id,
		},
		
		{
			label: "Ref No",
			render: (SaleReturnData) => SaleReturnData.Order_No,
			sortValue: (SaleReturnData) => SaleReturnData.Order_No,

		},
		{
			label: "Transection Date",
			render: (SaleReturnData) => SaleReturnData.Date,
			sortValue: (SaleReturnData) => SaleReturnData.Date,

		},
		{
			label: "Due Date",
			render: (SaleReturnData) => SaleReturnData.Due_Date,
			sortValue: (SaleReturnData) => SaleReturnData.Due_Date,

		},
		{
			label: "Total Amount",
			render: (SaleReturnData) => SaleReturnData.Total_Amount,
			sortValue: (SaleReturnData) => SaleReturnData.Total_Amount,

		},
		{
			label: "Received",
			render: (SaleReturnData) => SaleReturnData.Advance,
			sortValue: (SaleReturnData) => SaleReturnData.Advance,

		},
		{
			label: "Balance",
			render: (SaleReturnData) => SaleReturnData.Balance,
			sortValue: (SaleReturnData) => SaleReturnData.Balance,

		},
		
		


	];
	const SaleReturnkeyfn = (item) => item.Id;

	const SaleData = SaleInfo?.map((item, index) => ({

		Id: index + 1,
		Order_No: item[1].ID,
		Date: item.timestamp,
		Due_Date: item[1].DueDate,
		Total_Amount: item[1].Total,
		Advance: parseInt(item[1].Advance),
		Balance: item[1].Total - parseInt(item[1].Advance),
		
		

	}));
	
	const totalSale = SaleData?.reduce(getSale , 0);
	function getSale(total , num){
		return total + num.Total_Amount ;
	}

	const totalSaleReceived = SaleData?.reduce(getSaleReceived , 0);
	function getSaleReceived(total , num){
		return total + num.Advance ;
	}

	const SaleBalance = SaleData?.reduce(getBalance , 0);
	function getBalance(total , num){
		return total + num.Balance ;
	}
	
	const Saleconfig = [
		{
			label: "#",
			render: (SaleData) => SaleData.Id,
			sortValue: (SaleData) => SaleData.Id,
		},
		
		{
			label: "Ref No",
			render: (SaleData) => SaleData.Order_No,
			sortValue: (SaleData) => SaleData.Order_No,

		},
		{
			label: "Transection Date",
			render: (SaleData) => SaleData.Date,
			sortValue: (SaleData) => SaleData.Date,

		},
		{
			label: "Due Date",
			render: (SaleData) => SaleData.Due_Date,
			sortValue: (SaleData) => SaleData.Due_Date,

		},
		{
			label: "Total Amount",
			render: (SaleData) => SaleData.Total_Amount,
			sortValue: (SaleData) => SaleData.Total_Amount,

		},
		{
			label: "Received",
			render: (SaleData) => SaleData.Advance,
			sortValue: (SaleData) => SaleData.Advance,

		},
		{
			label: "Balance",
			render: (SaleData) => SaleData.Balance,
			sortValue: (SaleData) => SaleData.Balance,

		},
		
		


	];
	const Salekeyfn = (item) => item.Id;

	const PaymentData = PaymentInfo?.map((item, index) => ({
		ID : index+1 ,
		receiptno : item.receiptno ,
		Description : item.Description ,
		TransectionType : item.TransectionType ,
		Date : item.timestamp ,
		Amount : item.Amount ,
		Action : item.id
	}));

	const PaymentIn = PaymentData?.filter((item) => item.TransectionType === "Payment-In");
	const totalPaymentIn = PaymentIn.reduce(getIn , 0);
	function getIn(total , num){
		return total + parseInt(num.Amount) ;
	}

	
	

	const Paymentconfig = [
		{
			label: "ID",
			render: (PaymentData) => PaymentData.ID,
			sortValue: (PaymentData) => PaymentData.ID,
		},
		{
			label: "Receipt No",
			render: (PaymentData) => PaymentData.receiptno,
			sortValue: (PaymentData) => PaymentData.receiptno,
		},
		{
			label: "Type",
			render: (PaymentData) => PaymentData.TransectionType,
			sortValue: (PaymentData) => PaymentData.TransectionType,

		},
		{
			label: "Description",
			render: (PaymentData) => PaymentData.Description,
			sortValue: (PaymentData) => PaymentData.Description,

		},
		{
			label: "Date",
			render: (PaymentData) => PaymentData.Date,
			sortValue: (PaymentData) => PaymentData.Date,

		},
		{
			label: "Amount",
			render: (PaymentData) => PaymentData.Amount,
			sortValue: (PaymentData) => PaymentData.Amount,

		},
	
	];

	const Paymentkeyfn = (item) => item.ID;

	
	
	
	
	
	return ( 
		<>
			
			<div className="main-content">

				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card ">

								<div className="card-header">

									<h4 >Parties</h4>
									<div className="invoice_No item_right" >
										<PartiesFrom onsubmit={handleSubmit}/>
									</div>

									
									
								</div>
								<div className="input-group invoice_No mt-3   ">
									<div className="input-group-prepend">
										<span className="input-group-text ml-5"><i className=" bi bi-search" /></span>
									</div>
									<input type="text" onChange={handleSearchPaties} className="form-control" placeholder="Search Parties" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body p_height">
									
									<div className="card-text"> 
									
										{content || <MainTable data={Data} config={configTable}  isopen={handleOpenParty}  isDelete={handleDeleteParty}/> }
										
									</div>
									
								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col">
											<h5 className="card-title">Name - {PartyData?.PartiesName}</h5>
										</div>
										<div className="item_right mr-4">
											{/* <Report/> */}
										</div>
									</div>
									
									<div className="card-text">		

										<div className="mt-1 row">
											<div className="col">
												<label>Phone - {PartyData?.PhoneNo}</label>
											</div>
											<div className="col-3">
												<label>Address - {PartyData?.Address}</label>
											</div>
											
										</div>
										<div className="mt-2 row">
											
											<div className="col">
												<label>Email - {PartyData?.Email}</label>
											</div>
											
											
										</div>

										
										
										
										

															
									</div>
								</div>
							</div>
							<div className="card mt-2 ">
								<div className="card-header">
									<div className="row">
										<span className="col"> {Choise} TRANSACTIONS   </span>
									
										<div className="col">
											
											<label className="btn btn-outline-success" style={{width : "100%"}}>Total <br/><span>{Choise === "Sale" ? totalSale : Choise === "SaleReturn" ? totalSaleReturn :0}</span></label>
										</div>

										<div className="col">

											<label className="btn btn-outline-success" style={{width : "100%"}}>Advance <br/> <span>{Choise === "Sale" ? totalSaleReceived : Choise === "SaleReturn" ? ReturnPaid : 0}</span></label>
										</div>

										<div className="col">
											{Choise === "PaymentIn" ? <label className="btn btn-outline-success" style={{width : "100%"}}>Payment In  <br/> <span>{totalPaymentIn}</span></label>
												: <label className="btn btn-outline-success" style={{width : "100%"}}>Balance <br/> <span>{Choise === "Sale" ? SaleBalance : Choise === "SaleReturn" ? ReturnBalance : 0}</span></label>
											}
										</div>

										<div className="form-group col-3">
										
											<select className="form-control" onChange={handleChoise} id="exampleFormControlSelect1">
												<option>Select.....</option>
												<option>Sale</option>
												<option>PaymentIn</option>
												<option>SaleReturn</option>
												
											</select>
										</div>
									</div>


								</div>
								<div className="card-body height">						
									<div>
										{Choise === "Sale" ? <SortableTable data={SaleData} config={Saleconfig} keyfn={Salekeyfn} /> :
											Choise === "PaymentIn" ? <SortableTable data={PaymentData} config={Paymentconfig} keyfn={Paymentkeyfn} /> : 
												Choise === "SaleReturn" ? <SortableTable data={SaleReturnData} config={SaleReturnconfig} keyfn={SaleReturnkeyfn} /> : ""}
									
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