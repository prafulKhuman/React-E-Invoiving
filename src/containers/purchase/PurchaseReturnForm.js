function PurchaseReturnForm()
{
	return (
		<>

			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
        Add Purchas Return
			</button>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-fullscreen">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Purchase Return</h5>
							<a className="btn-close cursor-pointer" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="col-2">

										<div className="input-group mb-3">

											<input type="text" className="form-control" aria-label="Default" placeholder="Party Name" aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>
									<div className="col-2">
										<div className="input-group mb-3">

											<input type="text" className="form-control" aria-label="Default" placeholder="Phone No." aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>

									<div className="col-3 invoice_No ">

										<lable>Return No </lable>
										<input type="text" className=" bottom_border " />

									</div>

								</div>
								<div className="row ">

									<div className="col-3 invoice_No ">
										<label>Bill No</label>
										<input className="bottom_border ml-4 mr-3" />

									</div>
								</div>
								<div className="row ">

									<div className="col-3 invoice_No mt-4">
										<label>Date</label>
										<input type="Date" className="bottom_border ml-5 mr-3" />

									</div>
								</div>
								<div className="row">
									<div className="col-3 invoice_No mt-4 ">

										<label>Due Date</label>
										<input type="Date" className="bottom_border ml-4 mr-3" />

									</div>
								</div>
								<div className="mt-5">
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

											</tr>
										</thead>
										<tfoot>
											<tr style={{ columnSpan: "all" }}>
												<td>Add +</td>
											</tr>
										</tfoot>
										<tbody>
											<tr>
												<td>1</td>
												<td>Redmi  Pro</td>
												<td>53268475</td>
												<td>13999</td>
												<td>1</td>
												<td>Pice</td>
												<td>13000</td>
												<td>13999</td>

											</tr>
											<tr>
												<td>2</td>
												<td>Redmi Note 11</td>
												<td>53268475</td>
												<td>10999</td>
												<td>2</td>
												<td>Pice</td>
												<td>10999</td>
												<td>1000</td>

											</tr>

										</tbody>
									</table>
								</div>

								<div className="mt-4 invoice_No row">
									<div className="input-group col-md-7">
										<div className="row">
											<label className="col-3 mt-2">Total </label>
											<input type="text" className="form-control col-7 ml-4" />
										</div>
									</div>

									<div className="input-group col-md-7 mt-3 mb-3">
										<div className="row">
											<label className="col-4 mt-2">Receive</label>
											<input type="text" className="form-control col-7" />
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
export default PurchaseReturnForm;