import { useState } from "react";
import { useFormik } from "formik";
import {SaleOrderSchema} from "../../utility/schema";

function Form( {file , onsubmit } ) {
	const fileName = file;
	let intialvalue ={
		No: "",
		Item:"",
		ItemCode:"",
		MRP:"",
		QTY:"",
		Unit:"",
		Amount:"",
	};
	const intial ={
		PartyName:"",
		PhoneNo:"",
		DueDate:"",
		ID:"",
		Total:"",
		Advance:"",
	};
	
	const [row , setrow] = useState([]);
	const [data , setData] = useState(intialvalue);
	const [filds , setFilds] = useState(intial);

	const handleInputChange=(event)=>{
		setData({...data,[event.target.name]:event.target.value});
		
	};
	const handleStoreData=()=>{
		setrow([...row , data]);
		setData(intialvalue);
	};
	const handleFildChange=(event)=>{
		setFilds({...filds ,[event.target.name]:event.target.value});
		
	};
	let total = 0;
	row.map((demo)=>{
		total += parseInt(demo.Amount);
	});	
	const handleRemoveItem =(rows)=>{
		const updated = row.filter((item)=>{
			return item.No !== rows.No ;
		});
		setrow(updated);
	};
	// const handleSubmit =(event)=>{
	// 	event.preventDefault();
	// 	filds.Total=total;
	// 	const saleorder= [filds , row];
		
	// 	onsubmit(saleorder);
	// 	setrow([]);
	// 	setFilds(intial);
	// };
	

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } = 
	useFormik({
		intialvalue,
		validationSchema: SaleOrderSchema ,
		onSubmit: (values, action)
	});
	return (
       
		<>
			<button className="btn btn-outline-success" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal">
				<i className="bi bi-plus-circle" />
				{" "}
				{fileName}
			</button>

			<div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" >
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

											<input type="text" className="form-control" required name="PartyName" value={filds.PartyName}  onChange={handleFildChange} aria-label="Default" placeholder="Party Name" aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>
									<div className="col-sm-2">
										<div className="input-group">

											<input type="text" className="form-control" required name="PhoneNo" value={filds.PhoneNo} onChange={handleFildChange} aria-label="Default" placeholder="Phone No." aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>
									<div className="col-sm-8  text-right">

										<lable htmlFor="ID">
											{fileName==="Sale-Invoice" ? "Invoice No ": ""}
											{fileName==="Sale-Order" || fileName==="Purchase-Order" ? "Order No ": ""} 
											{fileName==="Sale-Return" || fileName==="Purchase-Return" ? "Return No ": ""}
											{fileName==="Purchase-Bill" ? "Bill No": ""} 
											
											
										</lable>
										<input type="text" name="ID" required value={filds.ID} onChange={handleFildChange} className=" bottom_border  " />

									</div>
										
								</div>
								{fileName==="Sale-Return" || fileName==="Purchase-Return" ? 
									<div className="row mb-4">
									
										<div className="col text-right">

											<lable htmlFor="BillNo">{fileName==="Sale-Return" ? "Invoice No " : "Bill No"}</lable>
											<input type="text" className="  bottom_border  " required name="BillNo" onChange={handleFildChange} />

										</div>
									</div> : ""}
								<div className="row ">
									
									<div className="col text-right">

										<label className="mr-1" htmlFor="DueDate">Due Date </label>
										<input type="Date" className="bottom_border  mr-5 " required name="DueDate" value={filds.DueDate} onChange={handleFildChange} />

									</div>
								</div>
								
									
								
								<div className="mt-4 scroll">
									<div className="text-right">
										<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
											<i className="bi bi-plus-circle" />  Add Data
										</button>
									</div>
									<table className="table table-bordered table-hover mt-2">
										<thead>
											<tr>
												<th>#</th>
												<th>Item</th>
												<th>Item Code</th>
												<th>MRP</th>
												<th>QTY</th>
												<th>Unit</th>
												
												<th>Amount</th>
												<th></th>
												

											</tr>
										</thead>
										
										<tbody className="form-group">
											{row.map((rows)=>{
												return(
													<tr key={rows.No}>
														<td>
															{rows.No}
														</td>
														<td style={{width:"20%"}}>
															{rows.Item}
														</td>
														<td>
															{rows.ItemCode}
														</td>
														<td>
															{rows.MRP}
														</td>
														<td>
															{rows.QTY}
														</td>
														<td>
															{rows.Unit}
														</td>
														
														<td>
															{rows.Amount}												
														</td> 
														<td style={{width:"5%"}}>
															<i className=" ml-2 bi bi-trash fa-lg" onClick={()=>handleRemoveItem(rows)}/>
														</td>
													</tr>);
											})}
										</tbody>
									</table>
								</div>
								<div className="mt-4 item_right row">
									<div className="input-group col-md-7">
										<div className="row">
											<label className="col-3 mt-2">Total </label>
											
											<input type="text" required value={total} name="Total"   className="form-control col-8 ml-4" />
										</div>
									</div>

									<div className="input-group col-md-7 mt-3 mb-3">
										<div className="row">
											<label className="col-4 mt-2">
												{fileName==="Sale-Invoice" || fileName==="Purchase-Return" || fileName==="Sale-Order" ? "Received" : ""}
												
												{fileName==="Sale-Return"  || fileName==="Purchase-Bill" || fileName==="Purchase-Order" ? "Paid" : ""}
											
											</label>
											<input type="text" required name="Advance" value={filds.Advance} onChange={handleFildChange} className="form-control col-8" />
										</div>
									</div>

									
								</div>

							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal"  onClick={handleSubmit}>Save</button>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Add {fileName}</h5>
							<a className="btn-close" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">

							<form>
								<div className="form-group">
									<div className="row">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="No">No . </label>
										</div>
										<div className="col">
											<input type="number" required name="No" value={data.No}   onChange={handleInputChange} className="form-control"  placeholder="ID"/>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="Item">Item</label>
										</div>
										<div className="col">
											<input type="text" required name="Item" value={data.Item}  onChange={handleInputChange} className="form-control"  placeholder="Item"/>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="ItemCode">Item Code</label>
										</div>
										<div className="col">
											<input type="text" required name="ItemCode" value={data.ItemCode}  onChange={handleInputChange} className="form-control"  placeholder="Item Code"/>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="MRP">MRP</label>
										</div>
										<div className="col">
											<input type="number" required name="MRP" value={data.MRP}  onChange={handleInputChange} className="form-control"  placeholder="MRP"/>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2" >
											<label className="ml-4" htmlFor="QTY">QTY</label>
										</div>
										<div className="col">
											<input type="number" required name="QTY" value={data.QTY}  onChange={handleInputChange} className="form-control"  placeholder="QTY"/>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="Unit">Unit</label>
										</div>
										<div className="col">
											<select className="form-control" value={data.Unit} name="Unit" onChange={handleInputChange} id="exampleFormControlSelect1">
												<option>-- Select --</option>
												<option>KG</option>
												<option>BOX</option>
												<option>Pisces</option>
												<option>GM</option>
											</select>										
										</div>
									</div>
									
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="Amount">Amount</label>
										</div>
										<div className="col ">
											
											<input type="number" required name="Amount" value={data.Amount}  onChange={handleInputChange} className="form-control"  placeholder="Total Amount" />

										</div>
									</div>
									
								</div>
								
								
								
							</form>

						</div>
						<div className="modal-footer">
							<button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" onClick={handleStoreData}>Save</button>
							
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Form;