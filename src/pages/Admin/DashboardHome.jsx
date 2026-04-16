import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGavel, FaUserFriends, FaFolderOpen, FaCalendarAlt, FaEnvelope } from "react-icons/fa";
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
        caseStudies: 0,
        bookings: 0,
        contacts: 0,
    });
    const [recentBookings, setRecentBookings] = useState([]);
    const [monthlyBookings, setMonthlyBookings] = useState([]);
    const [caseStudiesByCategory, setCaseStudiesByCategory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const [servicesRes, attorneysRes, caseStudiesRes, bookingsRes, contactsRes] =
                await Promise.all([
                    api.get("/api/services"),
                    api.get("/api/attorneys"),
                    api.get("/api/case-studies/admin/all"),
                    api.get("/api/bookings"),
                    api.get("/api/contact"),
                ]);

            const bookings = bookingsRes.data;
            const monthlyData = getMonthlyBookingsData(bookings);
            const categoryData = getCaseStudiesByCategory(caseStudiesRes.data);

            setStats({
                services: servicesRes.data.length,
                attorneys: attorneysRes.data.length,
                caseStudies: caseStudiesRes.data.length,
                bookings: bookings.length,
                contacts: contactsRes.data.length,
            });

            setRecentBookings(bookings.slice(0, 5));
            setMonthlyBookings(monthlyData);
            setCaseStudiesByCategory(categoryData);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setLoading(false);
        }
    };

    const getMonthlyBookingsData = (bookings) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
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

    const getCaseStudiesByCategory = (caseStudies) => {
        const categoryMap = new Map();
        caseStudies.forEach((cs) => {
            const count = categoryMap.get(cs.category) || 0;
            categoryMap.set(cs.category, count + 1);
        });
        return Array.from(categoryMap, ([name, value]) => ({ name, value }));
    };

    const COLORS = ["#c9a03d", "#1a1a1a", "#2c2c2c", "#4a4a4a", "#6b6b6b"];

    const statCards = [
        { title: "Services", value: stats.services, icon: <FaGavel />, bgColor: "#3b82f6" },
        { title: "Attorneys", value: stats.attorneys, icon: <FaUserFriends />, bgColor: "#10b981" },
        { title: "Case Studies", value: stats.caseStudies, icon: <FaFolderOpen />, bgColor: "#8b5cf6" },
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
                            <div className="text-2xl sm:text-3xl md:text-4xl text-white">{stat.icon}</div>
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
                        <h3 className="text-lg sm:text-xl font-playfair font-bold">Monthly Bookings</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded" style={{ backgroundColor: "#c9a03d" }}></div>
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
                    {monthlyBookings.length > 0 ? (
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
                        <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
                            No booking data available
                        </div>
                    )}
                </div>

                {/* Case Studies by Category - Pie Chart */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-playfair font-bold mb-4">
                        Case Studies by Category
                    </h3>
                    {caseStudiesByCategory.length > 0 ? (
                        <div className="h-64 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={caseStudiesByCategory}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={true}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={window.innerWidth < 640 ? 80 : 100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {caseStudiesByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500 text-sm">
                            No case studies data available
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
                            <span>Last 5 bookings</span>
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
                                        })} at {booking.time}
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
                                    <td colSpan="4" className="px-4 sm:px-6 py-8 text-center text-gray-500 text-sm">
                                        <FaCalendarAlt className="inline text-2xl mb-2 text-gray-300" />
                                        <p>No bookings yet</p>
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