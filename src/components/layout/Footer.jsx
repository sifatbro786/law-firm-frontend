import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaYoutube,
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
    const practiceAreas = ["Corporate Law", "Criminal Law", "Family Law", "Property Law"];

    const quickLinks = [
        { name: "About", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "Attorneys", path: "/attorneys" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <footer className="bg-primary text-white pt-12 pb-6">
            <div className="px-5 lg:px-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* About */}
                    <div>
                        <h3 className="text-xl font-playfair font-bold mb-4">Neela's Diary</h3>
                        <p className="text-gray-300 mb-4">
                            Providing expert legal services in Bangladesh with integrity,
                            excellence, and dedication to justice.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="bg-accent p-2 rounded-full hover:bg-secondary transition"
                            >
                                <FaFacebookF />
                            </a>
                            <a
                                href="#"
                                className="bg-accent p-2 rounded-full hover:bg-secondary transition"
                            >
                                <FaTwitter />
                            </a>
                            <a
                                href="#"
                                className="bg-accent p-2 rounded-full hover:bg-secondary transition"
                            >
                                <FaLinkedinIn />
                            </a>
                            <a
                                href="#"
                                className="bg-accent p-2 rounded-full hover:bg-secondary transition"
                            >
                                <FaYoutube />
                            </a>
                        </div>
                    </div>

                    {/* Practice Areas */}
                    <div>
                        <h3 className="text-xl font-playfair font-bold mb-4">Practice Areas</h3>
                        <ul className="space-y-2">
                            {practiceAreas.map((area, index) => (
                                <li key={index}>
                                    <Link
                                        to="/services"
                                        className="text-gray-300 hover:text-secondary transition"
                                    >
                                        {area}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-playfair font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-gray-300 hover:text-secondary transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-playfair font-bold mb-4">Contact Info</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 text-secondary" />
                                <span className="text-gray-300">
                                    House 123, Road 4, Block B, Banani, Dhaka-1213
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-secondary" />
                                <span className="text-gray-300">+880 1234 567890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-secondary" />
                                <span className="text-gray-300">info@lawfirmbd.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 pt-6 text-center text-gray-400">
                    <p>
                        © {new Date().getFullYear()} Neela's Diary Bangladesh. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
