import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BlogCard from "../components/ui/BlogCard";
import { FaSearch } from "react-icons/fa";
import api from "../utils/api";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedTag, setSelectedTag] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, [currentPage, selectedTag]);

    const fetchBlogs = async () => {
        try {
            const response = await api.get(`/api/blogs?page=${currentPage}&limit=9`);
            setBlogs(response.data.blogs || []);
            setTotalPages(response.data.totalPages || 1);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const allTags = [...new Set(blogs.flatMap((blog) => blog.tags || []))];

    const filteredBlogs = blogs.filter(
        (blog) =>
            blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary"></div>
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
                            Legal Insights & Updates
                        </h1>
                        <p className="text-lg text-gray-300">
                            Stay informed with the latest legal news, expert analysis, and practice
                            tips
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter */}
            <section className="py-8 bg-white border-b sticky top-20 z-10">
                <div className="container-custom">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => setSelectedTag("")}
                                className={`px-3 py-1 rounded-full text-sm transition ${
                                    !selectedTag
                                        ? "bg-secondary text-primary"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                            >
                                All
                            </button>
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-3 py-1 rounded-full text-sm transition ${
                                        selectedTag === tag
                                            ? "bg-secondary text-primary"
                                            : "bg-gray-100 hover:bg-gray-200"
                                    }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No articles found matching your criteria.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <motion.div
                                    key={blog._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <BlogCard blog={blog} />
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-12">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border rounded-lg disabled:opacity-50 hover:bg-gray-100"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
