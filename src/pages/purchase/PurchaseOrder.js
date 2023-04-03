// import PurchaseOrderFrom from "../../containers/purchase/PurchaseOrderFrom";
import Form from "../../components/forms/Form";

import SortableTable from "../../components/Table/SortableTable";
function PurchaseOrder()
{
	const data = [

		{
			Id: 1,
			Party_Name: "mahi patel",
			No: 1,
			Date: "20/02/2023",
			Due_Date: "21/02/2023",
			Total_Amount: 5000,
			Balance: 20000,
			Type: "Case",
			Status: "Unpaid",
			Action: "Print",
		},

	];
	const config = [
		{
			label: "#",
			render: (data) => data.Id,
			sortValue: (data) => data.Id,
		},
		{
			label: "Party Name",
			render: (data) => data.Party_Name,
			sortValue: (data) => data.Party_Name,
		},
		{
			label: "Order No",
			render: (data) => data.Order_No,
			sortValue: (data) => data.Order_No,

		},
		{
			label: "Order Date",
			render: (data) => data.Date,
			sortValue: (data) => data.Date,

		},
		{
			label: "Due Date",
			render: (data) => data.Due_Date,
			sortValue: (data) => data.Due_Date,

		},
		{
			label: "Total Amount",
			render: (data) => data.Total_Amount,
			sortValue: (data) => data.Total_Amount,

		},
		{
			label: "Balance",
			render: (data) => data.Balance,
			sortValue: (data) => data.Balance,

		},
		{
			label: "Transection Type",
			render: (data) => data.Type,
			sortValue: (data) => data.Type,

		},
		{
			label: "Status",
			render: (data) => data.Status,
			sortValue: (data) => data.Status,

		},
		{
			label: "Action",
			render: (data) => data.Action,

		},

	];
	const keyfn = (item) => item.name;

	return (
		<>
			
			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header">
							<span className="card-text">Purchase Order</span>
							<div className="invoice_No mr-3 ">
								<i className="bi bi-printer-fill fa-2x" />
							</div>
						</div>

					</div>

					<div className="card mt-3 Order_Table">
						<div className="card-header">

							<span> TRANSACTIONS   </span>
							<div className="invoice_No mr-3 ">
								<Form file="Purchase-Order"/>
							</div>

							

						</div>
						<div className="card-body ">

							<SortableTable data={data} config={config} keyfn={keyfn} file={"Invoice"}/>

						</div>
					</div>

				</div>
			</div>

		</>
	);

}
export default PurchaseOrder;