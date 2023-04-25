import * as Yup from "yup";
import { useFormik } from "formik";
function PartiesFrom({onsubmit}) {

	const PartiesSchema = Yup.object().shape({
		PartyName: Yup.string().min(2).required("Can't Empty Party Name"),
		Email: Yup.string().min(5).required("Can't Empty Email"),
		PhoneNo: Yup.number().min(10).required("Can't Empty Phone No") ,
		BillingAddress: Yup.string().min(5).required("Can't Empty Billing Address"),
		PartyType : Yup.string().required("Can't Empty Party Type")
	});

	const { values , errors, touched , handleBlur, handleChange, handleSubmit } = 
	useFormik({
		initialValues : {
			PartyName: "",
			Email: "",
			PhoneNo: "",
			PartyType : "" ,
			BillingAddress: ""
			
		},
		validationSchema: PartiesSchema ,
		onSubmit: (values , action)=>{
			onsubmit(values);
			action.resetForm();			
		},
	});

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
							<a  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div className="container-fluid">
									<div className="row">
										<div className="input-group  col-md-4">
											<input 
												type="text" 
												className="form-control" 
												aria-label="Default"
												name="PartyName"
												value={values.PartyName}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Party Name" 
												aria-describedby="inputGroup-sizing-default" 
											/>
											{errors.PartyName && touched.PartyName ? (
												<p className="form-error text-danger">{errors.PartyName}</p>
											) : null}
										</div>
										<div className="input-group col-md-4 ms-auto">
											<input 
												type="email" 
												className="form-control" 
												aria-label="Default" 
												name="Email"
												value={values.Email}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Email ID" 
												aria-describedby="inputGroup-sizing-default" 
											/>
											{errors.Email && touched.Email ? (
												<p className="form-error text-danger">{errors.Email}</p>
											) : null}
										</div>
										<div className="input-group  col-md-4">
											<input 
												type="number" 
												className="form-control" 
												aria-label="Default" 
												name="PhoneNo"
												value={values.PhoneNo}
												onChange={handleChange}
												onBlur={handleBlur}
												placeholder="Phone No" 
												aria-describedby="inputGroup-sizing-default" 
											/>
											{errors.PhoneNo && touched.PhoneNo ? (
												<p className="form-error text-danger">{errors.PhoneNo}</p>
											) : null}
										</div>
									</div>
									<br />
									<div className="row">

										<div className=" col-md-6 ms-auto">
											<div className="form-group">
												
												<select className="form-control" id="SelectPartyType" name="PartyType" value={values.PartyType} onChange={handleChange}>
													<option>--- Select Party Type ---</option>
													<option>Saller</option>
													<option>Custommer</option>
													
												</select>
											</div>
											{errors.PartyType && touched.PartyType ? (
												<p className="form-error text-danger">{errors.PartyType}</p>
											) : null}
										</div>

										<div className="input-group col-md-6">
											<textarea 
												className="form-control" 
												aria-label="With textarea"
												name="BillingAddress"
												value={values.BillingAddress}
												onChange={handleChange}
												onBlur={handleBlur} 
												placeholder="Billing Address" 
											/>
											{errors.BillingAddress && touched.BillingAddress ? (
												<p className="form-error text-danger">{errors.BillingAddress}</p>
											) : null}
										</div>
										

									</div>
									<br />
									
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
export default PartiesFrom;