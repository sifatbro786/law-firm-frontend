import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUserTie, FaSlidersH } from "react-icons/fa";
import AttorneyCard from "../components/ui/AttorneyCard";
import api from "../utils/api";
import PageHeader from "../components/ui/PageHeader";

const Attorneys = () => {
    const [attorneys, setAttorneys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [specialization, setSpecialization] = useState("");

    useEffect(() => {
        fetchAttorneys();
    }, []);

    const fetchAttorneys = async () => {
        try {
            const response = await api.get("/api/attorneys");
            setAttorneys(response.data);
        } catch (error) {
            console.error("Error fetching attorneys:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredAttorneys = attorneys.filter((attorney) => {
        const matchesSearch =
            searchTerm === "" ||
            attorney.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            attorney.bio?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialization =
            !specialization || attorney.specialization?.some((spec) => spec === specialization);
        return matchesSearch && matchesSpecialization;
    });

    const specializations = [...new Set(attorneys.flatMap((a) => a.specialization || []))];

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#ECF7FF]">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#027B7A] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading our legal experts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <PageHeader title="Meet Our Attorneys" path="Attorneys" />

            {/* Search and Filter Section - Premium Redesign */}
            <section className="py-12 bg-gradient-to-r from-[#ECF7FF] via-white to-[#ECF7FF] border-b border-[#027B7A]/10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="text-center mb-8">
                        <h3 className="text-[#027B7A] text-sm font-semibold uppercase tracking-wider mb-2">
                            Our Team
                        </h3>
                        <p className="text-gray-500 text-lg">
                            Find the right legal expert for your case
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#027B7A]" />
                            <input
                                type="text"
                                placeholder="Search by name or expertise..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#027B7A]/20 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/10 transition-all duration-300 shadow-sm"
                            />
                        </div>
                        <div className="relative min-w-[220px]">
                            <FaSlidersH className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#027B7A]" />
                            <select
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white border border-[#027B7A]/20 rounded-xl focus:outline-none focus:border-[#027B7A] focus:ring-2 focus:ring-[#027B7A]/10 appearance-none cursor-pointer shadow-sm text-gray-600"
                            >
                                <option value="">All Specializations</option>
                                {specializations.map((spec) => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(searchTerm || specialization) && (
                        <div className="text-center mt-4">
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSpecialization("");
                                }}
                                className="text-sm text-[#027B7A] hover:underline inline-flex items-center gap-1"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Attorneys Grid - Premium Redesign */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    {filteredAttorneys.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="w-20 h-20 bg-[#ECF7FF] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FaUserTie className="text-3xl text-[#027B7A]" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No attorneys found
                            </h3>
                            <p className="text-gray-400">
                                Try adjusting your search or filter criteria
                            </p>
                            {(searchTerm || specialization) && (
                                <button
                                    onClick={() => {
                                        setSearchTerm("");
                                        setSpecialization("");
                                    }}
                                    className="mt-4 text-[#027B7A] text-sm font-medium hover:underline"
                                >
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                                <div>
                                    <h3 className="text-[#027B7A] text-sm font-semibold uppercase tracking-wider">
                                        Legal Team
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">
                                        Showing{" "}
                                        <span className="text-[#027B7A] font-semibold">
                                            {filteredAttorneys.length}
                                        </span>{" "}
                                        attorneys
                                    </p>
                                </div>
                                <div className="w-12 h-0.5 bg-[#027B7A]/20 rounded-full"></div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredAttorneys.map((attorney, index) => (
                                    <motion.div
                                        key={attorney._id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <AttorneyCard attorney={attorney} />
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Attorneys;
