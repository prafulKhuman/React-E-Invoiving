import "./Invoice.css";
function Bill() {
	const handlePrint = () => {
 
		let printContents = document.getElementById("Invoice").innerHTML;
		let originalContents = document.body.innerHTML;
		document.body.innerHTML = printContents;
		window.print();
		document.body.innerHTML = originalContents; 
   
	};
   
	return (<>

		<a  data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
			<i className="bi bi-printer-fill fa-lg"/>
		</a>


		<div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div className="modal-dialog  modal-fullscreen">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">Sale Invoice</h5>
						<a type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
					</div>
					<div className="modal-body " id="Invoice">






						<div className="card mt-5 mr-5 ml-5 " >
							<div className="card-body">

								<div className="invoice-ribbon"><div className="ribbon-inner">PAID</div></div>
								<div>

									<div className="row" >
										<div id="boot-icon" className="col" style={{ fontSize: "30px" }}> Sale Invoice</div>

										<div className="col mr-5 text-right" >
											<h4 className="" >INVOICE-00</h4>
											<span className="">14 April 2014</span>
										</div>
									</div>
									<hr />
									<div className="row ">



										<div className="col from ">
											<p className="lead marginbottom font-weight-bold">TO : Dynofy</p><br />
											<p>350 Rhode Island Street</p>
											<p>Suite 240, San Francisco</p>
											<p>California, 94103</p>

											<p><label className="font-weight-bold">Phone : </label> <span>7096984290</span></p>
											<p> <label className="font-weight-bold">Email : </label> <span>khumanpraful11@gmail</span></p>
										</div>



										<div className="col text-right payment-details">
											<p className="lead marginbottom payment-info font-weight-bold">Payment details</p><br />
											<p>
												<label className="font-weight-bold">Date : </label>
												<span> 14 April 2014</span>
											</p>
											<p>
												<label className="font-weight-bold">Total Amount : </label>
												<span> $1019</span>
											</p>
											<p>
												<label className="font-weight-bold">Account Name : </label>
												<span> Flatter</span>
											</p>
										</div>

									</div>
								</div>


								<br />   <div className="row table-row">
									<table className="table table-striped table-bordered">
										<thead>
											<tr>
												<th className="text-center" style={{ width: "5%" }}>#</th>
												<th style={{ width: "50%" }}>Item</th>
												<th className="text-right" style={{ width: "15%" }}>Quantity</th>
												<th className="text-right" style={{ width: "15%" }}>Unit Price</th>
												<th className="text-right" style={{ width: "15%" }}>Total Price</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="text-center">1</td>
												<td>Flatter Theme</td>
												<td className="text-right">10</td>
												<td className="text-right">$18</td>
												<td className="text-right">$180</td>
											</tr>
											<tr>
												<td className="text-center">2</td>
												<td>Flat Icons</td>
												<td className="text-right">6</td>
												<td className="text-right">$59</td>
												<td className="text-right">$254</td>
											</tr>
											<tr>
												<td className="text-center">3</td>
												<td>Wordpress version</td>
												<td className="text-right">4</td>
												<td className="text-right">$95</td>
												<td className="text-right">$285</td>
											</tr>
											<tr className="last-row">
												<td className="text-center">4</td>
												<td>Server Deployment</td>
												<td className="text-right">1</td>
												<td className="text-right">$300</td>
												<td className="text-right">$300</td>
											</tr>

										</tbody>

									</table>

								</div>


								<div className="row">
									<div className="col-xs-6 ml-5 mt-3">
										<p className="lead marginbottom">THANK YOU! <i className="bi bi-emoji-smile" /></p><br />

										<button type="button" className="btn btn-outline-success" id="invoice-print" onClick={handlePrint}><i className="fa fa-print"></i> Print Invoice</button>

									</div>
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

								<div className="col-md-2">

								</div>
							</div>


						</div>







					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        
					</div>
				</div>
			</div>
		</div>
	</>);
}

export default Bill;