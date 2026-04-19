import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
    FaEdit,
    FaTrash,
    FaPlus,
    FaTimes,
    FaUpload,
    FaUserTie,
    FaSearch,
    FaTrashAlt,
    FaImage,
} from "react-icons/fa";
import api, { getImageUrl } from "../../utils/api";

const AttorneysManager = () => {
    const [attorneys, setAttorneys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAttorney, setEditingAttorney] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [removeExistingImage, setRemoveExistingImage] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        specialization: [],
        experience: "",
        email: "",
        phone: "",
        education: [],
        barCertification: "",
    });
    const [specializationInput, setSpecializationInput] = useState("");
    const [educationInput, setEducationInput] = useState("");

    useEffect(() => {
        fetchAttorneys();
    }, []);

    const fetchAttorneys = async () => {
        try {
            const response = await api.get("/api/attorneys");
            setAttorneys(response.data);
        } catch (error) {
            toast.error("Failed to fetch attorneys");
        } finally {
            setLoading(false);
        }
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

    const handleRemoveImage = () => {
        setImageFile(null);
        setImagePreview(null);
        setRemoveExistingImage(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        const attorneyData = {
            ...formData,
            experience: parseInt(formData.experience) || 0,
        };

        // শুধু removeImage true হলে পাঠাবেন
        if (removeExistingImage) {
            attorneyData.removeImage = true;
        }

        console.log("Submitting attorney data:", attorneyData);
        console.log("Has new image:", !!imageFile);
        console.log(
            "Image file details:",
            imageFile
                ? { name: imageFile.name, size: imageFile.size, type: imageFile.type }
                : "No file",
        );
        console.log("Remove existing image:", removeExistingImage);

        formDataToSend.append("data", JSON.stringify(attorneyData));
        if (imageFile) {
            formDataToSend.append("image", imageFile);
        }

        // Debug: Log FormData contents
        for (let pair of formDataToSend.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            if (editingAttorney) {
                const response = await api.put(
                    `/api/attorneys/${editingAttorney._id}`,
                    formDataToSend,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    },
                );
                console.log("Update response:", response.data);
                toast.success("Attorney updated successfully");
            } else {
                const response = await api.post("/api/attorneys", formDataToSend, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                console.log("Create response:", response.data);
                toast.success("Attorney added successfully");
            }
            setIsModalOpen(false);
            resetForm();
            fetchAttorneys();
        } catch (error) {
            console.error("Submit error:", error);
            toast.error(error.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this attorney?")) {
            try {
                await api.delete(`/api/attorneys/${id}`);
                toast.success("Attorney deleted successfully");
                fetchAttorneys();
            } catch (error) {
                toast.error("Failed to delete attorney");
            }
        }
    };

    const handleEdit = (attorney) => {
        setEditingAttorney(attorney);
        setFormData({
            name: attorney.name,
            bio: attorney.bio,
            specialization: attorney.specialization || [],
            experience: attorney.experience || "",
            email: attorney.email || "",
            phone: attorney.phone || "",
            education: attorney.education || [],
            barCertification: attorney.barCertification || "",
        });
        setImagePreview(attorney.image ? getImageUrl(attorney.image) : null);
        setImageFile(null);
        setRemoveExistingImage(false);
        setIsModalOpen(true);
    };

    const resetForm = () => {
        setEditingAttorney(null);
        setFormData({
            name: "",
            bio: "",
            specialization: [],
            experience: "",
            email: "",
            phone: "",
            education: [],
            barCertification: "",
        });
        setImageFile(null);
        setImagePreview(null);
        setRemoveExistingImage(false);
        setSpecializationInput("");
        setEducationInput("");
    };

    const addSpecialization = () => {
        if (specializationInput.trim()) {
            setFormData({
                ...formData,
                specialization: [...formData.specialization, specializationInput.trim()],
            });
            setSpecializationInput("");
        }
    };

    const removeSpecialization = (index) => {
        setFormData({
            ...formData,
            specialization: formData.specialization.filter((_, i) => i !== index),
        });
    };

    const addEducation = () => {
        if (educationInput.trim()) {
            setFormData({
                ...formData,
                education: [...formData.education, educationInput.trim()],
            });
            setEducationInput("");
        }
    };

    const removeEducation = (index) => {
        setFormData({
            ...formData,
            education: formData.education.filter((_, i) => i !== index),
        });
    };

    const filteredAttorneys = attorneys.filter((attorney) =>
        attorney.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading attorneys...</p>
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
                <h2 className="text-2xl font-playfair font-bold">Manage Attorneys</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsModalOpen(true);
                    }}
                    className="btn-primary flex items-center gap-2"
                >
                    <FaPlus /> Add New Attorney
                </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search attorneys by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                    />
                </div>
            </div>

            {filteredAttorneys.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAttorneys.map((attorney, index) => (
                        <motion.div
                            key={attorney._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-56 overflow-hidden">
                                {attorney.image ? (
                                    <img
                                        src={getImageUrl(attorney.image)}
                                        alt={attorney.name}
                                        className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                        <FaUserTie className="text-5xl text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-playfair font-bold mb-2">
                                    {attorney.name}
                                </h3>
                                <p className="text-secondary text-sm mb-3">
                                    {attorney.specialization?.slice(0, 3).join(", ")}
                                    {attorney.specialization?.length > 3 && "..."}
                                </p>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {attorney.bio}
                                </p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">
                                        {attorney.experience}+ years exp
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(attorney)}
                                            className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition"
                                            title="Edit Attorney"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(attorney._id)}
                                            className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition"
                                            title="Delete Attorney"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
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
                                No attorneys found
                            </h3>
                            <p className="text-gray-500">
                                No attorneys matching "{searchTerm}". Try a different search term.
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
                                <FaUserTie className="text-4xl text-gray-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No attorneys yet
                            </h3>
                            <p className="text-gray-500 mb-4">
                                Get started by adding your first attorney to the team
                            </p>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(true);
                                }}
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <FaPlus /> Add Your First Attorney
                            </button>
                        </>
                    )}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-playfair font-bold">
                                {editingAttorney ? "Edit Attorney" : "Add New Attorney"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Image Upload Section with Preview and Delete Option */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Profile Image
                                </label>

                                {/* Image Preview Card */}
                                {(imagePreview || (editingAttorney && !removeExistingImage)) && (
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
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={
                                                    imagePreview ||
                                                    (editingAttorney && !removeExistingImage
                                                        ? getImageUrl(editingAttorney.image)
                                                        : null)
                                                }
                                                alt="Preview"
                                                className="w-24 h-24 rounded-full object-cover border-2 border-secondary shadow-md"
                                            />
                                            <div className="flex-1">
                                                {imageFile && (
                                                    <p className="text-xs text-green-600">
                                                        New image selected: {imageFile.name}
                                                    </p>
                                                )}
                                                {!imageFile &&
                                                    editingAttorney &&
                                                    !removeExistingImage && (
                                                        <p className="text-xs text-gray-500">
                                                            Current image will be preserved. Click
                                                            "Remove Image" to delete.
                                                        </p>
                                                    )}
                                                {removeExistingImage && (
                                                    <p className="text-xs text-red-500">
                                                        Image will be removed from profile.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Upload New Image Area */}
                                <div
                                    className={`border-2 border-dashed rounded-lg p-4 text-center transition cursor-pointer ${removeExistingImage || !imagePreview ? "border-secondary/30 hover:border-secondary/60 bg-secondary/5" : "border-gray-300 bg-gray-50"}`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        id="attorney-image-input"
                                    />
                                    <label
                                        htmlFor="attorney-image-input"
                                        className="cursor-pointer block"
                                    >
                                        <FaUpload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                        <p className="text-gray-600 font-medium">
                                            {removeExistingImage
                                                ? "Upload New Image"
                                                : imagePreview
                                                  ? "Change Image"
                                                  : "Click to upload image"}
                                        </p>
                                        <p className="text-gray-400 text-sm mt-1">
                                            PNG, JPG, JPEG, GIF up to 5MB
                                        </p>
                                    </label>
                                </div>
                            </div>

                            {/* Rest of the form */}
                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Enter attorney name"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Bio *
                                </label>
                                <textarea
                                    required
                                    rows="4"
                                    value={formData.bio}
                                    onChange={(e) =>
                                        setFormData({ ...formData, bio: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                    placeholder="Write a professional biography..."
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Specializations
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={specializationInput}
                                        onChange={(e) => setSpecializationInput(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg"
                                        placeholder="Add specialization (e.g., Corporate Law)"
                                    />
                                    <button
                                        type="button"
                                        onClick={addSpecialization}
                                        className="btn-primary px-4"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.specialization.map((spec, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                                        >
                                            {spec}
                                            <button
                                                type="button"
                                                onClick={() => removeSpecialization(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Years of Experience
                                </label>
                                <input
                                    type="number"
                                    value={formData.experience}
                                    onChange={(e) =>
                                        setFormData({ ...formData, experience: e.target.value })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="e.g., 10"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg"
                                        placeholder="attorney@lawfirm.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-2 font-semibold">
                                        Phone
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phone: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg"
                                        placeholder="+880 1XXX XXXXXX"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Education
                                </label>
                                <div className="flex gap-2 mb-2">
                                    <input
                                        type="text"
                                        value={educationInput}
                                        onChange={(e) => setEducationInput(e.target.value)}
                                        className="flex-1 px-4 py-2 border rounded-lg"
                                        placeholder="Add education (e.g., LL.B from Dhaka University)"
                                    />
                                    <button
                                        type="button"
                                        onClick={addEducation}
                                        className="btn-primary px-4"
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    {formData.education.map((edu, index) => (
                                        <div
                                            key={index}
                                            className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded"
                                        >
                                            <span>{edu}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeEducation(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-semibold">
                                    Bar Certification
                                </label>
                                <input
                                    type="text"
                                    value={formData.barCertification}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            barCertification: e.target.value,
                                        })
                                    }
                                    className="w-full px-4 py-2 border rounded-lg"
                                    placeholder="e.g., Bangladesh Bar Council, Enrollment No: 12345"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingAttorney ? "Update Attorney" : "Create Attorney"}
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

export default AttorneysManager;
