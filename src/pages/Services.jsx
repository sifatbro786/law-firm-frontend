import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../components/ui/ServiceCard";
import api from "../utils/api";

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary"></div>
            </div>
        );
    }

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
                            Our Legal Services
                        </h1>
                        <p className="text-lg text-gray-300">
                            We offer comprehensive legal solutions across multiple practice areas,
                            tailored to meet your specific needs and circumstances.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-10 sm:py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

            {/* Consultation CTA */}
            <section className="py-10 sm:py-20 bg-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                        Need a Specific Legal Service?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Contact us to discuss how we can help with your legal matter
                    </p>
                    <Link to="/booking" className="btn-primary bg-secondary text-primary">
                        Book Free Consultation
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
