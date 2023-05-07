import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, AreaChart, Area, Tooltip } from "recharts";
import { useFetchPurchaseBillQuery } from "../../redux";
import swal from "sweetalert";
import { useUserAuth } from "../../context/Auth/UserAuthContext";
const Linecharts = () => {
	const { data, error } = useFetchPurchaseBillQuery();
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

	const PurchaseAmount = [];
	function getTotal (total, num) {
		return total + parseInt(num.Total_Amount);
	}
	for (let j = 0; j < 7; j++) {
		const MonthOne = Data?.filter((item) => item.Date.toLowerCase().includes(LastSevenMonth[j]?.toLowerCase()));
		const M1total = MonthOne?.reduce(getTotal, 0);
		PurchaseAmount.push(M1total);
	}

	const PurchaseInfo = [
		{
			name: LastSevenMonth[0].slice(0, 3) + "..",
			Purchase: PurchaseAmount[0]

		},
		{
			name: LastSevenMonth[1].slice(0, 3) + "..",
			Purchase: PurchaseAmount[1]

		},
		{
			name: LastSevenMonth[2].slice(0, 3) + "..",
			Purchase: PurchaseAmount[2]

		},
		{
			name: LastSevenMonth[3].slice(0, 3) + "..",
			Purchase: PurchaseAmount[3]

		},
		{
			name: LastSevenMonth[4].slice(0, 3) + "..",
			Purchase: PurchaseAmount[4]

		},
		{
			name: LastSevenMonth[5].slice(0, 3) + "..",
			Purchase: PurchaseAmount[5]

		},
		{
			name: LastSevenMonth[6].slice(0, 3) + "..",
			Purchase: PurchaseAmount[6]

		}
	];

	return (
		<>

			<ResponsiveContainer width="100%" aspect={3}>
				<AreaChart data={PurchaseInfo}>
					<defs>
						<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
						</linearGradient>
						<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
							<stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
						</linearGradient>
					</defs>
					<XAxis dataKey="name" />
					<YAxis />
					<CartesianGrid strokeDasharray="3 3" />
					<Tooltip />
					<Area type="monotone" dataKey="Purchase" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
				</AreaChart>
			</ResponsiveContainer>
		</>

	);
};

export default Linecharts;
