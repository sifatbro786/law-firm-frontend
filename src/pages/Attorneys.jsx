import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUserTie } from "react-icons/fa";
import AttorneyCard from "../components/ui/AttorneyCard";
import api from "../utils/api";

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
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading our attorneys...</p>
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
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                            Our Attorneys
                        </h1>
                        <p className="text-lg text-gray-300">
                            Meet our team of experienced legal professionals dedicated to protecting
                            your rights and delivering justice
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-8 bg-white border-b sticky top-20 z-10 shadow-sm">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by name or expertise..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:border-secondary transition"
                            />
                        </div>
                        <select
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            className="px-4 py-3 border rounded-lg focus:outline-none focus:border-secondary bg-white min-w-[200px]"
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
            </section>

            {/* Attorneys Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    {filteredAttorneys.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                            {searchTerm || specialization ? (
                                <>
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        No attorneys found
                                    </h3>
                                    <p className="text-gray-500">
                                        No attorneys match your search criteria. Try adjusting your
                                        filters.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSpecialization("");
                                        }}
                                        className="mt-4 text-secondary hover:text-primary transition"
                                    >
                                        Clear all filters
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaUserTie className="text-4xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        No attorneys available
                                    </h3>
                                    <p className="text-gray-500">
                                        Our attorney team is being assembled. Please check back
                                        soon.
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredAttorneys.map((attorney, index) => (
                                <motion.div
                                    key={attorney._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <AttorneyCard attorney={attorney} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Attorneys;
