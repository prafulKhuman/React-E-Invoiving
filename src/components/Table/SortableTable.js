import Table from "./Table";

import useSortableTable from "../../context/sortTable/useSortableTable";

function SortableTable (props) {
	const { config, data } = props;
	const {
		sortBy,
		sortOrder,
		sortedData,
		handleClick,
		getIcon
	} = useSortableTable(config, data);

	
	const updatedConfig = config.map((column) => {
		if (!column.sortValue) {
			return column;
		}

		return {
			...column,
			header: () => (
				<th scope="col" onClick={() => handleClick(column.label)}>
					<div>
						{getIcon(column.label, sortBy, sortOrder)}
						{column.label}
					</div>
				</th>
			)
		};
	});

	return (
		<div>

			<Table {...props} data={sortedData} config={updatedConfig} />
		</div>
	);
}

export default SortableTable;
