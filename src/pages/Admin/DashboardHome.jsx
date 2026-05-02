import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGavel, FaUserFriends, FaCalendarAlt, FaEnvelope, FaBuilding } from "react-icons/fa";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import api from "../../utils/api";

const DashboardHome = () => {
    const [stats, setStats] = useState({
        services: 0,
        attorneys: 0,
        clients: 0,
        bookings: 0,
        contacts: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [monthlyBookings, setMonthlyBookings] = useState([]);
    const [clientsData, setClientsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [servicesRes, attorneysRes, clientsRes, bookingsRes, contactsRes] =
                await Promise.all([
                    api.get("/api/services"),
                    api.get("/api/attorneys"),
                    api.get("/api/clients"),
                    api.get("/api/bookings"),
                    api.get("/api/contact"),
                ]);

            const bookings = bookingsRes.data;
            const monthlyData = getMonthlyBookingsData(bookings);
            const clientDistribution = getClientDistributionData(clientsRes.data);

            setStats({
                services: servicesRes.data.length,
                attorneys: attorneysRes.data.length,
                clients: clientsRes.data.length,
                bookings: bookings.length,
                contacts: contactsRes.data.length,
            });

            setRecentBookings(bookings.slice(0, 5));
            setMonthlyBookings(monthlyData);
            setClientsData(clientDistribution);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getMonthlyBookingsData = (bookings) => {
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        const monthlyCount = months.map((month, index) => ({
            month,
            index,
            bookings: 0,
            confirmed: 0,
            pending: 0,
        }));

        bookings.forEach((booking) => {
            const bookingDate = new Date(booking.date);
            if (bookingDate.getFullYear() === currentYear) {
                const monthIndex = bookingDate.getMonth();
                monthlyCount[monthIndex].bookings += 1;

                if (booking.status === "confirmed") {
                    monthlyCount[monthIndex].confirmed += 1;
                } else if (booking.status === "pending") {
                    monthlyCount[monthIndex].pending += 1;
                }
            }
        });

        const startMonth = Math.max(0, currentMonth - 5);
        const last6Months = monthlyCount.slice(startMonth, currentMonth + 1);
        return last6Months;
    };

    const getClientDistributionData = (clients) => {
        if (!clients || clients.length === 0) {
            return [];
        }

        // Group clients by industry/brand type (you can categorize by first letter or any logic)
        const categoryMap = new Map();

        clients.forEach((client) => {
            // Get first letter of brand name for grouping
            const firstLetter = client.brandName.charAt(0).toUpperCase();
            const category = /[A-Z]/.test(firstLetter) ? firstLetter : "Other";

            const count = categoryMap.get(category) || 0;
            categoryMap.set(category, count + 1);
        });

        const result = Array.from(categoryMap, ([name, value]) => ({
            name,
            value,
            // Add full brand names for tooltip
            brands: clients
                .filter((c) => c.brandName.charAt(0).toUpperCase() === name)
                .map((c) => c.brandName),
        }));

        return result.sort((a, b) => b.value - a.value).slice(0, 8); // Show top 8 categories
    };

    const COLORS = [
        "#027B7A",
        "#C9A03D",
        "#1a1a1a",
        "#4a4a4a",
        "#6b6b6b",
        "#3b82f6",
        "#10b981",
        "#8b5cf6",
        "#f59e0b",
        "#ef4444",
    ];

    const statCards = [
        { title: "Services", value: stats.services, icon: <FaGavel />, bgColor: "#3b82f6" },
        { title: "Attorneys", value: stats.attorneys, icon: <FaUserFriends />, bgColor: "#10b981" },
        { title: "Our Clients", value: stats.clients, icon: <FaBuilding />, bgColor: "#8b5cf6" },
        { title: "Bookings", value: stats.bookings, icon: <FaCalendarAlt />, bgColor: "#f59e0b" },
        { title: "Messages", value: stats.contacts, icon: <FaEnvelope />, bgColor: "#ef4444" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64 sm:h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Stats Grid - Responsive */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 mb-6 md:mb-8">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="rounded-xl shadow-lg p-3 sm:p-4 md:p-6 relative overflow-hidden"
                        style={{ backgroundColor: stat.bgColor }}
                    >
                        <div className="flex items-center justify-between mb-2 sm:mb-4">
                            <div className="text-2xl sm:text-3xl md:text-4xl text-white">
                                {stat.icon}
                            </div>
                            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                                {stat.value}
                            </span>
                        </div>
                        <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-white">
                            {stat.title}
                        </h3>
                    </motion.div>
                ))}
            </div>

            {/* Charts Row - Responsive */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                {/* Monthly Bookings Chart */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                        <h3 className="text-lg sm:text-xl font-playfair font-bold">
                            Monthly Bookings
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                                <div
                                    className="w-3 h-3 rounded"
                                    style={{ backgroundColor: "#027B7A" }}
                                ></div>
                                <span>Total</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-green-500 rounded"></div>
                                <span>Confirmed</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                                <span>Pending</span>
                            </div>
                        </div>
                    </div>
                    {monthlyBookings.length > 0 && monthlyBookings.some((m) => m.bookings > 0) ? (
                        <div className="h-64 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={monthlyBookings}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                                    <Tooltip />
                                    <Legend wrapperStyle={{ fontSize: 12 }} />
                                    <Bar dataKey="bookings" fill="#c9a03d" name="Total Bookings" />
                                    <Bar dataKey="confirmed" fill="#10b981" name="Confirmed" />
                                    <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <FaCalendarAlt className="text-4xl text-gray-300 mb-3" />
                            <p className="text-sm">No booking data available</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Bookings will appear here once clients schedule consultations
                            </p>
                        </div>
                    )}
                </div>

                {/* Client Distribution - Pie Chart */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                        <h3 className="text-lg sm:text-xl font-playfair font-bold">
                            Client Distribution
                        </h3>
                        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            Total: {stats.clients} Brands
                        </div>
                    </div>

                    {clientsData.length > 0 ? (
                        <div className="h-64 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={clientsData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) =>
                                            percent > 0.05
                                                ? `${name}: ${(percent * 100).toFixed(0)}%`
                                                : ""
                                        }
                                        outerRadius={window.innerWidth < 640 ? 80 : 100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {clientsData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value, name, props) => {
                                            const item = clientsData.find((c) => c.name === name);
                                            if (item && item.brands) {
                                                return [
                                                    `${value} brands`,
                                                    `${name} (${item.brands.slice(0, 3).join(", ")}${item.brands.length > 3 ? "..." : ""})`,
                                                ];
                                            }
                                            return [`${value} brands`, name];
                                        }}
                                    />
                                    <Legend
                                        wrapperStyle={{
                                            fontSize: window.innerWidth < 640 ? 10 : 12,
                                        }}
                                        layout={window.innerWidth < 640 ? "horizontal" : "vertical"}
                                        verticalAlign={
                                            window.innerWidth < 640 ? "bottom" : "middle"
                                        }
                                        align={window.innerWidth < 640 ? "center" : "right"}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                            <FaBuilding className="text-4xl text-gray-300 mb-3" />
                            <p className="text-sm">No client data available</p>
                            <p className="text-xs text-gray-400 mt-1">
                                Clients will appear here once you add them in Client Manager
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Bookings Table - Responsive */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <h3 className="text-lg sm:text-xl font-playfair font-bold">
                            Recent Consultation Requests
                        </h3>
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                            <FaCalendarAlt className="text-secondary" />
                            <span>Last {recentBookings.length} bookings</span>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px]">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {recentBookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50 transition">
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap font-medium text-sm sm:text-base">
                                        {booking.name}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                                        {booking.email}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm sm:text-base">
                                        {new Date(booking.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        })}{" "}
                                        at {booking.time}
                                    </td>
                                    <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                booking.status === "confirmed"
                                                    ? "bg-green-100 text-green-800"
                                                    : booking.status === "cancelled"
                                                      ? "bg-red-100 text-red-800"
                                                      : "bg-yellow-100 text-yellow-800"
                                            }`}
                                        >
                                            {booking.status === "confirmed"
                                                ? "✓ Confirmed"
                                                : booking.status === "cancelled"
                                                  ? "✗ Cancelled"
                                                  : "⏳ Pending"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {recentBookings.length === 0 && (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-4 sm:px-6 py-12 text-center text-gray-500"
                                    >
                                        <FaCalendarAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                                        <p className="text-base">No bookings yet</p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Client consultation requests will appear here
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardHome;
