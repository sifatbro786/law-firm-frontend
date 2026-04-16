import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/api/bookings", formData);
            toast.success("Booking request submitted! We will confirm via email.");
            setFormData({
                name: "",
                email: "",
                phone: "",
                date: "",
                time: "",
                message: "",
            });
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to book consultation");
        } finally {
            setLoading(false);
        }
    };

    const minDate = new Date().toISOString().split("T")[0];
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 2);
    const maxDateStr = maxDate.toISOString().split("T")[0];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Phone Number *</label>
                <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Preferred Date *</label>
                <input
                    type="date"
                    name="date"
                    required
                    min={minDate}
                    max={maxDateStr}
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Preferred Time *</label>
                <select
                    name="time"
                    required
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                >
                    <option value="">Select a time</option>
                    {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                            {slot}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Additional Message</label>
                <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                    placeholder="Briefly describe your legal matter..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
            >
                {loading ? "Submitting..." : "Request Consultation"}
            </button>
        </form>
    );
};

export default BookingForm;
