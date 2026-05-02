import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
    FaCheck,
    FaTimes,
    FaEye,
    FaFilter,
    FaCalendarAlt,
    FaClock,
    FaEnvelope,
    FaPhone,
    FaUser,
    FaInfoCircle,
} from "react-icons/fa";
import api from "../../utils/api";

const BookingsView = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await api.get("/api/bookings");
            setBookings(response.data);
        } catch (error) {
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/api/bookings/${id}`, { status });
            toast.success(`Booking ${status} successfully`);
            fetchBookings();
        } catch (error) {
            toast.error("Failed to update booking status");
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "confirmed":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "confirmed":
                return <FaCheck className="w-3 h-3" />;
            case "cancelled":
                return <FaTimes className="w-3 h-3" />;
            default:
                return <FaClock className="w-3 h-3" />;
        }
    };

    const filteredBookings = bookings.filter((booking) => {
        if (filter === "all") return true;
        return booking.status === filter;
    });

    const stats = {
        total: bookings.length,
        pending: bookings.filter((b) => b.status === "pending").length,
        confirmed: bookings.filter((b) => b.status === "confirmed").length,
        cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-4 sm:px-6 lg:px-8"
        >
            {/* Stats Cards - Responsive Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                        Total Bookings
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-primary mt-2">
                        {stats.total}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">All time</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                        Pending
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-yellow-600 mt-2">
                        {stats.pending}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">Awaiting action</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                        Confirmed
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-2">
                        {stats.confirmed}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">Approved</div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-gray-500 text-xs sm:text-sm uppercase tracking-wide">
                        Cancelled
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-red-600 mt-2">
                        {stats.cancelled}
                    </p>
                    <div className="text-xs text-gray-400 mt-1">Declined</div>
                </div>
            </div>

            {/* Filter Section - Responsive */}
            <div className="bg-white rounded-xl shadow-md mb-6 p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-2">
                        <FaFilter className="text-gray-400 text-sm" />
                        <span className="text-gray-600 font-medium text-sm">Filter by:</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {["all", "pending", "confirmed", "cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg capitalize transition text-sm sm:text-base ${
                                    filter === status
                                        ? "bg-secondary text-primary shadow-md"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {status}
                                {status !== "all" && (
                                    <span
                                        className={`ml-1 sm:ml-2 px-1.5 py-0.5 rounded text-xs ${
                                            filter === status ? "bg-white/20" : "bg-gray-200"
                                        }`}
                                    >
                                        {status === "pending"
                                            ? stats.pending
                                            : status === "confirmed"
                                              ? stats.confirmed
                                              : stats.cancelled}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Desktop Table View (hidden on mobile) */}
            <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Client Info
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date & Time
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredBookings.map((booking) => (
                                <tr
                                    key={booking._id}
                                    className="hover:bg-gray-50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-semibold text-gray-800">
                                                {booking.name}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                Booked:{" "}
                                                {format(
                                                    new Date(booking.createdAt),
                                                    "MMM dd, yyyy",
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-700">{booking.email}</div>
                                        <div className="text-sm text-gray-500 mt-0.5">
                                            {booking.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-800">
                                            {format(new Date(booking.date), "MMM dd, yyyy")}
                                        </div>
                                        <div className="text-sm text-gray-500 mt-0.5">
                                            {booking.time}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                                        >
                                            {getStatusIcon(booking.status)}
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-3">
                                            {booking.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(booking._id, "confirmed")
                                                        }
                                                        className="text-green-600 hover:text-green-800 transition-colors"
                                                        title="Confirm"
                                                    >
                                                        <FaCheck className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(booking._id, "cancelled")
                                                        }
                                                        className="text-red-600 hover:text-red-800 transition-colors"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes className="w-5 h-5" />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="text-blue-600 hover:text-blue-800 transition-colors"
                                                title="View Details"
                                            >
                                                <FaEye className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredBookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-16 text-center">
                                        <div className="text-gray-400">
                                            <FaInfoCircle className="w-12 h-12 mx-auto mb-3" />
                                            <p className="text-lg font-medium">No bookings found</p>
                                            <p className="text-sm mt-1">Try changing your filter</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Card View (visible only on mobile) */}
            <div className="md:hidden space-y-4">
                {filteredBookings.map((booking) => (
                    <motion.div
                        key={booking._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        {/* Status Bar */}
                        <div
                            className={`px-4 py-2 flex justify-between items-center ${getStatusColor(booking.status)} bg-opacity-20`}
                        >
                            <span
                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                            >
                                {getStatusIcon(booking.status)}
                                {booking.status}
                            </span>
                            <span className="text-xs text-gray-500">
                                {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                            </span>
                        </div>

                        {/* Card Content */}
                        <div className="p-4 space-y-3">
                            {/* Name */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                    <FaUser className="text-secondary text-sm" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-gray-800">{booking.name}</p>
                                    <p className="text-xs text-gray-400">Client Name</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="text-blue-600 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700 break-all">
                                        {booking.email}
                                    </p>
                                    <p className="text-xs text-gray-400">Email</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="text-green-600 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-700">{booking.phone}</p>
                                    <p className="text-xs text-gray-400">Phone</p>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                    <FaCalendarAlt className="text-purple-600 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-800">
                                        {format(new Date(booking.date), "MMM dd, yyyy")}
                                    </p>
                                    <p className="text-sm text-gray-600">{booking.time}</p>
                                    <p className="text-xs text-gray-400">Date & Time</p>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-3 border-t border-gray-100">
                                {booking.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() => updateStatus(booking._id, "confirmed")}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition text-sm font-medium"
                                        >
                                            <FaCheck className="w-4 h-4" />
                                            Confirm
                                        </button>
                                        <button
                                            onClick={() => updateStatus(booking._id, "cancelled")}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition text-sm font-medium"
                                        >
                                            <FaTimes className="w-4 h-4" />
                                            Cancel
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={() => setSelectedBooking(booking)}
                                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition text-sm font-medium ${booking.status !== "pending" ? "flex-1" : ""}`}
                                >
                                    <FaEye className="w-4 h-4" />
                                    View Details
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}

                {filteredBookings.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="text-gray-400">
                            <FaInfoCircle className="w-16 h-16 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-600">No bookings found</p>
                            <p className="text-sm text-gray-400 mt-1">Try changing your filter</p>
                        </div>
                    </div>
                )}
            </div>

            {/* Booking Details Modal - Responsive */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-2xl max-w-2xl w-full my-8"
                    >
                        <div className="border-b px-4 sm:px-6 py-4 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl">
                            <h3 className="text-lg sm:text-xl font-playfair font-bold text-primary">
                                Booking Details
                            </h3>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 sm:p-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Full Name
                                    </label>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        {selectedBooking.name}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Email
                                    </label>
                                    <p className="font-semibold text-gray-800 mt-1 break-all">
                                        {selectedBooking.email}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Phone
                                    </label>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        {selectedBooking.phone}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Status
                                    </label>
                                    <div className="mt-1">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedBooking.status)}`}
                                        >
                                            {getStatusIcon(selectedBooking.status)}
                                            {selectedBooking.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Date
                                    </label>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        {format(new Date(selectedBooking.date), "MMMM dd, yyyy")}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Time
                                    </label>
                                    <p className="font-semibold text-gray-800 mt-1">
                                        {selectedBooking.time}
                                    </p>
                                </div>
                            </div>

                            {selectedBooking.message && (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <label className="text-gray-500 text-xs uppercase tracking-wide">
                                        Message / Notes
                                    </label>
                                    <p className="mt-2 text-gray-700 leading-relaxed">
                                        {selectedBooking.message}
                                    </p>
                                </div>
                            )}

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <label className="text-gray-500 text-xs uppercase tracking-wide">
                                    Booking Created
                                </label>
                                <p className="font-semibold text-gray-800 mt-1">
                                    {format(
                                        new Date(selectedBooking.createdAt),
                                        "MMMM dd, yyyy h:mm a",
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="border-t px-4 sm:px-6 py-4 flex justify-end gap-3 sticky bottom-0 bg-white rounded-b-2xl">
                            {selectedBooking.status === "pending" && (
                                <>
                                    <button
                                        onClick={() => {
                                            updateStatus(selectedBooking._id, "confirmed");
                                            setSelectedBooking(null);
                                        }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                                    >
                                        Confirm Booking
                                    </button>
                                    <button
                                        onClick={() => {
                                            updateStatus(selectedBooking._id, "cancelled");
                                            setSelectedBooking(null);
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                                    >
                                        Cancel Booking
                                    </button>
                                </>
                            )}
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default BookingsView;
