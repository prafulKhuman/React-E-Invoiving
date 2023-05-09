import * as Yup from "yup";
import { useFormik } from "formik";
import { useUserAuth } from "../../context/Auth/UserAuthContext";

function CategoryForm({ onCategory }) {
	const { user } = useUserAuth();
	const categorySchema = Yup.object().shape({
		Category: Yup.string().min(5).required("Can't Empty Category")

	});

	
	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				Category: ""
			},
			validationSchema: categorySchema,
			onSubmit: (values, action) => {
				const Cat = {
					...values,
					UID: user.uid
				};
				onCategory(Cat);
				action.resetForm();
			}
		});

	return (
		<>

			<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#Category">
				Add Category
			</button>

			<div className="modal fade" id="Category" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">Category</h5>

							<i data-bs-dismiss="modal" className="bi bi-x-circle fa-lg"></i>
						</div>
						<div className="modal-body">

							<form onSubmit={handleSubmit}>
								<div className="form-group">
									<label htmlFor="Category">Enter Category </label>
									<input
										type="text"
										className="form-control"
										id="Category"
										placeholder="Category"
										name="Category"
										onChange={handleChange}
										onBlur={handleBlur}
										value={values.Category}
									/>
									{errors.Category && touched.Category
										? (
											<p className="form-error text-danger">{errors.Category}</p>
										)
										: null}
								</div>

								<button type="submit" className="btn btn-primary item_right mr-4" style={{ width: "150px" }}>ADD</button>
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
export default CategoryForm;
