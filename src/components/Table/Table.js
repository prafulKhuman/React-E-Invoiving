import { Fragment } from "react";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Receipt from "./Receipt";
import Invoice from "./Invoice";

function Table({ data, config, keyfn, ...props }) {
	const ID = props.ID;
	const printID = props.printID;
	const billInfo = props.billInfo;
	const file = props.file;
	const convert = props.convert ;
	
	const myRef = useRef(null);
	const handlePrintInvoice = useReactToPrint({
		content: () => myRef.current
	});

	

	//console.log(billInfo[0][0]);




	const handledeleteItem = (key) => {
		ID(key);
	};
	const handlePrint = (key) => {
		printID(key);
	};
	const handleConvert =(key)=>{
		convert(key);
	};


	const rendrecell = config.map((config) => {
		if (config.header) {
			return <Fragment key={config.label}>{config.header()}</Fragment>;
		}
		return <th scope="col" key={config.label}>{config.label}</th>;
	});
	const rendreddata = data.map((item) => {
		const rendredconfig = config.map((configitem) => (
			<td key={configitem.label}>
				{configitem.label === "Action" ?
					<>
						<i className="ml-2 bi bi-trash fa-lg mr-1" onClick={() => handledeleteItem(configitem.render(item))} />
						<a data-bs-toggle="modal" data-bs-target="#staticBackdrop1">
							<i className="bi bi-printer-fill fa-lg" onClick={() => handlePrint(configitem.render(item))} />
						</a>
						{file === "Sale-Order" ? <i className="bi bi-check2-circle fa-lg ml-1" onClick={() => handleConvert(configitem.render(item))}></i> : ""}
					</> : configitem.render(item)}
				
			</td>
		));

		return (
			<tr key={keyfn(item)}>
				{rendredconfig}

			</tr>

		);
	});


	
	return (
		<><table className="table table-bordered table-hover ">
			<thead>
				<tr>
					{rendrecell}
				</tr>
			</thead>
			<tbody>
				{rendreddata}
			</tbody>
		</table>

		
		<div className="modal fade" id="staticBackdrop1" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
			<div className="modal-dialog  modal-fullscreen">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="staticBackdropLabel">{file}</h5>
						<a type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x-lg" /></a>
					</div>
					<div className="modal-body " id="Invoice">
						<div className="card mt-5 mr-5 ml-5 " ref={myRef}>

							{file === "PAYMENT-IN" ? 
								<Receipt billInfo={billInfo}/>
								:
								<Invoice billInfo={billInfo } file={file}/>
							}
							
							

						</div>

					</div>
					<div className="modal-footer">
						
						<button type="button" className="btn btn-primary" id="invoice-print" onClick={handlePrintInvoice}><i className="fa fa-print"></i> Print Invoice</button>
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal"><i className="bi bi-x-circle"></i> Close</button>
					</div>
				</div>
			</div>
		</div></>

	);
}

export default Table;
