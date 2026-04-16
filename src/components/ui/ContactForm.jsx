import { useState } from "react";

import toast from "react-hot-toast";
import api from "../../utils/api";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("/api/contact", formData);
            toast.success("Message sent successfully! We will contact you soon.");
            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                <label className="block text-gray-700 mb-2">Phone Number</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-2">Message *</label>
                <textarea
                    name="message"
                    required
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
            >
                {loading ? "Sending..." : "Send Message"}
            </button>
        </form>
    );
};

export default ContactForm;
