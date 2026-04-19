import { motion } from "framer-motion";
import ProfileImage from "/placeholder-girl.jpg";
import {
    FaLinkedin,
    FaEnvelope,
    FaPhone,
    FaAward,
    FaUsers,
    FaClock,
    FaGavel,
} from "react-icons/fa";

const ProfileSection = () => {
    const stats = [
        { icon: <FaAward />, value: "15+", label: "Years Experience" },
        { icon: <FaUsers />, value: "500+", label: "Happy Clients" },
        { icon: <FaClock />, value: "24/7", label: "Available" },
        { icon: <FaGavel />, value: "98%", label: "Success Rate" },
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                        Meet Our Founder
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Profile Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-secondary rounded-3xl transform rotate-6 group-hover:rotate-12 transition duration-500 opacity-20"></div>
                        <div className="relative bg-gradient-to-br from-primary to-accent rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src={ProfileImage}
                                alt="Neela - Founder & Managing Partner"
                                className="w-full h-auto object-cover transform group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-primary to-transparent">
                                <h3 className="text-2xl font-playfair font-bold text-white">
                                    Neela Rahman
                                </h3>
                                <p className="text-secondary font-semibold">
                                    Founder & Managing Partner
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Profile Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-6">
                            <span className="inline-block bg-secondary/20 text-secondary px-4 py-1 rounded-full text-sm font-semibold mb-4">
                                Advocate & Legal Expert
                            </span>
                            <h3 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                                Neela Rahman
                            </h3>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                With over 15 years of dedicated service in the legal field, Neela
                                Rahman has established herself as one of Bangladesh's most respected
                                legal professionals. Her commitment to justice and client advocacy
                                has helped thousands of individuals and businesses navigate complex
                                legal challenges.
                            </p>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Specializing in Corporate Law, Criminal Defense, and Family Law,
                                Neela brings a unique combination of expertise, compassion, and
                                strategic thinking to every case she handles.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="text-center p-3 bg-gray-50 rounded-xl hover:shadow-md transition"
                                >
                                    <div className="text-secondary text-2xl mb-2 flex justify-center">
                                        {stat.icon}
                                    </div>
                                    <div className="font-bold text-primary text-xl">
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-gray-500">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Expertise Areas */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-primary mb-3">Areas of Expertise:</h4>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Corporate Law",
                                    "Criminal Defense",
                                    "Family Law",
                                    "Property Law",
                                    "Labor Law",
                                    "Tax Law",
                                ].map((expertise, index) => (
                                    <span
                                        key={index}
                                        className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {expertise}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Contact Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="mailto:neela@lawfirmbd.com"
                                className="btn-primary flex items-center gap-2"
                            >
                                <FaEnvelope /> Email Neela
                            </a>
                            <a
                                href="tel:+8801234567890"
                                className="btn-outline flex items-center gap-2"
                            >
                                <FaPhone /> Call Direct
                            </a>
                            <a
                                href="https://linkedin.com/in/neela-rahman"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#0077b5] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#005582] transition"
                            >
                                <FaLinkedin /> LinkedIn
                            </a>
                        </div>

                        {/* Quote */}
                        <div className="mt-8 p-4 bg-gray-50 rounded-lg border-l-4 border-secondary">
                            <p className="text-gray-600 italic">
                                "Justice is not just about winning cases; it's about making sure
                                every client feels heard, respected, and empowered throughout their
                                legal journey."
                            </p>
                            <p className="text-secondary font-semibold mt-2">— Neela Rahman</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
