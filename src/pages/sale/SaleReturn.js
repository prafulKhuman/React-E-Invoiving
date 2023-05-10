
import SortableTable from "../../components/Table/SortableTable";
// import SaleReturnForm from "../../containers/sale/SaleReturnForm";
import { useUpdateSalePaymentMutation, useFatchSalePaymentQuery, useFetchItemQuery } from "../../redux";
import { useAddSaleReturnMutation, useFetchSaleReturnQuery, useUpdateItemMutation, useDeleteSaleReturnMutation } from "../../redux";
import Form from "../../components/forms/Form";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import Report from "../../components/report/Report";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function SaleReturn () {
	const { user } = useUserAuth();
	const [UpdateSalePayment] = useUpdateSalePaymentMutation();
	const salePayment = useFatchSalePaymentQuery();
	const [AddSaleReturn] = useAddSaleReturnMutation();
	const { data, error, isFetching } = useFetchSaleReturnQuery();
	const [DeleteSaleReturn] = useDeleteSaleReturnMutation();
	const itemResponse = useFetchItemQuery();
	const [UpdateItem] = useUpdateItemMutation();
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
		const response = await AddSaleReturn(row);
		if (response.data === "ok") {
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!"
			});

			const filter = rows?.filter((item) => item.partyName === row[1].PartyName.toLowerCase() && item.UID === row[2].UID && item.PhoneNo == row[1].PhoneNo);

			if (filter) {
				const id = filter[0].id;
				let received;
				let pending;

				if (filter[0].Pending >= row[1].Total) {
					pending = filter[0].Pending - row[1].Total;
					received = filter[0].Received;
				} else {
					const Sub = row[1].Total - filter[0].Pending;
					pending = 0;
					received = filter[0].Received - Sub;
				}

				const updatedPayment = {
				
					total: filter[0].total - row[1].Total,
					Received : received,
					Pending :pending
				};

				
				await UpdateSalePayment({ id, updatedPayment });

				row[0]?.map(async (record) => {
					const filterID = itemResponse?.data?.filter((item) => item.ItemName === record.Item && item.ItemCode == record.ItemCode && item.UID === user.uid);
					const ID = filterID[0].id;
					const Stock = {
						Quantity: filterID[0].Quantity + record.QTY
					};
					await UpdateItem({ ID, Stock });
				});
			}
		} else {
			swal("Oops...!", "Something went wrong!", "error");
		}
	};
	const filteredData = data?.filter((item) =>
		item[2].UID === user.uid
			? item[1].PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
			item.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].DueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
			item[1].Total.toString().toLowerCase().includes(searchTerm.toLowerCase())
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
				const response = await DeleteSaleReturn(ID);
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

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40}/>;
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
			sortValue: (Data) => Data.PartyName
		},
		{
			label: "Return No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No

		},
		{
			label: "Return Date",
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
							<span>Sale Return</span>
							<div className="invoice_No mr-3 ">
								<Report file="SALE-RETURN" data={Data} config={config}/>
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
									<Form file="Sale-Return" onsubmit={handlesubmit} ID={filteredData?.length}/>
									{" "}
								</div>
							</div>

						</div>
						<div className="card-body panel_height">

							{content || <SortableTable data={Data} config={config} keyfn={keyfn} file={"Sale-Return"} ID={handleDeleteRow} billInfo={printData} printID={handlePeintInvoice}/> }

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleReturn;
