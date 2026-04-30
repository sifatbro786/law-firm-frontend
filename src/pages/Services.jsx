// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import ServiceCard from "../components/ui/ServiceCard";
// import api from "../utils/api";

// const Services = () => {
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchServices();
//     }, []);

//     const fetchServices = async () => {
//         try {
//             const response = await api.get("/api/services");
//             setServices(response.data);
//         } catch (error) {
//             console.error("Error fetching services:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary"></div>
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* Hero Section */}
//             <section className="bg-gradient-to-r from-primary to-accent text-white py-10 sm:py-20">
//                 <div className="container-custom">
//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         className="max-w-3xl"
//                     >
//                         <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
//                             Our Legal Services
//                         </h1>
//                         <p className="text-lg text-gray-300">
//                             We offer comprehensive legal solutions across multiple practice areas,
//                             tailored to meet your specific needs and circumstances.
//                         </p>
//                     </motion.div>
//                 </div>
//             </section>

//             {/* Services Grid */}
//             <section className="py-10 sm:py-20 bg-gray-50">
//                 <div className="container-custom">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {services.map((service, index) => (
//                             <motion.div
//                                 key={service._id}
//                                 initial={{ opacity: 0, y: 30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                             >
//                                 <ServiceCard service={service} />
//                             </motion.div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* Consultation CTA */}
//             <section className="py-10 sm:py-20 bg-primary text-white">
//                 <div className="container-custom text-center">
//                     <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
//                         Need a Specific Legal Service?
//                     </h2>
//                     <p className="text-xl text-gray-300 mb-8">
//                         Contact us to discuss how we can help with your legal matter
//                     </p>
//                     <Link to="/booking" className="btn-primary bg-secondary text-primary">
//                         Book Free Consultation
//                     </Link>
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default Services;

// Services.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ServiceCard from "../components/ui/ServiceCard";
import api from "../utils/api";
import { FaArrowRight, FaStar, FaGavel, FaPhoneAlt, FaShieldAlt, FaClock } from "react-icons/fa";
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
                    <div className="relative">
                        <div className="w-20 h-20 border-4 border-gray-200 border-t-[#027B7A] rounded-full animate-spin"></div>
                        <FaGavel className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#027B7A] text-2xl" />
                    </div>
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
            <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#027B7A]/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#027B7A]/20 rounded-full blur-3xl"></div>
                </div>

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
                            className="group bg-gradient-to-r from-[#027B7A] to-[#025c5c] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-[#027B7A]/30 transition-all duration-300 flex items-center gap-2 text-lg"
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
