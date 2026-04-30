import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/ui/HeroSection";
import ServiceCard from "../components/ui/ServiceCard";
import Testimonials from "../components/ui/Testimonials";
// import CaseStudiesCard from "../components/ui/CaseStudiesCard";
import api from "../utils/api";
import ProfileSection from "../components/ui/ProfileSection";
import FAQSection from "../components/ui/FAQSection";
// import ServicesSection from "./ServicesSection";
import WhyChooseUs from "../components/ui/WhyChooseUs";
import AttorneysSection from "../components/ui/AttorneysSection";

const Home = () => {
    const [services, setServices] = useState([]);
    const [attorneys, setAttorneys] = useState([]);
    // const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const [servicesRes, attorneysRes, caseStudiesRes] = await Promise.all([
                api.get("/api/services"),
                api.get("/api/attorneys"),
                // api.get("/api/case-studies?limit=3"),
                api.get("/api/case-studies?limit=3"),
            ]);

            setServices(servicesRes.data.slice(0, 3));
            setAttorneys(attorneysRes.data.slice(0, 4));
            // setCaseStudies(caseStudiesRes.data.slice(0, 3));
        } catch (error) {
            console.error("Error fetching home data:", error);
        } finally {
            setLoading(false);
        }
    };
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#027B7A] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <HeroSection />

            {/* Profile Section - NEW */}
            <ProfileSection />

            {/* Services Section */}
            <section className="py-4 sm:py-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                            Our Legal Services
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide comprehensive legal solutions tailored to your specific needs
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {services.map((service, index) => (
                            <motion.div key={service._id} variants={fadeInUp}>
                                <ServiceCard service={service} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mt-12"
                    >
                        <Link to="/services" className="btn-outline">
                            View All Services →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* <ServicesSection /> */}

            {/* About Section - Modern Redesign */}
            <WhyChooseUs />

            {/* Attorneys Section */}
            <AttorneysSection attorneys={attorneys} />

            {/* Testimonials Section */}
            <Testimonials />

            {/* Case Studies Section */}
            {/* <section className="py-8 sm:py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                            Recent Case Studies
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Explore how we've successfully resolved complex legal matters for our
                            clients
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {caseStudies.map((caseStudy, index) => (
                            <motion.div key={caseStudy._id} variants={fadeInUp}>
                                <CaseStudiesCard caseStudy={caseStudy} />
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mt-12"
                    >
                        <Link to="/case-studies" className="btn-outline">
                            View All Case Studies →
                        </Link>
                    </motion.div>
                </div>
            </section> */}

            {/* FAQ Preview Section */}
            <FAQSection />
        </div>
    );
};

export default Home;
