import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaUserTie, FaHandshake, FaStar, FaStarHalf } from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";
import api, { getImageUrl } from "../utils/api";

const Client = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get("/api/clients");
            setClients(response.data);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
            setClients([]);
        } finally {
            setLoading(false);
        }
    };

    // Stats from API or default
    const clientStats = [
        { number: "10,000+", label: "Happy Clients", icon: <FaUserTie /> },
        { number: "500+", label: "Corporate Clients", icon: <FaBuilding /> },
        { number: "95%", label: "Satisfaction Rate", icon: <FaHandshake /> },
    ];

    // Client testimonials
    const testimonials = [
        {
            id: 1,
            name: "Md. Kamal Hossain",
            position: "CEO, ABC Corporation",
            rating: 5,
            text: "Exceptional legal service! The team provided outstanding support throughout our case. Highly recommended.",
            image: null,
        },
        {
            id: 2,
            name: "Nadia Rahman",
            position: "Director, XYZ Ltd",
            rating: 5,
            text: "Professional, responsive, and highly knowledgeable. They handled our corporate matters with great expertise.",
            image: null,
        },
        {
            id: 3,
            name: "Abul Hasan",
            position: "Managing Partner, Hasan Group",
            rating: 4.5,
            text: "Very satisfied with their legal consultation. They understand business needs perfectly.",
            image: null,
        },
    ];

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
        }
        if (hasHalfStar) {
            stars.push(<FaStarHalf key="half" className="text-yellow-400 w-4 h-4" />);
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 py-16 max-w-7xl">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#027B7A]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <PageHeader title="Our Clients" path="Our Clients" />

            {/* Our Valued Clients Section - Dynamic from Database */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Our Valued Partners
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            Brands That <span className="text-[#027B7A]">Trust Us</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We are proud to serve these distinguished organizations
                        </p>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto mt-6 rounded-full" />
                    </motion.div>

                    {clients.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
                            {clients.map((client, index) => (
                                <motion.div
                                    key={client._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 10) * 0.03 }}
                                    whileHover={{ y: -8 }}
                                    className="group"
                                >
                                    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#027B7A]/20">
                                        <div className="flex justify-center items-center h-24">
                                            {client.brandImage ? (
                                                <img
                                                    src={getImageUrl(client.brandImage)}
                                                    alt={client.brandName}
                                                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#027B7A]/10 to-[#027B7A]/5 flex items-center justify-center">
                                                    <FaBuilding className="text-[#027B7A] text-3xl" />
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-center font-semibold text-gray-800 mt-4 group-hover:text-[#027B7A] transition">
                                            {client.brandName}
                                        </h3>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🤝</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No Clients Added Yet
                            </h3>
                            <p className="text-gray-500">
                                Client list will be updated by the admin soon.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Client Stats Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#ECF7FF] to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                            Our <span className="text-[#027B7A]">Impact</span> in Numbers
                        </h2>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clientStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#027B7A]/10 to-[#027B7A]/5 flex items-center justify-center mx-auto mb-5 text-[#027B7A] text-3xl group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <div className="text-4xl md:text-5xl font-bold text-[#027B7A] mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 font-medium text-lg">
                                        {stat.label}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Testimonials */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Client Testimonials
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            What Our <span className="text-[#027B7A]">Clients Say</span>
                        </h2>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto mt-6 rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center gap-1 mb-4">
                                    {renderStars(testimonial.rating)}
                                    <span className="text-gray-500 text-sm ml-2">
                                        {testimonial.rating}
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4 leading-relaxed">
                                    "{testimonial.text}"
                                </p>
                                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#027B7A] to-[#1A9E9C] flex items-center justify-center text-white font-bold">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {testimonial.position}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Become a Client CTA */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-[#027B7A] to-[#1A9E9C] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                            Become Our Next Success Story
                        </h2>
                        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied clients who trust us with their legal
                            matters. We're here to help you succeed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/booking"
                                className="px-8 py-3 bg-white text-[#027B7A] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                Book Consultation
                            </a>
                            <a
                                href="/contact"
                                className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#027B7A] transition-all duration-300"
                            >
                                Contact Us
                            </a>
                        </div>
                        <p className="text-white/70 text-sm mt-6">
                            Initial consultation: 5,000 BDT (Online)
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Client;
