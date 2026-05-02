import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaExpand, FaCalendar, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";
import api, { getImageUrl } from "../utils/api";

const Gallery = () => {
    const [galleryImages, setGalleryImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchGalleryImages();
    }, []);

    const fetchGalleryImages = async () => {
        try {
            const response = await api.get("/api/gallery");
            setGalleryImages(response.data);
        } catch (error) {
            console.error("Failed to fetch gallery images:", error);
            setGalleryImages([]);
        } finally {
            setLoading(false);
        }
    };

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setSelectedImage(galleryImages[index]);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = "auto";
    };

    const navigateImage = (direction) => {
        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = galleryImages.length - 1;
        if (newIndex >= galleryImages.length) newIndex = 0;
        setCurrentIndex(newIndex);
        setSelectedImage(galleryImages[newIndex]);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedImage) return;
            if (e.key === "ArrowLeft") navigateImage(-1);
            if (e.key === "ArrowRight") navigateImage(1);
            if (e.key === "Escape") closeLightbox();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedImage, currentIndex]);

    if (loading) {
        return (
            <div className="bg-white min-h-screen">
                <div className="container mx-auto px-4 py-16 max-w-7xl">
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#027B7A]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <PageHeader title="Gallery" path="Gallery" />

            {/* Gallery Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Moments Captured
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            Our <span className="text-[#027B7A]">Journey</span> in Photos
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            A glimpse into our legal practice, events, and achievements
                        </p>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto mt-6 rounded-full" />
                    </motion.div>

                    {/* Gallery Grid */}
                    {galleryImages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleryImages.map((image, index) => (
                                <motion.div
                                    key={image._id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (index % 9) * 0.05 }}
                                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                >
                                    <div className="relative overflow-hidden aspect-[4/3]">
                                        {image.image ? (
                                            <img
                                                src={getImageUrl(image.image)}
                                                alt={image.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <span className="text-gray-400">No Image</span>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Expand Icon */}
                                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                            <FaExpand />
                                        </div>

                                        {/* Title Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                                                {image.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-white/70 text-sm">
                                                <FaCalendar className="w-3 h-3" />
                                                <span>
                                                    {new Date(image.createdAt).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        },
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📸</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                No Gallery Images Yet
                            </h3>
                            <p className="text-gray-500">
                                Gallery images will be added by the admin soon.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 bg-gradient-to-br from-[#ECF7FF] to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                            Our <span className="text-[#027B7A]">Impact</span> in Numbers
                        </h2>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#027B7A] mb-2">
                                10k+
                            </div>
                            <div className="text-gray-600 font-medium">Cases Won</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#027B7A] mb-2">
                                50+
                            </div>
                            <div className="text-gray-600 font-medium">Legal Events</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#027B7A] mb-2">
                                10k+
                            </div>
                            <div className="text-gray-600 font-medium">Happy Clients</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-bold text-[#027B7A] mb-2">
                                25+
                            </div>
                            <div className="text-gray-600 font-medium">Years Legacy</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage(-1);
                        }}
                        className="absolute left-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300"
                    >
                        <FaChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateImage(1);
                        }}
                        className="absolute right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300"
                    >
                        <FaChevronRight className="w-5 h-5" />
                    </button>

                    <div
                        className="max-w-5xl max-h-[90vh] p-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={getImageUrl(selectedImage.image)}
                            alt={selectedImage.title}
                            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                        />
                        <div className="text-center mt-4">
                            <h3 className="text-white text-xl font-semibold mb-1">
                                {selectedImage.title}
                            </h3>
                            <p className="text-white/60 text-sm">
                                {new Date(selectedImage.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Gallery;
