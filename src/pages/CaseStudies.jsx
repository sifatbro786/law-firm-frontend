import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";
import api, { getImageUrl } from "../utils/api";

const CaseStudies = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedCase, setSelectedCase] = useState(null);

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const fetchCaseStudies = async () => {
        try {
            const response = await api.get("/api/case-studies");
            setCaseStudies(response.data);
        } catch (error) {
            console.error("Error fetching case studies:", error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ["all", ...new Set(caseStudies.map((c) => c.category))];

    const filteredCases =
        selectedCategory === "all"
            ? caseStudies
            : caseStudies.filter((c) => c.category === selectedCategory);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading case studies...</p>
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
                            Case Studies
                        </h1>
                        <p className="text-lg text-gray-300">
                            Explore how we've successfully resolved complex legal matters for our
                            clients across Bangladesh and beyond
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-8 bg-white border-b sticky top-20 z-10">
                <div className="container-custom">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-2 rounded-full capitalize transition ${
                                    selectedCategory === category
                                        ? "bg-secondary text-primary"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                            >
                                {category === "all" ? "All Cases" : category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Case Studies Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    {filteredCases.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No case studies found in this category.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {filteredCases.map((caseStudy, index) => (
                                <motion.div
                                    key={caseStudy._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer group"
                                    onClick={() => setSelectedCase(caseStudy)}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={getImageUrl(caseStudy.image) || "https://via.placeholder.com/600x400"}
                                            alt={caseStudy.title}
                                            className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                                {caseStudy.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-playfair font-bold mt-2 mb-3 group-hover:text-secondary transition">
                                            {caseStudy.title}
                                        </h3>
                                        <p className="text-gray-600 mb-2">
                                            <span className="font-semibold">Client:</span> {caseStudy.client}
                                        </p>
                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {caseStudy.problem}
                                        </p>
                                        <button className="text-secondary font-semibold flex items-center gap-2 group-hover:gap-3 transition">
                                            Read Case Study <FaArrowRight />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Case Study Modal */}
            {selectedCase && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-2xl font-playfair font-bold">
                                {selectedCase.title}
                            </h3>
                            <button
                                onClick={() => setSelectedCase(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
                            >
                                ×
                            </button>
                        </div>
                        <div className="p-6">
                            <img
                                src={getImageUrl(selectedCase.image) || "https://via.placeholder.com/800x400"}
                                alt={selectedCase.title}
                                className="w-full h-72 object-cover rounded-lg mb-6"
                            />

                            <div className="mb-6">
                                <span className="inline-block bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                    {selectedCase.category}
                                </span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-xl font-playfair font-bold mb-2 text-primary">
                                        Client
                                    </h4>
                                    <p className="text-gray-700">{selectedCase.client}</p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-playfair font-bold mb-2 text-primary">
                                        The Challenge
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">{selectedCase.problem}</p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-playfair font-bold mb-2 text-primary">
                                        Our Solution
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">{selectedCase.solution}</p>
                                </div>

                                <div>
                                    <h4 className="text-xl font-playfair font-bold mb-2 text-primary">
                                        The Result
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed">{selectedCase.result}</p>
                                </div>

                                <div className="bg-secondary bg-opacity-10 p-5 rounded-lg border-l-4 border-secondary">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-secondary text-xl" />
                                        <h4 className="font-semibold text-lg text-primary">Key Outcome</h4>
                                    </div>
                                    <p className="text-primary font-semibold text-lg">
                                        {selectedCase.outcome}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t flex gap-3">
                                <button
                                    onClick={() => setSelectedCase(null)}
                                    className="btn-primary flex-1"
                                >
                                    Close
                                </button>
                                <a
                                    href="/booking"
                                    className="btn-outline flex-1 text-center"
                                >
                                    Book Consultation
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* CTA Section */}
            <section className="py-16 bg-primary text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-playfair font-bold mb-4">
                        Have a Similar Legal Matter?
                    </h2>
                    <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                        Let our experienced attorneys help you achieve a successful outcome
                    </p>
                    <a href="/booking" className="btn-primary bg-secondary text-primary inline-block">
                        Schedule a Consultation
                    </a>
                </div>
            </section>

            {/* Add custom CSS for line-clamp if needed */}
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default CaseStudies;