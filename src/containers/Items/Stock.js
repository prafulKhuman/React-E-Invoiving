import { useState } from "react";
import * as Yup from "yup";
import { useUpdateItemMutation, useAddStockMutation } from "../../redux";
import { useFormik } from "formik";
import swal from "sweetalert";

function Stock({ ID, data }) {
	const [switchBox, setSwitchBox] = useState(true);
	const [type, setType] = useState("ADD");
	const [UpdateItem] = useUpdateItemMutation();
	const [AddStock] = useAddStockMutation();

	const handleSwitch = () => {
		setSwitchBox(!switchBox);
	};

	const handleClick = () => {
		if (type === "ADD") {
			setType("Remove");
		} else {
			setType("ADD");
		}
	};

	const ItemSchema = Yup.object().shape({

		MRP: Yup.number().min(1).required("Can't Empty MRP"),
		SalePrice: Yup.number().min(1).required("Can't Empty SalePrice"),
		PurchasePrice: Yup.number().min(1).required("Can't Empty PurchasePrice"),
		Quantity: Yup.number().min(1).required("Can't Empty Quentity")

	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {

				MRP: "",
				SalePrice: "",
				PurchasePrice: "",
				Quantity: "",
				type: ""

			},
			validationSchema: ItemSchema,
			onSubmit: async (values, action) => {
				const response = await AddStock({ ...values, ItemID: ID, ItemCode: data?.itemCode, TYPE: type });
				if (switchBox) {
					const Stock = {
						MRP: values.MRP,
						SalePrice: values.SalePrice,
						PurchasePrice: values.PurchasePrice,
						Quantity: parseInt(data.quantity) + parseInt(values.Quantity)

					};
					const res = await UpdateItem({ ID, Stock });
				} else {
					const Stock = {
						MRP: values.MRP,
						SalePrice: values.SalePrice,
						PurchasePrice: values.PurchasePrice,
						Quantity: parseInt(data.quantity) - parseInt(values.Quantity)

					};
					const res = await UpdateItem({ ID, Stock });
				}
				// await UpdateItem({ID , values});
				action.resetForm();
				if (response.data === "ok") {
					swal({
						title: "Stock Added !! ",
						icon: "success",
						button: "Done!"
					});
				} else {
					swal("Oops...!", "Something went wrong!", "error");
				}
			}
		});

	return (<>
		<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#Stock">
			Stock
		</button>

		<div className="modal fade" id="Stock" data-backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">Stock</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">

						<form onSubmit={handleSubmit}>

							<div className="form-group">

								<input
									type="number"
									className="form-control"
									id="MRP"
									placeholder="MRP"
									name="MRP"
									value={values.MRP}
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								{errors.MRP && touched.MRP
									? (
										<p className="form-error text-danger">{errors.MRP}</p>
									)
									: null}
							</div>
							<div className="form-group">

								<input
									type="number"
									className="form-control"
									id="Sale-Price"
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
							<div className="form-group">

								<input
									type="number"
									className="form-control"
									id="Purchase-price"
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
							{switchBox
								? <div className="form-group">

									<input
										type="number"
										className="form-control"
										id="Add-Quentity"
										placeholder="Add Quentity"
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
								: <div className="form-group">

									<input
										type="number"
										className="form-control"
										id="Remove-Quentity"
										placeholder="Remove Quentity"
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
							}
							<div className="form-check">
								<input type="checkbox" className="form-check-input" id="Remove" onClick={handleClick} onChange={handleSwitch} />
								<label className="form-check-label" htmlFor="Remove" onClick={handleClick}>Remove Stock</label>
							</div>
							<div className="form-group mt-4">
								<button type="submit" className="btn btn-primary" style={{ width: "150px" }}> Update </button>
							</div>

						</form>

					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
					</div>
				</div>
			</div>
		</div>
	</>);
}

export default Stock;
