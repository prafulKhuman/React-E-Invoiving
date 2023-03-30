function SaleReport() {
	const handlePrint = () => {
 
		let printContents = document.getElementById("Invoice").innerHTML;
		let originalContents = document.body.innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		document.body.innerHTML = originalContents; 
   
	};
	return (
		<>
			<a data-bs-toggle="modal" data-bs-target="#staticBackdrop2">
				<i className="bi bi-printer-fill fa-2x" />
			</a>


			<div className="modal fade" id="staticBackdrop2"  tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content" id="Invoice">
						<div className="modal-header">
							<a className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body" >
							<div className="container-fluid">
								<div className="row container">
									<div className="col-7">
										<p className="modal-title text-right"><ins><strong><h2>Sale Report</h2></strong></ins></p>
									</div>
								</div>
								<br />
								<div className="row">
									<div className="col">
										<h5 className="font-weight-bold">Duration: From 01/03/2023 to 31/03/2023</h5>
									</div>
								</div>
								<div className="mt-5">
									<table className="table">
										<thead className="table-dark">
											<tr>

												<th>Data</th>
												<th>Ref No</th>
												<th>Party Name</th>
												<th>Category</th>
												<th>Total</th>
												<th>Received</th>
												<th>Balance</th>
												<th>Status</th>

											</tr>
										</thead>
										<tbody>
											<tr>
												<td>01/02/2023</td>
												<td>1</td>
												<td>praful Khuman</td>
												<td>case</td>
												<td>Sale</td>
												<td>10500</td>
												<td>500</td>
												<td>Paid</td>

											</tr>
											<tr>
												<td>01/02/2023</td>
												<td>2</td>
												<td>mahi patel</td>
												<td>case</td>
												<td>Sale</td>
												<td>10500</td>
												<td>500</td>
												<td>Paid</td>


											</tr>
										</tbody>

									</table>

								</div>
								<hr />
								<br />
								<div className="row">
									<div className="col text-right pull-right invoice-total">
										<p>
											<label className="font-weight-bold">Total Amount : </label>
											<span> ₹ 300 </span>
										</p>
										<p>
											<label className="font-weight-bold"> Balance : </label>
											<span> ₹ 200</span>
										</p>
										<p>
											<label className="font-weight-bold">Received : </label>
											<span> ₹ 100</span>
										</p>
									</div>
								</div>

								<div className="row">
									<div className="col-xs-6 margintop">
										<p className="lead marginbottom font-weight-bold"> THANK YOU!<i className="bi bi-emoji-smile ml-2"></i></p><br />

										<button className="btn btn-success" id="invoice-print" onClick={handlePrint}><i className="fa fa-print"></i> Print Report</button>

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
export default SaleReport;