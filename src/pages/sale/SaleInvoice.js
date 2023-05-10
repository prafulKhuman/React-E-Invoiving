
import SortableTable from "../../components/Table/SortableTable";
import Form from "../../components/forms/Form";
import { useAddSaleInvoiceMutation, useFatchSaleInvoiceQuery, useDeleteSaleInvoiceMutation, useUpdateItemMutation, useAddSalePaymentMutation, useFatchSalePaymentQuery, useUpdateSalePaymentMutation, useFetchItemQuery } from "../../redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import Report from "../../components/report/Report";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function SaleInvoice () {
	const { user } = useUserAuth();

	const [AddSaleInvoice] = useAddSaleInvoiceMutation();
	const [AddSalePayment] = useAddSalePaymentMutation();
	const [UpdateSalePayment] = useUpdateSalePaymentMutation();
	const [UpdateItem] = useUpdateItemMutation();
	const salePayment = useFatchSalePaymentQuery();
	const { data, error, isFetching } = useFatchSaleInvoiceQuery();
	const [DeleteSaleInvoice] = useDeleteSaleInvoiceMutation();
	const itemResponse = useFetchItemQuery();
	const [searchTerm, setSearchTerm] = useState("");
	const [printData, setPrintData] = useState([]);
	const [rows, setrows] = useState([]);

	// Error Handling

	if(salePayment.error){
		swal("Error", " Error While Fatching Sale Payment Data", "error");
	}
	
	useEffect(() => {
		if (salePayment.data) {
			const filterUID = salePayment.data?.filter((item) => item.UID === user.uid);
			setrows(filterUID);
		}
	}, [salePayment]);

	const totalSale = rows?.reduce(getTotal, 0);
	function getTotal (total, num) {
		return total + num.total;
	}

	const totalReceived = rows?.reduce(getReceived, 0);
	function getReceived (total, num) {
		return total + num.Received;
	}

	const totalPending = rows?.reduce(getPending, 0);
	function getPending (total, num) {
		return total + num.Pending;
	}
	const handlesubmit = async (row) => {
		const response = await AddSaleInvoice(row);
		
		if (response.data === "ok") {
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!"
			});
			const filter = rows?.filter((item) => 
				item.partyName === row[1].PartyName.toLowerCase() &&
				item.UID === row[2].UID &&
				item.PhoneNo == row[1].PhoneNo
			);
			
			if (filter[0]?.partyName === row[1].PartyName) {
				const id = filter[0]?.id;
				const updatedPayment = {
					
					total: filter[0].total + row[1].Total,
					Received: filter[0].Received + parseInt(row[1].Advance),
					Pending: filter[0].Pending + (row[1].Total - parseInt(row[1].Advance))
				};

				const up = await UpdateSalePayment({ id, updatedPayment });
				console.log(up , "up");
			} else {
				const newPayment = {
					partyName: row[1].PartyName.toLowerCase(),
					total: row[1].Total,
					Received: parseInt(row[1].Advance),
					Pending: row[1].Total - parseInt(row[1].Advance),
					UID: row[2].UID,
					PhoneNo: row[1].PhoneNo

				};
				
				await AddSalePayment(newPayment);
				
			}
			row[0]?.map(async (record) => {
				const filterID = itemResponse.data?.filter((item) => item.ItemName === record.Item && item.ItemCode == record.ItemCode && item.UID === user.uid);
				const ID = filterID[0]?.id;
				

				const Stock = {
					Quantity: filterID[0].Quantity - record.QTY
				};
				await UpdateItem({ ID, Stock });
				
			});
		} else {
			swal("Oops...!", "Something went wrong!", "error");
		}

	};

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	};

	const handleDeleteRow = async (ID) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteSaleInvoice(ID);
				if (response.data === "ok") {
					swal("Data Deleted Success", {
						icon: "success"
					});
				}
			} else {
				swal("Your Data is safe!");
			}
		});
	};

	const filteredData = data?.filter((item) =>
		item[2].UID === user.uid
			? item[1].PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].DueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].Total.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].Advance.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			(item[1].Total - item[1].Advance).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			(item[1].Total - item[1].Advance === 0 ? "Paid" : "Unpaid").toLowerCase().includes(searchTerm.toLowerCase())
			: ""
	);

	const handlePeintInvoice = (key) => {
		const filteredPrintData = data?.filter((item) =>
			item.Id == key
		);

		setPrintData(filteredPrintData);
	};

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40} />;
	} else if (error) {
		swal("Oops...!", "Something went wrong!", "error");
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

	const config = [
		{
			label: "#",
			render: (Data) => Data.Id,
			sortValue: (Data) => Data.Id
		},
		{
			label: "Party Name",
			render: (Data) => Data.Party_Name,
			sortValue: (Data) => Data.Party_Name
		},
		{
			label: "Ref No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No

		},
		{
			label: "Invoice Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date

		},
		{
			label: "Due Date",
			render: (Data) => Data.Due_Date,
			sortValue: (Data) => Data.Due_Date

		},
		{
			label: "Amount",
			render: (Data) => Data.Total_Amount,
			sortValue: (Data) => Data.Total_Amount

		},
		{
			label: "Received",
			render: (Data) => Data.Advance,
			sortValue: (Data) => Data.Advance

		},
		{
			label: "Balance",
			render: (Data) => Data.Balance,
			sortValue: (Data) => Data.Balance

		},
		{
			label: "Status",
			render: (Data) => Data.Status,
			sortValue: (Data) => Data.Status

		},
		{
			label: "Action",
			render: (Data) => Data.Action
		}

	];

	
	const keyfn = (item) => item.Id;

	return (
		<>		

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span className="lead font-weight-bold">Sale Invoice</span>
							<div className="invoice_No mr-3 " >
								<Report file="SALE-INVOICE" data={Data} config={config}/>

							</div>
						</div>
						<div className="card-body row ml-2">

							<div className="card panel col-mg-3" style={{ backgroundColor: "#cce6ff" }}>
								<h6 className="card-title">Received</h6>
								<h5 className="card-text"> ₹ {totalReceived}</h5>
							</div>
							<span className="ml-3 mr-3 mt-4">+</span>
							<div className="card panel col-mg-3 " style={{ backgroundColor: "#ccf2ff" }}>
								<h6 className="card-title">Pending</h6>
								<h5 className="card-text"> ₹ {totalPending}</h5>
							</div>

							<span className="ml-3 mr-3 mt-4">=</span>
							<div className="card panel col-mg-3" style={{ backgroundColor: "#cce6ff" }}>
								<h6 className="card-title">Total</h6>
								<h5 className="card-text"> ₹ {totalSale}</h5>
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
									<Form file="Sale-Invoice" onsubmit={handlesubmit} ID={filteredData?.length}/>
									{" "}
								</div>
							</div>

						</div>
						<div className="card-body panel_height">

							<div>
								{content || <SortableTable data={Data} config={config} keyfn={keyfn} ID={handleDeleteRow} file={"Sale-Invoice"} billInfo={printData} printID={handlePeintInvoice}/> }
							</div>

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleInvoice;
