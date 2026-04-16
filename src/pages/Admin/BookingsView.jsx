import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaCheck, FaTimes, FaEye, FaFilter } from "react-icons/fa";
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
                return "bg-green-100 text-green-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-yellow-100 text-yellow-800";
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
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">Total Bookings</h3>
                    <p className="text-3xl font-bold text-primary">{stats.total}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">Pending</h3>
                    <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">Confirmed</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-gray-500 text-sm">Cancelled</h3>
                    <p className="text-3xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-lg shadow-md mb-6 p-4">
                <div className="flex items-center gap-4">
                    <FaFilter className="text-gray-500" />
                    <div className="flex gap-2">
                        {["all", "pending", "confirmed", "cancelled"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg capitalize transition ${
                                    filter === status
                                        ? "bg-secondary text-primary"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Client Info
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Contact
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Date & Time
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredBookings.map((booking) => (
                                <tr key={booking._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="font-semibold">{booking.name}</div>
                                            <div className="text-sm text-gray-500">
                                                Booked:{" "}
                                                {format(
                                                    new Date(booking.createdAt),
                                                    "MMM dd, yyyy",
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm">{booking.email}</div>
                                        <div className="text-sm text-gray-500">{booking.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">
                                            {format(new Date(booking.date), "MMM dd, yyyy")}
                                        </div>
                                        <div className="text-sm text-gray-500">{booking.time}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            {booking.status === "pending" && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(booking._id, "confirmed")
                                                        }
                                                        className="text-green-600 hover:text-green-800"
                                                        title="Confirm"
                                                    >
                                                        <FaCheck />
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            updateStatus(booking._id, "cancelled")
                                                        }
                                                        className="text-red-600 hover:text-red-800"
                                                        title="Cancel"
                                                    >
                                                        <FaTimes />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={() => setSelectedBooking(booking)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="View Details"
                                            >
                                                <FaEye />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredBookings.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                        No bookings found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg max-w-3xl w-full"
                    >
                        <div className="border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">Booking Details</h3>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-500 text-sm">Name</label>
                                    <p className="font-semibold">{selectedBooking.name}</p>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-sm">Email</label>
                                    <p className="font-semibold">{selectedBooking.email}</p>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-sm">Phone</label>
                                    <p className="font-semibold">{selectedBooking.phone}</p>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-sm">Status</label>
                                    <p
                                        className={`font-bold capitalize ${getStatusColor(selectedBooking.status)} ml-2 inline-block px-3 py-1.5 rounded text-sm`}
                                    >
                                        {selectedBooking.status}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-sm">Date</label>
                                    <p className="font-semibold">
                                        {format(new Date(selectedBooking.date), "MMMM dd, yyyy")}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-gray-500 text-sm">Time</label>
                                    <p className="font-semibold">{selectedBooking.time}</p>
                                </div>
                            </div>
                            {selectedBooking.message && (
                                <div>
                                    <label className="text-gray-500 text-sm">Message</label>
                                    <p className="mt-1 p-3 bg-gray-50 rounded">
                                        {selectedBooking.message}
                                    </p>
                                </div>
                            )}
                            <div>
                                <label className="text-gray-500 text-sm">Booking Date</label>
                                <p className="font-semibold">
                                    {format(
                                        new Date(selectedBooking.createdAt),
                                        "MMMM dd, yyyy h:mm a",
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="border-t px-6 py-4 flex justify-end">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="btn-primary"
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
