import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaGraduationCap, FaCertificate, FaBriefcase } from "react-icons/fa";
import api from "../utils/api";

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
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary"></div>
            </div>
        );
    }

    if (!attorney) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Attorney not found</h2>
                    <Link to="/attorneys" className="btn-primary">
                        Back to Attorneys
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link
                            to="/attorneys"
                            className="text-secondary hover:text-white mb-4 inline-block"
                        >
                            ← Back to Attorneys
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Attorney Profile */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Profile Image & Contact */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {attorney.image && (
                                <img
                                    src={attorney.image}
                                    alt={attorney.name}
                                    className="w-full rounded-lg shadow-lg mb-6"
                                />
                            )}
                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-xl font-playfair font-bold mb-4">
                                    Contact Information
                                </h3>
                                {attorney.email && (
                                    <div className="flex items-center gap-3 mb-3">
                                        <FaEnvelope className="text-secondary" />
                                        <a
                                            href={`mailto:${attorney.email}`}
                                            className="hover:text-secondary"
                                        >
                                            {attorney.email}
                                        </a>
                                    </div>
                                )}
                                {attorney.phone && (
                                    <div className="flex items-center gap-3 mb-3">
                                        <FaPhone className="text-secondary" />
                                        <a
                                            href={`tel:${attorney.phone}`}
                                            className="hover:text-secondary"
                                        >
                                            {attorney.phone}
                                        </a>
                                    </div>
                                )}
                                <div className="mt-6">
                                    <Link to="/booking" className="btn-primary block text-center">
                                        Book Consultation
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* Profile Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-2"
                        >
                            <h1 className="text-4xl font-playfair font-bold mb-2">
                                {attorney.name}
                            </h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {attorney.specialization?.map((spec, index) => (
                                    <span
                                        key={index}
                                        className="bg-secondary text-primary px-3 py-1 rounded-full text-sm"
                                    >
                                        {spec}
                                    </span>
                                ))}
                            </div>
                            {attorney.experience && (
                                <div className="flex items-center gap-2 mb-6 text-gray-600">
                                    <FaBriefcase />
                                    <span>{attorney.experience}+ years of experience</span>
                                </div>
                            )}

                            <div className="prose max-w-none mb-8">
                                <h3 className="text-2xl font-playfair font-bold mb-3">Biography</h3>
                                <p className="text-gray-600 leading-relaxed">{attorney.bio}</p>
                            </div>

                            {attorney.education && attorney.education.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-2xl font-playfair font-bold mb-3 flex items-center gap-2">
                                        <FaGraduationCap /> Education
                                    </h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                                        {attorney.education.map((edu, index) => (
                                            <li key={index}>{edu}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {attorney.barCertification && (
                                <div>
                                    <h3 className="text-2xl font-playfair font-bold mb-3 flex items-center gap-2">
                                        <FaCertificate /> Bar Certification
                                    </h3>
                                    <p className="text-gray-600">{attorney.barCertification}</p>
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
