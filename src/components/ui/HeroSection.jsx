import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Shield } from "lucide-react";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen bg-white">
            {/* Subtle Gradient Overlay */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a03d] opacity-5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c9a03d] opacity-5 rounded-full blur-3xl" />

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-10 sm:py-20">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        {/* Premium Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-[#c9a03d]/10 text-[#c9a03d] px-4 py-2 rounded-full text-sm font-semibold border border-[#c9a03d]/20"
                        >
                            <Shield className="w-4 h-4" />
                            <span>Premium Legal Services Since 2001</span>
                        </motion.div>

                        {/* Main Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900"
                        >
                            Expert Legal Solutions for{" "}
                            <span className="relative inline-block">
                                <span className="text-[#c9a03d]">Your Business</span>
                                <svg
                                    className="absolute -bottom-2 left-0 w-full"
                                    viewBox="0 0 200 8"
                                    fill="none"
                                >
                                    <path
                                        d="M0 4 C50 7, 150 1, 200 4"
                                        stroke="#c9a03d"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </span>{" "}
                            & Family
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-gray-600 leading-relaxed max-w-xl"
                        >
                            With over 25+ years of experience in Bangladeshi law, we provide trusted
                            legal counsel and representation tailored to your unique needs.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap gap-4 pt-4"
                        >
                            <Link
                                to="/booking"
                                className="group inline-flex items-center gap-2 bg-[#c9a03d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#b08d35] transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                            >
                                Book Consultation
                                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 border-2 border-[#c9a03d] text-[#c9a03d] px-8 py-4 rounded-lg font-semibold hover:bg-[#c9a03d] hover:text-white transition-all duration-300"
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Elegant Image Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Main Image Frame */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#c9a03d]/20 via-transparent to-transparent z-10" />
                            <img
                                src="/court.jpg"
                                alt="Supreme Court Bangladesh"
                                className="w-full h-[500px] lg:h-[600px] object-cover"
                            />
                            {/* Gold Accent Border */}
                            <div className="absolute inset-0 border-2 border-[#c9a03d]/30 rounded-2xl pointer-events-none" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
