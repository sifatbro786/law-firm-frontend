import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBriefcase, FaStar, FaArrowRight, FaQuoteLeft, FaGraduationCap } from "react-icons/fa";
import { getImageUrl } from "../../utils/api";

const AttorneyCard = ({ attorney }) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
        >
            {/* Image Container with Overlay */}
            <div className="relative overflow-hidden h-72">
                {attorney.image && (
                    <>
                        <img
                            src={getImageUrl(attorney.image)}
                            alt={attorney.name}
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </>
                )}

                {/* Experience Badge */}
                {attorney.experience && (
                    <div className="absolute top-4 left-4 bg-[#027B7A] text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                        <FaBriefcase className="w-3 h-3" />
                        <span>{attorney.experience}+ Years</span>
                    </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                    <FaStar className="w-3 h-3 text-yellow-500" />
                    <span>5.0</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-white">
                {/* Name */}
                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-1 group-hover:text-[#027B7A] transition-colors duration-300">
                    {attorney.name}
                </h3>

                {/* Specialization Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {attorney.specialization?.slice(0, 2).map((spec, index) => (
                        <span
                            key={index}
                            className="inline-block text-xs bg-[#027B7A]/10 text-[#027B7A] px-2.5 py-1 rounded-full font-medium"
                        >
                            {spec}
                        </span>
                    ))}
                    {attorney.specialization?.length > 2 && (
                        <span className="inline-block text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full font-medium">
                            +{attorney.specialization.length - 2}
                        </span>
                    )}
                </div>

                {/* Quote or Bio Preview */}
                {attorney.quote ? (
                    <div className="mb-4">
                        <FaQuoteLeft className="text-[#027B7A]/20 text-sm mb-1" />
                        <p className="text-gray-600 text-sm italic line-clamp-2">
                            "{attorney.quote}"
                        </p>
                    </div>
                ) : (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {attorney.bio}
                    </p>
                )}

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4" />

                {/* Footer with View Profile */}
                <Link
                    to={`/attorneys/${attorney._id}`}
                    className="inline-flex items-center gap-2 text-[#027B7A] font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                >
                    <span>View Profile</span>
                    <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
            </div>

            {/* Decorative Corner */}
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#027B7A]/5 to-transparent rounded-tl-3xl pointer-events-none" />
        </motion.div>
    );
};

export default AttorneyCard;
