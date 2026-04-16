import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FaUsers,
    FaUserPlus,
    FaEdit,
    FaTrash,
    FaSearch,
    FaUserCheck,
    FaShieldAlt,
    FaUserTag,
    FaEnvelope,
    FaCalendarAlt,
    FaTimes,
    FaLock,
} from "react-icons/fa";
import { ToggleLeft, ToggleRight } from "lucide-react";
import api from "../../utils/api";
import toast from "react-hot-toast";

const UserManagement = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [passwordData, setPasswordData] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "admin",
    });

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await api.get("/api/auth/admins");
            setAdmins(response.data);
        } catch (error) {
            toast.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingAdmin) {
                // Update user (except password)
                await api.patch(`/api/auth/admins/${editingAdmin._id}/status`, {
                    isActive: editingAdmin.isActive,
                });
                toast.success("User updated successfully");
            } else {
                // Create new user
                await api.post("/api/auth/register", formData);
                toast.success("User created successfully");
            }
            setIsModalOpen(false);
            resetForm();
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await api.delete(`/api/auth/admins/${id}`);
                toast.success("User deleted successfully");
                fetchAdmins();
            } catch (error) {
                toast.error("Failed to delete user");
            }
        }
    };

    const toggleUserStatus = async (id, currentStatus) => {
        try {
            await api.patch(`/api/auth/admins/${id}/status`, { isActive: !currentStatus });
            toast.success(`User ${!currentStatus ? "activated" : "deactivated"} successfully`);
            fetchAdmins();
        } catch (error) {
            toast.error("Failed to update user status");
        }
    };

    const handleEdit = (admin) => {
        setEditingAdmin(admin);
        setFormData({
            name: admin.name,
            email: admin.email,
            password: "",
            role: admin.role,
        });
        setIsModalOpen(true);
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        try {
            await api.post(`/api/auth/change-password/${selectedAdmin._id}`, {
                newPassword: passwordData.newPassword,
            });
            toast.success("Password changed successfully");
            setIsPasswordModalOpen(false);
            setPasswordData({ newPassword: "", confirmPassword: "" });
            fetchAdmins();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to change password");
        }
    };

    const resetForm = () => {
        setEditingAdmin(null);
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "admin",
        });
    };

    const filteredAdmins = admins.filter(
        (admin) =>
            admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            admin.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const getRoleBadge = (role) => {
        if (role === "super_admin") {
            return {
                color: "bg-purple-100 text-purple-800",
                icon: <FaShieldAlt className="text-purple-500" />,
                label: "Super Admin",
                isFixed: true,
            };
        }
        return {
            color: "bg-blue-100 text-blue-800",
            icon: <FaUserTag className="text-blue-500" />,
            label: "Admin",
            isFixed: false,
        };
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
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
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-100 text-sm">Total Users</p>
                            <p className="text-3xl font-bold mt-1">{admins.length}</p>
                        </div>
                        <FaUsers className="text-4xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-purple-100 text-sm">Super Admins</p>
                            <p className="text-3xl font-bold mt-1">
                                {admins.filter((a) => a.role === "super_admin").length}
                            </p>
                        </div>
                        <FaShieldAlt className="text-4xl opacity-50" />
                    </div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-green-100 text-sm">Active Users</p>
                            <p className="text-3xl font-bold mt-1">
                                {admins.filter((a) => a.isActive).length}
                            </p>
                        </div>
                        <FaUserCheck className="text-4xl opacity-50" />
                    </div>
                </div>
            </div>

            {/* Search Bar and Add Button */}
            <div className="mb-6 flex justify-between items-center flex-wrap gap-4">
                <div className="relative max-w-md w-full">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-secondary transition"
                    />
                </div>

                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaUserPlus /> Add New Admin
                </button>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {filteredAdmins.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        User
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Role
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Last Login
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAdmins.map((admin, index) => {
                                    const roleBadge = getRoleBadge(admin.role);
                                    return (
                                        <motion.tr
                                            key={admin._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center">
                                                        <span className="text-secondary font-bold">
                                                            {admin.name?.[0] || admin.email?.[0]}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold">
                                                            {admin.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
                                                            ID: {admin._id.slice(-6)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FaEnvelope className="text-gray-400 text-sm" />
                                                    <span>{admin.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${roleBadge.color}`}
                                                >
                                                    {roleBadge.icon}
                                                    {roleBadge.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() =>
                                                        toggleUserStatus(admin._id, admin.isActive)
                                                    }
                                                    className="focus:outline-none"
                                                    disabled={admin.role === "super_admin"}
                                                >
                                                    {admin.isActive ? (
                                                        <div className="flex items-center gap-2">
                                                            {admin.role === "admin" && (
                                                                <ToggleRight className="text-green-500 w-6 h-6" />
                                                            )}
                                                            <span className="text-xs text-green-600">
                                                                Active
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            {admin.role === "admin" && (
                                                                <ToggleLeft className="text-gray-400 w-6 h-6" />
                                                            )}
                                                            <span className="text-xs text-gray-500">
                                                                Inactive
                                                            </span>
                                                        </div>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                                    <FaCalendarAlt className="text-xs" />
                                                    <span>
                                                        {admin.lastLogin
                                                            ? new Date(
                                                                  admin.lastLogin,
                                                              ).toLocaleDateString()
                                                            : "Never logged in"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {admin.role === "super_admin" ? (
                                                        <button
                                                            onClick={() => {
                                                                setSelectedAdmin(admin);
                                                                setIsPasswordModalOpen(true);
                                                            }}
                                                            className="text-secondary hover:text-primary p-2 rounded-lg hover:bg-secondary/10 transition flex items-center gap-1"
                                                            title="Change Password"
                                                        >
                                                            <FaLock className="text-sm" />
                                                            <span className="text-sm">
                                                                Change Password
                                                            </span>
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEdit(admin)}
                                                                className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition"
                                                                title="Edit User"
                                                            >
                                                                <FaEdit />
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(admin._id)
                                                                }
                                                                className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition"
                                                                title="Delete User"
                                                            >
                                                                <FaTrash />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-16">
                        {searchTerm ? (
                            <>
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No users found
                                </h3>
                                <p className="text-gray-500">
                                    No users matching "{searchTerm}". Try a different search term.
                                </p>
                                <button
                                    onClick={() => setSearchTerm("")}
                                    className="mt-4 text-secondary hover:text-primary transition"
                                >
                                    Clear search
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaUsers className="text-4xl text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    No users yet
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Get started by adding your first admin user
                                </p>
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setIsModalOpen(true);
                                    }}
                                    className="btn-primary inline-flex items-center gap-2"
                                >
                                    <FaUserPlus /> Add Your First Admin
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Add/Edit User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-md w-full"
                    >
                        <div className="border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingAdmin ? "Edit User" : "Add New Admin"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="admin@lawfirm.com"
                                />
                            </div>
                            {!editingAdmin && (
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                        placeholder="Enter password (min 6 characters)"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Role
                                </label>
                                <select
                                    value={formData.role}
                                    onChange={(e) =>
                                        setFormData({ ...formData, role: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary bg-white"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingAdmin ? "Update User" : "Create User"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* Change Password Modal */}
            {isPasswordModalOpen && selectedAdmin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-md w-full"
                    >
                        <div className="border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                Change Password for {selectedAdmin.name}
                            </h3>
                            <button
                                onClick={() => {
                                    setIsPasswordModalOpen(false);
                                    setPasswordData({ newPassword: "", confirmPassword: "" });
                                }}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleChangePassword} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.newPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            newPassword: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter new password (min 6 characters)"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.confirmPassword}
                                    onChange={(e) =>
                                        setPasswordData({
                                            ...passwordData,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    Change Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsPasswordModalOpen(false);
                                        setPasswordData({ newPassword: "", confirmPassword: "" });
                                    }}
                                    className="btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default UserManagement;
