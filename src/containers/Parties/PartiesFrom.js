function PartiesFrom() {
	return (
		<>
			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
        Add Partie
			</button>
			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Parties From</h5>
							<a href type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
								<div className="row">
									<div className="input-group  col-md-4">
										<input type="text" className="form-control" aria-label="Default" placeholder="Party Name" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="input-group col-md-4 ms-auto">
										<input type="email" className="form-control" aria-label="Default" placeholder="Email ID" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="input-group  col-md-4">
										<input type="text" className="form-control" aria-label="Default" placeholder="Phone No" aria-describedby="inputGroup-sizing-default" />
									</div>
								</div>
								<br />
								<div className="row">
									<div className="input-group col-md-6">
										<textarea className="form-control" aria-label="With textarea" placeholder="Billing Address" />
									</div>
									<div className=" col-md-6 ms-auto">
										<textarea className="form-control" aria-label="With textarea" placeholder="Shipping Address" />
									</div>

								</div>
								<br />

							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary">Save</button>
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default PartiesFrom;