import { motion } from "framer-motion";
import ContactForm from "../components/ui/ContactForm";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Contact = () => {
    const contactInfo = [
        {
            icon: <FaPhone className="text-2xl" />,
            title: "Phone",
            details: ["+880 1234 567890", "+880 1234 567891"],
            link: "tel:+8801234567890",
        },
        {
            icon: <FaEnvelope className="text-2xl" />,
            title: "Email",
            details: ["info@lawfirmbd.com", "support@lawfirmbd.com"],
            link: "mailto:info@lawfirmbd.com",
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: "Office Address",
            details: ["House 123, Road 4, Block B", "Banani, Dhaka-1213", "Bangladesh"],
            link: "https://maps.google.com",
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
            <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
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
            <section className="py-20 bg-white">
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
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-playfair font-bold text-center mb-8">
                        Find Us Here
                    </h2>
                    <div className="rounded-lg overflow-hidden shadow-lg">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902123456789!2d90.406213!3d23.794851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c70c15f1b49d%3A0x9b3e6f8b9c9e8a5f!2sBanani%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1699999999999!5m2!1sen!2sbd"
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
            <section className="py-20 bg-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                        Emergency Legal Assistance
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Need urgent legal help? Contact our emergency hotline
                    </p>
                    <a
                        href="tel:+8801234567890"
                        className="btn-primary bg-secondary text-primary text-2xl font-bold inline-block"
                    >
                        Call Now: +880 1234 567890
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Contact;
