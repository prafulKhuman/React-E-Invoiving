function MainTable({data, config , isopen ,isDelete }) {

	const handleClick =(key)=>{
		isopen(key);
	};
	const handleDelete =(key)=>{
		isDelete(key);
	};

	const rendrecell = config.map((config) => {
		return <th scope="col" key={config.label}>{config.label}</th>;
	});

	const rendreddata = data.map((item , index) => {
		const rendredconfig = config.map((configitem) => (
			<td key={configitem.label} onClick={()=>handleClick(configitem.render(item))}>
				{configitem.label === "" ? <i className="bi bi-trash" onClick={()=>handleDelete(configitem.render(item))}></i> : configitem.render(item)}
                
			</td>
		));

		return (
			<tr key={index}>

				{rendredconfig}

			</tr>

		);
	});

	return ( <>
		<table className="table table-hover table-bordered">
			<thead>
				<tr>
					{rendrecell}
					
				</tr>
			</thead>
			<tbody>
				
				{rendreddata}
				
			</tbody>
		</table>
	</> );
}

export default MainTable;