import ExpensesFrom from "../../containers/Expense/ExpensesFrom";
import SortableTable from "../../components/Table/SortableTable";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import CategoryForm from "../../containers/Expense/CategoryForm";
import { useAddCategoryMutation, useFetchCategoryQuery, useDeleteCategoryMutation, useFetchExpenseQuery, useDeleteExpensesMutation } from "../../redux";
import swal from "sweetalert";
import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import MainTable from "./../../components/Table/MainTable";

function Expenses () {
	const { user } = useUserAuth();
	const [AddCategory] = useAddCategoryMutation();
	const { data, error, isFetching } = useFetchCategoryQuery();
	const [DeleteCategory] = useDeleteCategoryMutation();
	const expanses = useFetchExpenseQuery();
	const [DeleteExpenses] = useDeleteExpensesMutation();
	const [search, setSearch] = useState("");
	const [exp, setExp] = useState();
	const [expData, setExpData] = useState([]);

	useEffect(() => {
		const filterExp = expanses.data?.filter((item) => item.Category === exp && item.UID === user.uid);
		setExpData(filterExp);
	}, []);

	const handleSubmit = async (key) => {
		const response = await AddCategory(key);
		if (response.data === "ok") {
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!"
			});
		} else {
			swal("Oops...!", "Something went wrong!", "error");
		}
	};

	const handleDeleteRow = (key) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteExpenses(key);

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
	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const filteredData = data?.filter((item) =>
		item.UID === user.uid
			? item.Category.toLowerCase().includes(search.toLowerCase())
			: ""
	);

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40} />;
	} else if (error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else {
		Data = filteredData?.map((item, index) => ({
			id: index + 1,
			Category: item.Category,
			Action: item.id
		}));
	}

	const config = [
		{
			label: "#",
			render: (Data) => Data.id,
			sortValue: (Data) => Data.id
		},
		{
			label: "Category",
			render: (Data) => Data.Category,
			sortValue: (Data) => Data.Category
		},
		{
			label: "",
			render: (Data) => Data.Action

		}

	];

	const handleOpen = (key) => {
		setExp(key);
		const filterExp = expanses.data?.filter((item) => item.Category === key && item.UID === user.uid);
		setExpData(filterExp);
	};
	const total = expData?.reduce(getTotal, 0);
	function getTotal (total, num) {
		return total + parseInt(num.ExpAmount);
	}

	const record = expData?.map((item, index) => ({
		id: index + 1,
		ExpDate: item.timestamp,
		ExpNo: item.ExpNo,
		ExpDesc: item.ExpDesc,
		ExpAmount: item.ExpAmount,
		Action: item.id

	}));
	const expconfig = [
		{
			label: "#",
			render: (Record) => Record.id,
			sortValue: (Record) => Record.id
		},
		{
			label: "Exp No",
			render: (Record) => Record.ExpNo,
			sortValue: (Record) => Record.ExpNo
		},
		{
			label: "Exp Date",
			render: (Record) => Record.ExpDate,
			sortValue: (Record) => Record.ExpDate

		},
		{
			label: "Description",
			render: (Record) => Record.ExpDesc,
			sortValue: (Record) => Record.ExpDesc

		},
		{
			label: "Amount",
			render: (Record) => Record.ExpAmount,
			sortValue: (Record) => Record.ExpAmount

		},
		{
			label: "",
			render: (Record) => Record.Action,
			sortValue: (Record) => Record.Action

		}

	];

	const keyfn = (item) => item.Id;

	const handleDelete = (key) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteCategory(key);
				if (response.data === "ok") {
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

	return (
		<>

			<div className="main-content">
				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card ">
								<div className="card-header">
									<div className="row">
										<div className="col mt-3">
											<h4 >Expenses</h4>
										</div>

										<div className="col">
											<CategoryForm onCategory={handleSubmit}/>
										</div>

									</div>

								</div>
								<div className="input-group invoice_No mt-3   ">
									<div className="input-group-prepend">
										<span className="input-group-text ml-5"><i className=" bi bi-search" /></span>
									</div>
									<input type="text" className="form-control" onChange={handleSearch} placeholder="Search Category" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body Expheight">
									<div className="card-text ">

										{content || <MainTable data={Data} config={config} isopen={handleOpen} isDelete={handleDelete}/> }

									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-header">
									<div className="item_right">
										<ExpensesFrom Cat={data} ID={expanses.data?.length}/>
									</div>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col">
											<h5 className="card-title">Category Name : {exp}</h5>
										</div>
										<div className="card-text mr-5">
											<div className="col">Total : {total || 0}</div>
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
													<span className="input-group-text"><i className=" bi bi-search" /></span>
												</div>
												<input type="text" className="form-control" placeholder="Search Transaction" aria-label="Username" aria-describedby="basic-addon1" />
											</div>
										</div>
									</div>
								</div>

								<div className="card-body  Exp_height">
									<div>
									
										{exp ? <SortableTable data={record} config={expconfig} keyfn={keyfn} file={"Expense"} ID={handleDeleteRow}/> : <Skeleton count={5} height={40} />}

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
export default Expenses;
