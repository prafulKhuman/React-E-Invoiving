import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts";
import { useFatchSaleInvoiceQuery } from "../../redux";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
const Charts = () => {
	const { data, error } = useFatchSaleInvoiceQuery();
	const { user } = useUserAuth();

	let Data = [];

	if (error) {
		swal("Oops...!", "Something went wrong!", "error");
	} else if (data) {
		const filterUID = data?.filter((item) => item[2].UID === user.uid);
		Data = filterUID?.map((item) => ({

			Date: item.timestamp,
			Total_Amount: item[1].Total

		}));
	}

	let LastSevenMonth = [];
	const today = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const lastSevenMonthNames = [];

	for (let i = 0; i < 7; i++) {
		let month = today.getMonth() - i;
		let year = today.getFullYear();
		if (month < 0) {
			month += 12;
			year -= 1;
		}
		lastSevenMonthNames.push(monthNames[month]);
	}

	LastSevenMonth = lastSevenMonthNames;

	const SaleAmount = [];
	function getTotal (total, num) {
		return total + parseInt(num.Total_Amount);
	}
	for (let j = 0; j < 7; j++) {
		const MonthOne = Data?.filter((item) => item.Date.toLowerCase().includes(LastSevenMonth[j]?.toLowerCase()));
		const M1total = MonthOne?.reduce(getTotal, 0);
		SaleAmount.push(M1total);
	}

	const Info = [
		{
			name: LastSevenMonth[0].slice(0, 3) + "..",
			Sale: SaleAmount[0]

		},
		{
			name: LastSevenMonth[1].slice(0, 3) + "..",
			Sale: SaleAmount[1]

		},
		{
			name: LastSevenMonth[2].slice(0, 3) + "..",
			Sale: SaleAmount[2]

		},
		{
			name: LastSevenMonth[3].slice(0, 3) + "..",
			Sale: SaleAmount[3]

		},
		{
			name: LastSevenMonth[4].slice(0, 3) + "..",
			Sale: SaleAmount[4]

		},
		{
			name: LastSevenMonth[5].slice(0, 3) + "..",
			Sale: SaleAmount[5]

		},
		{
			name: LastSevenMonth[6].slice(0, 3) + "..",
			Sale: SaleAmount[6]

		}
	];

	return (
		<>

			<ResponsiveContainer width="100%" aspect={3}>

				<BarChart data={Info}>
					<CartesianGrid strokeDasharray="4 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Bar dataKey="Sale" fill="#82ca9d" />
				</BarChart>

			</ResponsiveContainer>

		</>

	);
};
export default Charts;
