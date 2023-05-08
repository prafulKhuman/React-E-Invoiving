
import SortableTable from "../../components/Table/SortableTable";
import MainTable from "../../components/Table/MainTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PartiesFrom from "../../containers/Parties/PartiesFrom";
import swal from "sweetalert";
import { useState } from "react";
import Report from "../../components/report/Report";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import { useAddPartiesMutation, useDeleteSalePaymentMutation , useFetchPartiesQuery, useDeletePartiesMutation, useFatchSaleInvoiceQuery, useFetchSaleReturnQuery, useFetchPaymentInOutQuery, useFatchSalePaymentQuery, useDeleteSaleInvoiceMutation, useDeletePaymentInOutMutation, useDeleteSaleReturnMutation } from "../../redux";
let combine;
function Custommer () {
	const { user } = useUserAuth();
	const [AddParties] = useAddPartiesMutation();
	const [DeleteParties] = useDeletePartiesMutation();
	const [DeleteSalePayment] = useDeleteSalePaymentMutation();
	const saleInvoice = useFatchSaleInvoiceQuery();
	const salePayments = useFatchSalePaymentQuery();
	const saleReturn = useFetchSaleReturnQuery();
	const paymentIn = useFetchPaymentInOutQuery();
	const [DeleteSaleInvoice] = useDeleteSaleInvoiceMutation();
	const [DeletePaymentInOut] = useDeletePaymentInOutMutation();
	const [DeleteSaleReturn] = useDeleteSaleReturnMutation();
	const { data, error, isFetching } = useFetchPartiesQuery();
	const [openParty, setOpenParty] = useState();
	const [search, setSearch] = useState("");
	const [searchParties, setSearchParties] = useState("");
	const [salePayment, setSalePayment] = useState();


	// Error Handling

	if(saleInvoice.error){
		swal("Error", " Error While Fatching Sale Invoice Data", "error");
	}else if(salePayments.error){
		swal("Error", " Error While Fatching Sale Payments Data", "error");
	}else if(saleReturn.error){
		swal("Error", " Error While Fatching Sale Return Data", "error");
	}else if(paymentIn.error){
		swal("Error", " Error While Fatching Payment In Data", "error");
	}


	//Search Parties Record
	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	// Parties Info Variable
	let partyData;
	if (openParty) {
		partyData = openParty[0];
	}

	// Add Parties
	const handleSubmit = async (data) => {
		const response = await AddParties(data);
		if (response.data === "ok") {
			swal({
				title: "Parties Added !! ",
				icon: "success",
				button: "Done!"
			});
		} else {
			swal("Oops...!", "Something went wrong!", "error");
		}
	};

	// Delete Parties
	const handleDeleteParty = (key) => {
		swal({
			title: "Are you sure?",
			text: "Once Converted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteParties(key);
				const filterparty = data?.filter((party)=> party.id === key);
				const filterPayment = salePayments.data?.filter((payment)=> payment.partyName.toLowerCase() == filterparty[0]?.PartyName.toLowerCase() && payment.PhoneNo == filterparty[0]?.PhoneNo && payment.UID === user.uid);
				const res =await DeleteSalePayment(filterPayment[0]?.id);
				if (response.data === "ok" && res.data === "ok") {
					swal({
						title: "Party Removed!",
						icon: "success",
						button: "Done!"
					});
				}
			} else {
				swal("Your Data  is safe!");
			}
		});
	};

	// Search Parties
	const handleSearchPaties = (e) => {
		setSearchParties(e.target.value);
	};

	// Filter And Fatch Parties
	const filterType = data?.filter((item) => item.PartyType === "Custommer" && item.UID === user.uid);
	const filteredData = filterType?.filter((item) =>
		item.PartyName.toLowerCase().includes(searchParties.toLowerCase())
	);

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40}/>;
	} else if (error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else {
		Data = filteredData?.map((item, index) => ({
			Id: index + 1,
			PartiesName: item.PartyName.toLowerCase(),
			PhoneNo: item.PhoneNo,
			Email: item.Email,
			Address: item.BillingAddress,
			Action: item.id,
			UID: item.UID

		}));
	}

	// Parties Config
	const configTable = [
		{
			label: "#",
			render: (Data) => Data.Id

		},
		{
			label: "PARTY",
			render: (Data) => Data.PartiesName

		},
		{
			label: "",
			render: (Data) => Data.Action

		}

	];

	//Delete Parties Records
	const handleDeleteRow = async (ID) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response1 = await DeleteSaleInvoice(ID);
				const response2 = await DeletePaymentInOut(ID);
				const response3 = await DeleteSaleReturn(ID);
				if (response1.data === "ok" || response2.data === "ok" || response3.data === "ok") {
					swal("Data Deleted Success", {
						icon: "success"
					});
				} else {
					swal("Oops...!", "Something went wrong!", "error");
				}
			} else {
				swal("Your Data is safe!");
			}
		});
	};


	// Open Parties Details
	const handleOpenParty = (key) => {
		const filteredParty = Data?.filter((item) => item.PartiesName === key && item.UID === user.uid);
		setOpenParty(filteredParty);

		const saleinvoice = saleInvoice.data?.filter((item) => item[1]?.PartyName === key && item[1].PhoneNo == filteredParty[0].PhoneNo && item[2]?.UID === user.uid);

		const salereturn = saleReturn.data?.filter((item) => item[1]?.PartyName === key && item[1]?.PhoneNo == filteredParty[0]?.PhoneNo && item[2]?.UID === user.uid);
		const salepaymentData = salePayments.data?.filter((item) => item?.partyName === key && item?.PhoneNo == filteredParty[0]?.PhoneNo && item?.UID === user.uid);
		const paymentin = paymentIn.data?.filter((item) => item?.PartyName === key && item?.TransectionType === "Payment-In" && item?.MobailNo == filteredParty[0]?.PhoneNo && item?.UID === user.uid);
		if (salepaymentData) {
			setSalePayment(salepaymentData[0]);
		}

		const obj1 = saleinvoice.map((item) => ({

			Order_No: item[1].ID,
			Date: item.timestamp,
			Due_Date: item[1].DueDate,
			Total_Amount: item[1].Total,
			Advance: item[1].Advance,
			Action: item.id,
			Type: "Sale-Invoice"

		}));

		const obj2 = salereturn?.map((item) => ({

			Order_No: item[1].ID,
			Date: item.timestamp,
			Due_Date: item[1].DueDate,
			Total_Amount: item[1].Total,
			Advance: item[1].Total,
			Action: item.id,
			Type: "Sale-Return"

		}));

		const obj3 = paymentin?.map((item) => ({

			Order_No: item.receiptno,
			Date: item.timestamp,
			Due_Date: item.timestamp,
			Total_Amount: item.Amount,
			Advance: item.Amount,
			Action: item.id,
			Type: item.TransectionType

		}));

		combine = [...obj1, ...obj2, ...obj3];
	};


	// Filter Parties Details 
	const filteredRecord = combine?.filter((item) =>

		item.Id?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Order_No?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Date?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Due_Date?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Total_Amount?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Advance?.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Type?.toString().toLowerCase().includes(search.toLowerCase())

	);

	// Parties Details Data Object
	const record = filteredRecord?.map((item, index) => ({
		No: index + 1,
		Order_No: item.Order_No,
		Date: item.Date,
		Due_Date: item.Due_Date,
		Total_Amount: item.Total_Amount,
		Advance: item.Advance,
		Action: item.Action,
		Type: item.Type
	}));


	// Parties Details Config Array
	const finalconfig = [
		{
			label: "#",
			render: (Record) => Record.No,
			sortValue: (Record) => Record.No
		},

		{
			label: "Ref No",
			render: (Record) => Record.Order_No,
			sortValue: (Record) => Record.Order_No

		},
		{
			label: "Transection Type",
			render: (Record) => Record.Type,
			sortValue: (Record) => Record.Type

		},
		{
			label: "Transection Date",
			render: (Record) => Record.Date,
			sortValue: (Record) => Record.Date

		},
		{
			label: "Due Date",
			render: (Record) => Record.Due_Date,
			sortValue: (Record) => Record.Due_Date

		},
		{
			label: "Amount",
			render: (Record) => Record.Total_Amount,
			sortValue: (Record) => Record.Total_Amount

		},
		{
			label: "Received",
			render: (Record) => Record.Advance,
			sortValue: (Record) => Record.Advance

		},
		{
			label: "",
			render: (Record) => Record.Action,
			sortValue: (Record) => Record.Action

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

											<span className="font-weight-bold h5" >  Custommer </span>
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

										{content || <MainTable data={Data} config={configTable} isopen={handleOpenParty} isDelete={handleDeleteParty}/> }

									</div>

								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<div className="row">
										<div className="col">
											<h5 className="card-title">Name - {partyData?.PartiesName}</h5>
										</div>
										<div className="item_right mr-4">
											<Report file="CUSTOMMER" data={record} config={finalconfig} parties={openParty}/>

										</div>
									</div>

									<div className="card-text">

										<div className="mt-1 row">
											<div className="col">
												<label>Phone - {partyData?.PhoneNo}</label>
											</div>
											<div className="col-3">
												<label>Address - {partyData?.Address}</label>
											</div>

										</div>
										<div className="mt-2 row">

											<div className="col">
												<label>Email - {partyData?.Email}</label>
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

											<label className="btn btn-outline-success" style={{ width: "100%" }}>Total <br/><span>{salePayment?.total}</span></label>
										</div>

										<div className="col">

											<label className="btn btn-outline-success" style={{ width: "100%" }}>Received <br/> <span>{salePayment?.Received}</span></label>
										</div>

										<div className="col">
											<label className="btn btn-outline-success" style={{ width: "100%" }}>Pending <br/> <span>{salePayment?.Pending}</span></label>

										</div>

										<div className="form-group col-3">

											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text"><i className=" bi bi-search" /></span>
												</div>
												<input type="text" className="form-control" placeholder="Search Transaction" onChange={handleSearch} aria-label="SearchTransection" aria-describedby="basic-addon1" />
											</div>

										</div>
									</div>

								</div>
								<div className="card-body height">
									<div>
										{combine ? 	<SortableTable data={record} config={finalconfig} keyfn={keyfn} file={"Custommer"} ID={handleDeleteRow}/> : <Skeleton count={5} height={40}/>}
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

export default Custommer;
