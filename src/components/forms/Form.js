import { useFormik } from "formik";
import { SaleOrderSchema } from "../../utility/schema";
import { useState } from "react";
import swal from "sweetalert";
import { useFetchItemQuery } from "../../redux";
import { useFetchPartiesQuery } from "../../redux";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import { Hint } from "react-autocomplete-hint";

let initialValues = {
	No: "",
	Item: "",
	ItemCode: "",
	MRP: "",
	QTY: "",
	Unit: "",
	Amount: "",
};



function Form({ file, onsubmit, ID }) {

	const No = ID + 1;

	const intial = {
		PartyName: "",
		PhoneNo: "",
		Email: "",
		Address: "",
		ID: "",
		DueDate: "",
		Total: "",
		Advance: "",
	};


	const { user } = useUserAuth();
	const response = useFetchPartiesQuery();
	const itemResponse = useFetchItemQuery();
	const fileName = file;
	const [data, setData] = useState([]);
	const [filds, setFilds] = useState(intial);
	const [Select, setSelect] = useState("");

	// Error Handling

	if(response.error){
		swal("Error", " Error While Fatching Parties Data", "error");
	}else if(itemResponse.error){
		swal("Error", " Error While Fatching Item Data", "error");
	}
	
	// Get Custommer And Saller Personal Details And Total , Advance
	const handleChange2 = (e) => {
		const { name, value } = e.target;
		setFilds({ ...filds, [name]: value });
	};
	const handleSubmit2 = (e) => {
		e.preventDefault();
		const main = [data, filds, { ["UID"]: user.uid }];
		onsubmit(main);
		setData([]);
		setFilds(intial);
	};
	// End

	// Get Products Data using useFormik Validation
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues,
			validationSchema: SaleOrderSchema,
			onSubmit: (values, action) => {
				setData([...data, values]);
				swal({
					title: "Data Saved Success!",
					icon: "success",
					button: "Done!",
				});
				action.resetForm();


			},
		});
	//End

	// Calculate Total Amount 
	const totalAmount = data.reduce(getTotal, 0);
	function getTotal(total, num) {
		return total + num.Amount;
	}
	filds.Total = totalAmount;
	//End Total Amount

	// delete Item Start
	const handleRemoveItem = (rows) => {

		swal({
			title: "Are you sure?",
			text: "Once deleted, you will not be able to recover this Data!",
			icon: "warning",
			buttons: true,
			dangerMode: true,
		})
			.then((willDelete) => {
				if (willDelete) {
					data.map((row) => {
						if (row.No === rows.No) {
							filds.Total = filds.Total - row.Amount;
						}
					});

					const updated = data.filter((item) => {
						return item.No !== rows.No;
					});

					if (data != updated) {
						swal("Data Deleted Success", {
							icon: "success",
						});
					}
					setData(updated);

				} else {
					swal("Your Data is safe!");
				}
			});



	};
	// Delete Item End

	//Item Start
	const handleItemCode = (e) => {
		setSelect(e.target.value);
	};

	let row;
	if (itemResponse.data) {
		const filterUID = itemResponse.data?.filter((item) => item.UID === user.uid);
		const item = filterUID?.map((key) => ({
			ItemName: key.ItemName,
			ItemCode: key.ItemCode,
			MRP: key.SalePrice,
			id: key.id

		}));
		row = item;
	}

	const filterItem = row?.filter((item) => item.ItemCode === Select);
	let selectItem;
	if (filterItem) {
		selectItem = filterItem[0];
		ID = selectItem?.id;
	}

	const code = row?.map((item) => {
		return item.ItemCode;
	});

	const itemCodeHint = code ? code : [""];
	const itemNameHint = selectItem ? [selectItem.ItemName] : [""];
	// Item End

	// Set Party value To Fild State
	const handleParty = (e) => {
		const partyName = e.target.name;
		const partyValue = e.target.value;
		const Values = partyValue ? partyValue.toString().toLowerCase() : partyValue;
		setFilds({ ...filds, [partyName]: Values });
	};
	// End

	

	// Party Name Hint 
	let filterUIDC ;
	if(file==="Sale-Invoice" || file === "Sale-Order" || file==="Sale-Return"){
		filterUIDC = response.data?.filter((item) => item.UID === user.uid && item.PartyType === "Custommer");
	}else{
		filterUIDC = response.data?.filter((item) => item.UID === user.uid && item.PartyType === "Saller");
	}

	const parties = filterUIDC?.map((user) => {
		return (user.PartyName).toLowerCase();
	});
	const partyHint = parties ? parties : [""];
	// End


	// Party mobile Number Hint
	const filterMobile = filterUIDC?.filter((item) => item.PartyName.toLowerCase() === filds.PartyName);
	const partyMobile = filterMobile?.map((user) => {
		return user.PhoneNo;
	});
	const mobile = partyMobile != "" ? partyMobile : "Enter Mobile No";
	// End 

	
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
							<form onSubmit={handleSubmit2}>
								<div className="container-fluid">

									<div className="row">
										<div className="col-sm-2">

											<div className="input-group mb-3">
												<Hint options={partyHint} allowTabFill={true} allowEnterFill={true}>
													<input
														type="text"
														className="form-control"
														name="PartyName"
														value={filds.PartyName}
														placeholder="Party Name"
														aria-describedby="inputGroup-sizing-default"
														onChange={handleParty}
														required />
												</Hint>
											</div>
										</div>
										<div className="col-sm-2">
											<div className="input-group">

												<input type="number"
													className="form-control"
													name="PhoneNo"
													value={filds.PhoneNo}
													onChange={handleChange2}
													required
													aria-label="Default"
													placeholder={mobile}
													aria-describedby="inputGroup-sizing-default" />
											</div>
										</div>
										<div className="col-sm-8  text-right">

											<label htmlFor="ID">
												{fileName === "Sale-Invoice" ? "Invoice No " : ""}
												{fileName === "Sale-Order" ? "Order No " : ""}
												{fileName === "Sale-Return" || fileName === "Purchase-Return" ? "Return No " : ""}
												{fileName === "Purchase-Bill" ? "Bill No" : ""}


											</label>
											<input type="number"
												name="ID"
												placeholder={`ID - ${No}`}
												value={filds.ID}
												onChange={handleChange2}
												required
												className=" bottom_border  ml-1" />

										</div>

									</div>

									<div className="row ">

										<div className="col-2 input-group">

											<input type="email"
												className="form-control"
												name="Email"
												value={filds.Email}
												onChange={handleChange2}
												required
												aria-label="Default"
												placeholder="Email."
												aria-describedby="inputGroup-sizing-default" />


										</div>

										<div className="col-2 input-group">

											<textarea
												className="form-control"
												name="Address"
												value={filds.Address}
												onChange={handleChange2}
												required
												aria-label="Default"
												placeholder="Address."
												aria-describedby="inputGroup-sizing-default" />


										</div>

										<div className="col text-right">

											<label className="mr-1" htmlFor="DueDate">Due Date </label>
											<input type="Date"
												className="bottom_border  mr-5 "
												name="DueDate"
												required
												value={filds.DueDate}
												onChange={handleChange2}
											/>


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
												{data?.map((rows) => {
													return (
														<tr key={rows.No}>
															<td>
																{rows.No}
															</td>
															<td style={{ width: "20%" }}>
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
															<td style={{ width: "5%" }}>
																<i className=" ml-2 bi bi-trash fa-lg" onClick={() => handleRemoveItem(rows)} />
															</td>
														</tr>);
												})}
											</tbody>
										</table>
									</div>
									<div className="mt-4">
										<div className="input-group item_right ">
											<div className="row">
												<label className="col-sm-3 mt-2">Total </label>

												<input type="number"
													name="Total"
													required
													readOnly
													value={filds.Total}
													className="form-control col-6"
												/>

											</div>
										</div>
										{fileName === "Sale-Return" || fileName === "Purchase-Return" ? "" :
											<div className="input-group  item_right mt-3">
												<div className="row">
													<label className="col-sm-4 mt-2">
														{fileName === "Sale-Invoice" ? "Received" : ""}
														{fileName === "Sale-Order" ? "Advance" : ""}
														{fileName === "Purchase-Bill" ? "Paid" : ""}

													</label>

													<input type="number"
														name="Advance"
														required
														value={filds.Advance}
														onChange={handleChange2}
														className="form-control col-5" />


												</div>
											</div>
										}



									</div>

									<div className="input-group item_right row mt-5">
										<div className="col-3 ml-2">
											<button type="submit" className="btn btn-primary" style={{ width: "200px" }} >Save / Next </button>

										</div>
									</div>

								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

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

							<form onSubmit={handleSubmit} >
								<div className="form-group">
									<div className="row">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="No"><span style={{ color: "#e81717" }}> * </span> No . </label>
										</div>
										<div className="col">
											<input type="number"
												name="No"
												value={values.No}
												onChange={handleChange}
												onBlur={handleBlur}
												className="form-control"
												placeholder={data?.length + 1}
											/>
											{errors.No && touched.No ? (
												<p className="form-error text-danger">{errors.No}</p>
											) : null}
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="ItemCode"><span style={{ color: "#e81717" }}> * </span> Item Code</label>
										</div>
										<div className="col">
											<Hint options={itemCodeHint} allowTabFill={true} allowEnterFill={true}>
												<input type="number"
													name="ItemCode"
													value={values.ItemCode}
													onChange={(event) => {
														handleChange(event);
														handleItemCode(event);
													}}
													onBlur={handleBlur}
													className="form-control"
													placeholder="Item Code" />
											</Hint>
											{errors.ItemCode && touched.ItemCode ? (
												<p className="form-error text-danger">{errors.ItemCode}</p>
											) : null}
										</div>


									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="Item"><span style={{ color: "#e81717" }}> * </span> Item </label>
										</div>
										<div className="col">
											<Hint options={itemNameHint} allowTabFill={true} allowEnterFill={true}>
												<input type="text"
													name="Item"
													value={values.Item}
													onChange={handleChange}
													onBlur={handleBlur}
													className="form-control"
													placeholder={selectItem ? selectItem.ItemName : "Item Name"} />
											</Hint>
											{errors.Item && touched.Item ? (
												<p className="form-error text-danger">{errors.Item}</p>
											) : null}
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="MRP"><span style={{ color: "#e81717" }}> * </span> MRP</label>
										</div>
										<div className="col">

											<input type="number"
												name="MRP"
												value={values.MRP}
												onChange={handleChange}
												onBlur={handleBlur}
												className="form-control"
												placeholder={selectItem ? selectItem.MRP : "MRP"} />

											{errors.MRP && touched.MRP ? (
												<p className="form-error text-danger">{errors.MRP}</p>
											) : null}
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2" >
											<label className="ml-4" htmlFor="QTY"><span style={{ color: "#e81717" }}> * </span> QTY</label>
										</div>
										<div className="col">
											<input type="number"
												name="QTY"
												value={values.QTY}
												onChange={handleChange}
												onBlur={handleBlur}
												className="form-control"
												placeholder="QTY" />
											{errors.QTY && touched.QTY ? (
												<p className="form-error text-danger">{errors.QTY}</p>
											) : null}
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="Unit"> <span style={{ color: "#e81717" }}> * </span> Unit</label>
										</div>
										<div className="col">
											<select className="form-control" name="Unit" value={values.Unit} onChange={handleChange} onBlur={handleBlur} id="exampleFormControlSelect1">
												<option>-- Select --</option>
												<option>KG</option>
												<option>BOX</option>
												<option>Pisces</option>
												<option>GM</option>
											</select>
											{errors.Unit && touched.Unit ? (
												<p className="form-error text-danger">{errors.Unit}</p>
											) : null}
										</div>
									</div>

									<div className="row mt-3">
										<div className="col-4 mt-2">
											<label className="ml-4" htmlFor="Amount"><span style={{ color: "#e81717" }}> * </span> Amount</label>
										</div>
										<div className="col ">

											<input type="number"
												name="Amount"
												value={values.Amount}
												onChange={handleChange}
												onBlur={handleBlur}
												className="form-control"
												placeholder="Total Amount"
											/>
											{errors.Amount && touched.Amount ? (
												<p className="form-error text-danger">{errors.Amount}</p>
											) : null}
										</div>
									</div>

								</div>

								<div>

									<button className="btn btn-primary item_right mr-3 mt-3" type="submit" style={{ width: "200px" }} >Save / Next</button>

								</div>

							</form>

						</div>
						<div className="modal-footer">
							<button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal" data-bs-dismiss="modal" >Close</button>

						</div>
					</div>
				</div>
			</div>

		</>
	);
}

export default Form;