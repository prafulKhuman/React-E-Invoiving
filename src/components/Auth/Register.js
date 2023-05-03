import "./login.css";
import * as Yup from "yup";
import Logo from "./logo.png";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import { useUserAuth } from "../../context/Auth/UserAuthContext";
function Register() {
	const { signUp } = useUserAuth();
	let navigate = useNavigate();
	const RegisterSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Required"),
		Password: Yup.string()
			.min(8, "Password must be 8 characters long")
			.matches(/[0-9]/, "Password requires a number")
			.matches(/[a-z]/, "Password requires a lowercase letter")
			.matches(/[A-Z]/, "Password requires an uppercase letter")
			.matches(/[^\w]/, "Password requires a symbol"),
		Cpassword: Yup.string().oneOf([Yup.ref("Password"), null], "Must match \"password\" field value"),
	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: "",
				Password: "",
				Cpassword: ""
			},
			validationSchema: RegisterSchema,
			onSubmit: async (values, action) => {
				try {
					await signUp(values.email, values.Cpassword);
					swal({
						title: "Register Success!",
						icon: "success",
						button: "Done!",
					});
					navigate("/");
				} catch (err) {
					swal("Oops...!", "Something went wrong!", "error");
				}
				action.resetForm();
			},
		});

	return (<>
		<section className="vh-100">
			<div className="container-fluid h-custom">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-md-9 col-lg-6 col-xl-5">
						<div className="justify-content-center">
							<p className="font-weight-bold lead " style={{ fontFamily: "Cursive" }}><h3>E - Invoicing Application</h3></p>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="img-fluid" alt="Sample image" />
					</div>
					<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<form onSubmit={handleSubmit}>


							<div className="divider d-flex align-items-center my-4">
								<p className="text-center fw-bold mx-3 mb-0">Register</p>
							</div>


							<div className="form-group">
								<label htmlFor="Email">Email address</label>
								<input
									type="email"
									name="email"
									value={values.email}
									onChange={handleChange}
									onBlur={handleBlur}
									className="form-control"
									id="Email"
									placeholder="Enter email"
								/>
								{errors.email && touched.email ? (
									<p className="form-error text-danger">{errors.email}</p>
								) : null}
								<small id="emailHelp" className="form-text text-muted">Well never share your email with anyone else.</small>
							</div>
							<div className="form-group">
								<label htmlFor="Pass">Password</label>
								<input
									type="password"
									className="form-control"
									id="Pass"
									name="Password"
									value={values.Password}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Password"
								/>
								{errors.Password && touched.Password ? (
									<p className="form-error text-danger">{errors.Password}</p>
								) : null}
							</div>
							<div className="form-group">
								<label htmlFor="Cpass">Confirm Password</label>
								<input
									type="password"
									className="form-control"
									id="Cpass"
									name="Cpassword"
									value={values.Cpassword}
									onChange={handleChange}
									onBlur={handleBlur}
									placeholder="Password"
								/>
								{errors.Cpassword && touched.Cpassword ? (
									<p className="form-error text-danger">{errors.Cpassword}</p>
								) : null}
							</div>



							<div className="text-center text-lg-start mt-4 pt-2">
								<button type="submit" className="btn btn-primary btn-lg"
									style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
								<p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account? <span
									className="link-danger"><Link to="/">Login</Link></span></p>
							</div>

						</form>
					</div>
				</div>
			</div>
			<div
				className="d-flex flex-column flex-md-row text-center text-md-start  py-4 px-4  bg-primary">

				<div className="text-white mb-3">
					Copyright © 2023. All rights reserved. Intech Creative Services.
				</div>

				<div className="text-right">
					<a href="#!" className="text-white me-4">
						<img src={Logo} alt="Logo" width="20%" height="50%" />
					</a>

				</div>

			</div></section>
	</>);
}

export default Register;