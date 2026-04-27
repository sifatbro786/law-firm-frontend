import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion, Reorder } from "framer-motion";
import { 
    FaEdit, 
    FaTrash, 
    FaPlus, 
    FaTimes, 
    FaGavel, 
    FaSearch,
    FaGripVertical,
    FaSave 
} from "react-icons/fa";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import api from "../../utils/api";

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isReorderMode, setIsReorderMode] = useState(false);
    const [reorderedServices, setReorderedServices] = useState([]);
    const [savingOrder, setSavingOrder] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        content: "",
        icon: "",
        order: 0,
    });

    // Quill toolbar options
    const quillModules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code-block"],
            [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
        ],
    };

    const quillFormats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "code-block",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
    ];

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await api.get("/api/services");
            // Sort by order field (ascending)
            const sortedServices = response.data.sort((a, b) => (a.order || 0) - (b.order || 0));
            setServices(sortedServices);
            setReorderedServices(sortedServices);
        } catch (error) {
            toast.error("Failed to fetch services");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.content || formData.content === "<p><br></p>") {
            toast.error("Please add content for the service");
            return;
        }
        try {
            // Remove order from formData when submitting (server will handle it)
            const { order, ...submitData } = formData;
            
            if (editingService) {
                await api.put(`/api/services/${editingService._id}`, submitData);
                toast.success("Service updated successfully");
            } else {
                await api.post("/api/services", submitData);
                toast.success("Service created successfully");
            }
            setIsModalOpen(false);
            resetForm();
            fetchServices();
        } catch (error) {
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                await api.delete(`/api/services/${id}`);
                toast.success("Service deleted successfully");
                fetchServices();
            } catch (error) {
                toast.error("Failed to delete service");
            }
        }
    };

    const handleEdit = (service) => {
        setEditingService(service);
        setFormData({
            title: service.title,
            slug: service.slug,
            description: service.description,
            content: service.content,
            icon: service.icon || "",
            order: service.order || 0,
        });
        setIsModalOpen(true);
    };

    const handleReorder = async () => {
        setSavingOrder(true);
        try {
            const orders = reorderedServices.map((service, index) => ({
                id: service._id,
                order: index
            }));
            
            await api.put("/api/services/reorder", { orders });
            setServices(reorderedServices);
            setIsReorderMode(false);
            toast.success("Service order updated successfully!");
        } catch (error) {
            console.error("Reorder error:", error);
            toast.error(error.response?.data?.error || "Failed to update order");
            setReorderedServices(services);
        } finally {
            setSavingOrder(false);
        }
    };

    const cancelReorder = () => {
        setReorderedServices(services);
        setIsReorderMode(false);
    };

    const resetForm = () => {
        setEditingService(null);
        setFormData({
            title: "",
            slug: "",
            description: "",
            content: "",
            icon: "",
            order: 0,
        });
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    const filteredServices = services.filter(
        (service) =>
            service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            service.slug.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading services...</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-playfair font-bold">Manage Services</h2>
                <div className="flex gap-3">
                    {!isReorderMode && (
                        <button
                            onClick={() => setIsReorderMode(true)}
                            className="btn-outline flex items-center gap-2"
                            disabled={services.length < 2}
                        >
                            <FaGripVertical /> Reorder Services
                        </button>
                    )}
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <FaPlus /> Add New Service
                    </button>
                </div>
            </div>

            {/* Reorder Mode Controls */}
            {isReorderMode && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
                >
                    <div className="flex justify-between items-center flex-wrap gap-3">
                        <div>
                            <h3 className="font-semibold text-blue-800">Reorder Mode Active</h3>
                            <p className="text-sm text-blue-600">
                                Drag and drop services to change their display order
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={cancelReorder}
                                className="px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-50 transition"
                                disabled={savingOrder}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleReorder}
                                className="btn-primary flex items-center gap-2"
                                disabled={savingOrder}
                            >
                                {savingOrder ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <FaSave /> Save Order
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Search Bar */}
            {!isReorderMode && (
                <div className="mb-6">
                    <div className="relative max-w-md">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search services by title or slug..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                        />
                    </div>
                </div>
            )}

            {/* Reorder Mode - Drag and Drop List */}
            {isReorderMode ? (
                <Reorder.Group
                    axis="y"
                    values={reorderedServices}
                    onReorder={setReorderedServices}
                    className="space-y-3"
                >
                    {reorderedServices.map((service) => (
                        <Reorder.Item
                            key={service._id}
                            value={service}
                            whileDrag={{
                                scale: 1.02,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            className="bg-white rounded-lg shadow-md p-4 cursor-move hover:shadow-lg transition-all border border-gray-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="cursor-grab active:cursor-grabbing">
                                    <FaGripVertical className="text-gray-400 text-xl" />
                                </div>
                                <div className="w-10 h-10 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <FaGavel className="text-secondary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{service.title}</h3>
                                    <p className="text-sm text-gray-500">{service.slug}</p>
                                </div>
                                <div className="text-sm text-gray-400">
                                    Order: {reorderedServices.findIndex(s => s._id === service._id) + 1}
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            ) : (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {filteredServices.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Title
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Slug
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredServices.map((service, index) => (
                                        <motion.tr
                                            key={service._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    #{index + 1}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-secondary bg-opacity-20 rounded-full flex items-center justify-center">
                                                        <FaGavel className="text-secondary text-sm" />
                                                    </div>
                                                    <span className="font-medium">{service.title}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {service.slug}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(service)}
                                                        className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition"
                                                        title="Edit Service"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(service._id)}
                                                        className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition"
                                                        title="Delete Service"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            {searchTerm ? (
                                <>
                                    <div className="text-6xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        No services found
                                    </h3>
                                    <p className="text-gray-500">
                                        No services matching "{searchTerm}". Try a different search
                                        term.
                                    </p>
                                    <button
                                        onClick={() => setSearchTerm("")}
                                        className="mt-4 text-secondary hover:text-primary transition"
                                    >
                                        Clear search
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaGavel className="text-4xl text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                        No services yet
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                        Get started by creating your first legal service
                                    </p>
                                    <button
                                        onClick={() => {
                                            resetForm();
                                            setIsModalOpen(true);
                                        }}
                                        className="btn-primary inline-flex items-center gap-2"
                                    >
                                        <FaPlus /> Add Your First Service
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Modal with React Quill */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingService ? "Edit Service" : "Add New Service"}
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
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => {
                                        // Only auto-generate slug for new services
                                        const newSlug = !editingService ? generateSlug(e.target.value) : formData.slug;
                                        setFormData({
                                            ...formData,
                                            title: e.target.value,
                                            slug: newSlug,
                                        });
                                    }}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter service title"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Slug <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={(e) =>
                                        setFormData({ ...formData, slug: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:border-secondary"
                                    placeholder="url-friendly-name"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    This will be used in the URL (e.g., /services/your-slug)
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Short Description <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Brief description shown on service cards"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    This will appear on the service card (max 160 characters
                                    recommended)
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Full Content <span className="text-red-500">*</span>
                                </label>
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(value) =>
                                        setFormData({ ...formData, content: value })
                                    }
                                    modules={quillModules}
                                    formats={quillFormats}
                                    placeholder="Write detailed information about this service..."
                                    className="bg-white rounded-lg"
                                    style={{ height: "300px", marginBottom: "50px" }}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    You can format text, add lists, images, and links using the
                                    toolbar
                                </p>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Icon Class
                                </label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) =>
                                        setFormData({ ...formData, icon: e.target.value })
                                    }
                                    placeholder="e.g., fas fa-gavel"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    FontAwesome icon class (e.g., fas fa-balance-scale, fas
                                    fa-gavel)
                                </p>
                            </div>

                            {/* Removed the manual order input field - order is now managed by drag & drop */}

                            <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    <strong>💡 Note:</strong> Service order is managed by the "Reorder Services" button. 
                                    {!editingService && " New services are automatically added at the end."}
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingService ? "Update Service" : "Create Service"}
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

export default ServicesManager;