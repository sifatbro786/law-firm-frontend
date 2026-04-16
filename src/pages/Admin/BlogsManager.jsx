import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaEye } from "react-icons/fa";
import { format } from "date-fns";
import api from "../../utils/api";

const BlogsManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "",
        tags: [],
    });
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await api.get("/api/blogs");
            setBlogs(response.data.blogs || response.data);
        } catch (error) {
            toast.error("Failed to fetch blogs");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        const blogData = {
            ...formData,
        };

        formDataToSend.append("data", JSON.stringify(blogData));
        if (imageFile) {
            formDataToSend.append("image", imageFile);
        }

        try {
            if (editingBlog) {
                await api.put(`/api/blogs/${editingBlog._id}`, formDataToSend);
                toast.success("Blog updated successfully");
            } else {
                await api.post("/api/blogs", formDataToSend);
                toast.success("Blog created successfully");
            }
            setIsModalOpen(false);
            resetForm();
            fetchBlogs();
        } catch (error) {
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog post?")) {
            try {
                await api.delete(`/api/blogs/${id}`);
                toast.success("Blog deleted successfully");
                fetchBlogs();
            } catch (error) {
                toast.error("Failed to delete blog");
            }
        }
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        setFormData({
            title: blog.title,
            slug: blog.slug,
            excerpt: blog.excerpt,
            content: blog.content,
            author: blog.author,
            tags: blog.tags || [],
        });
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingBlog(null);
        setFormData({
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            author: "",
            tags: [],
        });
        setImageFile(null);
        setTagInput("");
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    const addTag = () => {
        if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
            setFormData({
                ...formData,
                tags: [...formData.tags, tagInput.trim()],
            });
            setTagInput("");
        }
    };

    const removeTag = (index) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((_, i) => i !== index),
        });
    };

    if (loading) {
        return <div className="text-center py-8">Loading...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold">Manage Blog Posts</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Create New Post
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Author
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Views
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div>
                                        <div className="font-semibold">{blog.title}</div>
                                        <div className="text-sm text-gray-500">{blog.slug}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">{blog.author}</td>
                                <td className="px-6 py-4 text-sm">
                                    {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1">
                                        <FaEye className="text-gray-400" />
                                        {blog.views || 0}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(blog)}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(blog._id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {blogs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                                    No blog posts yet. Create your first post!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 mb-2">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                            slug: generateSlug(e.target.value),
                                        });
                                    }}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Slug *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slug: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Featured Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Excerpt/Summary *
                                </label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.excerpt}
                                    onChange={(e) =>
                                        setFormData({ ...formData, excerpt: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Brief summary of the blog post..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Content *</label>
                                <textarea
                                    required
                                    rows="12"
                                    value={formData.content}
                                    onChange={(e) =>
                                        setFormData({ ...formData, content: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary font-mono text-sm"
                                    placeholder="Write your blog content here..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Author *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.author}
                                    onChange={(e) =>
                                        setFormData({ ...formData, author: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Tags</label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg"
                                        placeholder="Add tag"
                                    />
                                    <button
                                        type="button"
                                        onClick={addTag}
                                        className="btn-primary px-4"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => removeTag(index)}
                                                className="text-red-500"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingBlog ? "Update" : "Publish"} Post
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default BlogsManager;
