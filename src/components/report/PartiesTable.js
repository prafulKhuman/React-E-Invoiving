import sign from "./../Table/Sign/signature.png";
let party;
function PartiesTable ({ filteredData, config, parties }) {
	const totalAmount = filteredData?.reduce(getTotal, 0);
	function getTotal (total, num) {
		return total + parseInt(num.Total_Amount);
	}

	if (parties) {
		// setParties(parties[0]);
		party = parties[0];
	}

	return (<>
		<div className="row mt-2">
			<div className="col">
				<p className="h6"><span className="font-weight-bold "> Parties Name : </span>  {party?.PartiesName}</p>
				<p className="h6"><span className="font-weight-bold "> Mobail No  : </span>  {party?.PhoneNo}</p>
			</div>
		</div>
		<div className="mt-3 table-responsive" >

			<table className="table table-striped table-bordered w-full" >
				<thead className="table-dark">
					<tr>

						{config?.map((collumn, index) => {
							if (collumn.label != "") {
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
								<td>{index}</td>
								<td>{row.Order_No}</td>
								<td>{row.Type}</td>
								<td>{row.Date}</td>
								<td>{row.Due_Date}</td>
								<td>{row.Total_Amount}</td>
								<td>{row.Advance}</td>

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

			</div>
		</div>
	</>);
}

export default PartiesTable;
