import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../ui/ServiceCard";
import { FaGavel, FaArrowRight, FaStar, FaShieldAlt, FaClock } from "react-icons/fa";

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const ServicesSection = ({services}) => {
    return (
        <section className="py-16 md:py-24 lg:py-28 bg-gradient-to-b from-white to-[#ECF7FF]/30 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#027B7A] rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#027B7A] rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-12 md:mb-16"
                >
                    {/* Premium Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-4">
                        <FaGavel className="text-[#027B7A] text-xs" />
                        <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                            Practice Areas
                        </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                        Our Legal <span className="relative inline-block">Services</span>
                    </h2>

                    <div className="w-20 h-1 bg-gradient-to-r from-[#027B7A] to-[#025c5c] mx-auto rounded-full mb-4"></div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div key={service._id} variants={fadeInUp}>
                            <ServiceCard service={service} index={index} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mt-12 md:mt-16"
                >
                    <Link
                        to="/services"
                        className="group inline-flex items-center gap-3 px-8 py-3.5 bg-white border-2 border-[#027B7A] text-[#027B7A] rounded-xl font-semibold hover:bg-[#027B7A] hover:text-white transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                        <span>View All Services</span>
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap justify-center gap-6 md:gap-12"
                >
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaShieldAlt className="text-[#027B7A]" />
                        <span>100% Confidential</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaStar className="text-[#027B7A]" />
                        <span>25+ Years Experience</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaClock className="text-[#027B7A]" />
                        <span>Quick Response</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
