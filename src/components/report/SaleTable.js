import sign from "./../Table/Sign/signature.png";
function SaleTable ({ filteredData, config }) {
	const totalAmount = filteredData?.reduce(getTotal, 0);
	function getTotal (total, num) {
		return total + num.Total_Amount;
	}
	const totalBalance = filteredData?.reduce(getBalance, 0);
	function getBalance (total, num) {
		return total + num.Balance;
	}
	const totalReceived = filteredData?.reduce(getReceived, 0);
	function getReceived (total, num) {
		return total + parseInt(num.Advance);
	}

	return (<>
		<div className="mt-5 table-responsive" >

			<table className="table table-striped table-bordered w-full" >
				<thead className="table-dark">
					<tr>

						{config?.map((collumn, index) => {
							if (collumn.label != "Action") {
								return (
									<th key={index}>{collumn.label}</th>
								);
							}
						})}

					</tr>
				</thead>
				<tbody>
					{filteredData?.map((row, index) => {
						return (
							<tr key={index}>
								<td>{row.Id}</td>
								<td>{row.Party_Name}</td>
								<td>{row.Order_No}</td>
								<td>{row.Date}</td>
								<td>{row.Due_Date}</td>
								<td>{row.Total_Amount}</td>
								<td>{row.Advance}</td>
								<td>{row.Balance}</td>
								<td>{row.Status}</td>

							</tr>);
					})}
				</tbody>

			</table>
		</div>
		<hr />
		<br />
		<div className="row">
			<div className="col-xs-6 text-left ml-3 mt-3">
				<p className="lead font-weight-bold marginbottom">THANK YOU! <i className="bi bi-emoji-smile" /></p>
				<img src={sign} alt="Signature" style={{ width: "250px", height: "100px" }}/>

			</div>
			<div className="col text-right pull-right invoice-total">
				<p>
					<label className="font-weight-bold">Total Amount : </label>
					<span> ₹ {totalAmount} </span>
				</p>
				<p>
					<label className="font-weight-bold"> Balance : </label>
					<span> ₹ {totalBalance}</span>
				</p>
				<p>
					<label className="font-weight-bold">Advance : </label>
					<span> ₹ {totalReceived}</span>
				</p>
			</div>
		</div>
	</>);
}

export default SaleTable;
