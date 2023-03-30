function PaymentOutFrom()
{
	return(
		<>
			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
        Payment Out
			</button>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Payment Out</h5>
							<a className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="input-group mb-3 col-md-2">

										<input type="text" className="form-control" aria-label="Default" placeholder="Party Name" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="invoice_No  col-md-4 ms-auto">

										<lable>Receipt No . </lable>
										<input type="text" className=" bottom_border ml-2 " />

									</div>
								</div>
								<div className="row">
									<div className="col-md-2 input-group ms-auto">
										<input type="text" className="form-control" aria-label="Default" placeholder="Payment Type" aria-describedby="inputGroup-sizing-default" />

									</div>
									<div className="col-md-4 ms-auto invoice_No">
										<lable>Date :: </lable>
										<input type="date" className=" bottom_border  ml-5" />

									</div>
								</div>
								<div className="row">
									<div className="col-md-3 mt-3 ms-auto input-group">

										<textarea className="form-control" aria-label="With textarea" placeholder="Description" />

									</div>
								</div>
								<div className="row">
									<div className="invoice_No">

										<div className="row mt-5">
											<div className="col-md-9 input-group ">
												<input type="text" className="form-control" aria-label="Default" placeholder="Pay Amount" aria-describedby="inputGroup-sizing-default" />

											</div>
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
export default PaymentOutFrom;