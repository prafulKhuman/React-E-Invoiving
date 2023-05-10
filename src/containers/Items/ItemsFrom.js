import * as Yup from "yup";
import { useFormik } from "formik";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function ItemsFrom({ onsubmit }) {
	const { user } = useUserAuth();

	const itemSchema = Yup.object().shape({

		ItemName: Yup.string().min(1).required("Can't Empty ItemName"),
		ItemHSN: Yup.string().min(1).required("Can't Empty ItemHSN"),
		ItemCode: Yup.number().min(1).required("Can't Empty ItemCode"),

		Description: Yup.string().min(1).required("Can't Empty Description"),
		MRP: Yup.number().min(1).required("Can't Empty MRP"),
		SalePrice: Yup.number().min(1).required("Can't Empty SalePrice"),
		Quantity: Yup.number().min(1).required("Can't Empty Quantity"),
		PurchasePrice: Yup.number().min(1).required("Can't Empty PurchasePrice")

	});

	
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				ItemName: "",
				ItemHSN: "",
				ItemCode: "",
				Description: "",
				MRP: "",
				SalePrice: "",
				Quantity: "",
				PurchasePrice: ""

			},
			validationSchema: itemSchema,
			onSubmit: (values, action) => {
				const Items = {
					...values,
					UID: user.uid
				};
				onsubmit(Items);

				action.resetForm();
			}
		});

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
						<form onSubmit={handleSubmit}>

							<div className="modal-body">
								<div className="container-fluid">

								</div>

								<div className="container">

									<div className="row">
										<div className="input-group mb-1 col-md-3">
											<input
												type="text"
												className="form-control"
												aria-label="Default"
												placeholder="Item name"
												name="ItemName"
												value={values.ItemName}
												onBlur={handleBlur}
												onChange={handleChange}
												aria-describedby="inputGroup-sizing-default"
											/>
											{errors.ItemName && touched.ItemName
												? (
													<p className="form-error text-danger">{errors.ItemName}</p>
												)
												: null}
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												aria-label="Default"
												placeholder="Item HSN"
												name="ItemHSN"
												value={values.ItemHSN}
												onBlur={handleBlur}
												onChange={handleChange}
												aria-describedby="inputGroup-sizing-default"
											/>
											{errors.ItemHSN && touched.ItemHSN
												? (
													<p className="form-error text-danger">{errors.ItemHSN}</p>
												)
												: null}
										</div>
										<div className="col">
											<input
												type="text"
												className="form-control"
												aria-label="Default"
												placeholder="Item Code"
												name="ItemCode"
												value={values.ItemCode}
												onBlur={handleBlur}
												onChange={handleChange}
												aria-describedby="inputGroup-sizing-default"
											/>
											{errors.ItemCode && touched.ItemCode
												? (
													<p className="form-error text-danger">{errors.ItemCode}</p>
												)
												: null}
										</div>

									</div>
									<div className="row">
										<div className="input-group mb-auto col-md-3 mt-4">
											<input
												type="text"
												className="form-control"
												aria-label="Default"
												placeholder="Description"
												name="Description"
												value={values.Description}
												onBlur={handleBlur}
												onChange={handleChange}
												aria-describedby="inputGroup-sizing-default"
											/>
											{errors.Description && touched.Description
												? (
													<p className="form-error text-danger">{errors.Description}</p>
												)
												: null}
										</div>
									</div>
									<hr />
									<div className="row">
										<div className="col mt-2 font-weight-bold" ><h4>ITEMS</h4></div>
										<hr />
									</div>
									<div className="row">

										<div className="input-group mb-auto col-3 ml-3 mt-4">
											<input
												type="text"
												className="form-control"
												aria-label="Default"
												placeholder="MRP"
												name="MRP"
												value={values.MRP}
												onBlur={handleBlur}
												onChange={handleChange}
												aria-describedby="inputGroup-sizing-default"
											/>
											{errors.MRP && touched.MRP
												? (
													<p className="form-error text-danger">{errors.MRP}</p>
												)
												: null}

										</div>

										<div className="col-8 text-center mt-4">
											<h5>STOCK</h5>
										</div>
									</div>

									<div className="row">
										<div className="col mt-3">

											<div className="input-group mb-auto col-6">
												<input
													type="text"
													className="form-control"
													aria-label="Default"
													placeholder="Sale Price"
													name="SalePrice"
													value={values.SalePrice}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{errors.SalePrice && touched.SalePrice
													? (
														<p className="form-error text-danger">{errors.SalePrice}</p>
													)
													: null}
											</div>
											<div className="col-6 mt-3">
												<input
													type="text"
													className="form-control"
													aria-label="Default"
													placeholder="Quantity"
													name="Quantity"
													value={values.Quantity}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{errors.Quantity && touched.Quantity
													? (
														<p className="form-error text-danger">{errors.Quantity}</p>
													)
													: null}
											</div>
										</div>

										<div className="col mt-3">

											<div className="input-group mb-auto col-6 ">
												<input
													type="text"
													className="form-control"
													aria-label="Default"
													placeholder="Purchase Price"
													name="PurchasePrice"
													value={values.PurchasePrice}
													onBlur={handleBlur}
													onChange={handleChange}
												/>
												{errors.PurchasePrice && touched.PurchasePrice
													? (
														<p className="form-error text-danger">{errors.PurchasePrice}</p>
													)
													: null}
											</div>

										</div>
									</div>

								</div>
							</div>
							<div>
								<button type="submit" className="btn btn-primary item_right mt-5 mr-5 mb-3" style={{ width: "200px" }}>Save</button>
							</div>
						</form>

						<div className="modal-footer">

							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

						</div>
					</div>
				</div>
			</div>

		</>
	);
}
export default ItemsFrom;
