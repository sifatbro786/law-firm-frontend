import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaTimes,
    FaUpload,
    FaImage,
    FaSearch,
    FaTrashAlt,
    FaPhotoVideo,
} from "react-icons/fa";
import api, { getImageUrl } from "../../utils/api";

const GalleryManager = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isImageRemoved, setIsImageRemoved] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        title: "",
    });

    useEffect(() => {
        fetchGalleryItems();
    }, []);

    const fetchGalleryItems = async () => {
        try {
            const response = await api.get("/api/gallery");
            setGalleryItems(response.data);
        } catch (error) {
            toast.error("Failed to fetch gallery items");
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
            ];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Only JPEG, PNG, GIF, JFIF and WEBP images are allowed");
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

        if (!formData.title.trim()) {
            toast.error("Please enter title");
            return;
        }

        // For new item, image is required
        if (!editingItem && !imageFile) {
            toast.error("Please select an image");
            return;
        }

        try {
            const submitFormData = new FormData();
            submitFormData.append("title", formData.title.trim());

            // Add removeImage flag if image was removed
            if (isImageRemoved) {
                submitFormData.append("removeImage", "true");
            }

            // Append image if selected
            if (imageFile) {
                submitFormData.append("image", imageFile);
            }

            if (editingItem) {
                await api.put(`/api/gallery/${editingItem._id}`, submitFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Gallery item updated successfully");
            } else {
                await api.post("/api/gallery", submitFormData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                toast.success("Gallery item added successfully");
            }

            setIsModalOpen(false);
            resetForm();
            fetchGalleryItems();
        } catch (error) {
            console.error("Submit error:", error);
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this gallery item?")) {
            try {
                await api.delete(`/api/gallery/${id}`);
                toast.success("Gallery item deleted successfully");
                fetchGalleryItems();
            } catch (error) {
                toast.error("Failed to delete gallery item");
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
        });

        // Set image preview if item has an image
        if (item.image) {
            setImagePreview(getImageUrl(item.image));
        } else {
            setImagePreview(null);
        }
        setImageFile(null);
        setIsImageRemoved(false);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingItem(null);
        setFormData({
            title: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setIsImageRemoved(false);
    };

    const filteredItems = galleryItems.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading gallery items...</p>
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
                    <FaPlus /> Add New Image
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search gallery by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                    />
                </div>
            </div>

            {/* Gallery Grid */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredItems.map((item, index) => (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Gallery Image */}
                            <div className="h-48 overflow-hidden bg-gray-100">
                                {item.image ? (
                                    <img
                                        src={getImageUrl(item.image)}
                                        alt={item.title}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <FaImage className="text-5xl text-gray-400" />
                                    </div>
                                )}
                            </div>

                            {/* Image Info */}
                            <div className="p-4">
                                <h3 className="text-md font-semibold text-gray-800 mb-3 line-clamp-2 text-center">
                                    {item.title}
                                </h3>
                                <div className="flex justify-center gap-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition"
                                        title="Edit Item"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition"
                                        title="Delete Item"
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
                                No gallery items found
                            </h3>
                            <p className="text-gray-500">
                                No items matching "{searchTerm}". Try a different search term.
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
                                <FaPhotoVideo className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No gallery items yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Get started by adding your first image to the gallery
                            </p>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(true);
                                }}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <FaPlus /> Add Your First Image
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Modal for Add/Edit Gallery Item */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-md w-full"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingItem ? "Edit Gallery Item" : "Add New Gallery Item"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Image Upload Section */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Gallery Image{" "}
                                    {!editingItem && <span className="text-red-500">*</span>}
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
                                                className="max-h-48 max-w-full object-contain rounded-lg"
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
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/jfif,image/webp"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="gallery-image-input"
                                    />
                                    <label
                                        htmlFor="gallery-image-input"
                                        className="cursor-pointer block"
                                    >
                                        <FaUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-600 font-medium">
                                            {isImageRemoved
                                                ? "Upload New Image"
                                                : imagePreview
                                                  ? "Change Image"
                                                  : "Click to upload image"}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            PNG, JPG, JPEG, GIF, WEBP up to 5MB
                                        </p>
                                    </label>
                                </div>

                                {/* Status Messages */}
                                {editingItem &&
                                    editingItem.image &&
                                    !imagePreview &&
                                    !isImageRemoved && (
                                        <p className="text-xs text-blue-600 mt-2">
                                            Current image will be kept if you don't upload a new one
                                        </p>
                                    )}
                                {isImageRemoved && (
                                    <p className="text-xs text-red-600 mt-2">
                                        Image will be removed from this gallery item
                                    </p>
                                )}
                                {imageFile && (
                                    <p className="text-xs text-green-600 mt-2">
                                        New image selected: {imageFile.name}
                                    </p>
                                )}
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter image title/description"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingItem ? "Update Item" : "Add Item"}
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

export default GalleryManager;
