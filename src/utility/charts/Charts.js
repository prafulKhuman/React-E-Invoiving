import { BarChart,Bar,ResponsiveContainer,XAxis,YAxis,CartesianGrid,Legend, Tooltip  } from "recharts";
const Charts = () => {
	const data = [
		{
			"name": "Page A",
			"uv": 4000,
			
		},
		{
			"name": "Page B",
			"uv": 3000,
			
		},
		{
			"name": "Page C",
			"uv": 2000,
			
		},
		{
			"name": "Page D",
			"uv": 2780,
			
		},
		{
			"name": "Page E",
			"uv": 1890,
			
		},
		{
			"name": "Page F",
			"uv": 2390,
			
		},
		{
			"name": "Page G",
			"uv": 3490,
			
		}
	];

	return (
		<>
			
			<ResponsiveContainer width="100%" aspect={3}>
				<BarChart  data={data}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="uv" fill="#82ca9d" />
				</BarChart>
			</ResponsiveContainer>
		</>
  
	);
};
export default Charts;