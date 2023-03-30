function ExpensesFrom()
{
	return (
		<>

			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
        Add Expenses
			</button>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-fullscreen">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Expenses Return</h5>
							<a className="btn-close cursor-pointer" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="col-2">

										<div className="input-group mb-3">

											<input type="text" className="form-control" aria-label="Default" placeholder="Expenses Category" aria-describedby="inputGroup-sizing-default" />
										</div>
									</div>
                                    
									<div className="invoice_No col-3 ">

										<lable>Exp. No </lable>
										<input type="text" className=" bottom_border " />
                                      
									</div>
                                    
								</div>

								<div className="row ">

									<div className="invoice_No col-3">
										<label>Date</label>
										<input type="Date" className="bottom_border ml-4 mr-3" />

									</div>
								</div>

								<div className="mt-5">
									<table className="table table-bordered table-hover">
										<thead>
											<tr>
												<th>#</th>
												<th>Item</th>
												<th>Qty</th>
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
												<td>1</td>
												<td>13000</td>
												<td>12000</td>
												
											</tr>
										</tbody>
									</table>
								</div>
								<div className="mt-4 invoice_No row">
									<div className="input-group col-md-10">
										<label className="col-4 mt-2">Total</label>
										<input type="text" className="form-control col-8 " />
									</div>
									{/* </div> */}
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
export default ExpensesFrom;