
import SortableTable from "../../components/Table/SortableTable";
import { useFatchSalePaymentQuery, useFetchExpenseQuery, useFatchPurchasePaymentQuery } from "../../redux";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import Report from "../../components/report/Report";
import { useState } from "react";

function Case() {	
	const { user } = useUserAuth();
	const salePayment = useFatchSalePaymentQuery();
	const purchasePayment = useFatchPurchasePaymentQuery();
	const expenses = useFetchExpenseQuery();
	const [search, setSearch] = useState("");

	// Error Handling

	if(salePayment.error){
		swal("Error", " Error While Fatching Sale Payment Data", "error");
	}else if(purchasePayment.error){
		swal("Error", " Error While Fatching Purchase Payment Data", "error");
	}else if(expenses.error){
		swal("Error", " Error While Fatching Expenses Data", "error");
	}


	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	// Filter Sale Payment
	const filterPayIn = salePayment.data?.filter((item) => item.UID === user.uid);

	// filter purchase payment
	const filterPayOut = purchasePayment.data?.filter((item) => item.UID === user.uid);

	// filter expenses
	const filterExp = expenses.data?.filter((item) => item.UID === user.uid);

	// calculate total payment in 
	const totalPayIn = filterPayIn?.reduce(getTotalSale, 0);

	// calculate total payment out
	const totalPayOut = filterPayOut?.reduce(getTotalPurchase, 0);

	// calculate total expenses
	const totalExp = filterExp?.reduce(getTotalExp, 0);

	function getTotalSale(total, num) {
		return total + num.Received;
	}
	function getTotalPurchase(total, num) {
		return total + num.Paid;
	}
	function getTotalExp(total, num) {
		return total + parseInt(num.ExpAmount);
	}

	// calculate total case in hand
	const Case = (totalPayIn - totalPayOut - totalExp);


	// fatching records
	let Entry = [];
	let content;
	if (salePayment.isFetching || purchasePayment.isFetching || expenses.isFetching) {
		content = <Skeleton count={6} height={40} />;
	} else if (salePayment.error || purchasePayment.error || expenses.error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else {
		const payIn = filterPayIn
			? filterPayIn.map((item) => ({

				partyName: item.partyName,
				type: "Payment-In",
				total: item.total,
				Done: item.Received,
				Pending: item.Pending
			}))
			: [];

		const payOut = filterPayOut
			? filterPayOut.map((item) => ({

				partyName: item.partyName,
				type: "Payment-Out",
				total: item.total,
				Done: item.Paid,
				Pending: item.Unpaid
			}))
			: [];

		const exp = filterExp
			? filterExp?.map((item) => ({

				partyName: item.Category,
				type: "Expense",
				total: item.ExpAmount,
				Done: item.ExpAmount,
				Pending: 0
			}))
			: [];

		Entry = [...payIn, ...payOut, ...exp];
	}


	// filter records
	const filteredCase = Entry?.filter((item) =>

		item.partyName.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.type.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.total.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Done.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Pending.toString().toLowerCase().includes(search.toLowerCase())

	);


	// all combine records object
	const caseInfo = filteredCase?.map((item, index) => ({
		No: index + 1,

		partyName: item.partyName,
		type: item.type,
		total: item.total,
		Done: item.Done,
		Pending: item.Pending
	}));

	// table config
	const config = [
		{
			label: "#",
			render: (caseInfo) => caseInfo.No,
			sortValue: (caseInfo) => caseInfo.No
		},
		{
			label: "Party Name",
			render: (caseInfo) => caseInfo.partyName,
			sortValue: (caseInfo) => caseInfo.partyName
		},
		{
			label: "Type",
			render: (caseInfo) => caseInfo.type,
			sortValue: (caseInfo) => caseInfo.type

		},
		{
			label: "Total",
			render: (caseInfo) => caseInfo.total,
			sortValue: (caseInfo) => caseInfo.total

		},
		{
			label: "Complate",
			render: (caseInfo) => caseInfo.Done,
			sortValue: (caseInfo) => caseInfo.Done

		},
		{
			label: "Pending",
			render: (caseInfo) => caseInfo.Pending,
			sortValue: (caseInfo) => caseInfo.Pending

		}

	];

	const keyfn = (item) => item.id;

	return (
		<>

			<div className="main-content">

				<div className="content-top-gap">
					<div className="card ">
						<div className="card-header ">
							<div className="row">
								<div className="col-3 mt-2">
									<h5><label>Case In Hand - </label> <span style={{ color: "green" }}> ₹ {isNaN(Case) ? 0 : Case}</span></h5>
								</div>

								<div className="invoice_No mr-3 col-1" >
									<Report file="Case" data={caseInfo} config={config} />
								</div>
							</div>
						</div>

					</div>

					<div className="card mt-3 " >
						<div className="card-header">

							<span> TRANSACTIONS   </span>
							<div className="item_right row">

								<div className="col">
									<div className="input-group">
										<div className="input-group-prepend">
											<span className="input-group-text"><i className=" bi bi-search" /></span>
										</div>
										<input type="text" className="form-control" onChange={handleSearch} placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
									</div>
								</div>

							</div>

						</div>
						<div className="card-body panel_height">

							{content || <SortableTable data={caseInfo} config={config} keyfn={keyfn} />}

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default Case;
