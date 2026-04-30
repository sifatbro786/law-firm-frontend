import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGavel, FaHome, FaSearch, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="min-h-screen bg-[#ECF7FF] flex items-center justify-center py-20 pt-48 px-4 relative overflow-hidden">
            {/* Premium Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 right-10 w-96 h-96 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#027B7A]/[0.02] rounded-full blur-3xl" />

                {/* Decorative Legal Pattern */}
                <svg
                    className="absolute bottom-0 left-0 w-64 h-64 text-[#027B7A]/5"
                    fill="currentColor"
                    viewBox="0 0 200 200"
                >
                    <path d="M100,0 L120,30 L155,20 L145,55 L175,70 L145,85 L155,120 L120,110 L100,140 L80,110 L45,120 L55,85 L25,70 L55,55 L45,20 L80,30 Z" />
                </svg>
                <svg
                    className="absolute top-0 right-0 w-80 h-80 text-[#027B7A]/5 rotate-45"
                    fill="currentColor"
                    viewBox="0 0 200 200"
                >
                    <path d="M100,0 L120,30 L155,20 L145,55 L175,70 L145,85 L155,120 L120,110 L100,140 L80,110 L45,120 L55,85 L25,70 L55,55 L45,20 L80,30 Z" />
                </svg>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-2xl mx-auto relative z-10"
            >
                {/* Animated Icon */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-[#027B7A] to-[#025c5c] rounded-2xl mb-8 shadow-2xl shadow-[#027B7A]/20 relative group"
                >
                    <FaGavel className="text-5xl text-white group-hover:scale-110 transition-transform duration-300" />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "loop",
                        }}
                        className="absolute inset-0 rounded-2xl border-2 border-[#027B7A]/30"
                    />
                </motion.div>

                {/* Error Code */}
                <motion.h1
                    variants={itemVariants}
                    className="text-8xl md:text-9xl font-playfair font-bold text-gray-900 mb-4 tracking-tighter"
                >
                    404
                </motion.h1>

                {/* Main Message */}
                <motion.h2
                    variants={itemVariants}
                    className="text-2xl md:text-3xl font-playfair font-bold text-gray-800 mb-4"
                >
                    Page Not Found
                </motion.h2>

                {/* Divider */}
                <motion.div
                    variants={itemVariants}
                    className="w-20 h-1 bg-[#027B7A] mx-auto my-6 rounded-full"
                />

                {/* Description */}
                <motion.p
                    variants={itemVariants}
                    className="text-gray-600 text-base md:text-lg leading-relaxed max-w-md mx-auto mb-8"
                >
                    Oops! The page you're looking for doesn't exist or has been moved. Let's get you
                    back on track.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#027B7A]/20 hover:shadow-xl hover:-translate-y-0.5 group"
                    >
                        <FaHome className="group-hover:scale-110 transition-transform" />
                        <span>Back to Home</span>
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:text-[#027B7A] transition-all duration-300 shadow-md border border-gray-200 group"
                    >
                        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                        <span>Go Back</span>
                    </button>
                </motion.div>

                {/* Search Suggestion */}
                <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                        <FaSearch className="w-4 h-4" />
                        <span>Need help?</span>
                        <Link
                            to="/contact"
                            className="text-[#027B7A] hover:underline font-medium ml-1"
                        >
                            Contact our legal team
                        </Link>
                    </div>
                </motion.div>

                {/* Trust Badge */}
                <motion.div
                    variants={itemVariants}
                    className="mt-8 flex items-center justify-center gap-6 text-xs text-gray-400"
                >
                    <span>✓ 24/7 Legal Support</span>
                    <span>✓ Free Initial Assessment</span>
                    <span>✓ Confidential Consultation</span>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default NotFound;
