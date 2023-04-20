
import SortableTable from "../../components/Table/SortableTable";
// import SaleReturnForm from "../../containers/sale/SaleReturnForm";
import { useAddSaleReturnMutation  , useFetchSaleReturnQuery , useDeleteSaleReturnMutation} from "../../redux";
import Form from "../../components/forms/Form";
import swal from "sweetalert";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import Report from "../../components/report/Report";
function SaleReturn() {

	const [AddSaleReturn] = useAddSaleReturnMutation();
	const {data , error, isFetching } = useFetchSaleReturnQuery();
	const [DeleteSaleReturn] = useDeleteSaleReturnMutation();
	const [searchTerm , setSearchTerm] = useState("");
	const [printData , setPrintData] = useState([]);

	const handlesubmit =async (row)=>{
		const response = await AddSaleReturn(row);
		if(response.data === "ok"){
			swal({
				title: "Data Saved Success!",
				icon: "success",
				button: "Done!",
			});
		}
		
	};
	const filteredData = data?.filter((item) =>
		item[1].PartyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].ID.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		item.timestamp.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].DueDate.toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].Total.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		item[1].Advance.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(item[1].Total - item[1].Advance).toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
		(item[1].Total - item[1].Advance === 0 ? "Paid" : "Unpaid").toLowerCase().includes(searchTerm.toLowerCase())

	);
	
	const handleSearch =(e)=>{
		setSearchTerm(e.target.value);
	};
	const handleDeleteRow = async (ID) => {
		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then(async (willDelete) => {
			if (willDelete) {
				const response = await DeleteSaleReturn(ID);
				if (response.data === "ok") {
					swal("Data Deleted Success", {
						icon: "success",
					});
				}
			} else {
				swal("Your Data is safe!");
			}
		});
	};
	
	const handlePeintInvoice =(key)=>{
		const filteredPrintData = data?.filter((item) =>
			item.id == key 
		);

		setPrintData(filteredPrintData);
		
	};
	
	
	
	let Data = [];
	let content ;
	if(isFetching){
		// eslint-disable-next-line no-unused-vars
		content = <Skeleton count={5} height={40}/>;
	}else if(error){
		console.log("error");
	}else{ 
		Data = filteredData?.map((item , index) => ({
			Id: index+1,
			Party_Name: item[1].PartyName,
			Order_No: item[1].ID,
			Date: item.timestamp,
			
			Total_Amount: item[1].Total,
			Advance: item[1].Advance,
			Balance: item[1].Total - parseInt(item[1].Advance),
			Status: (item[1].Total - parseInt(item[1].Advance) === 0 ? "Paid" : "Unpaid"), 
			Action: item.id ,
			
		}));
	}
	
	const config = [
		{
			label: "#",
			render: (Data) => Data.Id,
			sortValue: (Data) => Data.Id,
		},
		{
			label: "Party Name",
			render: (Data) => Data.Party_Name,
			sortValue: (Data) => Data.PartyName,
		},
		{
			label: "Return No",
			render: (Data) => Data.Order_No,
			sortValue: (Data) => Data.Order_No,

		},
		{
			label: "Return Date",
			render: (Data) => Data.Date,
			sortValue: (Data) => Data.Date,

		},
		
		{
			label: "Total Amount",
			render: (Data) => Data.Total_Amount,
			sortValue: (Data) => Data.Total_Amount,

		},
		{
			label: "Paid",
			render: (Data) => Data.Advance,
			sortValue: (Data) => Data.Advance,

		},
		{
			label: "Balance",
			render: (Data) => Data.Balance,
			sortValue: (Data) => Data.Balance,

		},
		{
			label: "Status",
			render: (Data) => Data.Status,
			sortValue: (Data) => Data.Status,

		},
		{
			label: "Action",
			render: (Data) => Data.Action,
		},
		
		
		

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
									<Form file="Sale-Return"  onsubmit={handlesubmit}/>
									{" "}
								</div>
							</div>

							

						</div>
						<div className="card-body panel_height">

							{/* <SortableTable data={data} config={config} keyfn={keyfn} file={"Invoice"}/> */}
							{content || <SortableTable data={Data} config={config} keyfn={keyfn} file={"Sale-Return"}  ID={handleDeleteRow}  billInfo={printData} printID={handlePeintInvoice}/> }

						</div>
					</div>

				</div>
			</div>

		</>
	);
}

export default SaleReturn;
