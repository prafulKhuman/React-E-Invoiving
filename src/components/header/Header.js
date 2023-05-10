import { useNavigate } from "react-router";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
import swal from "sweetalert";
function Header () {
	const { logOut, user } = useUserAuth();
	const navigate = useNavigate();

	// Logout User
	const handleLogout = () => {
		try {
			swal({
				title: "Are you sure?",
				text: "Logout The E-Invoicing Application",
				icon: "info",
				buttons: true,
				dangerMode: true
			})
				.then(async (willDelete) => {
					if (willDelete) {
						await logOut();
						navigate("/");
					}
				});
		} catch (error) {
			swal("Oops...!", "Something went wrong!", "error");
		}
	};
	
	return (
		<div className="header sticky-header">

			<div className="menu-right">
				<div className="navbar user-panel-top">

					<div className="mr-5">
						<p> <i className="bi bi-person-circle fa-lg" />  {user && user.email}</p>
					</div>
					<div >
						<i className="bi bi-box-arrow-right fa-2x" onClick={handleLogout}/>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Header;
