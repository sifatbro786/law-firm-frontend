import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {
    FaUser,
    FaCalendar,
    FaTag,
    FaFacebook,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";
import api from "../utils/api";

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    const fetchBlog = async () => {
        try {
            const response = await api.get(`/api/blogs/${slug}`);
            setBlog(response.data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-secondary"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Article not found</h2>
                    <Link to="/blog" className="btn-primary">
                        Back to Blog
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
                            to="/blog"
                            className="text-secondary hover:text-white mb-4 inline-block"
                        >
                            ← Back to Blog
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                            {blog.title}
                        </h1>
                        <div className="flex flex-wrap gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <FaUser />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCalendar />
                                <span>{format(new Date(blog.createdAt), "MMMM dd, yyyy")}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Blog Content */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-3"
                        >
                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full rounded-lg shadow-lg mb-8"
                                />
                            )}

                            <div className="prose prose-lg max-w-none">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: blog.content.replace(/\n/g, "<br/>"),
                                    }}
                                />
                            </div>

                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="mt-8 pt-6 border-t">
                                    <div className="flex flex-wrap gap-2">
                                        <FaTag className="text-secondary mt-1" />
                                        {blog.tags.map((tag, index) => (
                                            <Link
                                                key={index}
                                                to={`/blog?tag=${tag}`}
                                                className="bg-gray-100 px-3 py-1 rounded-full text-sm hover:bg-secondary transition"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share Buttons */}
                            <div className="mt-8 pt-6 border-t">
                                <h3 className="text-lg font-semibold mb-3">Share this article:</h3>
                                <div className="flex gap-3">
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                                    >
                                        <FaFacebook />
                                    </a>
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${blog.title}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition"
                                    >
                                        <FaTwitter />
                                    </a>
                                    <a
                                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition"
                                    >
                                        <FaLinkedin />
                                    </a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                                <h3 className="text-xl font-playfair font-bold mb-4">
                                    About the Author
                                </h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                                        <FaUser className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{blog.author}</p>
                                        <p className="text-sm text-gray-500">Legal Expert</p>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">
                                    Experienced legal professional with expertise in various areas
                                    of law.
                                </p>

                                <div className="mt-6 pt-6 border-t">
                                    <h3 className="text-lg font-semibold mb-3">Need Legal Help?</h3>
                                    <Link to="/booking" className="btn-primary block text-center">
                                        Book Consultation
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogDetail;
