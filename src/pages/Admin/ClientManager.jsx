import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaTimes,
    FaUpload,
    FaBuilding,
    FaSearch,
    FaTrashAlt,
    FaImage,
} from "react-icons/fa";
import api, { getImageUrl } from "../../utils/api";

const ClientManager = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageRemoved, setIsImageRemoved] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        brandName: "",
    });

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        try {
            const response = await api.get("/api/clients");
            setClients(response.data);
        } catch (error) {
            toast.error("Failed to fetch clients");
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            const allowedTypes = [
                "image/jpeg",
                "image/jpg",
                "image/png",
                "image/gif",
                "image/jfif",
                "image/webp",
                "image/svg+xml",
            ];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Only JPEG, PNG, GIF, JFIF, WEBP and SVG images are allowed");
                return;
            }

            // Validate file size (5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB");
                return;
            }

            setImageFile(file);
            setIsImageRemoved(false);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setIsImageRemoved(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.brandName.trim()) {
            toast.error("Please enter brand name");
            return;
        }

        try {
            const submitFormData = new FormData();
            submitFormData.append("brandName", formData.brandName.trim());

            // Add removeImage flag if image was removed
            if (isImageRemoved) {
                submitFormData.append("removeImage", "true");
            }

            // Append image if selected
            if (imageFile) {
                submitFormData.append("brandImage", imageFile);
            }

            if (editingClient) {
                await api.put(`/api/clients/${editingClient._id}`, submitFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Client updated successfully");
            } else {
                await api.post("/api/clients", submitFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Client added successfully");
            }

            setIsModalOpen(false);
            resetForm();
            fetchClients();
        } catch (error) {
            console.error("Submit error:", error);
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this client?")) {
            try {
                await api.delete(`/api/clients/${id}`);
                toast.success("Client deleted successfully");
                fetchClients();
            } catch (error) {
                toast.error("Failed to delete client");
            }
        }
    };

    const handleEdit = (client) => {
        setEditingClient(client);
        setFormData({
            brandName: client.brandName,
        });

        // Set image preview if client has an image
        if (client.brandImage) {
            setImagePreview(getImageUrl(client.brandImage));
        } else {
            setImagePreview(null);
        }
        setImageFile(null);
        setIsImageRemoved(false);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingClient(null);
        setFormData({
            brandName: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setIsImageRemoved(false);
    };

    const filteredClients = clients.filter((client) =>
        client.brandName.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading clients...</p>
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
            <div className="flex justify-end items-center mb-6 flex-wrap gap-4">
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add New Client
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search clients by brand name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                    />
                </div>
            </div>

            {/* Clients Grid */}
            {filteredClients.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredClients.map((client, index) => (
                        <motion.div
                            key={client._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Brand Image */}
                            <div className="h-40 bg-gray-100 flex items-center justify-center p-6">
                                {client.brandImage ? (
                                    <img
                                        src={getImageUrl(client.brandImage)}
                                        alt={client.brandName}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <FaBuilding className="text-5xl text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Brand Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 text-center mb-3 line-clamp-2">
                                    {client.brandName}
                                </h3>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(client)}
                                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition"
                                        title="Edit Client"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(client._id)}
                                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition"
                                        title="Delete Client"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-md text-center py-16">
                    {searchTerm ? (
                        <>
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No clients found
                            </h3>
                            <p className="text-gray-500">
                                No clients matching "{searchTerm}". Try a different search term.
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
                                <FaBuilding className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No clients yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Get started by adding your first client
                            </p>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(true);
                                }}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <FaPlus /> Add Your First Client
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Modal for Add/Edit Client */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-md w-full"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingClient ? "Edit Client" : "Add New Client"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Brand Image Upload Section */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Brand Logo / Image
                                </label>

                                {/* Current Image Preview */}
                                {imagePreview && !isImageRemoved && (
                                    <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <FaImage className="text-secondary" />
                                                Current Image
                                            </p>
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-red-50 transition"
                                            >
                                                <FaTrashAlt className="w-3 h-3" />
                                                Remove Image
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-32 max-w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Image Upload Area */}
                                <div
                                    className={`border-2 border-dashed rounded-lg p-4 text-center transition cursor-pointer ${
                                        isImageRemoved || !imagePreview
                                            ? "border-secondary/30 hover:border-secondary/60 bg-secondary/5"
                                            : "border-gray-300 bg-gray-50"
                                    }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/jfif,image/webp,image/svg+xml"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="client-image-input"
                                    />
                                    <label
                                        htmlFor="client-image-input"
                                        className="cursor-pointer block"
                                    >
                                        <FaUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-600 font-medium">
                                            {isImageRemoved
                                                ? "Upload New Image"
                                                : imagePreview
                                                  ? "Change Image"
                                                  : "Click to upload brand logo"}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            PNG, JPG, JPEG, GIF, WEBP, SVG up to 5MB
                                        </p>
                                    </label>
                                </div>

                                {/* Status Messages */}
                                {editingClient &&
                                    editingClient.brandImage &&
                                    !imagePreview &&
                                    !isImageRemoved && (
                                        <p className="text-xs text-blue-600 mt-2">
                                            Current image will be kept if you don't upload a new one
                                        </p>
                                    )}
                                {isImageRemoved && (
                                    <p className="text-xs text-red-600 mt-2">
                                        Image will be removed from this client
                                    </p>
                                )}
                                {imageFile && (
                                    <p className="text-xs text-green-600 mt-2">
                                        New image selected: {imageFile.name}
                                    </p>
                                )}
                            </div>

                            {/* Brand Name */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Brand Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.brandName}
                                    onChange={(e) =>
                                        setFormData({ ...formData, brandName: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter brand name"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingClient ? "Update Client" : "Add Client"}
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

export default ClientManager;
