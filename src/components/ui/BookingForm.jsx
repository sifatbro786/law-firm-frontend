// BookingForm.jsx
import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../utils/api";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaClock,
    FaComment,
    FaPaperPlane,
    FaSpinner,
} from "react-icons/fa";

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
    const [focused, setFocused] = useState(null);

    const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/api/bookings", { ...formData });
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

    const inputFields = [
        { name: "name", type: "text", placeholder: "John Doe", icon: FaUser, label: "Full Name" },
        {
            name: "email",
            type: "email",
            placeholder: "john@example.com",
            icon: FaEnvelope,
            label: "Email Address",
        },
        {
            name: "phone",
            type: "tel",
            placeholder: "+880 1XXX XXXXXX",
            icon: FaPhone,
            label: "Phone Number",
        },
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name, Email, Phone Fields */}
            <div className="space-y-5">
                {inputFields.map((field) => (
                    <div key={field.name} className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {field.label} <span className="text-[#027B7A]">*</span>
                        </label>
                        <div
                            className={`relative transition-all duration-300 ${focused === field.name ? "transform scale-[1.02]" : ""}`}
                        >
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#027B7A] transition-colors">
                                <field.icon className="text-base" />
                            </div>
                            <input
                                type={field.type}
                                name={field.name}
                                required
                                value={formData[field.name]}
                                onChange={handleChange}
                                onFocus={() => setFocused(field.name)}
                                onBlur={() => setFocused(null)}
                                placeholder={field.placeholder}
                                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 focus:bg-white transition-all duration-300 text-gray-800"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Date and Time in Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date <span className="text-[#027B7A]">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaCalendarAlt className="text-base" />
                        </div>
                        <input
                            type="date"
                            name="date"
                            required
                            min={minDate}
                            max={maxDateStr}
                            value={formData.date}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 focus:bg-white transition-all duration-300 text-gray-800"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time <span className="text-[#027B7A]">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <FaClock className="text-base" />
                        </div>
                        <select
                            name="time"
                            required
                            value={formData.time}
                            onChange={handleChange}
                            className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 focus:bg-white transition-all duration-300 text-gray-800 appearance-none cursor-pointer"
                        >
                            <option value="">Select a time</option>
                            {timeSlots.map((slot) => (
                                <option key={slot} value={slot}>
                                    {slot}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Message Field */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Message
                </label>
                <div className="relative">
                    <div className="absolute left-4 top-4 text-gray-400">
                        <FaComment className="text-base" />
                    </div>
                    <textarea
                        name="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Briefly describe your legal matter..."
                        className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 focus:bg-white transition-all duration-300 text-gray-800 resize-none"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="relative w-full group overflow-hidden bg-gradient-to-r from-[#027B7A] to-[#025c5c] text-white rounded-xl py-4 font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#027B7A]/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <FaPaperPlane />
                            Request Consultation
                        </>
                    )}
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </button>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-4 pt-2 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-[#027B7A]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    100% Confidential
                </span>
                <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-[#027B7A]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Response within 24h
                </span>
                <span className="flex items-center gap-1">
                    <svg className="w-3 h-3 text-[#027B7A]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Secure & Encrypted
                </span>
            </div>
        </form>
    );
};

export default BookingForm;
