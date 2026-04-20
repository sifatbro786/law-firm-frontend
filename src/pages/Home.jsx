import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/ui/HeroSection";
import ServiceCard from "../components/ui/ServiceCard";
import AttorneyCard from "../components/ui/AttorneyCard";
import Testimonials from "../components/ui/Testimonials";
import FAQAccordion from "../components/ui/FAQAccordion";
import CaseStudiesCard from "../components/ui/CaseStudiesCard";
import faqImage from "/faq.png";
import api from "../utils/api";
import { faqs } from "../data/faqs";
import ProfileSection from "../components/ui/ProfileSection";
import { GiBoltEye, GiDiceTarget } from "react-icons/gi";
import { LucideScanEye } from "lucide-react";
import { FaGripfire } from "react-icons/fa";

const Home = () => {
    const [services, setServices] = useState([]);
    const [attorneys, setAttorneys] = useState([]);
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const [servicesRes, attorneysRes, caseStudiesRes] = await Promise.all([
                api.get("/api/services"),
                api.get("/api/attorneys"),
                api.get("/api/case-studies?limit=3"),
                api.get("/api/case-studies?limit=3"),
            ]);

            setServices(servicesRes.data.slice(0, 3));
            setAttorneys(attorneysRes.data.slice(0, 3));
            setCaseStudies(caseStudiesRes.data.slice(0, 3));
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
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto"></div>
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
            <section className="py-20 bg-gray-50">
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

            {/* About Section - Modern Redesign */}
            <section className="py-20 bg-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-40 right-20 w-64 h-64 bg-secondary rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-80 h-80 bg-secondary rounded-full filter blur-3xl"></div>
                </div>

                <div className="container-custom relative z-10">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <span className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                            Why Trust Us
                        </span>
                        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-4">
                            Why Choose <span className="text-secondary">Jamil's Law Consultant?</span>
                        </h2>
                        <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto mt-4">
                            We combine legal expertise with unwavering commitment to deliver the
                            best outcomes for our clients
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Side - Stats & Features */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <div className="space-y-8">
                                {/* Feature 1 */}
                                <div className="group flex gap-5 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-primary font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        15+
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-playfair font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                            Years of Excellence
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            With over two decades of legal practice, we've mastered
                                            the art of navigating Bangladesh's complex legal system
                                            efficiently.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 2 */}
                                <div className="group flex gap-5 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-primary font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        500+
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-playfair font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                            Successful Cases
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Our proven track record speaks volumes about our
                                            dedication and expertise in handling diverse legal
                                            matters.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 3 */}
                                <div className="group flex gap-5 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-primary font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        24/7
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-playfair font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                            Round-the-Clock Support
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Legal emergencies don't wait, and neither do we. Our
                                            team is available 24/7 to provide immediate legal
                                            assistance.
                                        </p>
                                    </div>
                                </div>

                                {/* Feature 4 */}
                                <div className="group flex gap-5 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-primary font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                        100%
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-playfair font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                            Client Satisfaction
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Our commitment to excellence has earned us the trust and
                                            satisfaction of thousands of clients across Bangladesh.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10">
                                <Link
                                    to="/about"
                                    className="btn-primary inline-flex items-center gap-2 group"
                                >
                                    Learn More About Us
                                    <span className="group-hover:translate-x-1 transition-transform">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </motion.div>

                        {/* Right Side - Mission & Vision Cards */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                            className="space-y-8"
                        >
                            {/* Mission Card */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/50 rounded-2xl transform rotate-2 group-hover:rotate-3 transition duration-300 opacity-20"></div>
                                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                                            <GiDiceTarget />
                                        </div>
                                        <h3 className="text-2xl font-playfair font-bold text-primary">
                                            Our Mission
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        To provide accessible, expert, and ethical legal services
                                        that protect our clients' rights and interests with
                                        unwavering integrity and dedication.
                                    </p>
                                    <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
                                        <span>✓ Justice for All</span>
                                        <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                        <span>✓ Client First</span>
                                        <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                        <span>✓ Excellence</span>
                                    </div>
                                </div>
                            </div>

                            {/* Vision Card */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/50 rounded-2xl transform -rotate-2 group-hover:-rotate-3 transition duration-300 opacity-20"></div>
                                <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                                            <LucideScanEye />
                                        </div>
                                        <h3 className="text-2xl font-playfair font-bold text-primary">
                                            Our Vision
                                        </h3>
                                    </div>
                                    <p className="text-gray-700 leading-relaxed mb-4">
                                        To be Bangladesh's most trusted and respected law consultant,
                                        setting new benchmarks in legal excellence and client
                                        service while contributing to a just society.
                                    </p>
                                    <div className="flex items-center gap-2 text-secondary text-sm font-semibold">
                                        <span className="flex gap-1 items-center">
                                            <FaGripfire size={22} /> Excellence
                                        </span>
                                        <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                        <span className="flex gap-1 items-center">
                                            <FaGripfire size={22} /> Innovation
                                        </span>
                                        <span className="w-1 h-1 bg-secondary rounded-full"></span>
                                        <span className="flex gap-1 items-center">
                                            <FaGripfire size={22} /> Integrity
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badge */}
                            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 text-center text-white shadow-xl">
                                <div className="flex items-center justify-center gap-6 flex-wrap">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-secondary">98%</div>
                                        <div className="text-sm opacity-90">Success Rate</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/20"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-secondary">
                                            500+
                                        </div>
                                        <div className="text-sm opacity-90">Happy Clients</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/20"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-secondary">15+</div>
                                        <div className="text-sm opacity-90">Expert Lawyers</div>
                                    </div>
                                    <div className="w-px h-10 bg-white/20"></div>
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-secondary">
                                            24/7
                                        </div>
                                        <div className="text-sm opacity-90">Support Available</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Attorneys Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                            Meet Our Attorneys
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experienced legal professionals dedicated to your success
                        </p>
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {attorneys.map((attorney, index) => (
                            <motion.div key={attorney._id} variants={fadeInUp}>
                                <AttorneyCard attorney={attorney} />
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
                        <Link to="/attorneys" className="btn-outline">
                            View All Attorneys →
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <Testimonials />

            {/* Case Studies Section */}
            <section className="py-20 bg-white">
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
            </section>

            {/* FAQ Preview Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-600 mb-5 sm:mb-10">
                                Find answers to common questions about our legal services and
                                processes
                            </p>

                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <FAQAccordion faqs={faqs.slice(0, 4)} />
                            </motion.div>
                        </motion.div>

                        <img
                            src={faqImage}
                            alt="Frequently Asked Questions"
                            className="w-auto h-auto object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                            Need Legal Assistance?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Schedule a consultation with our experienced attorneys today
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/booking"
                                className="btn-primary bg-secondary text-primary hover:bg-opacity-90"
                            >
                                Book Consultation
                            </Link>
                            <Link
                                to="/contact"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-secondary">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                50+
                            </div>
                            <div className="text-primary font-semibold">Cases Won</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                100+
                            </div>
                            <div className="text-primary font-semibold">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                10+
                            </div>
                            <div className="text-primary font-semibold">Years Experience</div>
                        </div>
                        <div>
                            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                                5+
                            </div>
                            <div className="text-primary font-semibold">Expert Lawyers</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
