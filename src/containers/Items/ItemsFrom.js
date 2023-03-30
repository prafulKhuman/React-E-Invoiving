function ItemsFrom() {
	return (
		<>
			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
        Add Item
			</button>


			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Add Item</h5>
							<a type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<div className="container-fluid">
							</div>
							<div className="container">
								<div className="row">
									<div className="input-group mb-1 col-md-3">
										<input type="text" className="form-control" aria-label="Default" placeholder="Item name" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="col">
										<input type="text" className="form-control" aria-label="Default" placeholder="Item HSN" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="col">
										<input type="text" className="form-control" aria-label="Default" placeholder="Item Code" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="col">
										<input type="text" className="form-control" aria-label="Default" placeholder="Category" aria-describedby="inputGroup-sizing-default" />
									</div>
								</div>
								<div className="row">
									<div className="input-group mb-auto col-md-3 mt-4">
										<input type="text" className="form-control" aria-label="Default" placeholder="Description" aria-describedby="inputGroup-sizing-default" />
									</div>
								</div>
								<div className="row">
									<div className="col mt-4 font-weight-bold" ><h4>ITEMS</h4></div>
									<hr/>
								</div>
								<div className="row">
                
									<div className="input-group mb-auto col-3 ml-3 mt-4">
										<input type="text" className="form-control" aria-label="Default" placeholder="MRP" aria-describedby="inputGroup-sizing-default" />
									</div>
									<div className="col-8 text-center mt-4">
										<h5>STOCK</h5>
									</div>           
								</div>

								<div className="row">
									<div className="col mt-3">
                
										<div className="input-group mb-auto col-6">
											<input type="text" className="form-control" aria-label="Default" placeholder="Sale Price"  />
										</div>
										<div className="col-6 mt-3">
											<input type="text" className="form-control" aria-label="Default" placeholder="Quantity"  />
										</div>           
									</div>

									<div className="col mt-3">
                
										<div className="input-group mb-auto col-6 ">
											<input type="text" className="form-control" aria-label="Default" placeholder="Purchase Price" />
										</div>
										<div className="col-6 mt-3">
											<input type="text" className="form-control " aria-label="Default" placeholder="At Price" />
										</div>           
									</div>
								</div>


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
export default ItemsFrom; 