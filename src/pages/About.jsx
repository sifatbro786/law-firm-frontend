import { motion } from "framer-motion";
import {
    FaGavel,
    FaHandshake,
    FaBalanceScale,
    FaGlobe,
    FaUserTie,
    FaAward,
    FaUsers,
    FaClock,
    FaQuoteLeft,
} from "react-icons/fa";
import UserImage from "/jamil2.jpeg";
import PageHeader from "../components/ui/PageHeader";

const About = () => {
    const values = [
        {
            icon: <FaGavel />,
            title: "Excellence",
            description:
                "We strive for excellence in every case we handle, providing top-tier legal representation.",
        },
        {
            icon: <FaHandshake />,
            title: "Integrity",
            description:
                "We operate with complete transparency and ethical practices in all our dealings.",
        },
        {
            icon: <FaBalanceScale />,
            title: "Justice",
            description:
                "We are committed to upholding justice and protecting our clients fundamental rights.",
        },
        {
            icon: <FaGlobe />,
            title: "Accessibility",
            description: "Making quality legal services accessible to all segments of society.",
        },
    ];

    const milestones = [
        { year: "2001", title: "Founded", description: "Started with 2 passionate attorneys" },
        { year: "2008", title: "Expanded", description: "Opened second office in Dhaka" },
        { year: "2015", title: "Grew Team", description: "Reached 10+ expert lawyers" },
        { year: "2024", title: "Leadership", description: "Over 10k+ clients served" },
    ];

    return (
        <div className="overflow-hidden bg-white">
            {/* Hero Section with Premium Design */}
            <PageHeader title="About Us" path="About" />

            {/* Our Story - Premium */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                                <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                    Who We Are
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-6">
                                More Than Just{" "}
                                <span className="text-[#027B7A]">Legal Advisors</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Founded in 2001, Jamil Law Consultant began with a simple yet
                                    powerful vision: to provide exceptional legal services with
                                    unwavering integrity and dedication to justice. What started as
                                    a small practice with two passionate attorneys has grown into
                                    one of Bangladesh's premier law consultants.
                                </p>
                                <p>
                                    Over the years, we have successfully handled thousands of cases
                                    across various practice areas, from complex corporate disputes
                                    to sensitive family matters. Our growth is a testament to the
                                    trust our clients place in us and our commitment to achieving
                                    the best possible outcomes.
                                </p>
                                <p>
                                    Today, we are proud to have a team of experienced attorneys,
                                    supported by skilled paralegals and support staff, all working
                                    together to provide comprehensive legal solutions to individuals
                                    and businesses across Bangladesh.
                                </p>
                            </div>

                            {/* Founder Quote */}
                            <div className="mt-8 p-6 bg-[#ECF7FF] rounded-2xl border-l-4 border-[#027B7A]">
                                <FaQuoteLeft className="text-[#027B7A]/20 text-3xl mb-3" />
                                <p className="text-gray-700 italic leading-relaxed">
                                    "Every client who walks through our door deserves not just legal
                                    expertise, but genuine care and understanding. That's the
                                    foundation of everything we do."
                                </p>
                                <p className="mt-3 font-semibold text-gray-900">
                                    — Advocate Ahmed Nowshed Jamil
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={UserImage}
                                    alt="Jamil Law Consultant Team"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            </div>
                            {/* Experience Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#027B7A] flex items-center justify-center">
                                    <FaAward className="text-white text-xl" />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#027B7A]">25+</div>
                                    <div className="text-xs text-gray-500">Years of Excellence</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values - Premium Cards */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Our Principles
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            What Drives Us
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            The core values that guide every decision we make
                        </p>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto mt-6 rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                            >
                                <div className="w-16 h-16 rounded-xl bg-[#027B7A]/10 group-hover:bg-[#027B7A] transition-all duration-300 flex items-center justify-center mb-6">
                                    <div className="text-2xl text-[#027B7A] group-hover:text-white transition-all duration-300">
                                        {value.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Milestones Timeline */}
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
                                Our Journey
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                            Milestones That Define Us
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            A journey of dedication, growth, and unwavering commitment to justice
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative text-center group"
                            >
                                <div className="text-4xl font-playfair font-bold text-[#027B7A] mb-3">
                                    {milestone.year}
                                </div>
                                <div className="w-12 h-0.5 bg-[#027B7A] mx-auto my-3 group-hover:w-16 transition-all duration-300" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {milestone.title}
                                </h3>
                                <p className="text-gray-500 text-sm">{milestone.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us - Premium Stats */}
            <section className="py-16 md:py-24 bg-[#ECF7FF]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white mb-6">
                                <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                    Why Choose Us
                                </span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-6">
                                Trusted by Thousands Across{" "}
                                <span className="text-[#027B7A]">Bangladesh</span>
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <FaUsers className="text-[#027B7A]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">
                                            10,000+ Happy Clients
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Trusted by individuals and businesses across the country
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <FaAward className="text-[#027B7A]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">
                                            95% Success Rate
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Proven track record of favorable outcomes
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <FaClock className="text-[#027B7A]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">
                                            24/7 Legal Support
                                        </h3>
                                        <p className="text-gray-600 text-sm">
                                            Always available when you need us most
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                <div className="text-4xl font-bold text-[#027B7A] mb-2">25+</div>
                                <div className="text-gray-600 text-sm">Years Experience</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg transform translate-y-4">
                                <div className="text-4xl font-bold text-[#027B7A] mb-2">6+</div>
                                <div className="text-gray-600 text-sm">Expert Lawyers</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
                                <div className="text-4xl font-bold text-[#027B7A] mb-2">10k+</div>
                                <div className="text-gray-600 text-sm">Clients Served</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 text-center shadow-lg transform translate-y-4">
                                <div className="text-4xl font-bold text-[#027B7A] mb-2">95%</div>
                                <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section - Premium */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-gradient-to-br from-[#027B7A] to-[#025c5c] rounded-3xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <svg
                                className="absolute top-0 right-0 w-64 h-64 text-white"
                                fill="currentColor"
                                viewBox="0 0 200 200"
                            >
                                <path d="M100,0 L120,30 L155,20 L145,55 L175,70 L145,85 L155,120 L120,110 L100,140 L80,110 L45,120 L55,85 L25,70 L55,55 L45,20 L80,30 Z" />
                            </svg>
                        </div>

                        <div className="relative z-10 py-12 md:py-16 px-6 md:px-12 text-center">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
                                Ready to Work With Us?
                            </h2>
                            <p className="text-[#ECF7FF] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                                Let our experienced team help you with your legal matters. Behind
                                every case is a human story — let's hear yours.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/booking"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#027B7A] rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Book Consultation <span className="text-lg">→</span>
                                </a>
                                <a
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-[#027B7A] transition-all duration-300"
                                >
                                    Contact Us
                                </a>
                            </div>
                            <p className="text-white/70 text-sm mt-6">
                                Consultation fee: 5,000 BDT
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
