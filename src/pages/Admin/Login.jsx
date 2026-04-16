import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { FaGavel, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import api from "../../utils/api";
import toast from "react-hot-toast";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetToken, setResetToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: request, 2: verify & reset
    const { login, admin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (admin) {
            navigate("/admin/dashboard");
        }
    }, [admin, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const success = await login(email, password);
        if (success) {
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
            <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center py-12 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
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
                        className="flex items-center gap-2 text-gray-500 hover:text-primary mb-6 transition"
                    >
                        <FaArrowLeft /> Back to Login
                    </button>

                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-4">
                            <FaLock className="text-4xl text-primary" />
                        </div>
                        <h2 className="text-3xl font-playfair font-bold text-primary">
                            {step === 1 ? "Forgot Password?" : "Reset Password"}
                        </h2>
                        <p className="text-gray-600 mt-2">
                            {step === 1
                                ? "Enter your email to receive a reset code"
                                : "Enter the 5-digit code sent to your email"}
                        </p>
                    </div>

                    {step === 1 ? (
                        <form onSubmit={handleForgotPassword} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        required
                                        value={resetEmail}
                                        onChange={(e) => setResetEmail(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary transition"
                                        placeholder="admin@lawfirm.com"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                            >
                                {loading ? "Sending..." : "Send Reset Code"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-6">
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
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary text-center text-2xl tracking-widest"
                                    placeholder="XXXXX"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Enter the 5-digit code from your email
                                </p>
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center py-12 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            >
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary rounded-full mb-4">
                        <FaGavel className="text-4xl text-primary" />
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-primary">Admin Login</h2>
                    <p className="text-gray-600 mt-2">Access the law firm management dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Email Address
                        </label>
                        <div className="relative">
                            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary transition"
                                placeholder="admin@lawfirm.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2 font-semibold">Password</label>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-secondary transition"
                                placeholder="Enter your password"
                            />
                        </div>
                    </div>

                    <div className="text-right">
                        <button
                            type="button"
                            onClick={() => setIsForgotPassword(true)}
                            className="text-sm text-secondary hover:text-primary transition"
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login to Dashboard"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Demo Credentials:</p>
                    <p>Email: solaimanislamsifat@gmail.com</p>
                    <p>Password: 111111</p>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
