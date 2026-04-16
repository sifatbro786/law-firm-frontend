import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { admin } = useAuth();
    const navigate = useNavigate();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Attorneys", path: "/attorneys" },
        { name: "Case Studies", path: "/case-studies" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
            <div className="px-5 lg:px-32">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-playfair font-bold">
                        <span className="text-secondary">Neela's</span> Law Firm
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="hover:text-secondary transition-colors duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Admin Link */}
                        {admin && (
                            <Link to="/admin/dashboard" className="text-secondary hover:text-white">
                                Dashboard
                            </Link>
                        )}

                        {/* CTA Button */}
                        <Link to="/booking" className="btn-primary">
                            Book Consultation
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className="block py-2 hover:text-secondary transition"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {admin && (
                            <button
                                onClick={() => {
                                    navigate("/admin/dashboard");
                                    setIsOpen(false);
                                }}
                                className="block w-full text-left py-2 text-secondary"
                            >
                                Dashboard
                            </button>
                        )}
                        <Link
                            to="/booking"
                            className="btn-primary inline-block mt-4 w-full text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Book Consultation
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
