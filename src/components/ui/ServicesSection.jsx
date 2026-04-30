import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FaArrowRight,
    FaStar,
    FaClock,
    FaUsers,
    FaGavel,
    FaCheckCircle,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa";
import { useState, useEffect } from "react";

// Import images (replace with your actual image paths)
import writImage from "/services/writ-petition.jfif";
import civilRevisionImage from "/services/civil-revision.jfif";
import contemptImage from "/services/contempt-petition.jfif";
import civilAppealImage from "/services/civil-appeal.jfif";
import leaveToAppealImage from "/services/leave-to-appeal.jfif";
import reviewImage from "/services/review-petition.jfif";
import stayOrderImage from "/services/stay-order.jfif";

const ServicesSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [slidesToShow, setSlidesToShow] = useState(3);
    const [dragStart, setDragStart] = useState(0);
    const [dragEnd, setDragEnd] = useState(0);

    const services = [
        {
            _id: "1",
            title: "Writ Petition",
            slug: "writ-petition",
            image: writImage,
            description:
                "Constitutional remedy for violation of fundamental rights. Expert representation in High Court Division for enforcing your legal rights.",
            features: [
                "Constitutional Rights",
                "Public Interest Litigation",
                "Mandamus & Certiorari",
                "Quo Warranto",
            ],
            category: "Constitutional Law",
        },
        {
            _id: "2",
            title: "Civil Revision and Appeal",
            slug: "civil-revision-and-appeal",
            image: civilRevisionImage,
            description:
                "Challenge lower court decisions through systematic review and appellate procedures before higher courts.",
            features: [
                "Revisional Jurisdiction",
                "Appellate Proceedings",
                "Case Review",
                "Legal Precedents",
            ],
            category: "Civil Law",
        },
        {
            _id: "3",
            title: "Contempt Petition",
            slug: "contempt-petition",
            image: contemptImage,
            description:
                "Seek legal action against willful disobedience of court orders and judgments.",
            features: [
                "Civil Contempt",
                "Criminal Contempt",
                "Enforcement of Orders",
                "Court Protection",
            ],
            category: "Constitutional Law",
        },
        {
            _id: "4",
            title: "Civil Appeal",
            slug: "civil-appeal",
            image: civilAppealImage,
            description:
                "Expert appellate representation for challenging civil court decisions before the High Court Division.",
            features: ["First Appeal", "Second Appeal", "Cross Objections", "Decree Challenges"],
            category: "Civil Law",
        },
        {
            _id: "5",
            title: "Leave to Appeal",
            slug: "leave-to-appeal",
            image: leaveToAppealImage,
            description:
                "Specialized petition seeking permission to appeal before the Appellate Division on significant legal questions.",
            features: [
                "Special Leave Petition",
                "Appellate Division",
                "Legal Questions",
                "Case Significance",
            ],
            category: "Appellate Law",
        },
        {
            _id: "6",
            title: "Review Petition",
            slug: "review-petition",
            image: reviewImage,
            description:
                "Request court to review its own judgment on grounds of apparent errors or new evidence.",
            features: ["Judgment Review", "Error Rectification", "New Evidence", "Limited Scope"],
            category: "Civil Procedure",
        },
        {
            _id: "7",
            title: "Stay Order Matters",
            slug: "stay-order-matters",
            image: stayOrderImage,
            description:
                "Immediate relief through interim orders to maintain status quo during pending proceedings.",
            features: [
                "Interim Relief",
                "Status Quo Orders",
                "Injunction Matters",
                "Urgent Hearings",
            ],
            category: "Civil Procedure",
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSlidesToShow(1);
            } else if (window.innerWidth < 1024) {
                setSlidesToShow(2);
            } else {
                setSlidesToShow(3);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalSlides = services.length;
    const maxIndex = totalSlides - slidesToShow;

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    const handleMouseDown = (e) => {
        setDragStart(e.clientX);
    };

    const handleMouseUp = (e) => {
        setDragEnd(e.clientX);
        if (dragStart - dragEnd > 50) {
            nextSlide();
        }
        if (dragEnd - dragStart > 50) {
            prevSlide();
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="py-20 lg:py-28 bg-[#ECF7FF] relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#027B7A]/5 to-transparent rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-[#027B7A]/5 to-transparent rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center mb-12"
                >
                    <span className="inline-flex items-center gap-2 bg-[#027B7A]/10 text-[#027B7A] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                        <FaStar className="w-3 h-3" />
                        Our Expertise
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                        Legal Services We <br />
                        <span className="text-[#027B7A]">Specialize In</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] mx-auto rounded-full mb-6" />
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Over 15 years of specialized expertise in Bangladesh's highest courts
                    </p>
                </motion.div>

                {/* Top Section with Title and Buttons */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-10 gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                            Explore Our <span className="text-[#027B7A]">Specializations</span>
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                            {currentIndex + 1} -{" "}
                            {Math.min(currentIndex + slidesToShow, totalSlides)} of {totalSlides}{" "}
                            services
                        </p>
                    </div>

                    {/* Modern Circular Buttons */}
                    <div className="flex gap-2">
                        <button
                            onClick={prevSlide}
                            disabled={currentIndex === 0}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                currentIndex === 0
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#027B7A] hover:bg-[#027B7A] hover:text-white shadow-md hover:shadow-xl"
                            }`}
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={nextSlide}
                            disabled={currentIndex >= maxIndex}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                currentIndex >= maxIndex
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : "bg-white text-[#027B7A] hover:bg-[#027B7A] hover:text-white shadow-md hover:shadow-xl"
                            }`}
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Carousel Container with Mouse Drag */}
                <div
                    className="overflow-hidden cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <motion.div
                        animate={{ x: `-${currentIndex * (100 / slidesToShow)}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex gap-6"
                        style={{ width: `${(services.length / slidesToShow) * 100}%` }}
                    >
                        {services.map((service) => (
                            <div
                                key={service._id}
                                className="flex-shrink-0"
                                style={{
                                    width: `calc(${100 / slidesToShow}% - ${((slidesToShow - 1) * 24) / slidesToShow}px)`,
                                }}
                            >
                                <Link
                                    to={`/services/${service.slug}`}
                                    className="block group h-full"
                                >
                                    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                        {/* Image Section */}
                                        <div className="relative h-56 overflow-hidden">
                                            <img
                                                src={service.image}
                                                alt={service.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                            {/* Category Badge */}
                                            <div className="absolute top-4 left-4 z-10">
                                                <span className="bg-white/90 backdrop-blur-sm text-[#027B7A] text-xs font-semibold px-3 py-1 rounded-full">
                                                    {service.category}
                                                </span>
                                            </div>

                                            {/* Title Overlay */}
                                            <div className="absolute bottom-4 left-4 right-4 z-10">
                                                <h3 className="text-xl font-bold text-white mb-1">
                                                    {service.title}
                                                </h3>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                                {service.description}
                                            </p>

                                            <div className="space-y-2 mb-6">
                                                {service.features
                                                    .slice(0, 3)
                                                    .map((feature, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="flex items-center gap-2 text-sm"
                                                        >
                                                            <FaCheckCircle className="w-3.5 h-3.5 text-[#027B7A] flex-shrink-0" />
                                                            <span className="text-gray-600">
                                                                {feature}
                                                            </span>
                                                        </div>
                                                    ))}
                                                {service.features.length > 3 && (
                                                    <div className="flex items-center gap-2 text-sm text-[#027B7A] ml-5">
                                                        <span>
                                                            +{service.features.length - 3} more
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-4 border-t border-gray-100">
                                                <div className="inline-flex items-center gap-2 text-[#027B7A] font-semibold text-sm group-hover:gap-3 transition-all">
                                                    Learn More
                                                    <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Hover Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#027B7A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Progress Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`transition-all duration-300 rounded-full cursor-pointer ${
                                currentIndex === idx
                                    ? "w-8 h-2 bg-[#027B7A]"
                                    : "w-2 h-2 bg-gray-300 hover:bg-[#027B7A]/50"
                            }`}
                        />
                    ))}
                </div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="mt-16 text-center"
                >
                    <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto relative overflow-hidden border border-gray-100">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#027B7A]/5 to-transparent rounded-full blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#027B7A]/5 to-transparent rounded-full blur-2xl" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-center gap-2 mb-3">
                                <FaClock className="text-[#027B7A] w-5 h-5" />
                                <span className="text-sm font-semibold text-[#027B7A]">
                                    Need Legal Assistance?
                                </span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                                Let's Discuss Your Case
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Each case is unique. Schedule a consultation to get personalized
                                legal advice.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center">
                                <Link
                                    to="/booking"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    Book Consultation
                                    <FaArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Consultation Fee:{" "}
                                <span className="font-semibold text-[#027B7A]">5,000 BDT</span>{" "}
                                (One-time)
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Trust Signal */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center"
                >
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#027B7A]/10 flex items-center justify-center">
                            <FaGavel className="w-4 h-4 text-[#027B7A]" />
                        </div>
                        <span className="text-sm text-gray-600">15+ Years Experience</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 hidden sm:block" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#027B7A]/10 flex items-center justify-center">
                            <FaUsers className="w-4 h-4 text-[#027B7A]" />
                        </div>
                        <span className="text-sm text-gray-600">10,000+ Cases Handled</span>
                    </div>
                    <div className="w-px h-4 bg-gray-300 hidden sm:block" />
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#027B7A]/10 flex items-center justify-center">
                            <FaCheckCircle className="w-4 h-4 text-[#027B7A]" />
                        </div>
                        <span className="text-sm text-gray-600">High Court & Appellate Expert</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
