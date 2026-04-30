import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaYoutube,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaArrowRight,
    FaShieldAlt,
    FaBalanceScale,
    FaGavel,
} from "react-icons/fa";
import Logo from "/logo.png";

const Footer = () => {
    const practiceAreas = [
        { name: "Writ Petition", path: "/services/writ-petition" },
        { name: "Civil Revision", path: "/services/civil-revision" },
        { name: "Contempt Petition", path: "/services/contempt-petition" },
        { name: "Civil Appeal", path: "/services/civil-appeal" },
        { name: "Leave to Appeal", path: "/services/leave-to-appeal" },
        { name: "Review Petition", path: "/services/review-petition" },
        { name: "Stay Order", path: "/services/stay-order" },
    ];

    const quickLinks = [
        { name: "About Us", path: "/about" },
        { name: "Our Services", path: "/services" },
        { name: "Our Attorneys", path: "/attorneys" },
        { name: "Case Studies", path: "/case-studies" },
        { name: "Contact", path: "/contact" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <footer className="relative bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
            {/* Premium Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#027B7A]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#027B7A]/[0.02] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
                    {/* Brand Column - 4 columns */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-4 space-y-4"
                    >
                        <motion.div variants={itemVariants}>
                            <Link to="/" className="inline-block">
                                <img
                                    src={Logo}
                                    alt="Jamil Law Consultant"
                                    className="h-16 w-auto brightness-0 invert mb-4"
                                />
                            </Link>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Providing expert legal services in Bangladesh with integrity,
                                excellence, and dedication to justice. Behind every case is a human
                                story.
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-2 text-[#027B7A]">
                                <FaShieldAlt className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-wider font-semibold">
                                    Trusted Legal Partner
                                </span>
                            </div>
                            <p className="text-gray-500 text-sm mt-2">
                                Over 25+ years of excellence in legal practice
                            </p>
                        </motion.div>

                        <motion.div variants={itemVariants} className="flex space-x-3 pt-4">
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#027B7A] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                                aria-label="Facebook"
                            >
                                <FaFacebookF className="text-gray-400 group-hover:text-white text-sm" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#027B7A] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedinIn className="text-gray-400 group-hover:text-white text-sm" />
                            </a>
                            <a
                                href="#"
                                className="w-9 h-9 rounded-full bg-gray-800 hover:bg-[#027B7A] flex items-center justify-center transition-all duration-300 hover:-translate-y-1 group"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="text-gray-400 group-hover:text-white text-sm" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Practice Areas - 3 columns */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <motion.h3
                            variants={itemVariants}
                            className="text-lg font-playfair font-bold mb-5 relative inline-block"
                        >
                            Practice Areas
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#027B7A] rounded-full" />
                        </motion.h3>
                        <ul className="space-y-2.5">
                            {practiceAreas.slice(0, 7).map((area, index) => (
                                <motion.li key={index} variants={itemVariants}>
                                    <Link
                                        to={area.path}
                                        className="text-gray-400 hover:text-[#027B7A] transition-all duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <FaGavel className="opacity-0 group-hover:opacity-100 w-3 h-3 transition-all duration-300" />
                                        <span>{area.name}</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Quick Links - 2 columns */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <motion.h3
                            variants={itemVariants}
                            className="text-lg font-playfair font-bold mb-5 relative inline-block"
                        >
                            Quick Links
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#027B7A] rounded-full" />
                        </motion.h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((link, index) => (
                                <motion.li key={index} variants={itemVariants}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-400 hover:text-[#027B7A] transition-all duration-300 text-sm flex items-center gap-2 group"
                                    >
                                        <FaArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        <span>{link.name}</span>
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info - 3 columns */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="lg:col-span-3"
                    >
                        <motion.h3
                            variants={itemVariants}
                            className="text-lg font-playfair font-bold mb-5 relative inline-block"
                        >
                            Contact Info
                            <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#027B7A] rounded-full" />
                        </motion.h3>
                        <ul className="space-y-3">
                            <motion.li
                                variants={itemVariants}
                                className="flex items-start gap-3 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-[#027B7A]/20 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                                    <FaMapMarkerAlt className="text-[#027B7A] w-3.5 h-3.5" />
                                </div>
                                <span className="text-gray-400 text-sm leading-relaxed">
                                    157 Shantinagar, Dhaka 1217 <br />
                                    (3rd floor of Mina Bazar)
                                </span>
                            </motion.li>
                            <motion.li
                                variants={itemVariants}
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-[#027B7A]/20 flex items-center justify-center transition-all duration-300">
                                    <FaPhone className="text-[#027B7A] w-3.5 h-3.5" />
                                </div>
                                <a
                                    href="tel:+8801712245511"
                                    className="text-gray-400 hover:text-[#027B7A] transition text-sm"
                                >
                                    +880 1712245511
                                </a>
                            </motion.li>
                            <motion.li
                                variants={itemVariants}
                                className="flex items-center gap-3 group"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-800 group-hover:bg-[#027B7A]/20 flex items-center justify-center transition-all duration-300">
                                    <FaEnvelope className="text-[#027B7A] w-3.5 h-3.5" />
                                </div>
                                <a
                                    href="mailto:nowshed.j@gmail.com"
                                    className="text-gray-400 hover:text-[#027B7A] transition text-sm"
                                >
                                    nowshed.j@gmail.com
                                </a>
                            </motion.li>
                        </ul>

                        {/* Consultation Badge */}
                        <motion.div
                            variants={itemVariants}
                            className="mt-6 p-3 rounded-xl bg-gray-800/50 border border-gray-700"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-gray-400">Consultation Fee Online</p>
                                    <p className="text-lg font-bold text-[#027B7A]">5,000 BDT</p>
                                </div>
                                <FaBalanceScale className="text-gray-600 w-5 h-5" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
                >
                    <p className="text-gray-500 text-sm text-center sm:text-left">
                        © {new Date().getFullYear()} Jamil Law Consultant Bangladesh. All rights
                        reserved.
                    </p>
                    <div className="flex gap-6 text-xs">
                        <Link
                            to="/privacy"
                            className="text-gray-500 hover:text-[#027B7A] transition"
                        >
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-500 hover:text-[#027B7A] transition">
                            Terms of Service
                        </Link>
                        <Link
                            to="/sitemap"
                            className="text-gray-500 hover:text-[#027B7A] transition"
                        >
                            Sitemap
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
