
import SortableTable from "../../components/Table/SortableTable";
import MainTable from "../../components/Table/MainTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PartiesFrom from "../../containers/Parties/PartiesFrom";
import swal from "sweetalert";
import { useState } from "react";
// import Report from "../../components/report/Report";


import { useAddPartiesMutation , useFetchPartiesQuery , useDeletePartiesMutation} from "../../redux";
import { useFatchSaleInvoiceQuery } from "../../redux";
function Parties() {
	const [AddParties] = useAddPartiesMutation();
	const [DeleteParties] = useDeletePartiesMutation();
	const {data , error, isFetching } = useFetchPartiesQuery();
	const SaleResponse = useFatchSaleInvoiceQuery();
	const [openParty , setOpenParty] = useState();
	const [SaleInfo , setSaleInfo] = useState([]);
	const [Choise , setChoise] = useState();
	const [search , setSearch] = useState("");
	
	
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
			

		
		
	};

	const handleSearch =(e)=>{
		setSearch(e.target.value);
	};
	const handleChoise = (e) => {
		setChoise(e.target.value);
	};

	const filteredSale = SaleInfo?.filter((item) =>

		item[1].ID.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.timestamp.toLowerCase().includes(search.toLowerCase()) ||
		item[1].DueDate.toLowerCase().includes(search.toLowerCase()) ||
		item[1].Total.toString().toLowerCase().includes(search.toLowerCase()) ||
		item[1].Advance.toString().toLowerCase().includes(search.toLowerCase()) ||
		(item[1].Total - item[1].Advance).toString().toLowerCase().includes(search.toLowerCase()) ||
		(item[1].Total - item[1].Advance === 0 ? "Paid" : "Unpaid").toLowerCase().includes(search.toLowerCase())

	);
	const SaleData = filteredSale?.map((item, index) => ({

		Id: index + 1,
		Order_No: item[1].ID,
		Date: item.timestamp,
		Due_Date: item[1].DueDate,
		Total_Amount: item[1].Total,
		Advance: parseInt(item[1].Advance),
		Balance: item[1].Total - parseInt(item[1].Advance),
		Status: (item[1].Total - parseInt(item[1].Advance) === 0 ? "Paid" : "Unpaid"),
		Action: item.Id

	}));

	const totalSale = SaleData?.reduce(getSale , 0);
	function getSale(total , num){
		return total + num.Total_Amount ;
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
		{
			label: "Status",
			render: (SaleData) => SaleData.Status,
			sortValue: (SaleData) => SaleData.Status,

		},
		{
			label: "Action",
			render: (SaleData) => SaleData.Action,
		},


	];
	const Salekeyfn = (item) => item.Id;

	
	
	
	
	
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
											<div className="col-4">
												<label>Total Sale - {totalSale}</label>
											</div>
											
										</div>
										<div className="mt-2 row">
											
											<div className="col">
												<label>Email - {PartyData?.Email}</label>
											</div>
											<div className="col-4">
												<label>Sale Balance - {SaleBalance}</label>
											</div>
										</div>

										<div className="mt-2 row">
											
											<div className="col">
												<label>Total Purchase - </label>
											</div>
											<div className="col-4">
												
												<label>Purchase Balance - </label>
											</div>
										</div>

										

															
									</div>
								</div>
							</div>
							<div className="card mt-2 ">
								<div className="card-header">

									<span> TRANSACTIONS   </span>
									<div className="item_right row">

										<div className="col">
											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text"><i className=" bi bi-search" /></span>
												</div>
												<input type="text" className="form-control" placeholder="Search Transaction" onChange={handleSearch} aria-label="Username" aria-describedby="basic-addon1" />
											</div>
										</div>

										

									</div>


									<div className="row mt-2">
										<div className="form-check form-check-inline">
											<input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={handleChoise} id="inlineRadio1" value="Sale"/>
											<label className="form-check-label" htmlFor="inlineRadio1">Sale</label>
										</div>
										<div className="form-check form-check-inline">
											<input className="form-check-input" type="radio" onChange={handleChoise} name="inlineRadioOptions" id="inlineRadio2" value="Purchase"/>
											<label className="form-check-label" htmlFor="inlineRadio2">Purchase</label>
										</div>
										<div className="form-check form-check-inline">
											<input className="form-check-input" type="radio" onChange={handleChoise} name="inlineRadioOptions" id="inlineRadio3" value="PaymentIn" />
											<label className="form-check-label" htmlFor="inlineRadio3">Payment In</label>
										</div>
									</div>
									


								</div>
								<div className="card-body height">						
									<div>
										{Choise === "Sale" ? <SortableTable data={SaleData} config={Saleconfig} keyfn={Salekeyfn} /> : ""}
									
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