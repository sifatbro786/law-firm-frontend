// ServiceDetail.jsx - Premium Redesign with Image Support
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaCheck,
    FaPhone,
    FaEnvelope,
    FaClock,
    FaShieldAlt,
    FaHandshake,
    FaAward,
    FaArrowLeft,
    FaBalanceScale,
    FaChevronRight,
    FaStar,
    FaGavel,
    FaRegClock,
    FaUsers,
    FaMedal,
} from "react-icons/fa";
import api from "../utils/api";
import PageHeader from "../components/ui/PageHeader";

const ServiceDetail = () => {
    const { slug } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchService();
        window.scrollTo(0, 0);
    }, [slug]);

    const fetchService = async () => {
        try {
            const response = await api.get(`/api/services/${slug}`);
            setService(response.data);
        } catch (error) {
            console.error("Error fetching service:", error);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        { icon: <FaHandshake />, text: "Dedicated Legal Team" },
        { icon: <FaShieldAlt />, text: "100% Confidential" },
        { icon: <FaClock />, text: "Timely Resolution" },
        { icon: <FaAward />, text: "Proven Track Record" },
    ];

    const stats = [
        { value: "25+", label: "Years Experience", icon: <FaStar /> },
        { value: "5000+", label: "Cases Won", icon: <FaGavel /> },
        { value: "98%", label: "Success Rate", icon: <FaMedal /> },
        { value: "50+", label: "Expert Lawyers", icon: <FaUsers /> },
    ];

    // Helper function to get image URL
    const getImageUrl = () => {
        if (service?.image) {
            return service.image;
        }
        // Fallback images based on service title
        const fallbackImages = {
            default:
                "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&h=400&fit=crop",
            criminal:
                "https://images.unsplash.com/photo-1589571894960-20bbe2828d9a?w=1200&h=400&fit=crop",
            corporate:
                "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&h=400&fit=crop",
            family: "https://images.unsplash.com/photo-1589391886645-2bd80d0c6c6c?w=1200&h=400&fit=crop",
            property:
                "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=400&fit=crop",
        };
        return fallbackImages[service?.category] || fallbackImages.default;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-gray-200 border-t-[#027B7A] rounded-full animate-spin"></div>
                        <FaBalanceScale className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#027B7A] text-2xl" />
                    </div>
                    <p className="mt-6 text-gray-600 font-medium animate-pulse">
                        Loading service details...
                    </p>
                </div>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md mx-4">
                    <div className="text-7xl mb-6">🔍</div>
                    <h2 className="text-3xl font-playfair font-bold mb-4 text-gray-900">
                        Service Not Found
                    </h2>
                    <p className="text-gray-600 mb-8">
                        The service you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 bg-[#027B7A] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#025c5c] transition shadow-lg"
                    >
                        <FaArrowLeft /> Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Premium Hero Section with Image */}
            <section className="relative overflow-hidden mt-40">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src={getImageUrl()}
                        alt={service.title}
                        className="w-full h-full object-cover object-top"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/90"></div> */}
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div> */}
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-20 py-16 md:py-24 lg:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 text-[#ECF7FF] hover:text-white transition mb-8 group"
                        >
                            <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-[#027B7A] transition">
                                <FaArrowLeft className="text-sm" />
                            </span>
                            <span className="font-medium">Back to All Services</span>
                        </Link>

                        <div className="max-w-3xl">
                            {/* Category Badge */}
                            {service.category && (
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/20 backdrop-blur-sm mb-6">
                                    <FaStar className="text-[#ECF7FF] text-xs" />
                                    <span className="text-white text-xs font-semibold uppercase tracking-wider">
                                        {service.category}
                                    </span>
                                </div>
                            )}

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-6 leading-tight">
                                {service.title}
                            </h1>

                            {/* Short Description */}
                            <div className="border-l-4 border-[#027B7A] pl-6 mb-8">
                                <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                                    {service.shortDescription ||
                                        service.description ||
                                        "Expert legal assistance tailored to your needs. Our experienced attorneys provide comprehensive guidance and representation."}
                                </p>
                            </div>

                            {/* Quick Info Tags */}
                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                    <FaRegClock className="text-[#027B7A]" />
                                    <span>Response within 24h</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/80 text-sm">
                                    <FaShieldAlt className="text-[#027B7A]" />
                                    <span>100% Confidential</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#027B7A]/10 flex items-center justify-center mx-auto mb-3 text-[#027B7A] text-xl group-hover:bg-[#027B7A] group-hover:text-white transition-all duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-gray-500 text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                {/* Service Specific Image */}
                                {service.image && (
                                    <div className="relative h-64 md:h-80 overflow-hidden">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </div>
                                )}
                                <div className="p-6 md:p-8 lg:p-10">
                                    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-playfair prose-p:text-gray-600 prose-strong:text-[#027B7A] prose-li:text-gray-600">
                                        <div
                                            dangerouslySetInnerHTML={{ __html: service.content }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Features Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <div className="w-1 h-7 bg-[#027B7A] rounded-full"></div>
                                    Why Choose This Service?
                                </h3>
                                <div className="space-y-4">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 group">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#027B7A]/10 to-[#ECF7FF] flex items-center justify-center text-[#027B7A] text-lg group-hover:scale-110 transition-transform">
                                                {feature.icon}
                                            </div>
                                            <span className="text-gray-700 font-medium">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits Card */}
                            <div
                                className="relative overflow-hidden rounded-2xl p-6 shadow-xl"
                                style={{
                                    background: "linear-gradient(135deg, #027B7A 0%, #004d4d 100%)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

                                <h3 className="text-xl font-playfair font-bold text-white mb-5">
                                    What You Get
                                </h3>
                                <ul className="space-y-3">
                                    {[
                                        "Expert legal consultation",
                                        "Personalized case strategy",
                                        "Regular case updates",
                                        "Transparent pricing",
                                        "Dedicated support team",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                <FaCheck className="text-white text-xs" />
                                            </div>
                                            <span className="text-white/90 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Card */}
                            <div
                                className="relative overflow-hidden rounded-2xl p-6 shadow-xl"
                                style={{
                                    background: "linear-gradient(135deg, #ECF7FF 0%, #d4eaf5 100%)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#027B7A]/5 rounded-full blur-2xl"></div>

                                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-3">
                                    Ready to Get Started?
                                </h3>
                                <p className="text-gray-600 text-sm mb-5">
                                    Schedule your consultation with our expert lawyers today.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        to="/booking"
                                        className="group flex items-center justify-between bg-[#027B7A] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#025c5c] transition shadow-md"
                                    >
                                        <span>Book Consultation</span>
                                        <FaChevronRight className="group-hover:translate-x-1 transition" />
                                    </Link>

                                    <Link
                                        to="/contact"
                                        className="flex items-center justify-center gap-2 bg-white text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition border border-gray-200"
                                    >
                                        <FaEnvelope /> Send Message
                                    </Link>

                                    <a
                                        href="tel:+8801712245511"
                                        className="flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition"
                                    >
                                        <FaPhone /> Call Now: +880 1712245511
                                    </a>
                                </div>
                            </div>

                            {/* Service Highlights */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-lg font-playfair font-bold text-gray-900 mb-4">
                                    Service Highlights
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-500 text-sm">Duration</span>
                                        <span className="text-gray-900 font-medium text-sm">
                                            60-90 mins
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-500 text-sm">Response Time</span>
                                        <span className="text-gray-900 font-medium text-sm">
                                            Within 24h
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                        <span className="text-gray-500 text-sm">Support</span>
                                        <span className="text-gray-900 font-medium text-sm">
                                            24/7 Available
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-500 text-sm">Language</span>
                                        <span className="text-gray-900 font-medium text-sm">
                                            Bengali & English
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Premium FAQ Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-4">
                            <FaStar className="text-[#027B7A] text-xs" />
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                FAQ
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-3">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-20 h-1 bg-[#027B7A] mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            {
                                q: "How long does the process take?",
                                a: "Timeline varies based on case complexity. We'll provide a realistic estimate during consultation.",
                            },
                            {
                                q: "What are the costs involved?",
                                a: "We offer transparent pricing with flexible payment options. Details shared after initial consultation.",
                            },
                            {
                                q: "Is my information confidential?",
                                a: "Absolutely. Attorney-client privilege ensures complete confidentiality of all communications.",
                            },
                            {
                                q: "Can I get a free consultation?",
                                a: "Yes, we offer a 15-minute free phone consultation for preliminary case evaluation.",
                            },
                        ].map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100"
                            >
                                <h4 className="font-playfair font-bold text-gray-900 mb-2 flex items-start gap-3">
                                    <span className="text-[#027B7A] text-xl">Q:</span>
                                    <span>{faq.q}</span>
                                </h4>
                                <p className="text-gray-600 pl-9">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServiceDetail;
