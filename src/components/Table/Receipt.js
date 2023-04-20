import sign from "./Sign/signature.png";
function Receipt({ billInfo }) {
	let receiptData =[] ;
	if(billInfo){
		receiptData = billInfo[0] ;
	}
	
	

	return ( <>
		<div className="card-body" >

			<div className="invoice-ribbon"><div className="ribbon-inner">PAID</div></div><div>



				<div className="row">
					<div id="boot-icon" className="col" style={{ fontSize: "30px" }}>RECEIPT </div>

					<div className="col mr-5 text-right">
						<h4 className="">Receipt No - {receiptData?.receiptno} </h4>
						<span className=""></span>
					</div>
				</div>
				<hr />
				<div className="row ">



					<div className="col from ">
						<p className="lead marginbottom font-weight-bold mt-3">Party Name : <span> {receiptData?.PartyName} </span></p><br />
						<p></p>

						<p><label className="font-weight-bold">Phone : </label> <span></span></p>
						<p> <label className="font-weight-bold">Email : </label> <span></span></p>
					</div>



					<div className="col text-right payment-details">
						<p className="lead marginbottom payment-info font-weight-bold">Payment details</p><br />
						<p>
							<label className="font-weight-bold"> Type : </label>
							<span> {receiptData?.TransectionType} </span>
						</p>
						<p>
							<label className="font-weight-bold"> Amount :</label>
							<span>  {receiptData?.Amount} </span>
						</p>

					</div>

				</div>
			</div>



			<br /> 
			<hr/>
			<div className="row">
				<div className="col-xs-6 ml-5 mt-3">
					<p className="lead font-weight-bold marginbottom">THANK YOU! <i className="bi bi-emoji-smile" /></p>
					<img src={sign} alt="Signature" style={{ width : "250px" , height : "100px"}}/>

				</div>
				<div className="col text-right pull-right invoice-total">
					<p>
						<label className=" font-weight-bold">Total Amount : </label>
						<span className="font-weight-bold"> </span>
					</p>
					<p>
						<label className=" font-weight-bold"> Balance : </label>
						<span className="font-weight-bold" ></span>
					</p>
					<p>
						<label className=" font-weight-bold">Received : </label>
						<span > {receiptData?.Amount} </span>
					</p>
				</div>
			</div><div className="col-md-2">

			</div>
		</div>
	</> );
}

export default Receipt;