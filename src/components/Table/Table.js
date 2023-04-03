import { Fragment } from "react";
import Bill from "../invoice/Bill";


function Table({ data, config, keyfn , ...props}) {
	const {file} = props;
	const rendrecell = config.map((config) => {
		if (config.header) {
			return <Fragment key={config.label}>{config.header() }</Fragment>;
		}
		return <th scope="col" key={config.label}>{config.label}</th>;
	});
	const rendreddata = data.map((item) => {
		const rendredconfig = config.map((configitem) => (
			<td key={configitem.label}>
				{" "}
				{configitem.render(item)}
				
			</td>
		));
			
		return (
			<tr key={keyfn(item)}>
				{rendredconfig}
				{file==="Invoice" ? <td><Bill /><i className=" ml-2 bi bi-trash fa-lg"/> </td> :  <td><i className="bi bi-trash fa-lg"/></td>}
			</tr>
			
		);
	});
	return (
		<table className="table table-bordered table-hover">
			<thead>
				<tr>
					{rendrecell}
				</tr>
			</thead>
			<tbody>
				{rendreddata}
			</tbody>
		</table>

	);
}

export default Table;
