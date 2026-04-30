import { motion } from "framer-motion";
import {
    FaArrowRight,
    FaBullseye,
    FaClock,
    FaEye,
    FaHandshake,
    FaHeart,
    FaMedal,
    FaShieldHeart,
    FaUserCheck,
} from "react-icons/fa6";
import { GiJusticeStar } from "react-icons/gi";
import { Link } from "react-router-dom";

const WhyChooseUs = () => {
    const features = [
        {
            number: "25+",
            title: "Years of Excellence",
            description: "Two decades of mastering Bangladesh's legal landscape",
            icon: <GiJusticeStar />,
            color: "#027B7A",
        },
        {
            number: "10k+",
            title: "Cases Won",
            description: "Thousands of successful legal battles fought",
            icon: <FaMedal />,
            color: "#027B7A",
        },
        {
            number: "24/7",
            title: "Always Available",
            description: "Legal help whenever you need it most",
            icon: <FaClock />,
            color: "#027B7A",
        },
        {
            number: "100%",
            title: "Client Trust",
            description: "Building relationships that last generations",
            icon: <FaHeart />,
            color: "#027B7A",
        },
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="py-10 md:py-28 bg-[#ECF7FF] relative overflow-hidden">
            {/* Minimalist Legal Pattern */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23027B7A' fill-opacity='0.3'%3E%3Cpath d='M40 20 L50 30 L40 40 L30 30 Z M40 50 L50 60 L40 70 L30 60 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                    }}
                />
            </div>

            {/* Single subtle accent line */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#027B7A]/30 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header - Minimal & Elegant */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <FaShieldHeart className="w-4 h-4 text-[#027B7A]" />
                        <span className="text-xs uppercase tracking-[3px] text-[#027B7A] font-semibold">
                            Why Choose Us
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl leading-loose lg:text-6xl font-bold text-gray-900 mb-4">
                        Your
                        <span className="text-[#027B7A]"> Legal</span> Partners
                    </h2>
                    <div className="w-16 h-0.5 bg-[#027B7A] mx-auto mb-6" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Features with Human Stories */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="space-y-6">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative pl-6 border-l-2 border-gray-100 hover:border-[#027B7A] transition-all duration-300"
                                >
                                    <div className="flex gap-6 p-2">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-full bg-[#027B7A]/5 flex items-center justify-center group-hover:bg-[#027B7A] transition-all duration-300">
                                                <div className="text-2xl text-[#027B7A] group-hover:text-white transition-colors">
                                                    {feature.icon}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="text-3xl font-bold text-gray-900">
                                                    {feature.number}
                                                </span>
                                                <span className="text-sm text-[#027B7A] font-medium">
                                                    ✓
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-500 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Human Touch Note */}
                        <div className="mt-10 p-5 bg-gray-50/50 rounded-xl border border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#027B7A]/10 flex items-center justify-center flex-shrink-0">
                                    <FaUserCheck className="w-4 h-4 text-[#027B7A]" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm italic">
                                        "Behind every case number is a human story. We never forget
                                        that."
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        — Ahmed Nowshed Jamil, Founder
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <Link
                                to="/about"
                                className="group inline-flex items-center gap-2 text-[#027B7A] font-semibold border-b-2 border-[#027B7A]/30 hover:border-[#027B7A] transition-all pb-1"
                            >
                                Discover our story
                                <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right Side - Mission & Vision - Premium Cards */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="space-y-8"
                    >
                        {/* Mission Card - Clean */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-[#027B7A]/5 flex items-center justify-center">
                                        <FaBullseye className="w-5 h-5 text-[#027B7A]" />
                                    </div>
                                    <h3 className="text-2xl  font-semibold text-gray-900">
                                        Our Mission
                                    </h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    To make quality legal representation accessible to every
                                    Bangladeshi who needs it. We fight not just for victory, but for
                                    fairness, dignity, and justice.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <span className="text-xs text-gray-400">✓ Client-Centric</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-1.5" />
                                    <span className="text-xs text-gray-400">
                                        ✓ Ethical Practice
                                    </span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-1.5" />
                                    <span className="text-xs text-gray-400">✓ Transparent</span>
                                </div>
                            </div>
                        </div>

                        {/* Vision Card - Clean */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-[#027B7A]/5 flex items-center justify-center">
                                        <FaEye className="w-5 h-5 text-[#027B7A]" />
                                    </div>
                                    <h3 className="text-2xl  font-semibold text-gray-900">
                                        Our Vision
                                    </h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    A Bangladesh where every citizen can confidently exercise their
                                    legal rights, and justice is not a luxury but a fundamental
                                    right for all.
                                </p>
                                <div className="flex flex-wrap gap-3 pt-2">
                                    <span className="text-xs text-gray-400">✓ Justice for All</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-1.5" />
                                    <span className="text-xs text-gray-400">✓ Legal Awareness</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full mt-1.5" />
                                    <span className="text-xs text-gray-400">✓ Social Impact</span>
                                </div>
                            </div>
                        </div>

                        {/* Trust Badge - Redesigned Minimal */}
                        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold text-[#027B7A]">95%</div>
                                    <div className="text-xs text-gray-300 mt-1">Success Rate</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#027B7A]">10k+</div>
                                    <div className="text-xs text-gray-300 mt-1">Clients Served</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#027B7A]">5+</div>
                                    <div className="text-xs text-gray-300 mt-1">Expert Lawyers</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#027B7A]">24/7</div>
                                    <div className="text-xs text-gray-300 mt-1">Support</div>
                                </div>
                            </div>
                        </div>

                        {/* Personal Promise */}
                        <div className="text-center pt-4">
                            <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
                                <FaHandshake className="w-4 h-4" />
                                <span>Personally committed to your cause</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;
