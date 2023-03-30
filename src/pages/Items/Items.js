import Sidebar from "../../components/sidebar/Sidebar";
import Header from "../../components/header/Header";
import SortableTable from "../../components/Table/SortableTable";
import ItemsFrom from "../../containers/Items/ItemsFrom";


function Items()
{
	const data = [

		{
			Item:"XiamiRedmi9",
			Quantity:10
		},
		{
			Item:"RedmiNote8",
			Quantity:20,
		},

	];
	const config = [
		{
			label: "Item",
			render: (data) => data.Item,
			sortValue: (data) => data.Item,
		},
		{
			label: "Quantity",
			render: (data) => data.Quantity,
			sortValue: (data) => data.Quantity,
		}

	];
	const itemdata = [

		{
			transaction_type: "Sale",
			PartyName:"jinal patel",
			date: "01/02/2023",
			Quantity:2,
			Price:3000,
			Status:"paid"


		},
		{
			transaction_type: "Sale",
			PartyName:"mahi patel",
			date: "10/02/2023",
			Quantity:3,
			Price:30000,
			Status:"paid"	
		}
		

	];
	const itemconfig = [
		{
			label: "Transaction Type",
			render: (itemdata) => itemdata.transaction_type,
			sortValue: (itemdata) => itemdata.transaction_type,
		},
		{
			label: "Party Name",
			render: (itemdata) => itemdata.PartyName,
			sortValue: (itemdata) => itemdata.PartyName,
		},
		{
			label:"Date",
			render:(itemdata) => itemdata.date,
			sortValue: (itemdata)=> itemdata.date,
		},
		{
			label:"Quantity",
			render:(itemdata) => itemdata.Quantity,
			sortValue:(itemdata) => itemdata.Quantity,
		},
		{
			label:"Price/Unit",
			render:(itemdata) => itemdata.Price,
			sortValue:(itemdata) => itemdata.Price,
		},
		{
			label:"Status",
			render:(itemdata) => itemdata.Status,
			sortValue:(itemdata)=> itemdata.Status,
		},
		
	];

	const keyfn = (item) => item.name;


	return (
		<>

			<Header />
			<Sidebar />
			<div className="main-content">

				<div className="content-top-gap">
					<div className="row">
						<div className="col-sm-3  mb-md-0  ">
							<div className="card ">

								<div className="card-header">
									<h5>ITEMS</h5>
									<div className="invoice_No item_right " >
										<ItemsFrom/>
									</div>
								</div>
								<div className="input-group invoice_No mt-3 ">
									<div className="input-group-prepend">
										<span className="input-group-text ml-5"><i className=" bi bi-search" /></span>
									</div>
									<input type="text" className="form-control" placeholder="Search Items" aria-label="Username" aria-describedby="basic-addon1" />
								</div>
								<div className="card-body  p_height">
									
									<div className="card-text"> 

										<SortableTable data={data} config={config} keyfn={keyfn} />

									</div>
									
								</div>
							</div>
						</div>
						<div className="col-sm-9">
							<div className="card">
								<div className="card-body">
									<h5 className="card-title">Item Name : RedmiNote8</h5>
									<div className="card-text">		
										<div className="row">
											<div className="col">
												<div className="mt-1">
													<label>Sale Price : 500</label>
												</div>
                                        
												<div className="mt-2">
													<label>Purchase Price : 1000</label>
												</div>
											</div>
                                    
											<div className="mr-3">
												<label> Stock Quantity  : 10 </label>
											</div>
										</div>

															
									</div>
								</div>
							</div>
							<div className="card mt-3 panel_height">
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
								<div className="card-body">						
									<div>
										<SortableTable data={itemdata} config={itemconfig} keyfn={keyfn} /> 
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