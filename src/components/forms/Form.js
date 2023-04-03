import { useState } from "react";
function Form(props) {
	const fileName = props.file;
	const [tableData, setTableData] = useState([]);
	
	const addTableRow = () => {
		setTableData([...tableData, {
			id: tableData.length + 1,
			delete: () => {
				setTableData(tableData.filter((row) => row.id !== (tableData.length + 1)));
			}
		}]);
	};
	return (
       
		<>
			
			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
				{fileName}
			</button>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-fullscreen">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">{fileName}</h5>
							<a className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								
								<div className="row">
									<div className="col-sm-2">

										<div className="input-group mb-3">

											<input type="text" className="form-control" aria-label="Default" placeholder="Party Name" aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>
									<div className="col-sm-2">
										<div className="input-group">

											<input type="text" className="form-control" aria-label="Default" placeholder="Phone No." aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>
									<div className="col-sm-8  text-right">

										<lable>
											{fileName==="Sale-Invoice" ? "Invoice No ": ""}
											{fileName==="Sale-Order" || fileName==="Purchase-Order" ? "Order No ": ""} 
											{fileName==="Sale-Return" || fileName==="Purchase-Return" ? "Return No ": ""}
											{fileName==="Purchase-Bill" ? "Bill No": ""} 
											
											
										</lable>
										<input type="text" className=" bottom_border  " />

									</div>
										
								</div>
								{fileName==="Sale-Return" || fileName==="Purchase-Return" ? 
									<div className="row mb-4">
									
										<div className="col text-right">

											<lable>{fileName==="Sale-Return" ? "Invoice No " : "Bill No"}</lable>
											<input type="text" className=" bottom_border  " />

										</div>
									</div> : ""}
								<div className="row ">
									
									<div className="col text-right">

										<label className="mr-1">Due Date </label>
										<input type="Date" className="bottom_border  mr-5 " />

									</div>
								</div>
								
									
								
								<div className="mt-5 scroll">
									<table className="table table-bordered table-hover">
										<thead>
											<tr>
												<th>#</th>
												<th>Item</th>
												<th>Item Code</th>
												<th>MRP</th>
												<th>QTY</th>
												<th>Unit</th>
												<th>Price/Unit</th>
												<th>Amount</th>
												<th>Action <i className="bi bi-plus-circle-fill fa-lg" onClick={addTableRow}/></th>

											</tr>
										</thead>
										
										<tbody className="form-group">
											{tableData.map((row) => (
												<tr key={row.id}>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><input className="form-control" /></td>
													<td><i className=" ml-3 bi bi-trash fa-lg" onClick={row.delete}/></td>
												</tr>
											))}

										</tbody>
									</table>
								</div>
								<div className="mt-4 item_right   row">
									<div className="input-group col-md-7">
										<div className="row">
											<label className="col-3 mt-2">Total </label>
											<input type="text" className="form-control col-8 ml-3" />
										</div>
									</div>

									<div className="input-group col-md-7 mt-3 mb-3">
										<div className="row">
											<label className="col-4 mt-2">
												{fileName==="Sale-Invoice" || fileName==="Purchase-Return" || fileName==="Sale-Order" ? "Received" : ""}
												
												{fileName==="Sale-Return"  || fileName==="Purchase-Bill" || fileName==="Purchase-Order" ? "Paid" : ""}
											
											</label>
											<input type="text" className="form-control col-8" />
										</div>
									</div>

									<div className="input-group col-md-7 mt-2 mb-3">
										<div className="row">
											<label className="col mt-2">
												Balance
											</label>
											<span className="col mt-2 font-weight-bold">₹ 300</span>
										</div>
									</div>
								</div>

							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary">Save</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Form;