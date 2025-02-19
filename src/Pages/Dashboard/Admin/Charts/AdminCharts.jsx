import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
    { month: "Jan", revenue: 4000, sales: 2400 },
    { month: "Feb", revenue: 3000, sales: 1398 },
    { month: "Mar", revenue: 5000, sales: 9800 },
    { month: "Apr", revenue: 7000, sales: 3908 },
    { month: "May", revenue: 6000, sales: 4800 },
    { month: "Jun", revenue: 8000, sales: 3800 },
];

const AdminChart = () => {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Monthly Revenue & Sales
            </h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="month" stroke="#8884d8" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#007BFF" barSize={50} />
                    <Bar dataKey="sales" fill="#28A745" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminChart;
