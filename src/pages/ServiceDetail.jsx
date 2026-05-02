// ServiceDetail.jsx - Premium, Clean, Killer Design
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
    FaUsers,
    FaMedal,
    FaBuilding,
} from "react-icons/fa";
import api, { getImageUrl } from "../utils/api";
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
        {
            icon: <FaHandshake />,
            text: "Dedicated Legal Team",
            description: "Experienced professionals",
        },
        {
            icon: <FaShieldAlt />,
            text: "100% Confidential",
            description: "Attorney-client privilege",
        },
        { icon: <FaClock />, text: "Timely Resolution", description: "Efficient case handling" },
        { icon: <FaAward />, text: "Proven Track Record", description: "25+ years of excellence" },
    ];

    const stats = [
        { value: "25+", label: "Years Experience", icon: <FaStar /> },
        { value: "10000+", label: "Cases Won", icon: <FaMedal /> },
        { value: "95%", label: "Success Rate", icon: <FaUsers /> },
        { value: "5+", label: "Expert Lawyers", icon: <FaBuilding /> },
    ];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-gray-200 border-t-[#027B7A] rounded-full animate-spin"></div>
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
            <PageHeader title={service.title} path={service.slug} />

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
            <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
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
                                    <div className="relative h-72 md:h-96 overflow-hidden">
                                        <img
                                            src={getImageUrl(service.image)}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#027B7A] text-xs font-semibold">
                                                <FaBalanceScale className="text-xs" />
                                                {service.category || "Legal Service"}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="p-6 md:p-8 lg:p-10">
                                    {/* Description Section */}
                                    <div className="mb-8 pb-8 border-b border-gray-100">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="w-1 h-6 bg-[#027B7A] rounded-full"></div>
                                            <h2 className="text-xl font-playfair font-bold text-gray-900">
                                                About This Service
                                            </h2>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Rich Content */}
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
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-5 flex items-center gap-2">
                                    <div className="w-1 h-7 bg-[#027B7A] rounded-full"></div>
                                    Why Choose This Service?
                                </h3>
                                <div className="space-y-5">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 group">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#027B7A]/10 to-[#ECF7FF] flex items-center justify-center text-[#027B7A] text-lg group-hover:scale-110 transition-transform flex-shrink-0">
                                                {feature.icon}
                                            </div>
                                            <div>
                                                <span className="text-gray-900 font-semibold block">
                                                    {feature.text}
                                                </span>
                                                <span className="text-gray-500 text-xs">
                                                    {feature.description}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits Card */}
                            <div
                                className="relative overflow-hidden rounded-2xl p-6 shadow-xl group"
                                style={{
                                    background: "linear-gradient(135deg, #027B7A 0%, #004d4d 100%)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

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
                                        <li
                                            key={index}
                                            className="flex items-center gap-3 group/item"
                                        >
                                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover/item:bg-white/30 transition">
                                                <FaCheck className="text-white text-xs" />
                                            </div>
                                            <span className="text-white/90 text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Card */}
                            <div
                                className="relative overflow-hidden rounded-2xl p-6 shadow-xl group"
                                style={{
                                    background: "linear-gradient(135deg, #ECF7FF 0%, #d4eaf5 100%)",
                                }}
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#027B7A]/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-3">
                                    Ready to Get Started?
                                </h3>
                                <p className="text-gray-600 text-sm mb-5">
                                    Schedule your consultation with our expert lawyers today.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        to="/booking"
                                        className="group/link flex items-center justify-between bg-[#027B7A] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#025c5c] transition shadow-md"
                                    >
                                        <span>Book Consultation</span>
                                        <FaChevronRight className="group-hover/link:translate-x-1 transition" />
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
                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
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
            <section className="py-16 md:py-24 bg-gradient-to-b from-white to-[#ECF7FF]/20">
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
                        <div className="w-20 h-1 bg-gradient-to-r from-[#027B7A] to-[#025c5c] mx-auto rounded-full"></div>
                        <p className="text-gray-500 mt-4">
                            Find answers to common questions about {service.title}
                        </p>
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
                                className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <h4 className="font-playfair font-bold text-gray-900 mb-2 flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-[#027B7A]/10 flex items-center justify-center text-[#027B7A] text-xs font-bold flex-shrink-0 mt-0.5">
                                        Q
                                    </div>
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
