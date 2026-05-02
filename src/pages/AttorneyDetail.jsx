import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaPhone,
    FaGraduationCap,
    FaCertificate,
    FaBriefcase,
    FaQuoteLeft,
    FaStar,
    FaAward,
    FaCalendar,
    FaFacebookF,
    FaLinkedinIn,
    FaTwitter,
    FaArrowLeft,
} from "react-icons/fa";
import api, { getImageUrl } from "../utils/api";
import PageHeader from "../components/ui/PageHeader";

const AttorneyDetail = () => {
    const { id } = useParams();
    const [attorney, setAttorney] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttorney();
    }, [id]);

    const fetchAttorney = async () => {
        try {
            const response = await api.get(`/api/attorneys/${id}`);
            setAttorney(response.data);
        } catch (error) {
            console.error("Error fetching attorney:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#ECF7FF]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#027B7A] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-600 font-medium">Loading attorney profile...</p>
                </div>
            </div>
        );
    }

    if (!attorney) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#ECF7FF]">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaUserTie className="text-4xl text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-playfair font-bold text-gray-800 mb-4">
                        Attorney not found
                    </h2>
                    <p className="text-gray-500 mb-6">
                        The attorney you're looking for doesn't exist or has been removed.
                    </p>
                    <Link
                        to="/attorneys"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition"
                    >
                        <FaArrowLeft /> Back to Attorneys
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <PageHeader title={attorney.name} path={attorney.name} />

            {/* Attorney Profile */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                        {/* Left Column - Profile Image & Contact */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Profile Image */}
                            <div className="relative">
                                {attorney.image && (
                                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src={getImageUrl(attorney.image)}
                                            alt={attorney.name}
                                            className="w-full object-cover"
                                        />
                                    </div>
                                )}
                                {/* Experience Badge */}
                                {attorney.experience && (
                                    <div className="absolute -bottom-4 right-4 bg-white rounded-xl shadow-lg p-3 flex items-center gap-2">
                                        <FaAward className="text-[#027B7A] text-xl" />
                                        <div>
                                            <div className="font-bold text-gray-900">
                                                {attorney.experience}+ Years
                                            </div>
                                            <div className="text-xs text-gray-500">Experience</div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Contact Card */}
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 shadow-lg border border-gray-100">
                                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-5 pb-3 border-b border-gray-200">
                                    Contact Information
                                </h3>
                                <div className="space-y-4">
                                    {attorney.email && (
                                        <div className="flex items-center gap-3 group">
                                            <div className="w-10 h-10 rounded-xl bg-[#027B7A]/10 flex items-center justify-center group-hover:bg-[#027B7A] transition-colors duration-300">
                                                <FaEnvelope className="text-[#027B7A] group-hover:text-white text-sm" />
                                            </div>
                                            <a
                                                href={`mailto:${attorney.email}`}
                                                className="text-gray-600 hover:text-[#027B7A] transition"
                                            >
                                                {attorney.email}
                                            </a>
                                        </div>
                                    )}
                                    {attorney.phone && (
                                        <div className="flex items-center gap-3 group">
                                            <div className="w-10 h-10 rounded-xl bg-[#027B7A]/10 flex items-center justify-center group-hover:bg-[#027B7A] transition-colors duration-300">
                                                <FaPhone className="text-[#027B7A] group-hover:text-white text-sm" />
                                            </div>
                                            <a
                                                href={`tel:${attorney.phone}`}
                                                className="text-gray-600 hover:text-[#027B7A] transition"
                                            >
                                                {attorney.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Social Links */}
                                <div className="mt-6 pt-4 border-t border-gray-200">
                                    <div className="flex gap-3">
                                        <a
                                            href="#"
                                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1877f2] hover:text-white transition-all duration-300"
                                        >
                                            <FaFacebookF className="text-sm" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#1da1f2] hover:text-white transition-all duration-300"
                                        >
                                            <FaTwitter className="text-sm" />
                                        </a>
                                        <a
                                            href="#"
                                            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#0077b5] hover:text-white transition-all duration-300"
                                        >
                                            <FaLinkedinIn className="text-sm" />
                                        </a>
                                    </div>
                                </div>

                                {/* Consultation Button */}
                                <div className="mt-6">
                                    <Link
                                        to="/booking"
                                        className="block text-center px-6 py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#027B7A]/20 hover:shadow-xl hover:-translate-y-0.5"
                                    >
                                        Book Consultation
                                    </Link>
                                    <p className="text-xs text-center text-gray-400 mt-3">
                                        Consultation fee: 5,000 BDT (Online)
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column - Profile Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2"
                        >
                            {/* Name & Title */}
                            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-3">
                                {attorney.name}
                            </h1>

                            {/* Specializations */}
                            <div className="flex flex-wrap gap-2 mb-5">
                                {attorney.specialization?.map((spec, index) => (
                                    <span
                                        key={index}
                                        className="bg-[#027B7A]/10 text-[#027B7A] px-3 py-1 rounded-full text-sm font-medium"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>

                            {/* Experience & Rating */}
                            <div className="flex flex-wrap gap-6 mb-8 pb-6 border-b border-gray-200">
                                {attorney.experience && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <FaBriefcase className="text-[#027B7A]" />
                                        <span>{attorney.experience}+ years of experience</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <FaStar className="text-yellow-400" />
                                    <span>5.0 Rating</span>
                                    <span className="text-gray-400">(120+ reviews)</span>
                                </div>
                            </div>

                            {/* Quote */}
                            {attorney.quote && (
                                <div className="mb-8 p-6 bg-[#ECF7FF] rounded-2xl border-l-4 border-[#027B7A]">
                                    <FaQuoteLeft className="text-[#027B7A]/20 text-3xl mb-3" />
                                    <p className="text-gray-700 italic leading-relaxed">
                                        "{attorney.quote}"
                                    </p>
                                </div>
                            )}

                            {/* Biography */}
                            <div className="mb-8">
                                <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">
                                    Biography
                                </h3>
                                <p className="text-gray-600 leading-relaxed">{attorney.bio}</p>
                            </div>

                            {/* Education */}
                            {attorney.education && attorney.education.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaGraduationCap className="text-[#027B7A]" />
                                        Education
                                    </h3>
                                    <div className="space-y-3">
                                        {attorney.education.map((edu, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#027B7A] mt-2"></div>
                                                <p className="text-gray-600">{edu}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Bar Certification */}
                            {attorney.barCertification && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaCertificate className="text-[#027B7A]" />
                                        Bar Certification
                                    </h3>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#027B7A] mt-2"></div>
                                        <p className="text-gray-600">{attorney.barCertification}</p>
                                    </div>
                                </div>
                            )}

                            {/* Awards */}
                            {attorney.awards && attorney.awards.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <FaAward className="text-[#027B7A]" />
                                        Awards & Recognition
                                    </h3>
                                    <div className="space-y-3">
                                        {attorney.awards.map((award, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-[#027B7A] mt-2"></div>
                                                <p className="text-gray-600">{award}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AttorneyDetail;
