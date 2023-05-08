
import SortableTable from "../../components/Table/SortableTable";
import ItemsFrom from "../../containers/Items/ItemsFrom";
import { useAddItemMutation, useFetchItemQuery, useDeleteItemMutation, useFetchStockQuery, useDeleteStockMutation } from "../../redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import MainTable from "../../components/Table/MainTable";
import { useState } from "react";
import Stock from "../../containers/Items/Stock";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function Items () {
	const { user } = useUserAuth();
	const [AddItem] = useAddItemMutation();
	const [DeleteItem] = useDeleteItemMutation();
	const [DeleteStock] = useDeleteStockMutation();
	const stockresponse = useFetchStockQuery();
	const { data, error, isFetching } = useFetchItemQuery();
	const [searchItem, setSearchItem] = useState("");
	const [openItem, setOpenItem] = useState();
	const [show, setShow] = useState(false);

	// Error Handling

	if(stockresponse.error){
		swal("Error", " Error While Fatching Stock Data", "error");
	}

	// Add Item 
	const handleSubmit = async (key) => {
		const response = await AddItem(key);
		if (response.data === "ok") {
			swal({
				title: "Item Added !! ",
				icon: "success",
				button: "Done!"
			});
		} else {
			swal("Oops...!", "Something went wrong!", "error");
		}
	};

	// Delete Item
	const handleDeleteItem = (key) => {
		swal({
			title: "Are you sure?",
			text: "Once Converted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteItem(key);
				if (response.data === "ok") {
					swal({
						title: "Item Removed!",
						icon: "success",
						button: "Done!"
					});
				}
			} else {
				swal("Your Data  is safe!");
			}
		});
	};

	// Search item
	const handleSearchIteam = (e) => {
		setSearchItem(e.target.value);
	};


	// Filter data of current user
	const filteredUID = data?.filter((item) =>
		item.UID?.toLowerCase().includes(user.uid.toLowerCase())
	);

	// search item
	const filteredData = filteredUID?.filter((item) =>
		item.ItemName?.toLowerCase().includes(searchItem?.toLowerCase())
	);

	let Data = [];
	let content;
	if (isFetching) {
		content = <Skeleton count={5} height={40}/>;
	} else if (error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else {
		Data = filteredData?.map((item, index) => ({
			id: index + 1,
			itemCode: item.ItemCode,
			itemName: item.ItemName,
			MRP: item.MRP,
			PurchasePrice: item.PurchasePrice,
			quantity: item.Quantity,
			salePrice: item.SalePrice,
			Action: item.id
		}));
	}

	const configTable = [
		{
			label: "#",
			render: (Data) => Data.id

		},
		{
			label: "Item",
			render: (Data) => Data.itemName

		},
		{
			label: "",
			render: (Data) => Data.Action

		}

	];

	// open item
	const handleOpenItem = (key) => {
		const filteredItem = Data?.filter((item) => item.itemName === key);
		setOpenItem(filteredItem);
		setShow(true);
	};

	// delete Item Data
	const handleDeleteRow = (key) => {
		swal({
			title: "Are you sure?",
			text: "Once Converted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteStock(key);
				if (response.data === "ok") {
					swal({
						title: "Stock Record Removed!",
						icon: "success",
						button: "Done!"
					});
				}
			} else {
				swal("Your Data  is safe!");
			}
		});
	};

	let item;
	if (openItem) {
		item = openItem[0];
	}

	let records = [];
	const Content = <Skeleton count={5} height={40} />;
	if (stockresponse?.error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else {
		const filterRecord = stockresponse?.data?.filter((items) => items.ItemID === item?.Action);

		records = filterRecord?.map((item, index) => ({
			id: index + 1,
			timestamp: item.timestamp,
			ItemCode: item.ItemCode,
			MRP: item.MRP,
			PurchasePrice: item.PurchasePrice,
			SalePrice: item.SalePrice,
			Quantity: item.Quantity,
			Type: item.TYPE,
			Action: item.id
		}));
	}
	const stockConfig = [
		{
			label: "#",
			render: (Records) => Records.id

		},
		{
			label: "Date",
			render: (Records) => Records.timestamp

		},
		{
			label: "Item Code",
			render: (Records) => Records.ItemCode

		},
		{
			label: "MRP",
			render: (Records) => Records.MRP

		},
		{
			label: "Purchase Price",
			render: (Records) => Records.PurchasePrice

		},
		{
			label: "Sale Price",
			render: (Records) => Records.SalePrice

		},
		{
			label: "Type",
			render: (Records) => Records.Type

		},
		{
			label: "Quantity",
			render: (Records) => Records.Quantity

		},
		{
			label: "",
			render: (Records) => Records.Action

		}

	];
	const keyfn = (item) => item.id;
	return (
		<>

			<div className="main-content">

				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card ">

								<div className="card-header">
									<h5>ITEMS</h5>
									<div className="invoice_No item_right " >
										<ItemsFrom onsubmit={handleSubmit}/>
									</div>
								</div>
								<div className="input-group invoice_No mt-3 ">
									<div className="input-group-prepend">
										<span className="input-group-text ml-5"><i className=" bi bi-search" /></span>
									</div>
									<input type="search" className="form-control" onChange={handleSearchIteam} placeholder="Search Items" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body Par_height">

									<div className="card-text">

					
										{content || <MainTable data={Data} config={configTable} isopen={handleOpenItem} isDelete={handleDeleteItem}/> }

									</div>

								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-header">
									<div className="row">
										<div className="col">
											<h5 className="card-title">Item Name : {item?.itemCode}</h5>
										</div>
										<div className="col text-right">
											<Stock ID={item?.Action} data={item}/>
										</div>
									</div>

								</div>
								<div className="card-body">

									<div className="card-text">
										<div className="row">
											<div className="col">
												<div className="mt-1">
													<label>Item Code: {item?.itemCode}</label>
												</div>

												<div className="mt-2">
													<label>Sale Price : {item?.salePrice}</label>
												</div>
											</div>

											<div className="mr-3">
												<div className="mt-2">
													<label> Stock Quantity  : {item?.quantity} </label>
												</div>

												<div className="mt-2">
													<label>Purchase Price : {item?.PurchasePrice}</label>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
							<div className="card mt-3 ">
								<div className="card-header ">

									<span className="col"> TRANSACTIONS   </span>

								</div>
								<div className="card-body height">
									<div>
										{show ? <SortableTable data={records} config={stockConfig} keyfn={keyfn} ID={handleDeleteRow} file="Item"/> : Content }
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
export default Items;
