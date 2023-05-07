import { useState } from "react";
import { GoArrowSmallUp, GoArrowSmallDown } from "react-icons/go";

function useSortableTable (config, data) {
	const [sortOrder, setSortOrder] = useState(null);
	const [sortBy, setSortBy] = useState(null);

	const handleClick = (label) => {
		if (sortBy && label !== sortBy) {
			setSortOrder("asc");
			setSortBy(label);
			return;
		}
		if (sortOrder === null) {
			setSortOrder("asc");
			setSortBy(label);
		} else if (sortOrder === "asc") {
			setSortOrder("desc");
			setSortBy(label);
		} else if (sortOrder === "desc") {
			setSortOrder(null);
			setSortBy(null);
		}
	};

	let sortedData = data;
	if (sortOrder && sortBy) {
		const { sortValue } = config.find((column) => column.label === sortBy);
		sortedData = [...data].sort((a, b) => {
			const A = sortValue(a);
			const B = sortValue(b);

			const reverseOrder = sortOrder === "asc" ? 1 : -1;

			if (typeof A === "string") {
				return A.localeCompare(B) * reverseOrder;
			}
			return (A - B) * reverseOrder;
		});
	}
	function getIcon (lable, sortBy, sortOrder) {
		if (lable !== sortBy) {
			return (
				<div>
					<GoArrowSmallUp />
					<GoArrowSmallDown />
				</div>
			);
		}

		if (sortOrder === null) {
			return (
				<div>
					<GoArrowSmallUp />
					<GoArrowSmallDown />
				</div>
			);
		} if (sortOrder === "asc") {
			return (
				<div>
					<GoArrowSmallUp />
				</div>
			);
		} if (sortOrder === "desc") {
			return (
				<div>
					<GoArrowSmallDown />
				</div>
			);
		}
	}

	return {
		sortBy,
		sortOrder,
		sortedData,
		handleClick,
		getIcon
	};
}

export default useSortableTable;
