import { useState} from "react";
import { Link } from "react-router-dom";

function Sidebar () {
	const [toggleBtn, setToggleBtn] = useState("toggle-btn");
	const [saleOpen, setSaleOpen] = useState("menu-list");
	const [purchaseOpen, setPurchaseOpen] = useState("menu-list");
	const [partyOpen, setpartyOpen] = useState("menu-list");

	
	return (
		<div className="sidebar-menu sticky-sidebar-menu">

			<div className="logo">
				<h1> <Link to="/Home"> E-Invoicing </Link></h1>
			</div>

			<div className="logo-icon text-center">
				<Link to="/">
					<img src="../assets/images/logo.png" alt="logo-icon" />
					{" "}
				</Link>
			</div>

			<div className="sidebar-menu-inner">

				<ul className="nav nav-pills nav-stacked custom-nav">
					<li className="active">
						<Link to="/Home">

							<i className="fa fa-tachometer" />
							<span> Dashboard</span>

						</Link>
						<span className="tooltip">DashBord</span>
					</li>


					<li className={partyOpen} onClick={() => {
						setpartyOpen(partyOpen === "menu-list" ? "menu-list nav-active" : "menu-list"); setSaleOpen("menu-list"); setPurchaseOpen("menu-list");
					}}>
						<a >
							<i className="bi bi-people-fill" />
							<span>
								Parties
								<i className="lnr lnr-chevron-right" />
							</span>
						</a>
						<span className="tooltip">Parties</span>
						<ul className="sub-menu-list">
							<li>
								<Link to="/Seller">Seller</Link>
							</li>
							<li>
								<Link to="/Custommer">Custommer</Link>
							</li>
						</ul>
					</li>
					<li>
						<Link to="/Items">

							<i className="bi bi-box-fill" />
							{" "}
							<span> Items  </span>

						</Link>
					</li>
					<li className={saleOpen} onClick={() => {
						setSaleOpen(saleOpen === "menu-list" ? "menu-list nav-active" : "menu-list"); setPurchaseOpen("menu-list"); setpartyOpen("menu-list");
					}}>
						<a >
							<i className="bi bi-receipt" />

							<span>

								Sale
								<i className="lnr lnr-chevron-right" />
							</span>
						</a>
						<ul className="sub-menu-list">
							<li>
								<Link to="/SaleInvoice">Sale Invoice</Link>

							</li>
							<li>
								<Link to="/PaymentIn">Payment In</Link>
								{" "}
							</li>
							<li>
								<Link to="/SaleOrder">Sale Order</Link>
								{" "}
							</li>

							<li>
								<Link to="/SaleReturn">Sale Return</Link>
								{" "}
							</li>

						</ul>
					</li>
					<li className={purchaseOpen} onClick={() => {
						setPurchaseOpen(purchaseOpen === "menu-list" ? "menu-list nav-active" : "menu-list"); setSaleOpen("menu-list"); setpartyOpen("menu-list");
					}}>
						<a >
							<i className="bi bi-cart4" />
							<span>
								Purchase
								<i className="lnr lnr-chevron-right" />
							</span>
						</a>
						<span className="tooltip">Purchase</span>
						<ul className="sub-menu-list">

							<li>
								<Link to="/PurchaseBill">
									Purchse Bill
									{" "}
								</Link>
							</li>

							<li>
								<Link to="/PaymentOut">
									Payment Out
									{" "}
								</Link>
							</li>

							<li>
								<Link to="/PurchaseReturn">
									Purchase Return
									{" "}
								</Link>
							</li>

						</ul>

					</li>
					<li>
						<Link to="/Expanses">

							<i className="bi bi-wallet2" />
							{" "}
							<span>Expanses</span>

						</Link>
					</li>
					<li>
						<Link to="/Cash">

							<i className="bi bi-cash-stack" />
							{" "}
							<span>Cash</span>

						</Link>
					</li>

				</ul>

				<a className={toggleBtn} onClick={() => {
					setToggleBtn(toggleBtn === "toggle-btn" ? "toggle-btn menu-collapsed" : "toggle-btn");
				}}>
					{toggleBtn === "toggle-btn" ? document.body.classList.add("sidebar-menu-collapsed") : document.body.classList.remove("sidebar-menu-collapsed")}
					<i className="fa fa-angle-double-left menu-collapsed__left"><span>Collapse Sidebar </span> </i>
					<i className="ml-2 fa fa-angle-double-right menu-collapsed__right" />
				</a>

			</div>
		</div>
	);
}

export default Sidebar;
