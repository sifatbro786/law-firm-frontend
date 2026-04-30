import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaGavel,
    FaEnvelope,
    FaLock,
    FaArrowLeft,
    FaShieldAlt,
    FaUserShield,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa";
import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1);
    const { login, admin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate("/admin/dashboard");
        }
    }, [admin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please enter both email and password");
            return;
        }
        setLoading(true);
        const success = await login(email, password);
        if (success) {
            toast.success("Welcome back to the dashboard!");
            navigate("/admin/dashboard");
        }
        setLoading(false);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!resetEmail) {
            toast.error("Please enter your email address");
            return;
        }
        setLoading(true);
        try {
            await api.post("/api/auth/forgot-password", { email: resetEmail });
            toast.success("Reset code sent to your email!");
            setStep(2);
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to send reset code");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        try {
            await api.post("/api/auth/reset-password", {
                email: resetEmail,
                token: resetToken,
                newPassword,
            });
            toast.success("Password reset successfully! Please login with your new password.");
            setIsForgotPassword(false);
            setStep(1);
            setResetEmail("");
            setResetToken("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    if (admin) {
        return null;
    }

    if (isForgotPassword) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#ECF7FF] to-white flex items-center justify-center py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-100"
                >
                    <button
                        onClick={() => {
                            setIsForgotPassword(false);
                            setStep(1);
                            setResetEmail("");
                            setResetToken("");
                            setNewPassword("");
                            setConfirmPassword("");
                        }}
                        className="flex items-center gap-2 text-gray-500 hover:text-[#027B7A] mb-6 transition-colors group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Login</span>
                    </button>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#027B7A] to-[#025c5c] rounded-2xl shadow-lg mb-4">
                            <FaLock className="text-3xl text-white" />
                        </div>
                        <h2 className="text-3xl font-playfair font-bold text-gray-900">
                            {step === 1 ? "Forgot Password?" : "Reset Password"}
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {step === 1
                                ? "Enter your email to receive a reset code"
                                : "Enter the 5-digit code sent to your email"}
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                onSubmit={handleForgotPassword}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                        <input
                                            type="email"
                                            required
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 transition-all"
                                            placeholder="admin@lawfirm.com"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#027B7A]/20 disabled:opacity-50"
                                >
                                    {loading ? "Sending..." : "Send Reset Code"}
                                </button>
                            </motion.form>
                        ) : (
                            <motion.form
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                onSubmit={handleResetPassword}
                                className="space-y-6"
                            >
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        Reset Code
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={5}
                                        value={resetToken}
                                        onChange={(e) =>
                                            setResetToken(e.target.value.replace(/\D/g, ""))
                                        }
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 text-center text-2xl tracking-widest font-mono"
                                        placeholder="XXXXX"
                                    />
                                    <p className="text-xs text-gray-400 mt-2 text-center">
                                        Enter the 5-digit code from your email
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 pr-12"
                                            placeholder="Enter new password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#027B7A]/20 disabled:opacity-50"
                                >
                                    {loading ? "Resetting..." : "Reset Password"}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#ECF7FF] to-white flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#027B7A]/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-gray-100 relative z-10"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#027B7A] to-[#025c5c] rounded-2xl shadow-lg mb-4">
                        <FaGavel className="text-3xl text-white" />
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-900">Admin Login</h2>
                    <p className="text-gray-500 mt-2">
                        Access the law consultant management dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 transition-all bg-gray-50 focus:bg-white"
                                placeholder="admin@lawfirm.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/20 transition-all bg-gray-50 focus:bg-white"
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#027B7A] transition"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            className="text-sm text-[#027B7A] hover:underline transition"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#027B7A]/20 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none"
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Logging in...
                            </div>
                        ) : (
                            "Login to Dashboard"
                        )}
                    </button>
                </form>

                {/* Security Notice */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                        <FaShieldAlt className="text-[#027B7A]" />
                        <span>Secure admin access only</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
