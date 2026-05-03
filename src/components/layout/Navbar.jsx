// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "/logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { admin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Attorneys", path: "/attorneys" },
        { name: "Gallery", path: "/gallery" },
        { name: "Client", path: "/client" },
        { name: "Contact", path: "/contact" },
    ];

    // Check if link is active
    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === path;
        }
        return location.pathname.startsWith(path);
    };

    const menuVariants = {
        hidden: { opacity: 0, x: "100%" },
        visible: { opacity: 1, x: 0, transition: { type: "spring", damping: 20, stiffness: 300 } },
        exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: i * 0.08, duration: 0.4 },
        }),
    };

    return (
        <>
            <nav
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                    isScrolled
                        ? "bg-[#ECF7FF] shadow-lg py-2"
                        : "bg-[#ECF7FF]/80 backdrop-blur-md py-4"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 2xl:px-24">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex-shrink-0"
                        >
                            <Link to="/" className="flex items-center">
                                <img
                                    src={Logo}
                                    alt="Jamil's Law Firm"
                                    className="object-contain transition-all duration-300 w-20 sm:w-28"
                                />
                            </Link>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.path}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                >
                                    <Link
                                        to={link.path}
                                        className={`font-medium transition-all duration-300 relative group text-gray-800 hover:text-[#027B7A]
                                            ${isActive(link.path) ? "text-[#027B7A] font-bold" : ""}
                                        `}
                                    >
                                        {link.name}
                                        <span
                                            className={`absolute -bottom-1 left-0 h-0.5 bg-[#027B7A] transition-all duration-300 
                                            ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}
                                        `}
                                        ></span>
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Admin Link */}
                            {admin && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Link
                                        to="/admin/dashboard"
                                        className={`font-medium transition-colors duration-300 hover:text-gray-800
                                            ${isActive("/admin") ? "text-[#027B7A] font-bold" : "text-[#027B7A]"}
                                        `}
                                    >
                                        Dashboard
                                    </Link>
                                </motion.div>
                            )}

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.35 }}
                            >
                                <Link
                                    to="/booking"
                                    className="px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-3xl font-semibold transition-all duration-300 transform hover:scale-105 bg-[#027B7A] text-white hover:bg-[#04b0b0] shadow-lg text-sm sm:text-base whitespace-nowrap"
                                >
                                    Book Consultation
                                </Link>
                            </motion.div>
                        </div>

                        {/* Mobile Menu Button - Visible on tablet and below */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="lg:hidden text-2xl text-gray-800 z-50 relative p-2"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <AiOutlineClose size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <GiHamburgerMenu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="fixed inset-0 top-[72px] bg-[#ECF7FF] z-40 overflow-y-auto"
                    >
                        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
                            {navLinks.map((link, idx) => (
                                <motion.div
                                    key={link.path}
                                    custom={idx}
                                    variants={linkVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Link
                                        to={link.path}
                                        className={`block py-4 transition font-medium text-lg border-b border-gray-200
                                            ${
                                                isActive(link.path)
                                                    ? "text-[#027B7A] font-bold"
                                                    : "text-gray-800 hover:text-[#027B7A]"
                                            }
                                        `}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}

                            {admin && (
                                <motion.div
                                    custom={navLinks.length}
                                    variants={linkVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <button
                                        onClick={() => {
                                            navigate("/admin/dashboard");
                                            setIsOpen(false);
                                        }}
                                        className={`block w-full text-left py-4 font-medium text-lg border-b border-gray-200
                                            ${
                                                isActive("/admin")
                                                    ? "text-[#027B7A] font-bold"
                                                    : "text-[#027B7A]"
                                            }
                                        `}
                                    >
                                        Dashboard
                                    </button>
                                </motion.div>
                            )}

                            <motion.div
                                custom={navLinks.length + 1}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-8"
                            >
                                <Link
                                    to="/booking"
                                    className="btn-primary inline-block w-full text-center bg-[#027B7A] text-white py-4 rounded-xl font-semibold hover:bg-[#04b0b0] transition text-lg"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Book Consultation
                                </Link>
                            </motion.div>

                            <motion.div
                                custom={navLinks.length + 2}
                                variants={linkVariants}
                                initial="hidden"
                                animate="visible"
                                className="mt-auto pt-8 space-y-4"
                            >
                                <div className="pt-4 border-t border-gray-200">
                                    <a
                                        href="tel:+8801234567890"
                                        className="text-gray-700 flex items-center gap-3 justify-center hover:text-[#027B7A] transition py-2 text-sm sm:text-base"
                                    >
                                        <Phone size={18} className="text-[#027B7A] flex-shrink-0" />
                                        <span>+880 1712245511</span>
                                    </a>
                                    <a
                                        href="mailto:nowshed.j@gmail.com"
                                        className="text-gray-700 flex items-center gap-3 justify-center hover:text-[#027B7A] transition py-2 text-sm sm:text-base"
                                    >
                                        <Mail size={18} className="text-[#027B7A] flex-shrink-0" />
                                        <span>nowshed.j@gmail.com</span>
                                    </a>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
