import "./login.css";
import * as Yup from "yup";
import Logo from "./logo.png";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import { useState } from "react";

function Register() {
	const { signUp } = useUserAuth();
	const navigate = useNavigate();
	const [passwordType, setPasswordType] = useState("password");

	const togglePassword = () => {
		if (passwordType === "password") {
			setPasswordType("text");
			return;
		}
		setPasswordType("password");
	};

	const registerSchema = Yup.object().shape({
		email: Yup.string().email("Invalid email").required("Required"),
		password: Yup.string()
			.min(8, "Password must be 8 characters long")
			.matches(/[0-9]/, "Password requires a number")
			.matches(/[a-z]/, "Password requires a lowercase letter")
			.matches(/[A-Z]/, "Password requires an uppercase letter")
			.matches(/[^\w]/, "Password requires a symbol")

	});

	const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
		useFormik({
			initialValues: {
				email: "",
				password: ""

			},
			validationSchema: registerSchema,
			onSubmit: async (values, action) => {
				try {
					await signUp(values.email, values.password);
					swal({
						title: "Register Success!",
						icon: "success",
						button: "Done!"
					});
					navigate("/");
				} catch (err) {
					const message = (err.message).toString();
					const ans = message.includes("auth/email-already-in-use");
					swal("Oops...!", ans ? "User Already Exists .!" : "Something Want Wrong .!", "error");
				}
				action.resetForm();
			}
		});

	return (<>
		<section className="vh-100">
			<div className="container-fluid h-custom">
				<div className="row d-flex justify-content-center align-items-center h-100">
					<div className="col-md-9 col-lg-6 col-xl-5">
						<div className="justify-content-center">
							<span className="font-weight-bold lead " style={{ fontFamily: "Cursive" }}><h3>E - Invoicing Application</h3></span>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="img-fluid" alt="Sample image" />
					</div>
					<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<form onSubmit={handleSubmit}>

							<div className="divider d-flex align-items-center my-4">
								<p className="text-center fw-bold mx-3 mb-0"><b> REGISTER </b></p>
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
								{errors.email && touched.email
									? (
										<p className="form-error text-danger">{errors.email}</p>
									)
									: null}
								<small id="emailHelp" className="form-text text-muted">Well never share your email with anyone else.</small>
							</div>
							<div>
								<label htmlFor="password">Password</label>
								<div className="input-group">
									<input
										type={passwordType}
										className="form-control"
										id="password"
										placeholder="Enter Password"
										name="password"
										minLength="8"
										value={values.password}
										onChange={handleChange}
										onBlur={handleBlur}
									/>
									<div className="input-group-append">
										<span className="input-group-text" onClick={togglePassword}>

											{passwordType === "password"
												? <i className="bi bi-eye-slash-fill"></i>
												: <i className="bi bi-eye-fill" />}
										</span>

									</div>
									<small id="passwordHelpBlock" className="form-text text-muted">
										Your password must be 8 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
									</small>
									{errors.password && touched.password
										? (
											<p className="form-error text-danger">{errors.password}</p>
										)
										: null}
								</div>
							</div>

							<div className="text-center text-lg-start mt-4 pt-2">
								<button type="submit" className="btn btn-primary btn-lg"
									style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Register</button>
								<p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account? <span
									className="link-danger"><Link to="/"> <b> Login </b></Link></span></p>
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
