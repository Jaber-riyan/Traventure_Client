import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { FaArrowUp } from "react-icons/fa";

const data = [
    { name: "Delivered", value: 2200, color: "#3B82F6" }, // Blue
    { name: "Cancelled", value: 500, color: "#A855F7" }, // Purple
    { name: "Pending", value: 600, color: "#EC4899" }, // Pink
    { name: "Returned", value: 436, color: "#F97316" }, // Orange
];

const totalOrders = data.reduce((acc, item) => acc + item.value, 0);

const OrderStatistics = () => {
    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                    Order Statistics
                </h2>
                <span className="text-blue-500 cursor-pointer">Earnings?</span>
            </div>

            {/* Total Orders */}
            <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">{totalOrders.toLocaleString()}</span>
                <span className="text-green-500 flex items-center">
                    <FaArrowUp className="mr-1" /> 0.57%
                </span>
            </div>

            {/* Semi-Doughnut Chart */}
            <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>

            {/* Chart Labels */}
            <div className="flex justify-center gap-4 mt-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <span
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: item.color }}
                        ></span>
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Button */}
            <div className="mt-4 text-center">
                <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition">
                    Complete Statistics →
                </button>
            </div>
        </div>
    );
};

export default OrderStatistics;
