// import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function PaymentInOut({file , AddData}) {
	
	// const initialValues = {
	// 	PartyName: "",
	// 	receiptno: "",
	// 	Date: "",
	// 	Description: "",
	// 	Amount: "",
	// 	TransectionType: file
	// };
	// const [paymentInfo , setPaymentInfo] = useState(initialValues);
	
	
	const PaymentInOutSchema = Yup.object().shape({
		PartyName : Yup.string().min(5).required("Can't Empty This Field"),
		receiptno : Yup.number().min(1).required("Can't Empty This Field "),
		Description: Yup.string().min(5).required("Can't Empty This Field"),
		Amount: Yup.number().min(1).required("Can't Empty This Field")
	});

	const { values  , errors , touched ,  handleBlur, handleChange, handleSubmit } = 
	useFormik({
		initialValues : {
			PartyName: "",
			receiptno: "",
			Description: "",
			Amount: "",
			TransectionType: file
		},
		validationSchema: PaymentInOutSchema ,
		onSubmit: (values , action)=>{
			AddData(values);
			action.resetForm();			
		},
	});

	// const handleChange =(e)=>{
	// 	setPaymentInfo({...paymentInfo , [e.target.name]: e.target.value });
	// };

	// const handleSubmit =(e)=>{
	// 	e.preventDefault();
	// 	AddData(paymentInfo);
	// 	setPaymentInfo(initialValues);
	// };


	return (
		<>
			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				<i className="bi bi-plus-circle" />
				{" "}
				{file}
			</button>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered modal-xl">
					<div className="modal-content">

						<div className="modal-header">
							<h5 className="modal-title  font-weight-bold" id="staticBackdropLabel">{file}</h5>
							<a className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							
							<form onSubmit={handleSubmit}>
								<div className="container-fluid">
									<div className="row">
										<div className="input-group mb-3 col-md-2">
											<input type="text"
												className="form-control"
												name="PartyName"
												required
												value={values.PartyName}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="PartyName"
												aria-describedby="inputGroup-sizing-default"
												aria-label="Default"

											/>
											{errors.PartyName && touched.PartyName ? (
												<p className="form-error text-danger">{errors.PartyName}</p>
											) : null}

										</div>
										<div className="invoice_No  col-md-4 ms-auto">

											<label>Receipt No . </label>
											<input type="text"
												name="receiptno"
												required
												className=" bottom_border ml-2 "
												value={values.receiptno}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{errors.receiptno && touched.receiptno ? (
												<p className="form-error text-danger">{errors.receiptno}</p>
											) : null}

										</div>
									</div>
									<div className="row">
										<div className="col-md-3 mt-3 ms-auto input-group">

											<textarea
												className="form-control"
												aria-label="With textarea"
												required
												value={values.Description}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Description"
												name="Description"
											/>
											{errors.Description && touched.Description ? (
												<p className="form-error text-danger">{errors.Description}</p>
											) : null}


										</div>


										

									</div>
									<div className="row">

									</div>
									<div className="row">
										<div className="invoice_No">

											<div className="row mt-5">
												<div className="col-md-9 input-group ">
													<input
														type="text"
														className="form-control"
														aria-label="Default"
														name="Amount"
														required
														value={values.Amount}
														onChange={handleChange}
														onBlur={handleBlur}
														placeholder="Amount"
														aria-describedby="inputGroup-sizing-default"
													/>
													{errors.Amount && touched.Amount ? (
														<p className="form-error text-danger">{errors.Amount}</p>
													) : null}

												</div>
											</div>
										</div>
									</div>

								</div>
								<div>
									<button type="submit" className="btn btn-primary item_right mt-5 mr-5" style={{ width: "200px" }}>Save</button>

								</div>
							</form>
							
						</div>

						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

						</div>

					</div>
				</div>
			</div>
		</>
	);
}

export default PaymentInOut;