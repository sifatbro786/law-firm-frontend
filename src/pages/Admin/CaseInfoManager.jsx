import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Upload,
    FileText,
    X,
    Eye,
    Download,
    ChevronLeft,
    ChevronRight,
    Loader2,
} from "lucide-react";
import api from "../../utils/api";
import toast from "react-hot-toast";
import useDebounce from "../../utils/useDebounce";

const CaseInfoManager = () => {
    const [cases, setCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCases, setTotalCases] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedCase, setSelectedCase] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [existingFiles, setExistingFiles] = useState([]);
    const [formData, setFormData] = useState({
        caseNumber: "",
        district: "",
        clientName: "",
        clientAddress: "",
        clientMobileNo: "",
        description: "",
        isReferenced: false,
        referenceName: "",
        referenceMobileNo: "",
    });

    // Debounce search term (500ms delay)
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const fetchCases = useCallback(async () => {
        try {
            setLoading(true);
            setIsSearching(true);
            const res = await api.get(
                `/api/case-info?search=${debouncedSearchTerm}&page=${currentPage}&limit=10`,
            );
            setCases(res.data.cases || []);
            setTotalPages(res.data.totalPages || 1);
            setTotalCases(res.data.total || 0);
        } catch (err) {
            console.error("Error fetching cases:", err);
            toast.error("Error loading cases: " + err.message);
            setCases([]);
            setTotalPages(1);
            setTotalCases(0);
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    }, [debouncedSearchTerm, currentPage]);

    useEffect(() => {
        fetchCases();
    }, [fetchCases]);

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files || []);
        setUploadedFiles([...uploadedFiles, ...newFiles]);
    };

    const removeFile = (index) => {
        setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
    };

    const removeExistingFile = async (fileIndex) => {
        if (window.confirm("Are you sure you want to delete this file?")) {
            try {
                await api.delete(`/api/case-info/${editingId}/files/${fileIndex}`);
                setExistingFiles(existingFiles.filter((_, i) => i !== fileIndex));
                toast.success("File deleted successfully");
            } catch (err) {
                toast.error("Failed to delete file");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (
            !formData.caseNumber ||
            !formData.district ||
            !formData.clientName ||
            !formData.clientMobileNo ||
            !formData.clientAddress ||
            !formData.description
        ) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== undefined && formData[key] !== null) {
                    submitData.append(key, formData[key]);
                }
            });
            uploadedFiles.forEach((file) => {
                submitData.append("files", file);
            });

            if (editingId) {
                await api.put(`/api/case-info/${editingId}`, submitData);
                toast.success("Case updated successfully!");
            } else {
                await api.post("/api/case-info", submitData);
                toast.success("Case created successfully!");
            }

            resetForm();
            fetchCases();
        } catch (err) {
            toast.error(err.response?.data?.error || "Operation failed");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this case?")) {
            try {
                await api.delete(`/api/case-info/${id}`);
                toast.success("Case deleted successfully");
                fetchCases();
            } catch (err) {
                toast.error("Delete failed");
            }
        }
    };

    const handleEdit = (item) => {
        setEditingId(item._id);
        setFormData({
            caseNumber: item.caseNumber || "",
            district: item.district || "",
            clientName: item.clientName || "",
            clientAddress: item.clientAddress || "",
            clientMobileNo: item.clientMobileNo || "",
            description: item.description || "",
            isReferenced: item.isReferenced || false,
            referenceName: item.referenceName || "",
            referenceMobileNo: item.referenceMobileNo || "",
        });
        setExistingFiles(item.files || []);
        setUploadedFiles([]);
        setIsModalOpen(true);
    };

    const handleView = (item) => {
        setSelectedCase(item);
        setIsViewModalOpen(true);
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            caseNumber: "",
            district: "",
            clientName: "",
            clientAddress: "",
            clientMobileNo: "",
            description: "",
            isReferenced: false,
            referenceName: "",
            referenceMobileNo: "",
        });
        setUploadedFiles([]);
        setExistingFiles([]);
        setIsModalOpen(false);
    };

    const downloadFile = (file) => {
        if (file.filePath) {
            window.open(`/${file.filePath}`, "_blank");
        } else {
            toast.error("File not found");
        }
    };

    const clearSearch = () => {
        setSearchTerm("");
        setCurrentPage(1);
    };

    // Show loading only on initial load or when searching
    if (loading && cases.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading cases...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-accent text-white py-8 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-playfair font-bold mb-2">Case Management</h1>
                    <p className="text-gray-300">
                        Manage and track legal case information with ease
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Search and Add Button */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="relative w-full md:w-1/2">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by case number, client name, phone, reference..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:border-secondary bg-white"
                        />
                        {isSearching && (
                            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 animate-spin" />
                        )}
                        {searchTerm && !isSearching && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setIsModalOpen(true);
                        }}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" /> Add New Case
                    </button>
                </div>

                {/* Search Result Info */}
                {debouncedSearchTerm && totalCases > 0 && (
                    <div className="mb-4 text-sm text-gray-600 bg-white p-3 rounded-lg shadow-sm">
                        Found <strong>{totalCases}</strong> result(s) for "
                        <strong>{debouncedSearchTerm}</strong>"
                        <button
                            onClick={clearSearch}
                            className="ml-3 text-secondary hover:text-primary transition"
                        >
                            Clear search
                        </button>
                    </div>
                )}

                {/* Cases Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Case #
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Client
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        District
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Reference
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                        Files
                                    </th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {cases.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            {debouncedSearchTerm ? (
                                                <>
                                                    <div className="text-6xl mb-4">🔍</div>
                                                    <p className="text-gray-500">
                                                        No cases found matching "
                                                        {debouncedSearchTerm}"
                                                    </p>
                                                    <button
                                                        onClick={clearSearch}
                                                        className="mt-3 text-secondary hover:text-primary transition"
                                                    >
                                                        Clear search
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-6xl mb-4">📁</div>
                                                    <p className="text-gray-500">No cases found</p>
                                                    <button
                                                        onClick={() => {
                                                            resetForm();
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="mt-3 btn-primary inline-flex items-center gap-2"
                                                    >
                                                        <Plus className="w-4 h-4" /> Create your
                                                        first case
                                                    </button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ) : (
                                    cases.map((item) => (
                                        <tr key={item._id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-4">
                                                <span className="inline-block bg-secondary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                                                    {item.caseNumber}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-800">
                                                    {item.clientName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {item.clientMobileNo}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">
                                                {item.district}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.isReferenced ? (
                                                    <div>
                                                        <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                                            {item.referenceName?.length > 20
                                                                ? item.referenceName.substring(
                                                                      0,
                                                                      20,
                                                                  ) + "..."
                                                                : item.referenceName}
                                                        </span>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {item.referenceMobileNo}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">
                                                        Direct
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.files && item.files.length > 0 ? (
                                                    <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                                        {item.files.length} file(s)
                                                    </span>
                                                ) : (
                                                    <span className="text-gray-400">—</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex gap-2 justify-end">
                                                    <button
                                                        onClick={() => handleView(item)}
                                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id)}
                                                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {!loading && totalPages > 1 && cases.length > 0 && (
                        <div className="px-6 py-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50">
                            <div className="text-sm text-gray-600">
                                Showing {cases.length} of {totalCases} cases
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <span className="px-4 py-2 text-sm">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-2xl font-playfair font-bold">
                                {editingId ? "Edit Case" : "Add New Case"}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Case Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., CASE-2024-001"
                                        value={formData.caseNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, caseNumber: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        District <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter district"
                                        value={formData.district}
                                        onChange={(e) =>
                                            setFormData({ ...formData, district: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Client Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter client name"
                                        value={formData.clientName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, clientName: e.target.value })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Enter mobile number"
                                        value={formData.clientMobileNo}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                clientMobileNo: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter client address"
                                        value={formData.clientAddress}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                clientAddress: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Case Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        placeholder="Enter detailed case description"
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        rows="4"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary resize-none"
                                        required
                                    />
                                </div>
                                <div className="md:col-span-2 bg-gray-50 rounded-lg p-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.isReferenced}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    isReferenced: e.target.checked,
                                                })
                                            }
                                            className="w-4 h-4 accent-secondary"
                                        />
                                        <span className="font-semibold text-gray-700">
                                            Has Reference?
                                        </span>
                                    </label>
                                </div>
                                {formData.isReferenced && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Reference Name
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter reference name"
                                                value={formData.referenceName}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        referenceName: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Reference Mobile
                                            </label>
                                            <input
                                                type="tel"
                                                placeholder="Enter reference mobile"
                                                value={formData.referenceMobileNo}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        referenceMobileNo: e.target.value,
                                                    })
                                                }
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-secondary"
                                            />
                                        </div>
                                    </>
                                )}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Attach Files
                                    </label>
                                    <div className="border-2 border-dashed border-secondary/30 rounded-lg p-6 text-center hover:border-secondary/60 transition cursor-pointer bg-secondary/5">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            accept=".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx,.xls,.xlsx"
                                            className="hidden"
                                            id="file-input"
                                        />
                                        <label
                                            htmlFor="file-input"
                                            className="cursor-pointer block"
                                        >
                                            <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                            <p className="text-gray-600 font-medium">
                                                Click to upload or drag and drop
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                PNG, JPG, PDF, DOC, XLS up to 10MB
                                            </p>
                                        </label>
                                    </div>

                                    {/* Existing Files */}
                                    {existingFiles.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                                Existing Files:
                                            </p>
                                            {existingFiles.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <FileText className="w-4 h-4 text-secondary flex-shrink-0" />
                                                        <span className="text-sm text-gray-600 truncate">
                                                            {file.originalName}
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeExistingFile(index)}
                                                        className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* New Files */}
                                    {uploadedFiles.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm font-semibold text-gray-700 mb-2">
                                                New Files:
                                            </p>
                                            {uploadedFiles.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-2"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <FileText className="w-4 h-4 text-green-500 flex-shrink-0" />
                                                        <span className="text-sm text-gray-600 truncate">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-gray-400 flex-shrink-0">
                                                            ({(file.size / 1024).toFixed(2)} KB)
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button type="submit" className="btn-primary flex-1">
                                    {editingId ? "Update Case" : "Create Case"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="btn-outline flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            {/* View Modal */}
            {isViewModalOpen && selectedCase && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
                            <h3 className="text-2xl font-playfair font-bold">Case Details</h3>
                            <button
                                onClick={() => setIsViewModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-sm text-gray-500">Case Number</label>
                                    <p className="font-semibold text-lg">
                                        {selectedCase.caseNumber}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">District</label>
                                    <p className="font-semibold">{selectedCase.district}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Client Name</label>
                                    <p className="font-semibold">{selectedCase.clientName}</p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Mobile Number</label>
                                    <p className="font-semibold">{selectedCase.clientMobileNo}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500">Address</label>
                                    <p className="font-semibold">{selectedCase.clientAddress}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500">
                                        Case Description
                                    </label>
                                    <div className="text-gray-700 mt-1 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                                        {selectedCase.description}
                                    </div>
                                </div>
                                {selectedCase.isReferenced && (
                                    <>
                                        <div>
                                            <label className="text-sm text-gray-500">
                                                Reference Name
                                            </label>
                                            <p className="font-semibold">
                                                {selectedCase.referenceName}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500">
                                                Reference Mobile
                                            </label>
                                            <p className="font-semibold">
                                                {selectedCase.referenceMobileNo}
                                            </p>
                                        </div>
                                    </>
                                )}
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-500">Attached Files</label>
                                    {selectedCase.files && selectedCase.files.length > 0 ? (
                                        <div className="mt-2 space-y-2">
                                            {selectedCase.files.map((file, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                                >
                                                    <div className="flex items-center gap-2 flex-1">
                                                        <FileText className="w-4 h-4 text-secondary flex-shrink-0" />
                                                        <span className="text-sm text-gray-600 truncate">
                                                            {file.originalName}
                                                        </span>
                                                    </div>
                                                    <button
                                                        onClick={() => downloadFile(file)}
                                                        className="text-blue-600 hover:text-blue-800 ml-2 flex-shrink-0"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-400 mt-2">No files attached</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Created At</label>
                                    <p className="text-sm">
                                        {new Date(selectedCase.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm text-gray-500">Last Updated</label>
                                    <p className="text-sm">
                                        {new Date(selectedCase.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 mt-8">
                                <button
                                    onClick={() => setIsViewModalOpen(false)}
                                    className="btn-primary flex-1"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        setIsViewModalOpen(false);
                                        handleEdit(selectedCase);
                                    }}
                                    className="btn-outline flex-1"
                                >
                                    Edit Case
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default CaseInfoManager;
