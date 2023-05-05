import "./login.css";
import Logo from "./logo.png";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Login() {
	const navigate = useNavigate();
	const { logIn } = useUserAuth();


	const LoginSchema = Yup.object().shape({
		Email : Yup.string().email("Invalid email").required("Required"),
		Password: Yup.string().min(8, "Password must be 8 characters long").required("Required") ,
	
	});


	const { values  , errors , touched ,  handleBlur, handleChange, handleSubmit } = 
	useFormik({
		initialValues : {
			Email : "",
			Password: "",
		},
		validationSchema: LoginSchema ,
		onSubmit: async (values , action)=>{
			try {
				await logIn(values.Email, values.Password);
				swal({
					title: "Login Success!",
					icon: "success",
					button: "Done!",
				});
				navigate("/Home");
			} catch (err) {
				swal("Oops...!", "Wrong Username Or Password!", "error");
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
							<p className="font-weight-bold lead " style={{fontFamily : "Cursive"}}><h3>E - Invoicing Application</h3></p>
						</div>
						<img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
							className="img-fluid" alt="Sample image" />
					</div>

					

					<div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
						<form onSubmit={handleSubmit}>
							

							<div className="divider d-flex align-items-center my-4">
								<p className="text-center fw-bold mx-3 mb-0">LOGIN</p>
							</div>

             
							<div className="form-group">
								<label htmlFor="Email">Email address</label>
								<input 
									type="email" 
									className="form-control" 
									id="Email" 
									aria-describedby="emailHelp" 
									placeholder="Enter email"
									name="Email"
									value={values.Email}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.Email && touched.Email ? (
									<p className="form-error text-danger">{errors.Email}</p>
								) : null}
								<small id="emailHelp" className="form-text text-muted">Well never share your email with anyone else.</small>
							</div>
							<div className="form-group">
								<label htmlFor="Pass">Password</label>
								<input 
									type="password" 
									className="form-control" 
									id="Password" 
									aria-describedby="emailHelp" 
									placeholder="Enter Password"
									name="Password"
									value={values.Password}
									onChange={handleChange}
									onBlur={handleBlur}
								/>
								{errors.Pass && touched.Pass ? (
									<p className="form-error text-danger">{errors.Pass}</p>
								) : null}
									
							</div>

							<div className="d-flex justify-content-between align-items-center">
                
								<div className="form-check mb-0">
									
								</div>
								<a href="#!" className="text-body">Forgot password?</a>
							</div>

							<div className="text-center text-lg-start mt-4 pt-2">
								<button type="Submit" className="btn btn-primary btn-lg"
									style={{paddingLeft : "2.5rem" , paddingRight: "2.5rem"}}>Login</button>
								<p className="small fw-bold mt-2 pt-1 mb-0">Dont have an account? 
									<span className="link-danger"><Link to="/SignUp">Register</Link></span></p>
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
						<img src={Logo} alt="Logo" width="20%" height="50%"/>
					</a>
					
				</div>
       
			</div>
		</section>
	</>);
}

export default Login;