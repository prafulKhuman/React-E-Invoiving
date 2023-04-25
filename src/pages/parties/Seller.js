
import SortableTable from "../../components/Table/SortableTable";
import MainTable from "../../components/Table/MainTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PartiesFrom from "../../containers/Parties/PartiesFrom";
import swal from "sweetalert";
import { useState } from "react";
// import Report from "../../components/report/Report";


import { useAddPartiesMutation , useFetchPartiesQuery , useDeletePartiesMutation} from "../../redux";
import {useFatchSaleInvoiceQuery , useFetchSaleReturnQuery , useFetchPaymentInOutQuery} from "../../redux";
let Combine ;
function Seller() {
	const [AddParties] = useAddPartiesMutation();
	const [DeleteParties] = useDeletePartiesMutation();
	const SaleInvoice = useFatchSaleInvoiceQuery();
	const SaleReturn = useFetchSaleReturnQuery();
	const PaymentIn = useFetchPaymentInOutQuery();
	const {data , error, isFetching } = useFetchPartiesQuery();
	const [openParty , setOpenParty] = useState();
	const [search , setSearch] = useState("");
	const [searchParties , setSearchParties] = useState("");
	
	
	const handleSearch =(e)=>{
		setSearch(e.target.value);
	};
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

	const filterType = data?.filter((item)=> item.PartyType === "Saller");
	
	const filteredData = filterType?.filter((item) =>
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
		
		const Saleinvoice = SaleInvoice.data?.filter((item) => item[1].PartyName === key);
		const Salereturn = SaleReturn.data?.filter((item) => item[1].PartyName === key);
		const Paymentin = PaymentIn.data?.filter((item) => item.PartyName === key && item.TransectionType === "Payment-In");

		const Obj1 = Saleinvoice.map((item)=>({
			
			Order_No: item[1].ID,
			Date: item.timestamp,
			Due_Date: item[1].DueDate,
			Total_Amount: item[1].Total,
			Advance: item[1].Advance ,
			Type : "Sale-Invoice"
			
		}));

		
		
		const Obj2 = Salereturn?.map((item )=>({
			
			Order_No: item[1].ID,
			Date: item.timestamp,
			Due_Date: item[1].DueDate,
			Total_Amount: item[1].Total,
			Advance: item[1].Total ,
			Type : "Sale-Return"
			
		}));

		const Obj3 = Paymentin?.map((item)=>({
			
			Order_No: item.receiptno,
			Date: item.timestamp,
			Due_Date: item.timestamp,
			Total_Amount: item.Amount,
			Advance: item.Amount ,
			Type : item.TransectionType 
			
		}));
		console.log(Obj2 , "obj3");
		Combine = [...Obj1 , ...Obj2 , ...Obj3] ;
		
	};
	
	const filteredRecord = Combine?.filter((item) =>

		item.Id?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Order_No?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Date?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Due_Date?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Total_Amount?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Advance?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Type?.toString().toLowerCase().includes(search.toLowerCase()) 

	);
	// console.log(filteredRecord , "fil");
	const Record = filteredRecord?.map((item , index)=>({
		No: index + 1,
		Order_No: item.Order_No,
		Date: item.Date,
		Due_Date: item.Due_Date,
		Total_Amount: item.Total_Amount,
		Advance: item.Advance ,
		Type: item.Type
	}));
	// console.log(Record , "record");
	const Finalconfig = [
		{
			label: "#",
			render: (Record) => Record.No,
			sortValue: (Record) => Record.No,
		},
		
		{
			label: "Ref No",
			render: (Record) => Record.Order_No,
			sortValue: (Record) => Record.Order_No,

		},
		{
			label: "Transection Type",
			render: (Record) => Record.Type,
			sortValue: (Record) => Record.Type,

		},
		{
			label: "Transection Date",
			render: (Record) => Record.Date,
			sortValue: (Record) => Record.Date,

		},
		{
			label: "Due Date",
			render: (Record) => Record.Due_Date,
			sortValue: (Record) => Record.Due_Date,

		},
		{
			label: "Total Amount",
			render: (Record) => Record.Total_Amount,
			sortValue: (Record) => Record.Total_Amount,

		},
		{
			label: "Done",
			render: (Record) => Record.Advance,
			sortValue: (Record) => Record.Advance,

		}
		
		
		


	];
	const keyfn = (item) => item.No;

	
	
	
	
	
	
	return ( 
		<>
			
			<div className="main-content">

				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card ">

								<div className="card-header">
									<div className="row">
										<div className="col mt-4">
											
											<span className="font-weight-bold h5" >  Seller  </span>
										</div>

										<div className="col-4 mr-2" >
											<PartiesFrom onsubmit={handleSubmit} />
										</div>
										
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
										<span className="col">  TRANSACTIONS   </span>
									
										<div className="col">
											
											<label className="btn btn-outline-success" style={{width : "100%"}}>Total <br/><span></span></label>
										</div>

										<div className="col">

											<label className="btn btn-outline-success" style={{width : "100%"}}>Advance <br/> <span></span></label>
										</div>

										<div className="col">
											<label className="btn btn-outline-success" style={{width : "100%"}}>Balance <br/> <span></span></label>
											
										</div>

										<div className="form-group col-3">
										
											
											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text"><i className=" bi bi-search" /></span>
												</div>
												<input type="text" className="form-control"  placeholder="Search Transaction" onChange={handleSearch} aria-label="SearchTransection" aria-describedby="basic-addon1" />
											</div>
											
										</div>
									</div>


								</div>
								<div className="card-body height">						
									<div>
										{Combine ? 	<SortableTable data={Record} config={Finalconfig} keyfn={keyfn} /> : <Skeleton count={5} height={40}/>}
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

export default Seller;