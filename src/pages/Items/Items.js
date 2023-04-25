
// import SortableTable from "../../components/Table/SortableTable";
import ItemsFrom from "../../containers/Items/ItemsFrom";
import {useAddItemMutation , useFetchItemQuery , useDeleteItemMutation} from "../../redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import swal from "sweetalert";
import MainTable from "../../components/Table/MainTable";
import { useState } from "react";

function Items(){
	const [AddItem] = useAddItemMutation();
	const {data , error, isFetching } = useFetchItemQuery();
	const [DeleteItem] = useDeleteItemMutation();
	const [searchItem , setSearchItem] = useState("");
	const [openItem , setOpenItem] = useState();
	const [Choise , setChoise] = useState();

	const handleSubmit =async(key)=>{
		const response = await AddItem(key);
		if(response.data === "ok"){
			swal({
				title: "Item Added !! ",
				icon: "success",
				button: "Done!",
			});
		}
	};

	const handleDeleteItem =(key)=>{
		swal({
			title: "Are you sure?",
			text: "Once Converted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {

			if (willDelete) {
				const response = await DeleteItem(key);
				if (response.data === "ok") {
					swal({
						title: "Item Removed!",
						icon: "success",
						button: "Done!",
					});
					
				}
			} else {
				swal("Your Data  is safe!");
			}
		});
	
	};

	const handleSearchIteam =(e)=>{
		setSearchItem(e.target.value);
	};

	const filteredData = data?.filter((item) =>
		item.ItemName.toLowerCase().includes(searchItem.toLowerCase())
	);
	
	let Data = [];
	let content ;
	if(isFetching){
		// eslint-disable-next-line no-unused-vars
		content = <Skeleton count={5} height={40}/>;
	}else if(error){
		console.log("error");
	}else{ 
		// eslint-disable-next-line no-unused-vars
		Data= filteredData?.map((item , index) => ({
			id : index + 1 ,
			itemCode : item.ItemCode ,
			itemName : item.ItemName ,
			MRP : item.MRP ,
			PurchasePrice : item.PurchasePrice ,
			quantity : item.Quantity ,
			salePrice : item.SalePrice ,
			Action : item.id
		}));

		
	}

	const configTable = [
		{
			label: "#",
			render: (Data) => Data.id,
			
		},
		{
			label: "Item",
			render: (Data) => Data.itemName,
			
		},
		{
			label: "",
			render: (Data) => Data.Action,
			
		},
		

	];
	
	const handleOpenItem = (key) => {
		
		const filteredParty = Data?.filter((item) => item.itemName === key);
		setOpenItem(filteredParty);
		
		// if(SaleResponse.data){
		// 	const PartiesObj = SaleResponse.data?.filter((item) => item[1].PartyName === key);
		// 	setSaleInfo(PartiesObj);
		// }
		// if(PaymentInResponse.data){
		// 	const PaymentIn = PaymentInResponse.data?.filter((item) => item.PartyName === key);
		// 	setPaymentInfo(PaymentIn);
			
		// }
					
	};
	const handleChoise = (e) => {
		setChoise(e.target.value);
	};
	console.log(Choise);

	
	let Item;
	if(openItem){
		// eslint-disable-next-line no-unused-vars
		Item = openItem[0];
	}
	
	console.log(openItem);
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
									<input type="text" className="form-control"  onChange={handleSearchIteam} placeholder="Search Items" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body  p_height">
									
									<div className="card-text"> 

										{/* <SortableTable data={data} config={config} keyfn={keyfn} /> */}
										{content || <MainTable data={Data} config={configTable}  isopen={handleOpenItem}  isDelete={handleDeleteItem}/> }

									</div>
									
								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Item Name : {Item?.itemCode}</h5>
									<div className="card-text">		
										<div className="row">
											<div className="col">
												<div className="mt-1">
													<label>Sale Price : {Item?.salePrice}</label>
												</div>
                                        
												<div className="mt-2">
													<label>Purchase Price : {Item?.PurchasePrice}</label>
												</div>
											</div>
                                    
											<div className="mr-3">
												<div className="mt-2">
													<label> Stock Quantity  : {Item?.quantity} </label>
												</div>
												

												<div className="mt-2">
													<label>Purchase Price : 0</label>
												</div>
											</div>
										</div>

															
									</div>
								</div>
							</div>
							<div className="card mt-3 ">
								<div className="card-header row">

									<span className="col"> TRANSACTIONS   </span>



									<div className="col text-right">
										<div className="form-check form-check-inline">
											<input className="form-check-input" type="radio" name="inlineRadioOptions" onChange={handleChoise} id="inlineRadio1" value="Sale"/>
											<label className="form-check-label" htmlFor="inlineRadio1">Sale</label>
										</div>
										<div className="form-check form-check-inline">
											<input className="form-check-input" type="radio" onChange={handleChoise} name="inlineRadioOptions" id="inlineRadio2" value="Purchase"/>
											<label className="form-check-label" htmlFor="inlineRadio2">Purchase</label>
										</div>
										
									</div>



								</div>
								<div className="card-body height">						
									<div>
										{/* <SortableTable data={itemdata} config={itemconfig} keyfn={keyfn} />  */}
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