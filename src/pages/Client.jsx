import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaBuilding, FaUserTie, FaHandshake } from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";

const Client = () => {
    const clients = [
        {
            id: 1,
            name: "Md. Shahidul Islam",
            position: "Managing Director",
            company: "Shahidul Group",
            category: "Corporate",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop",
            testimonial:
                "Jamil Law Consultant has been our trusted legal partner for over 5 years. Their expertise in corporate law is unmatched.",
            rating: 5,
            case: "Corporate Merger",
        },
        {
            id: 2,
            name: "Farhana Ahmed",
            position: "CEO",
            company: "Tech Solutions Ltd.",
            category: "Tech",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
            testimonial:
                "They handled our intellectual property case with utmost professionalism. Highly recommended!",
            rating: 5,
            case: "IP Rights",
        },
        {
            id: 3,
            name: "Rashed Karim",
            position: "Owner",
            company: "Karim Real Estate",
            category: "Real Estate",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            testimonial:
                "The team at Jamil Law helped us resolve a complex property dispute efficiently and effectively.",
            rating: 5,
            case: "Property Dispute",
        },
        {
            id: 4,
            name: "Nasrin Sultana",
            position: "Director",
            company: "Sultana Enterprises",
            category: "Business",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop",
            testimonial:
                "Excellent service and attention to detail. They truly care about their clients.",
            rating: 5,
            case: "Business Registration",
        },
        {
            id: 5,
            name: "Abdul Mannan",
            position: "Chairman",
            company: "Mannan Group",
            category: "Corporate",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            testimonial:
                "Their strategic approach to litigation saved our company millions. Forever grateful.",
            rating: 5,
            case: "Civil Litigation",
        },
        {
            id: 6,
            name: "Tahmina Begum",
            position: "Entrepreneur",
            company: "Tahmina Fashion",
            category: "Small Business",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop",
            testimonial:
                "They made the legal process easy to understand and stress-free. Wonderful experience!",
            rating: 5,
            case: "Contract Review",
        },
    ];

    const clientStats = [
        { number: "10,000+", label: "Happy Clients", icon: <FaUserTie /> },
        { number: "500+", label: "Corporate Clients", icon: <FaBuilding /> },
        { number: "95%", label: "Satisfaction Rate", icon: <FaHandshake /> },
    ];

    return (
        <div className="bg-white">
            <PageHeader title="Our Clients" path="Our Clients" />

            {/* Client Success Stories */}
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
                                Success Stories
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            What Our <span className="text-[#027B7A]">Clients</span> Say
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Real stories from real people — because behind every case is a human
                            story
                        </p>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto mt-6 rounded-full" />
                    </motion.div>

                    {/* Client Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {clients.map((client, index) => (
                            <motion.div
                                key={client.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden group"
                            >
                                <div className="p-6">
                                    {/* Quote Icon */}
                                    <FaQuoteLeft className="text-[#027B7A]/20 text-3xl mb-4" />

                                    {/* Testimonial */}
                                    <p className="text-gray-700 leading-relaxed mb-6 italic">
                                        "{client.testimonial}"
                                    </p>

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-6">
                                        {[...Array(client.rating)].map((_, i) => (
                                            <FaStar key={i} className="text-yellow-400 text-sm" />
                                        ))}
                                    </div>

                                    {/* Client Info */}
                                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                        <img
                                            src={client.image}
                                            alt={client.name}
                                            className="w-14 h-14 rounded-full object-cover ring-2 ring-[#027B7A]/20"
                                        />
                                        <div>
                                            <h3 className="font-bold text-gray-900">
                                                {client.name}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {client.position}, {client.company}
                                            </p>
                                            <div className="inline-block mt-1 px-2 py-0.5 bg-[#027B7A]/10 rounded-full text-xs text-[#027B7A] font-medium">
                                                {client.case}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Client Stats */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#ECF7FF] to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {clientStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 bg-white rounded-2xl shadow-lg"
                            >
                                <div className="w-16 h-16 rounded-full bg-[#027B7A]/10 flex items-center justify-center mx-auto mb-4 text-[#027B7A] text-2xl">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bold text-[#027B7A] mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center"
                    >
                        <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-8">
                            Trusted By Leading Organizations
                        </h3>
                        <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                            <div className="text-2xl font-bold text-gray-400">Bangladesh Bank</div>
                            <div className="text-2xl font-bold text-gray-400">Grameenphone</div>
                            <div className="text-2xl font-bold text-gray-400">
                                Dutch-Bangla Bank
                            </div>
                            <div className="text-2xl font-bold text-gray-400">BEXIMCO</div>
                            <div className="text-2xl font-bold text-gray-400">Square Group</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Become a Client CTA */}
            <section className="py-16 md:py-24 bg-[#027B7A]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
                            Become Our Next Success Story
                        </h2>
                        <p className="text-[#ECF7FF] text-lg mb-8 max-w-2xl mx-auto">
                            Join thousands of satisfied clients who trust us with their legal
                            matters
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
                        <p className="text-white/70 text-sm mt-6">Consultation fee: 5,000 BDT</p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Client;
