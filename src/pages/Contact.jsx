import { motion } from "framer-motion";
import ContactForm from "../components/ui/ContactForm";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaArchway } from "react-icons/fa";

const Contact = () => {
    const contactInfo = [
        {
            icon: <FaPhone className="text-2xl" />,
            title: "Phone",
            details: ["+880 1712245511"],
            link: "tel:+8801712245511",
        },
        {
            icon: <FaEnvelope className="text-2xl" />,
            title: "Email",
            details: ["nowshed.j@gmail.com"],
            link: "mailto:nowshed.j@gmail.com",
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: "Office Address",
            details: ["157 Shantinagar, Dhaka 1217 (3rd floor of Mina Bazar)"],
            link: "https://www.google.com/maps?q=157%20Shantinagar%2C%20Dhaka%201217",
        },
        {
            icon: <FaArchway className="text-2xl" />,
            title: "Court Address",
            details: ["Hall Room No-2, Supreme Court Bar Building Shahbag, Dhaka"],
            link: "https://www.google.com/maps?q=157%20Shantinagar%2C%20Dhaka%201217",
        },
        {
            icon: <FaClock className="text-2xl" />,
            title: "Office Hours",
            details: [
                "Sunday - Thursday: 9:00 AM - 6:00 PM",
                "Friday: Closed",
                "Saturday: 10:00 AM - 2:00 PM",
            ],
            link: null,
        },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-accent text-white py-10 sm:py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                            Contact Us
                        </h1>
                        <p className="text-lg text-gray-300">
                            Get in touch with our legal team. We're here to help with your legal
                            needs.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-10 sm:py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-playfair font-bold mb-6">
                                Send Us a Message
                            </h2>
                            <ContactForm />
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-playfair font-bold mb-6">
                                Contact Information
                            </h2>
                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="text-secondary">{info.icon}</div>
                                        <div>
                                            <h3 className="font-semibold text-lg mb-2">
                                                {info.title}
                                            </h3>
                                            {info.details.map((detail, idx) => (
                                                <p key={idx} className="text-gray-600">
                                                    {info.link ? (
                                                        <a
                                                            href={info.link}
                                                            className="hover:text-secondary"
                                                        >
                                                            {detail}
                                                        </a>
                                                    ) : (
                                                        detail
                                                    )}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Google Map */}
            <section className="py-10 sm:py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-playfair font-bold text-center mb-8">
                        Find Us Here
                    </h2>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps?q=157%20Shantinagar%2C%20Dhaka%201217&output=embed"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Office Location"
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Emergency Contact */}
            <section className="py-10 sm:py-20 bg-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                        Emergency Legal Assistance
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Need urgent legal help? Contact our emergency hotline
                    </p>
                    <a
                        href="tel:+8801234567890"
                        className="btn-primary bg-secondary text-primary text-base sm:text-2xl font-bold inline-block"
                    >
                        Call Now: +880 1712245511
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Contact;
