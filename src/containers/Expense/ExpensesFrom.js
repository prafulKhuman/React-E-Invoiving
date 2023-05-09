import * as Yup from "yup";
import { useFormik } from "formik";
import { useAddExpensesMutation } from "../../redux";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function ExpensesFrom({ Cat, ID }) {
	const { user } = useUserAuth();
	const [AddExpenses] = useAddExpensesMutation();
	

	const expensSchema = Yup.object().shape({
		ExpNo: Yup.string().min(1).required("Can't Empty ExpNo"),
		Category: Yup.string().required("Can't Empty Category"),
		ExpDesc: Yup.string().min(1).required("Can't Empty ExpDesc"),
		ExpAmount: Yup.string().min(1).required("Can't Empty ExpAmount")
	});

	
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				ExpNo: "",
				Category: "",
				ExpDesc: "",
				ExpAmount: ""
			},
			validationSchema: expensSchema,
			onSubmit: async (values, action) => {
				const Exp = {
					...values,
					UID: user.uid
				};
				const response = await AddExpenses(Exp);
				if (response.data === "ok") {
					swal({
						title: "Data Saved Success!",
						icon: "success",
						button: "Done!"
					});
				} else {
					swal("Oops...!", "Something went wrong!", "error");
				}
				action.resetForm();
			}
		});

	return (
		<>

			<button type="button" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
				Add Expenses
			</button>

			<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Expenses</h5>
							<i data-bs-dismiss="modal" className="bi bi-x-circle fa-lg"></i>
						</div>
						<div className="modal-body">
							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="ExpNo">Exp No</label>
									{errors.ExpNo && touched.ExpNo
										? (
											<p className="form-error text-danger">{errors.ExpNo}</p>
										)
										: null}
									<input
										type="text"
										className="form-control"
										id="ExpNo"
										placeholder={ID + 1}
										name="ExpNo"
										value={values.ExpNo}
										onChange={handleChange}
										onBlur={handleBlur}
									/>

								</div>
								<div className="form-group">
									<label htmlFor="Category">Select Category</label>
									{errors.Category && touched.Category
										? (
											<p className="form-error text-danger">{errors.Category}</p>
										)
										: null}
									<select className="form-control" id="Category" value={values.Category} name="Category" onChange={handleChange} onBlur={handleBlur}>
										<option>--- Select Category ---</option>
										{Cat?.map((item, index) => {
											return <option key={index}>{item.Category}</option>;
										})}
									</select>
								</div>
								<div className="form-group">
									<label htmlFor="ExpDesc">Exp Desc.</label>
									{errors.ExpDesc && touched.ExpDesc
										? (
											<p className="form-error text-danger">{errors.ExpDesc}</p>
										)
										: null}
									<input
										type="text"
										className="form-control"
										id="ExpDesc"
										value={values.ExpDesc}
										placeholder="Exp Description"
										name="ExpDesc"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="ExpAmount">Exp Amount</label>
									{errors.ExpAmount && touched.ExpAmount
										? (
											<p className="form-error text-danger">{errors.ExpAmount}</p>
										)
										: null}
									<input
										type="text"
										className="form-control"
										id="ExpAmount"
										value={values.ExpAmount}
										placeholder="Exp Amount"
										name="ExpAmount"
										onChange={handleChange}
										onBlur={handleBlur}
									/>
								</div>
								<div className="item_right">
									<button type="submit" className="btn btn-primary mr-4" style={{ width: "150px" }}>ADD</button>
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
export default ExpensesFrom;
