import { motion } from "framer-motion";
import ContactForm from "../components/ui/ContactForm";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock,
    FaArchway,
    FaWhatsapp,
    FaArrowRight,
    FaFacebookMessenger,
} from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";

const Contact = () => {
    const contactInfo = [
        {
            icon: <FaPhone className="text-xl" />,
            title: "Phone",
            details: ["+880 1712245511"],
            link: "tel:+8801712245511",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: <FaEnvelope className="text-xl" />,
            title: "Email",
            details: ["nowshed.j@gmail.com"],
            link: "mailto:nowshed.j@gmail.com",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: <FaMapMarkerAlt className="text-xl" />,
            title: "Office Address",
            details: ["157 Shantinagar, Dhaka 1217 (3rd floor of Mina Bazar)"],
            link: "https://www.google.com/maps?q=157%20Shantinagar%2C%20Dhaka%201217",
            color: "bg-red-100 text-red-600",
        },
        {
            icon: <FaArchway className="text-xl" />,
            title: "Court Address",
            details: ["Hall Room No-2, Supreme Court Bar Building Shahbag, Dhaka"],
            link: "https://www.google.com/maps?q=Supreme+Court+Bar+Building+Shahbag+Dhaka",
            color: "bg-purple-100 text-purple-600",
        },
        {
            icon: <FaClock className="text-xl" />,
            title: "Office Hours",
            details: [
                "Sunday - Thursday: 9:00 AM - 6:00 PM",
                "Friday: Closed",
                "Saturday: 10:00 AM - 2:00 PM",
            ],
            link: null,
            color: "bg-orange-100 text-orange-600",
        },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <PageHeader title="Contact Us" path="Contact" />

            {/* Contact Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                                <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                    Get in Touch
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                                Send Us a <span className="text-[#027B7A]">Message</span>
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Have a question or need legal assistance? Fill out the form and our
                                team will get back to you within 24 hours.
                            </p>
                            <ContactForm />
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                                <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                    Reach Us
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                                Contact <span className="text-[#027B7A]">Information</span>
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Multiple ways to reach us. Choose what works best for you.
                            </p>

                            <div className="space-y-5">
                                {contactInfo.map((info, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex gap-5 group"
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-xl ${info.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {info.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-lg mb-2">
                                                {info.title}
                                            </h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600">
                                                    {info.link ? (
                                                        <a
                                                            href={info.link}
                                                            className="hover:text-[#027B7A] transition-colors"
                                                            target={
                                                                info.link.startsWith("http")
                                                                    ? "_blank"
                                                                    : "_self"
                                                            }
                                                            rel="noopener noreferrer"
                                                        >
                                                            {detail}
                                                        </a>
                                                    ) : (
                                                        detail
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Social Connect */}
                            <div className="mt-10 pt-8 border-t border-gray-200">
                                <h3 className="font-bold text-gray-900 mb-4">Connect With Us</h3>
                                <div className="flex gap-3">
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                                    >
                                        <FaWhatsapp />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                                    >
                                        <FaFacebookMessenger />
                                    </a>
                                    <a
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:scale-110 transition-transform"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.99h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.99C18.343 21.128 22 16.991 22 12z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Google Map */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Location
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                            Find Us <span className="text-[#027B7A]">Here</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Visit our office for a face-to-face consultation. We're conveniently
                            located in the heart of Dhaka.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.172129223538!2d90.4108745757787!3d23.739943978838714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b871ad2f557d%3A0xa5a5d5b5a5a5d5b5!2s157%20Shantinagar%2C%20Dhaka%201217!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                            width="100%"
                            height="450"
                            style={{ border: "0", borderRadius: "12px" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                            title="Office Location - 157 Shantinagar, Dhaka"
                        ></iframe>
                    </motion.div>
                </div>
            </section>

            {/* Emergency Contact - Updated */}
            <section className="py-16 md:py-24 bg-[#027B7A] text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                24/7 Support
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                            Emergency Legal Assistance
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                            Need urgent legal help? Our emergency hotline is available 24/7 for
                            critical legal matters.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+8801712245511"
                                className="inline-flex justify-center sm:justify-start items-center gap-2 px-8 py-4 bg-white text-[#027B7A] rounded-xl font-bold sm:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                            >
                                <FaPhone className="text-xl" />
                                Call Now: +880 1712245511
                            </a>
                            <a
                                href="/booking"
                                className="inline-flex justify-center sm:justify-start items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300"
                            >
                                Book Consultation
                                <FaArrowRight />
                            </a>
                        </div>
                        <p className="text-white/50 text-sm mt-6">
                            Consultation fee: 5,000 BDT (Online)
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
