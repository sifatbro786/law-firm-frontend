import { motion } from "framer-motion";
import {
    FaCalendarAlt,
    FaEnvelope,
    FaGavel,
    FaLinkedinIn,
    FaPhone,
    FaStar,
    FaUserGraduate,
} from "react-icons/fa";
import { GiJusticeStar } from "react-icons/gi";
import { Link } from "react-router-dom";

const AttorneysSection = ({ attorneys }) => {
    console.log(attorneys);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    // Function to generate random practice areas (in real app, these come from API)
    const getPracticeAreas = (index) => {
        const areas = [
            ["Corporate Law", "M&A"],
            ["Criminal Defense", "Litigation"],
            ["Family Law", "Mediation"],
            ["Property Law", "Land Disputes"],
            ["Tax Law", "Financial Compliance"],
            ["Labor Law", "Employment"],
            ["Constitutional Law", "Writ"],
            ["Intellectual Property", "Copyright"],
        ];
        return areas[index % areas.length];
    };

    return (
        <section className="py-10 lg:py-28 bg-[#ECF7FF] relative overflow-hidden">
            {/* Minimalist Legal Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23027B7A' fill-opacity='0.4'%3E%3Cpath d='M30 15 L35 20 L30 25 L25 20 Z M30 35 L35 40 L30 45 L25 40 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundRepeat: "repeat",
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 mb-4">
                        <GiJusticeStar className="w-4 h-4 text-[#027B7A]" />
                        <span className="text-xs uppercase tracking-[3px] text-[#027B7A] font-semibold">
                            Legal Experts
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-gray-900 mb-4">
                        Meet the <span className="text-[#027B7A]">Minds</span> Behind
                        <br />
                        Your <span className="text-[#027B7A]">Justice</span>
                    </h2>
                    <div className="w-16 h-0.5 bg-[#027B7A] mx-auto mb-6" />
                </motion.div>

                {/* Attorneys Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {attorneys.map((attorney, index) => {
                        const practiceAreas = getPracticeAreas(index);

                        return (
                            <motion.div key={attorney._id} variants={fadeInUp} className="group">
                                <div className="relative h-full">
                                    {/* Premium Card Design */}
                                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                                        {/* Image Container with Unique Overlay */}
                                        <div className="relative overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
                                            <div className="relative">
                                                <img
                                                    src={attorney.image}
                                                    alt={attorney.name}
                                                    className="w-full aspect-[4/3] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                                />

                                                {/* Gradient Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                                {/* Social Links - Appear on Hover */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                    <div className="flex justify-center gap-3">
                                                        <a
                                                            href={`mailto:${attorney.email}`}
                                                            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#027B7A] hover:text-white transition-all duration-300"
                                                        >
                                                            <FaEnvelope className="w-3.5 h-3.5" />
                                                        </a>
                                                        <a
                                                            href={`tel:${attorney.phone}`}
                                                            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#027B7A] hover:text-white transition-all duration-300"
                                                        >
                                                            <FaPhone className="w-3.5 h-3.5" />
                                                        </a>
                                                        <a
                                                            href={attorney.linkedin || "#"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-[#027B7A] hover:text-white transition-all duration-300"
                                                        >
                                                            <FaLinkedinIn className="w-3.5 h-3.5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Experience Badge */}
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs font-semibold text-[#027B7A] shadow-sm">
                                                <div className="flex items-center gap-1">
                                                    <FaCalendarAlt className="w-2.5 h-2.5" />
                                                    <span>{attorney?.experience} yrs</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-5 flex-1 flex flex-col">
                                            {/* Name & Title */}
                                            <div className="mb-3">
                                                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#027B7A] transition-colors">
                                                    {attorney?.name}
                                                </h3>
                                                <p className="text-sm text-[#027B7A] font-medium">
                                                    {attorney?.designation || "Senior Advocate"}
                                                </p>
                                            </div>

                                            {/* Quote/Statement */}
                                            {/* <div className="mb-4 p-3 bg-gray-50 rounded-lg border-l-3 border-[#027B7A]">
                                                <FaQuoteLeft className="w-3 h-3 text-[#027B7A] mb-1 opacity-60" />
                                                <p className="text-xs text-gray-600 italic leading-relaxed">
                                                    {attorney.quote ||
                                                        "Committed to justice, dedicated to your cause."}
                                                </p>
                                            </div> */}

                                            {/* Practice Areas */}
                                            <div className="mb-4">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {practiceAreas.map((area, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="text-xs bg-[#027B7A]/5 text-[#027B7A] px-2 py-0.5 rounded-full"
                                                        >
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Education/Credential */}
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                                <FaUserGraduate className="w-3 h-3" />
                                                <span>
                                                    {attorney.education || "Dhaka University"}
                                                </span>
                                            </div>

                                            {/* View Profile Link */}
                                            <div className="mt-auto pt-3 border-t border-gray-100">
                                                <Link
                                                    to={`/attorneys/${attorney.slug || attorney._id}`}
                                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#027B7A] transition-colors group/link"
                                                >
                                                    <span>View Profile</span>
                                                    <FaGavel className="w-3 h-3 group-hover/link:rotate-12 transition-transform" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Element - Hover Line */}
                                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] transition-all duration-500 group-hover:w-2/3 rounded-full" />
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA with Human Touch */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mt-16"
                >
                    <div className="inline-flex flex-col items-center">
                        <p className="text-gray-500 mb-4 text-sm">
                            Every attorney in our team shares one belief:{" "}
                            <span className="text-[#027B7A] font-medium">
                                Your victory is our victory.
                            </span>
                        </p>
                        <Link
                            to="/attorneys"
                            className="group inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-[#027B7A] text-[#027B7A] rounded-xl font-semibold hover:bg-[#027B7A] hover:text-white transition-all duration-300"
                        >
                            <span>Meet Our Full Team</span>
                            <FaStar className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        </Link>
                    </div>
                </motion.div>

                {/* Trust Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 hidden  sm:flex justify-center"
                >
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#027B7A]" />
                            High Court Approved
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#027B7A]" />
                            Supreme Court Enrolled
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#027B7A]" />
                            Bangladesh Bar Council
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AttorneysSection;
