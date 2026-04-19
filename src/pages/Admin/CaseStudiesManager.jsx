import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaUpload, FaImage, FaTrashAlt } from "react-icons/fa";
import { ToggleLeft, ToggleRight } from "lucide-react";
import api, { getImageUrl } from "../../utils/api";
import toast from "react-hot-toast";

const CaseStudiesManager = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCase, setEditingCase] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        category: "Corporate Law",
        client: "",
        problem: "",
        solution: "",
        result: "",
        outcome: "",
        isPublished: true,
        order: 0,
    });

    const categories = [
        "Corporate Law",
        "Property Law",
        "International Law",
        "Family Law",
        "Criminal Law",
        "Other",
    ];

    useEffect(() => {
        fetchCaseStudies();
    }, []);

    const fetchCaseStudies = async () => {
        try {
            const response = await api.get("/api/case-studies/admin/all");
            setCaseStudies(response.data);
        } catch (error) {
            toast.error("Failed to fetch case studies");
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setRemoveExistingImage(false);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setRemoveExistingImage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        const caseData = {
            ...formData,
        };

        // Add removeImage flag if needed
        if (removeExistingImage) {
            caseData.removeImage = true;
        }

        console.log("=== SUBMITTING CASE STUDY ===");
        console.log("Form data:", caseData);
        console.log("Has image file:", !!imageFile);
        console.log("Remove existing image:", removeExistingImage);
        if (imageFile) {
            console.log("Image file name:", imageFile.name);
            console.log("Image file size:", imageFile.size);
            console.log("Image file type:", imageFile.type);
        }

        formDataToSend.append("data", JSON.stringify(caseData));
        if (imageFile) {
            formDataToSend.append("image", imageFile);
        }

        // Debug: Log FormData contents
        for (let pair of formDataToSend.entries()) {
            console.log("FormData entry:", pair[0], pair[1]);
        }

        try {
            if (editingCase) {
                const response = await api.put(
                    `/api/case-studies/${editingCase._id}`,
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    },
                );
                console.log("Update response:", response.data);
                toast.success("Case study updated successfully");
            } else {
                const response = await api.post("/api/case-studies", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Create response:", response.data);
                toast.success("Case study created successfully");
            }
            setIsModalOpen(false);
            resetForm();
            fetchCaseStudies();
        } catch (error) {
            console.error("Submit error:", error);
            console.error("Error response:", error.response?.data);
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this case study?")) {
            try {
                await api.delete(`/api/case-studies/${id}`);
                toast.success("Case study deleted successfully");
                fetchCaseStudies();
            } catch (error) {
                toast.error("Failed to delete case study");
            }
        }
    };

    const handleEdit = (caseStudy) => {
        setEditingCase(caseStudy);
        setFormData({
            title: caseStudy.title,
            slug: caseStudy.slug,
            category: caseStudy.category,
            client: caseStudy.client,
            problem: caseStudy.problem,
            solution: caseStudy.solution,
            result: caseStudy.result,
            outcome: caseStudy.outcome,
            isPublished: caseStudy.isPublished,
            order: caseStudy.order || 0,
        });
        setImagePreview(caseStudy.image ? getImageUrl(caseStudy.image) : null);
        setImageFile(null);
        setRemoveExistingImage(false);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingCase(null);
        setFormData({
            title: "",
            slug: "",
            category: "Corporate Law",
            client: "",
            problem: "",
            solution: "",
            result: "",
            outcome: "",
            isPublished: true,
            order: 0,
        });
        setImageFile(null);
        setImagePreview(null);
        setRemoveExistingImage(false);
        setIsModalOpen(false);
    };

    const togglePublish = async (id, currentStatus) => {
        try {
            const caseStudy = caseStudies.find((c) => c._id === id);
            const updatedData = { ...caseStudy, isPublished: !currentStatus };

            const formDataToSend = new FormData();
            formDataToSend.append("data", JSON.stringify(updatedData));

            await api.put(`/api/case-studies/${id}`, formDataToSend);
            toast.success(
                `Case study ${!currentStatus ? "published" : "unpublished"} successfully`,
            );
            fetchCaseStudies();
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading case studies...</p>
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-playfair font-bold">Manage Case Studies</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add New Case Study
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Client
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Order
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {caseStudies.map((caseStudy) => (
                                <tr key={caseStudy._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        {caseStudy.image ? (
                                            <img
                                                src={getImageUrl(caseStudy.image)}
                                                alt={caseStudy.title}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs">
                                                No img
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-semibold">{caseStudy.title}</div>
                                        <div className="text-sm text-gray-500">
                                            {caseStudy.slug}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-secondary bg-opacity-20 rounded-full text-sm">
                                            {caseStudy.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{caseStudy.client}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                togglePublish(caseStudy._id, caseStudy.isPublished)
                                            }
                                            className="focus:outline-none"
                                            title={
                                                caseStudy.isPublished
                                                    ? "Click to unpublish"
                                                    : "Click to publish"
                                            }
                                        >
                                            {caseStudy.isPublished ? (
                                                <ToggleRight className="text-green-500 w-8 h-8" />
                                            ) : (
                                                <ToggleLeft className="text-gray-400 w-8 h-8" />
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">{caseStudy.order}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEdit(caseStudy)}
                                                className="text-blue-600 hover:text-blue-800 p-2 rounded hover:bg-blue-50 transition"
                                                title="Edit Case Study"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(caseStudy._id)}
                                                className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-50 transition"
                                                title="Delete Case Study"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {caseStudies.length === 0 && (
                                <tr>
                                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                                        No case studies found. Create your first case study!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingCase ? "Edit Case Study" : "Add New Case Study"}
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
                                <label className="block text-gray-700 mb-2">Category *</label>
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                >
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Client Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.client}
                                    onChange={(e) =>
                                        setFormData({ ...formData, client: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                />
                            </div>

                            {/* Image Upload Section with Preview */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Featured Image
                                </label>
                                <div className="border-2 border-dashed border-secondary/30 rounded-lg p-6 text-center hover:border-secondary/60 transition cursor-pointer bg-secondary/5">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="case-image-input"
                                    />
                                    <label
                                        htmlFor="case-image-input"
                                        className="cursor-pointer block"
                                    >
                                        <FaUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-600 font-medium">
                                            Click to upload image
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            PNG, JPG, JPEG, GIF up to 5MB
                                        </p>
                                    </label>
                                </div>

                                {/* Image Preview Card */}
                                {(imagePreview ||
                                    (editingCase && !removeExistingImage && editingCase.image)) && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                                <FaImage className="text-secondary" />
                                                Current Image
                                            </p>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm px-2 py-1 rounded hover:bg-red-50 transition"
                                            >
                                                <FaTrashAlt className="w-3 h-3" />
                                                Remove Image
                                            </button>
                                        </div>
                                        <div className="relative inline-block">
                                            <img
                                                src={
                                                    imagePreview ||
                                                    (editingCase && !removeExistingImage
                                                        ? getImageUrl(editingCase.image)
                                                        : null)
                                                }
                                                alt="Preview"
                                                className="w-20 h-20 object-cover rounded-lg border-2 border-secondary shadow-md"
                                            />
                                            {imageFile && (
                                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                                    New
                                                </span>
                                            )}
                                        </div>
                                        {imageFile && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                New file: {imageFile.name} (
                                                {(imageFile.size / 1024).toFixed(2)} KB)
                                            </p>
                                        )}
                                        {!imageFile && editingCase && !removeExistingImage && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                Current image will be preserved. Click "Remove
                                                Image" to delete.
                                            </p>
                                        )}
                                        {removeExistingImage && (
                                            <p className="text-xs text-red-500 mt-2">
                                                Image will be removed from this case study.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">
                                    Problem/Challenge *
                                </label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.problem}
                                    onChange={(e) =>
                                        setFormData({ ...formData, problem: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Describe the client's legal challenge..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Our Solution *</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.solution}
                                    onChange={(e) =>
                                        setFormData({ ...formData, solution: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="How did we help the client?"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Result *</label>
                                <textarea
                                    required
                                    rows="3"
                                    value={formData.result}
                                    onChange={(e) =>
                                        setFormData({ ...formData, result: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="What was achieved?"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2">Key Outcome *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.outcome}
                                    onChange={(e) =>
                                        setFormData({ ...formData, outcome: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="e.g., 95% of disputed property secured"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        Display Order
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.order}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                order: parseInt(e.target.value),
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2">Status</label>
                                    <div className="flex items-center gap-3 mt-2">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({ ...formData, isPublished: true })
                                            }
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                                formData.isPublished
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            <ToggleRight className="w-5 h-5" />
                                            Published
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setFormData({ ...formData, isPublished: false })
                                            }
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                                                !formData.isPublished
                                                    ? "bg-gray-500 text-white"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                        >
                                            <ToggleLeft className="w-5 h-5" />
                                            Draft
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingCase ? "Update" : "Create"} Case Study
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

export default CaseStudiesManager;
