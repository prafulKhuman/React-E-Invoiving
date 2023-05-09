import * as Yup from "yup";
import { useFormik } from "formik";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import { useState } from "react";
import Select from "react-select";
import { useFetchPartiesQuery } from "../../redux";
import { Hint } from "react-autocomplete-hint";
import swal from "sweetalert";

function PaymentInOut({ file, AddData, ID }) {
	const { user } = useUserAuth();

	const [selectedOption, setSelectedOption] = useState(null);
	const {data , error} =  useFetchPartiesQuery();
	

	if(error){
		swal("Oops...!", "Problem While Fatching Party Data", "error");
	}
	

	// Payment In Out Form Handling Using useFormik
	const paymentInOutSchema = Yup.object().shape({
		receiptno: Yup.number().min(1).required("Can't Empty This Field "),
		Description: Yup.string().min(5).required("Can't Empty This Field"),
		Amount: Yup.number().min(1).required("Can't Empty This Field"),
		MobailNo: Yup.number().min(10, "Enter 10 Digit Number").required("Can't Empty This Field")
	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				receiptno: "",
				Description: "",
				Amount: "",
				MobailNo: "",
				TransectionType: file
			},
			validationSchema: paymentInOutSchema,
			onSubmit: (values, action) => {
				
				const payment = {
					...values,
					UID: user.uid,
					PartyName : selectedOption.label
				};
				AddData(payment);
				action.resetForm();
			}
		});
	// End 


	// Filter Party If Party Type Custommer
	const filterCustommer = data?.filter((item) => item.UID === user.uid && item.PartyType === "Custommer");
	const custommer = filterCustommer?.map((item) => ({
		label: (item.PartyName).toLowerCase(),
	}));
	
	// Filter Party If Party Type Custommer
	const filterSaller = data?.filter((item) => item.UID === user.uid && item.PartyType === "Saller");
	const saller = filterSaller?.map((item) => ({
		label: (item.PartyName).toLowerCase(),
	}));

	
	
	let options;
	let phone = [""];
	if (file === "Payment-In") {
		options = custommer;
		const hint = filterCustommer?.map((item) => {
			if (item.PartyName.toLowerCase() === selectedOption?.label) {
				return item.PhoneNo;
			}else{
				return "";
			}
		});
		phone = hint ;
		
	} else {
		options = saller;
		const hint  = filterSaller?.map((item) => {
			if (item.PartyName.toLowerCase() === selectedOption?.label) {
				return item.PhoneNo;
			}else{
				return "";
			}
		});
		
		phone = hint ;
	}
	const phoneHint = phone ? phone : [""];


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
										<div className="input-group mb-3 col-md-3">
											<Select
												defaultValue={selectedOption}
												onChange={setSelectedOption}
												options={options}
												className="form-control"
												isClearable={true}
												isSearchable={true}
											/>
											

										</div>
										<div className="invoice_No  col-md-4 ms-auto">

											<label htmlFor="ReceiptNo">Receipt No . </label>
											<input type="number"
												name="receiptno"
												id="ReceiptNo"
												placeholder={`ID - ${ID + 1}`}
												required
												className=" bottom_border ml-2 "
												value={values.receiptno}
												onChange={handleChange}
												onBlur={handleBlur}
											/>
											{errors.receiptno && touched.receiptno
												? (
													<p className="form-error text-danger">{errors.receiptno}</p>
												)
												: null}

										</div>
									</div>
									
									<div className="row">
										<div className="input-group  col-md-3">
											<Hint options={phoneHint} allowTabFill={true} allowEnterFill={true}>

												<input 
													type="number"
													className="form-control"
													name="MobailNo"
													required
													value={values.MobailNo}
													onChange={handleChange}
													onBlur={handleBlur}
													placeholder={phoneHint  ?  phoneHint : "Phone No"   }
													aria-describedby="inputGroup-sizing-default"
													aria-label="Default"

												/>
											</Hint>
											{errors.MobailNo && touched.MobailNo
												? (
													<p className="form-error text-danger">{errors.MobailNo}</p>
												)
												: null}

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
											{errors.Description && touched.Description
												? (
													<p className="form-error text-danger">{errors.Description}</p>
												)
												: null}

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
													{errors.Amount && touched.Amount
														? (
															<p className="form-error text-danger">{errors.Amount}</p>
														)
														: null}

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
