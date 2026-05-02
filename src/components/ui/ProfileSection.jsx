import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaPhone,
    FaAward,
    FaUsers,
    FaClock,
    FaGavel,
    FaQuoteLeft,
    FaLinkedin,
    FaBriefcase,
    FaHeart,
} from "react-icons/fa";
import { useState } from "react";

const ProfileSection = () => {
    const [isHovered, setIsHovered] = useState(false);

    const stats = [
        {
            icon: <FaAward />,
            value: "25+",
            label: "Years Experience",
            description: "Of legal excellence",
        },
        {
            icon: <FaUsers />,
            value: "10k+",
            label: "Happy Clients",
            description: "Trusted relationships",
        },
        {
            icon: <FaClock />,
            value: "24/7",
            label: "Available",
            description: "Round-the-clock support",
        },
        {
            icon: <FaGavel />,
            value: "95%",
            label: "Success Rate",
            description: "Proven track record",
        },
    ];

    const expertiseAreas = [
        "Criminal Defense",
        "Family Law",
        "Property Law",
        "Labor Law",
        "Tax Law",
        "Constitutional Law",
        "Intellectual Property",
    ];

    const achievements = [
        { year: "2023", title: "Top 10 Lawyers in Bangladesh", issuer: "Legal Asia Awards" },
        { year: "2021", title: "Excellence in Family Law", issuer: "Bangladesh Bar Council" },
        { year: "2019", title: "Client Choice Award", issuer: "Legal 500" },
    ];

    return (
        <section className="py-10 md:py-28 bg-white relative overflow-hidden">
            {/* Premium Background Decoration */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gradient-to-br from-[#027B7A]/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#027B7A]/5 to-transparent rounded-full blur-3xl" />

                {/* Subtle Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23027B7A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block bg-[#027B7A]/10 text-[#027B7A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4 tracking-wide">
                        Meet Your Legal Partner
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Behind the <span className="text-[#027B7A]">Gavel</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] mx-auto rounded-full mb-4" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left - Profile Image with Premium Design */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Premium Frame Effect */}
                        <div className="absolute -inset-3 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] rounded-3xl opacity-20 group-hover:opacity-40 transition duration-700 blur-xl" />

                        {/* Main Image Container */}
                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-70 transition duration-500 z-10" />

                            <img
                                src="https://res.cloudinary.com/dcilg3xjd/image/upload/v1776775824/ChatGPT_Image_Apr_21_2026_06_49_41_PM_b7uqa4.png"
                                alt="Advocate Ahmed Nowshed Jamil"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-700"
                            />

                            {/* Info Overlay on Hover */}
                            <div
                                className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className="text-center text-white">
                                    <FaQuoteLeft className="w-8 h-8 mx-auto mb-3 opacity-80" />
                                    <p className="text-sm max-w-xs px-4 italic">
                                        "Every client deserves a voice, and I'm honored to be that
                                        voice for thousands."
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Gradient Card */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-20">
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    Adv. Ahmed Nowshed Jamil
                                </h3>
                                <p className="text-[#04b0b0] font-semibold flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[#04b0b0] rounded-full animate-pulse" />
                                    Founder & Managing Partner
                                </p>
                                <div className="flex gap-3 mt-3">
                                    <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                                        Supreme Court Advocate
                                    </span>
                                    <span className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                                        High Court
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right - Content with Human Touch */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {/* Welcome Message */}
                        <div>
                            <span className="inline-flex items-center gap-2 bg-[#027B7A]/10 text-[#027B7A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                                <FaHeart className="w-3 h-3" />
                                Welcome to My Firm
                            </span>
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                A Legacy of Justice,
                                <br />
                                <span className="text-[#027B7A]">A Promise of Integrity</span>
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                With over 25+ years of dedicated service in the legal field, I've had
                                the privilege of standing beside thousands of individuals and
                                businesses, helping them navigate life's most challenging legal
                                moments.
                            </p>
                        </div>

                        {/* Expertise Grid */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <FaBriefcase className="text-[#027B7A]" />
                                Core Practice Areas
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {expertiseAreas.map((expertise, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + index * 0.03 }}
                                        viewport={{ once: true }}
                                        className="bg-white border border-[#027B7A]/20 text-[#027B7A] px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-[#027B7A] hover:text-white transition-all duration-300 cursor-default"
                                    >
                                        {expertise}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        {/* Stats with Human Touch */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group relative bg-white rounded-xl p-3 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    <div className="text-[#027B7A] text-2xl mb-2 flex justify-center group-hover:scale-110 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <div className="font-bold text-gray-900 text-xl">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-600 font-medium">
                                        {stat.label}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-0.5">
                                        {stat.description}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Achievements Timeline */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                <FaAward className="text-[#027B7A]" />
                                Recent Recognitions
                            </h4>
                            <div className="space-y-2">
                                {achievements.map((achievement, idx) => (
                                    <div key={idx} className="flex items-center gap-3 text-sm">
                                        <span className="text-[#027B7A] font-bold min-w-[45px]">
                                            {achievement.year}
                                        </span>
                                        <span className="text-gray-700">{achievement.title}</span>
                                        <span className="text-gray-400 text-xs hidden sm:inline">
                                            — {achievement.issuer}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Buttons - Human Connection */}
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2">
                            <a
                                href="mailto:nowshed.j@gmail.com"
                                className="w-full sm:w-auto group inline-flex justify-center sm:justify-start items-center gap-2 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <FaEnvelope className="group-hover:scale-110 transition" />
                                Send a Message
                            </a>
                            <a
                                href="tel:+8801712245511"
                                className="w-full sm:w-auto inline-flex justify-center sm:justify-start items-center  gap-2 border-2 border-[#027B7A] text-[#027B7A] px-6 py-3 rounded-xl font-semibold hover:bg-[#027B7A] hover:text-white transition-all duration-300"
                            >
                                <FaPhone />
                                Schedule a Call
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto inline-flex justify-center sm:justify-start items-center gap-2 bg-gray-800 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <FaLinkedin />
                                <span className="inline">Connect</span>
                            </a>
                        </div>

                        {/* Personal Touch - Quote */}
                        <div className="relative mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#027B7A]/10 flex items-center justify-center flex-shrink-0">
                                    <FaQuoteLeft className="w-4 h-4 text-[#027B7A]" />
                                </div>
                                <div>
                                    <p className="text-gray-600 text-sm italic">
                                        "I don't just practice law — I live it. Every case is
                                        personal to me, because I know there's a human story behind
                                        every legal file."
                                    </p>
                                    <p className="text-[#027B7A] font-semibold text-sm mt-2">
                                        — Ahmed Nowshed Jamil
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
