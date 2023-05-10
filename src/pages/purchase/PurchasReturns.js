import { useFetchPurchaseReturnQuery, useDeletePurchaseReturnMutation, useAddPurchaseReturnMutation, useFatchPurchasePaymentQuery, useUpdatePurchasePaymentMutation } from "../../redux";

import SortableTable from "../../components/Table/SortableTable";
import Form from "../../components/forms/Form";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";
import Report from "../../components/report/Report";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function PurchasReturn () {
	const { user } = useUserAuth();

	const [AddPurchaseReturn] = useAddPurchaseReturnMutation();
	const { data, error, isFetching } = useFetchPurchaseReturnQuery();
	const [DeletePurchaseReturn] = useDeletePurchaseReturnMutation();

	const [UpdatePurchasePayment] = useUpdatePurchasePaymentMutation();
	const purchasePayment = useFatchPurchasePaymentQuery();

	const [searchTerm, setSearchTerm] = useState("");
	const [printData, setPrintData] = useState([]);
	const [rows, setrows] = useState([]);

	// Error Handling

	if(purchasePayment.error){
		swal("Error", " Error While Fatching Purchase Payment Data", "error");
	}

	
	useEffect(() => {
		if (purchasePayment.data) {
			const filterUID = purchasePayment.data?.filter((item) => item.UID === user.uid);

			setrows(filterUID);
		}
	}, [purchasePayment]);

	const handlesubmit = async (row) => {
		const response = await AddPurchaseReturn(row);
		if (response.data === "ok") {
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!"
			});
		} else {
			swal("Oops...!", "Something went wrong!", "error");
		}

		const filter = rows?.filter((item) => item.partyName === row[1]?.PartyName && item.UID === row[2].UID && item.PhoneNo === row[1].PhoneNo);
		if (filter) {
			const id = filter[0].id;
			let paid;
			let unpaid;


			
			if (filter[0].Pending >= row[1].Total) {
				unpaid = filter[0].Unpaid - row[1].Total;
				paid = filter[0].Paid;
			} else {
				const Sub = row[1].Total - filter[0].Unpaid;
				unpaid = 0;
				paid = filter[0].Paid - Sub;
			}

			const updatedPayment = {
				partyName: filter[0].partyName,
				total: filter[0].total - row[1].Total,
				Paid : paid,
				Unpaid : unpaid
			};

			await UpdatePurchasePayment({ id, updatedPayment });
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
				const response = await DeletePurchaseReturn(ID);
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
			item.id === key
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
			label: "Ref No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No

		},
		{
			label: "Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date

		},
		{
			label: "Due Date ",
			render: (Data) => Data.Due_Date,
			sortValue: (Data) => Data.Due_Date

		},
		{
			label: "Amount",
			render: (Data) => Data.Total_Amount,
			sortValue: (Data) => Data.Total_Amount

		},
		{
			label: "Paid",
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
									<Form file="Purchase-Return" onsubmit={handlesubmit} ID={filteredData?.length}/>
									{" "}
								</div>
							</div>
						</div>
						<div className="card-body panel_height">
							{content || <SortableTable data={Data} config={config} keyfn={keyfn} file={"Purchase-Return"} ID={handleDeleteRow} billInfo={printData} printID={handlePeintInvoice}/> }
						</div>
					</div>

				</div>
			</div>

		</>
	);
}
export default PurchasReturn;
