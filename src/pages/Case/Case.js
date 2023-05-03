
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
	const SalePayment = useFatchSalePaymentQuery();
	const PurchasePayment = useFatchPurchasePaymentQuery();
	const Expenses = useFetchExpenseQuery();
	const [search , setSearch] = useState("");

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};


	const filterPayIn = SalePayment.data?.filter((item) => item.UID === user.uid);
	const filterPayOut = PurchasePayment.data?.filter((item) => item.UID === user.uid);
	const filterExp = Expenses.data?.filter((item) => item.UID === user.uid);

	const TotalPayIn = filterPayIn?.reduce(getTotal, 0);
	const TotalPayOut = filterPayOut?.reduce(getTotal, 0);
	const TotalExp = filterExp?.reduce(getTotalExp, 0);

	function getTotal(total, num) {
		return total + num.total;
	}
	function getTotalExp(total, num) {
		return total + parseInt(num.ExpAmount);
	}

	const Case =(TotalPayIn - TotalPayOut - TotalExp );


	let Entry = [];
	let content;
	if (SalePayment.isFetching || PurchasePayment.isFetching || Expenses.isFetching) {
		content = <Skeleton count={6} height={40} /> ;
	}
	else if (SalePayment.error || PurchasePayment.error || Expenses.error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else {
		const PayIn = filterPayIn
			? filterPayIn.map((item ) => ({
				
				partyName: item.partyName,
				type: "Payment-In",
				total: item.total,
				Done: item.Received,
				Pending: item.Pending,
			}))
			: [];


		const PayOut = filterPayOut ?
			filterPayOut.map((item ) => ({
				
				partyName: item.partyName,
				type: "Payment-Out",
				total: item.total,
				Done: item.Paid,
				Pending: item.Unpaid
			}))
			: [];

		const EXP = filterExp ?
			filterExp?.map((item ) => ({
			
				partyName: item.Category,
				type: "Expense",
				total: item.ExpAmount,
				Done: item.ExpAmount,
				Pending: 0
			}))
			: [];

		Entry = [...PayIn, ...PayOut, ...EXP];
		
		
		
		
		
	}

	const filteredCase = Entry?.filter((item) =>

		item.partyName.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.type.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.total.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Done.toString().toLowerCase().includes(search.toLowerCase()) ||
		item.Pending.toString().toLowerCase().includes(search.toLowerCase())
		

	);

	const CaseInfo = filteredCase?.map((item , index)=>({
		No : index + 1 ,
		
		partyName: item.partyName,
		type: item.type,
		total: item.total,
		Done: item.Done,
		Pending: item.Pending
	}));
	const config = [
		{
			label: "#",
			render: (CaseInfo) => CaseInfo.No,
			sortValue: (CaseInfo) => CaseInfo.No,
		},
		{
			label: "Party Name",
			render: (CaseInfo) => CaseInfo.partyName,
			sortValue: (CaseInfo) => CaseInfo.partyName,
		},
		{
			label: "Type",
			render: (CaseInfo) => CaseInfo.type,
			sortValue: (CaseInfo) => CaseInfo.type,

		},
		{
			label: "Total",
			render: (CaseInfo) => CaseInfo.total,
			sortValue: (CaseInfo) => CaseInfo.total,

		},
		{
			label: "Complate",
			render: (CaseInfo) => CaseInfo.Done,
			sortValue: (CaseInfo) => CaseInfo.Done,

		},
		{
			label: "Pending",
			render: (CaseInfo) => CaseInfo.Pending,
			sortValue: (CaseInfo) => CaseInfo.Pending,

		},
		
		

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
									<Report file="Case" data={CaseInfo} config={config}/>
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
							
							{ content || <SortableTable data={CaseInfo} config={config} keyfn={keyfn} />}
							
						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default Case;
