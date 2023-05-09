import { useAddSaleOrderMutation, 
	useFetchItemQuery , 
	useUpdateItemMutation,
	useFetchSaleOrderQuery, 
	useDeleteSaleOrderMutation, 
	useAddSalePaymentMutation, 
	useFatchSalePaymentQuery, 
	useUpdateSalePaymentMutation, 
	useAddSaleInvoiceMutation } from "../../redux";
import SortableTable from "../../components/Table/SortableTable";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import Report from "./../../components/report/Report";
import Form from "../../components/forms/Form";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function SaleOrder () {
	const { user } = useUserAuth();
	const [addSaleOrder] = useAddSaleOrderMutation();
	const [AddSaleInvoice] = useAddSaleInvoiceMutation();
	const { data, error, isFetching } = useFetchSaleOrderQuery();
	const [DeleteSaleOrder] = useDeleteSaleOrderMutation();
	const [AddSalePayment] = useAddSalePaymentMutation();
	const [UpdateItem] = useUpdateItemMutation();
	const [UpdateSalePayment] = useUpdateSalePaymentMutation();
	const itemResponse = useFetchItemQuery();
	const salePayment = useFatchSalePaymentQuery();
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

	const handlesubmit = async (row) => {
		const response = await addSaleOrder(row);
		if (response.data === "ok") {
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!"
			});
		}
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
				const response = await DeleteSaleOrder(ID);
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

	const handlePeintInvoice = (key) => {
		const filteredPrintData = data?.filter((item) =>
			item.id == key
		);

		setPrintData(filteredPrintData);
	};
	const handleConvert = async (key) => {
		swal({
			title: "Are you sure?",
			text: "Once Converted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const ConvertOrder = data?.filter((item) =>
					item.id == key
				);
				const object = ConvertOrder[0];
				const payment = ConvertOrder[0][1];
				
				const response = await AddSaleInvoice(object);
				if (response.data === "ok") {
					swal({
						title: "Converted Success!",
						icon: "success",
						button: "Done!"
					});
					await DeleteSaleOrder(key);
				} else {
					swal("Oops...!", "Something went wrong!", "error");
				}

				const filter = rows?.filter((item) => item.partyName === payment?.PartyName && item.UID === user.uid && item.PhoneNo === payment?.PhoneNo);

				if (filter[0]?.partyName === payment?.PartyName) {
					const id = filter[0].id;
					const updatedPayment = {
						partyName: filter[0].partyName,
						total: filter[0].total + payment?.Total,
						Received: filter[0].Received + parseInt(payment?.Advance),
						Pending: filter[0].Pending + (payment?.Total - parseInt(payment?.Advance))
					};

					await UpdateSalePayment({ id, updatedPayment });
				} else {
					const newPayment = {
						partyName: payment?.PartyName,
						total: payment?.Total,
						Received: parseInt(payment?.Advance),
						Pending: payment?.Total - parseInt(payment?.Advance),
						UID: user?.uid,
						PhoneNo: payment?.PhoneNo
					};

					await AddSalePayment(newPayment);
				}
				object[0]?.map(async (record) => {
					const filterID = itemResponse.data?.filter((item) => item.ItemName === record.Item && item.ItemCode == record.ItemCode && item.UID === user.uid);
					const ID = filterID[0]?.id;
					
	
					
					const Stock = {
						Quantity: filterID[0].Quantity - record.QTY
					};
					const ans = await UpdateItem({ ID, Stock });
					console.log(ans , "ans");
				});
			} else {
				swal("Your Data  is safe!");
			}
		});
	};

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40}/>;
	} else if (error) {
		console.log("error");
	} else {
		Data = filteredData?.map((item, index) => ({
			Id: index + 1,
			Party_Name: item[1].PartyName,
			Order_No: item[1].ID,
			Date: item.timestamp,
			Due_Date: item[1].DueDate,
			Total_Amount: item[1].Total,
			Advance: item[1].Advance,
			Balance: item[1].Total - parseInt(item[1].Advance),
			Status: (item[1].Total - parseInt(item[1].Advance) === 0 ? "Paid" : "Unpaid"),
			Action: item.id

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
			label: "Order No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No

		},
		{
			label: "Order Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date

		},
		{
			label: "Due Date",
			render: (Data) => Data.Due_Date,
			sortValue: (Data) => Data.Due_Date

		},
		{
			label: "Total Amount",
			render: (Data) => Data.Total_Amount,
			sortValue: (Data) => Data.Total_Amount

		},
		{
			label: "Advance",
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
							<div className="row">
								<div className="col">
									<span className="text-left  font-weight-bold mt-3">Sale Order</span>
								</div>
								<div className="text-right mr-3">
									<Report file="SALE-ORDER" data={Data} config={config}/>
								</div>
							</div>

						</div>

					</div>

					<div className="card mt-3 ">
						<div className="card-header">

							<span> TRANSACTIONS   </span>
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
									
									<Form file="Sale-Order" onsubmit={handlesubmit} ID={filteredData?.length}/>
									{" "}
								</div>
							</div>
						</div>
						<div className="card-body panel_height">
							{content || <SortableTable data={Data} config={config} keyfn={keyfn} file={"Sale-Order"} convert={handleConvert} ID={handleDeleteRow} billInfo={printData} printID={handlePeintInvoice}/> }
						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleOrder;
