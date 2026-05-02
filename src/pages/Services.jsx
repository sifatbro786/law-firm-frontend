// Services.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../components/ui/ServiceCard";
import api from "../utils/api";
import { FaArrowRight, FaGavel } from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get("/api/services");
            setServices(response.data);
        } catch (error) {
            console.error("Error fetching services:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="text-center">
                    <div className="w-20 h-20 border-4 border-gray-200 border-t-[#027B7A] rounded-full animate-spin"></div>
                    <p className="mt-6 text-gray-600 font-medium animate-pulse">
                        Loading services...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            {/* Premium Hero Section */}
            <PageHeader title="Services" path="Services" />

            {/* Services Grid Section */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-white to-[#ECF7FF]/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12 md:mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-4">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Practice Areas
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            What We Offer
                        </h2>
                        <div className="w-20 h-1 bg-[#027B7A] mx-auto rounded-full"></div>
                        <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                            Explore our wide range of legal services designed to protect your rights
                            and interests
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Consultation CTA */}
            <section className="overflow-hidden py-16 md:py-24 bg-[#027B7A]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
                                Need a Specific Legal Service?
                            </h2>
                            <p className="text-gray-300 text-lg max-w-2xl">
                                Contact us to discuss how we can help with your legal matter. Our
                                expert team is ready to assist you.
                            </p>
                        </div>
                        <Link
                            to="/booking"
                            className="group bg-white text-secondary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:shadow-2xl transition-all duration-300 flex items-center gap-2 text-lg"
                        >
                            Book Free Consultation
                            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
