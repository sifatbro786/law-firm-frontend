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
} from "react-icons/fa";
import api from "../utils/api";

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
                        <FaBalanceScale className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-secondary text-2xl" />
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
                <div className="text-center bg-white p-8 md:p-10 rounded-2xl shadow-xl max-w-md mx-4">
                    <div className="text-6xl md:text-7xl mb-6">🔍</div>
                    <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4 text-primary">
                        Service Not Found
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-sm md:text-base">
                        The service you're looking for doesn't exist or has been moved.
                    </p>
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 bg-secondary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                        <FaArrowLeft className="text-sm" /> Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            {/* Enhanced Hero Section */}
            <section className="relative bg-gradient-to-br from-primary via-primary to-accent text-white py-20 md:py-28 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-20 left-10 w-64 md:w-80 h-64 md:h-80 bg-secondary rounded-full filter blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-72 md:w-96 h-72 md:h-96 bg-secondary rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/3 w-48 md:w-64 h-48 md:h-64 bg-white rounded-full filter blur-3xl opacity-20"></div>
                </div>

                <div className="container-custom relative z-10 px-4 md:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-2 md:gap-3 text-secondary hover:text-white transition mb-6 md:mb-8 group"
                        >
                            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition">
                                <FaArrowLeft className="text-xs md:text-sm" />
                            </span>
                            <span className="font-medium text-sm md:text-base">All Services</span>
                        </Link>

                        <h1 className="text-3xl md:text-5xl lg:text-7xl font-playfair font-bold mb-4 md:mb-6 leading-tight max-w-4xl">
                            {service.title}
                        </h1>

                        <p className="text-base md:text-xl text-gray-200 max-w-3xl leading-relaxed border-l-4 border-secondary pl-4 md:pl-6">
                            {service.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Section */}
            <section className="py-12 md:py-20">
                <div className="container-custom px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                        {/* Main Content - Rich Text Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 lg:p-10">
                                <div
                                    className="rich-text-content"
                                    dangerouslySetInnerHTML={{
                                        __html: service.content,
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-5 md:space-y-6"
                        >
                            {/* Why Choose Us Card */}
                            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-7 shadow-lg border border-gray-100 hover:shadow-xl transition">
                                <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-4 md:mb-5 flex items-center gap-2">
                                    <span className="w-1 h-6 md:h-8 bg-secondary rounded-full"></span>
                                    Why Choose Us?
                                </h3>
                                <div className="space-y-3 md:space-y-5">
                                    {features.map((feature, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-3 md:gap-4 group hover:bg-gray-50 p-2 rounded-xl transition"
                                        >
                                            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary bg-opacity-15 rounded-xl flex items-center justify-center text-secondary text-lg md:text-xl group-hover:bg-secondary group-hover:text-primary transition-all transform group-hover:scale-110">
                                                {feature.icon}
                                            </div>
                                            <span className="text-gray-700 font-medium text-sm md:text-base group-hover:text-primary transition">
                                                {feature.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Benefits Card */}
                            <div className="bg-gradient-to-br from-primary to-accent text-white rounded-xl md:rounded-2xl p-5 md:p-7 shadow-xl">
                                <h3 className="text-xl md:text-2xl font-playfair font-bold mb-4 md:mb-5">
                                    What You Get
                                </h3>
                                <ul className="space-y-3 md:space-y-4">
                                    {[
                                        "Expert legal consultation",
                                        "Personalized case strategy",
                                        "Regular case updates",
                                        "Transparent pricing",
                                        "Dedicated support team",
                                    ].map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2 md:gap-3"
                                        >
                                            <div className="w-5 h-5 md:w-6 md:h-6 bg-secondary rounded-full flex items-center justify-center text-primary text-xs md:text-sm flex-shrink-0">
                                                <FaCheck />
                                            </div>
                                            <span className="text-gray-100 text-sm md:text-base">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA Card */}
                            <div className="bg-secondary rounded-xl md:rounded-2xl p-5 md:p-7 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 md:w-40 h-32 md:h-40 bg-primary opacity-10 rounded-full -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-28 md:w-32 h-28 md:h-32 bg-primary opacity-10 rounded-full -ml-14 -mb-14"></div>

                                <div className="relative z-10">
                                    <h3 className="text-xl md:text-2xl font-playfair font-bold text-primary mb-2 md:mb-3">
                                        Need Legal Advice?
                                    </h3>
                                    <p className="text-primary mb-4 md:mb-6 opacity-90 text-sm md:text-base">
                                        Schedule your free consultation with our expert lawyers
                                        today.
                                    </p>

                                    <div className="space-y-2 md:space-y-3">
                                        <Link
                                            to="/booking"
                                            className="group bg-primary text-white px-5 md:px-6 py-3 md:py-3.5 rounded-xl font-semibold hover:bg-opacity-90 transition flex items-center justify-between shadow-md hover:shadow-lg text-sm md:text-base"
                                        >
                                            <span>Book Free Consultation</span>
                                            <FaChevronRight className="group-hover:translate-x-1 transition text-xs md:text-sm" />
                                        </Link>

                                        <Link
                                            to="/contact"
                                            className="flex items-center justify-center gap-2 md:gap-3 text-primary bg-white bg-opacity-20 hover:bg-opacity-30 py-2.5 md:py-3 rounded-xl font-medium transition text-sm md:text-base"
                                        >
                                            <FaEnvelope className="text-xs md:text-sm" /> Send
                                            Message
                                        </Link>

                                        <a
                                            href="tel:+8801234567890"
                                            className="flex items-center justify-center gap-2 md:gap-3 text-primary bg-white bg-opacity-20 hover:bg-opacity-30 py-2.5 md:py-3 rounded-xl font-medium transition text-sm md:text-base"
                                        >
                                            <FaPhone className="text-xs md:text-sm" /> Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Enhanced FAQ Section */}
            <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
                <div className="container-custom px-4 md:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8 md:mb-12"
                    >
                        <span className="text-secondary font-semibold text-xs md:text-sm uppercase tracking-wider">
                            Common Questions
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-primary mt-2 mb-3 md:mb-4">
                            Frequently Asked Questions
                        </h2>
                        <div className="w-20 md:w-24 h-1 bg-secondary mx-auto rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
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
                                className="bg-white rounded-xl md:rounded-2xl p-5 md:p-6 shadow-md hover:shadow-xl transition border border-gray-100 group"
                            >
                                <h4 className="font-playfair font-bold text-base md:text-lg text-primary mb-2 md:mb-3 flex items-start gap-2 md:gap-3">
                                    <span className="text-secondary text-lg md:text-xl mt-0.5 flex-shrink-0">
                                        Q:
                                    </span>
                                    <span className="group-hover:text-secondary transition">
                                        {faq.q}
                                    </span>
                                </h4>
                                <p className="text-gray-600 text-sm md:text-base leading-relaxed flex items-start gap-2 md:gap-3">
                                    <span className="text-primary font-bold text-lg md:text-xl mt-0.5 flex-shrink-0">
                                        A:
                                    </span>
                                    <span>{faq.a}</span>
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Rich Text Content Styling - Eta alada CSS file e rakha better */}
            <style>
                {`
                    .rich-text-content {
                        color: #374151;
                        line-height: 1.8;
                        word-wrap: break-word;
                    }
                    
                    /* Typography */
                    .rich-text-content h1 {
                        font-size: clamp(1.875rem, 5vw, 2.5rem);
                        font-weight: 700;
                        color: #1e3a5f;
                        margin-top: 2rem;
                        margin-bottom: 1.5rem;
                        font-family: 'Playfair Display', serif;
                        line-height: 1.3;
                    }
                    
                    .rich-text-content h2 {
                        font-size: clamp(1.5rem, 4vw, 2rem);
                        font-weight: 700;
                        color: #1e3a5f;
                        margin-top: 1.8rem;
                        margin-bottom: 1.2rem;
                        font-family: 'Playfair Display', serif;
                        border-left: 4px solid #d4a853;
                        padding-left: 1rem;
                        line-height: 1.3;
                    }
                    
                    .rich-text-content h3 {
                        font-size: clamp(1.25rem, 3.5vw, 1.5rem);
                        font-weight: 600;
                        color: #1e3a5f;
                        margin-top: 1.5rem;
                        margin-bottom: 1rem;
                        font-family: 'Playfair Display', serif;
                        line-height: 1.4;
                    }
                    
                    .rich-text-content h4 {
                        font-size: clamp(1.125rem, 3vw, 1.25rem);
                        font-weight: 600;
                        color: #1e3a5f;
                        margin-top: 1.25rem;
                        margin-bottom: 0.75rem;
                        font-family: 'Playfair Display', serif;
                    }
                    
                    .rich-text-content h5, 
                    .rich-text-content h6 {
                        font-weight: 600;
                        color: #1e3a5f;
                        margin-top: 1rem;
                        margin-bottom: 0.5rem;
                        font-family: 'Playfair Display', serif;
                    }
                    
                    /* Paragraphs and text */
                    .rich-text-content p {
                        margin-bottom: 1.2rem;
                        font-size: clamp(0.9375rem, 2vw, 1rem);
                    }
                    
                    /* Lists */
                    .rich-text-content ul, 
                    .rich-text-content ol {
                        margin: 1.2rem 0;
                        padding-left: 1.5rem;
                    }
                    
                    .rich-text-content li {
                        margin-bottom: 0.5rem;
                        font-size: clamp(0.9375rem, 2vw, 1rem);
                    }
                    
                    .rich-text-content ul li {
                        list-style-type: disc;
                    }
                    
                    .rich-text-content ol li {
                        list-style-type: decimal;
                    }
                    
                    .rich-text-content ul ul,
                    .rich-text-content ol ol,
                    .rich-text-content ul ol,
                    .rich-text-content ol ul {
                        margin: 0.5rem 0;
                    }
                    
                    /* Tables - RESPONSIVE */
                    .rich-text-content .table-wrapper {
                        overflow-x: auto;
                        margin: 1.5rem 0;
                        -webkit-overflow-scrolling: touch;
                    }
                    
                    .rich-text-content table {
                        width: 100%;
                        border-collapse: collapse;
                        margin: 1.5rem 0;
                        font-size: clamp(0.8125rem, 2vw, 0.95rem);
                        min-width: 600px;
                    }
                    
                    @media (max-width: 640px) {
                        .rich-text-content table {
                            min-width: 100%;
                            font-size: 0.8125rem;
                        }
                        
                        .rich-text-content table th,
                        .rich-text-content table td {
                            padding: 0.5rem !important;
                            white-space: normal !important;
                            word-break: break-word;
                        }
                    }
                    
                    .rich-text-content table thead {
                        background: linear-gradient(135deg, #1e3a5f, #2c5f7c);
                        color: white;
                    }
                    
                    .rich-text-content table th {
                        padding: 0.75rem 1rem;
                        text-align: left;
                        font-weight: 600;
                        white-space: nowrap;
                    }
                    
                    .rich-text-content table td {
                        padding: 0.75rem 1rem;
                        border: 1px solid #e5e7eb;
                    }
                    
                    .rich-text-content table tbody tr:nth-child(even) {
                        background-color: #f9fafb;
                    }
                    
                    .rich-text-content table tbody tr:hover {
                        background-color: #f3f4f6;
                    }
                    
                    /* Images - RESPONSIVE */
                    .rich-text-content img {
                        max-width: 100%;
                        height: auto;
                        border-radius: 0.75rem;
                        margin: 1.5rem 0;
                        display: block;
                    }
                    
                    @media (max-width: 640px) {
                        .rich-text-content img {
                            border-radius: 0.5rem;
                            margin: 1rem 0;
                        }
                    }
                    
                    /* Blockquotes */
                    .rich-text-content blockquote {
                        border-left: 4px solid #d4a853;
                        padding-left: 1.5rem;
                        margin: 1.5rem 0;
                        font-style: italic;
                        color: #4b5563;
                        font-size: clamp(0.9375rem, 2vw, 1rem);
                    }
                    
                    @media (max-width: 640px) {
                        .rich-text-content blockquote {
                            padding-left: 1rem;
                            margin: 1rem 0;
                        }
                    }
                    
                    /* Links */
                    .rich-text-content a {
                        color: #d4a853;
                        text-decoration: underline;
                        transition: color 0.2s;
                        word-break: break-word;
                    }
                    
                    .rich-text-content a:hover {
                        color: #1e3a5f;
                    }
                    
                    /* Strong and emphasis */
                    .rich-text-content strong {
                        color: #1e3a5f;
                        font-weight: 700;
                    }
                    
                    .rich-text-content em {
                        font-style: italic;
                    }
                    
                    /* Horizontal rule */
                    .rich-text-content hr {
                        margin: 2rem 0;
                        border: 0;
                        height: 1px;
                        background: linear-gradient(90deg, transparent, #d4a853, transparent);
                    }
                    
                    /* Code blocks */
                    .rich-text-content pre {
                        background: #f3f4f6;
                        padding: 1rem;
                        border-radius: 0.5rem;
                        overflow-x: auto;
                        margin: 1.5rem 0;
                        font-size: 0.875rem;
                    }
                    
                    .rich-text-content code {
                        background: #f3f4f6;
                        padding: 0.125rem 0.375rem;
                        border-radius: 0.25rem;
                        font-size: 0.875em;
                    }
                    
                    /* Mobile specific adjustments */
                    @media (max-width: 640px) {
                        .rich-text-content {
                            line-height: 1.7;
                        }
                        
                        .rich-text-content h1 {
                            margin-top: 1.5rem;
                            margin-bottom: 1rem;
                        }
                        
                        .rich-text-content h2 {
                            margin-top: 1.3rem;
                            margin-bottom: 1rem;
                            padding-left: 0.75rem;
                        }
                        
                        .rich-text-content h3 {
                            margin-top: 1.2rem;
                            margin-bottom: 0.75rem;
                        }
                        
                        .rich-text-content p {
                            margin-bottom: 1rem;
                        }
                        
                        .rich-text-content ul, 
                        .rich-text-content ol {
                            margin: 1rem 0;
                            padding-left: 1.25rem;
                        }
                    }
                    
                    /* Print styles */
                    @media print {
                        .rich-text-content {
                            color: #000;
                        }
                        
                        .rich-text-content a {
                            text-decoration: none;
                            color: #000;
                        }
                        
                        .rich-text-content table {
                            border: 1px solid #000;
                        }
                        
                        .rich-text-content table th,
                        .rich-text-content table td {
                            border: 1px solid #000;
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default ServiceDetail;
