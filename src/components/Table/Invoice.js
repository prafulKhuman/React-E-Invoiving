import sign from "./Sign/signature.png";
function Invoice({ billInfo, file }) {
	const info = billInfo?.map((info) => ({
		invoiceNo: info[1].ID,
		Date: info.timestamp,
		PartyName: info[1].PartyName,
		Address: info[1].Address,
		Phone: info[1].PhoneNo,
		Email: info[1].Email,
		DueDate: info[1].DueDate,
		TotalAmount: info[1].Total,
		Advance: info[1].Advance
	}));

	const allProperties = billInfo?.map((obj) => {
		if (Array.isArray(obj[0])) {
			return obj[0].map((nestedObj) => {
				return {
					Amount: nestedObj.Amount,
					Item: nestedObj.Item,
					ItemCode: nestedObj.ItemCode,
					MRP: nestedObj.MRP,
					No: nestedObj.No,
					QTY: nestedObj.QTY,
					Unit: nestedObj.Unit
				};
			});
		} else {
			return {
				Amount: obj.Amount,
				Item: obj.Item,
				ItemCode: obj.ItemCode,
				MRP: obj.MRP,
				No: obj.No,
				QTY: obj.QTY,
				Unit: obj.Unit
			};
		}
	}).flat();
	let details;
	if (info) {
		details = info[0];
	}
	console.log(details , "dt");
	const advance = parseInt(details?.Advance);

	return (<>
		<div className="card-body" >

			<div className="invoice-ribbon"><div className="ribbon-inner">{file === "Sale-Return" || file === "Purchase-Return" ? "" : ((details?.TotalAmount) - (advance)) === 0 ? "PAID" : "UNPAID"}</div></div><div>

				<div className="row">
					<div id="boot-icon" className="col" style={{ fontSize: "30px" }}> {file === "Sale-Return" || file === "Purchase-Return" ? "Return Invoice" : "Invoice"} </div>

					<div className="col mr-5 text-right">
						<h4 className="">Ref No - {details?.invoiceNo } </h4>
						<span className="">{details?.Date}</span>
					</div>
				</div>
				<hr />
				<div className="row ">
					
					<div className="col from ">
						<p className="lead marginbottom font-weight-bold">TO : {details?.PartyName}</p><br />
						<p>{details?.Address}</p>

						<p><label className="font-weight-bold">Phone : </label> <span>{details?.Phone}</span></p>
						<p> <label className="font-weight-bold">Email : </label> <span>{details?.Email}</span></p>
					</div>

					<div className="col text-right payment-details">
						<p className="lead marginbottom payment-info font-weight-bold">Payment details</p><br />
						<p>
							<label className="font-weight-bold">Due Date : </label>
							<span> {details?.DueDate}</span>
						</p>
						<p>
							<label className="font-weight-bold">Total Amount : </label>
							<span> {details?.TotalAmount} </span>
						</p>

					</div>

				</div>
			</div>

			<br />   <div className="row table-row">
				<table className="table table-striped table-bordered">
					<thead>
						<tr>
							<th className="text-center" style={{ width: "5%" }}>#</th>
							<th style={{ width: "30%" }}>Item</th>
							<th className="text-right" style={{ width: "20%" }}>Item Code</th>
							<th className="text-right" style={{ width: "15%" }}>MRP</th>
							<th className="text-right" style={{ width: "15%" }}>QTY</th>
							<th className="text-right" style={{ width: "15%" }}>Unit</th>
							<th className="text-right" style={{ width: "15%" }}>Amount</th>
						</tr>
					</thead>
					<tbody>

						{allProperties?.map((Row, index) => {
							return (

								<tr key={index}>
									<td className="text-center">{index + 1}</td>

									<td>{Row.Item}</td>
									<td className="text-right">{Row.ItemCode}</td>
									<td className="text-right">{Row.MRP}</td>
									<td className="text-right">{Row.QTY}</td>
									<td className="text-right">{Row.Unit}</td>
									<td className="text-right">{Row.Amount}</td>

								</tr>

							);
						})}
					</tbody>

				</table>

			</div><div className="row">
				<div className="col-xs-6 ml-5 mt-3">
					<p className="lead font-weight-bold marginbottom">THANK YOU! <i className="bi bi-emoji-smile" /></p>
					<img src={sign} alt="Signature" style={{ width: "250px", height: "100px" }} />

				</div>
				<div className="col text-right pull-right invoice-total mt-4">
					<p>
						<label className="font-weight-bold">Total Amount : </label>
						<span> {details?.TotalAmount} </span>
					</p>
					{file === "Sale-Return" || file === "Purchase-Return"
						? ""
						: <><p>
							<label className="font-weight-bold"> {file === "Purchase-Bill" ? "UnPaid" : "Balance"} : </label>
							<span>{details?.TotalAmount - advance}</span>
						</p><p>
							
							<label className="font-weight-bold"> {file === "Purchase-Bill" ? "Paid" : "Received"}: </label>
							<span> {advance} </span>
						</p></>
					}
				</div>
			</div><div className="col-md-2">

			</div>
		</div>
	</>);
}

export default Invoice;
