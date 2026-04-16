import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaUserPlus, FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../../utils/api";

const AdminRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });
    const [loading, setLoading] = useState(false);
    const { admin, isSuperAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!admin || !isSuperAdmin()) {
            navigate("/admin/dashboard");
        }
    }, [admin, isSuperAdmin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/auth/register", formData);
            toast.success("New admin created successfully");
            setFormData({ name: "", email: "", password: "", role: "admin" });
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    if (!admin || !isSuperAdmin()) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-md mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-xl p-8"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-4">
                            <FaUserPlus className="text-4xl text-primary" />
                        </div>
                        <h2 className="text-3xl font-playfair font-bold text-primary">
                            Create New Admin
                        </h2>
                        <p className="text-gray-600 mt-2">Add a new administrator to the system</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 mb-2 font-semibold">
                                Full Name
                            </label>
                            <div className="relative">
                                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter full name"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 font-semibold">
                                Email Address
                            </label>
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="admin@lawfirm.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 font-semibold">
                                Password
                            </label>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter password"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2 font-semibold">Role</label>
                            <div className="relative">
                                <FaUserTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <select
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({ ...formData, role: e.target.value })
                                    }
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary bg-white"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create Admin Account"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminRegister;
