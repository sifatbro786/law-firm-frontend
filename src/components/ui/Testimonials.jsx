import { useState, useEffect, useRef } from "react";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Sample data structure - replace with your actual data import
const testimonials = [
    {
        id: 1,
        name: "Rashed Karim",
        position: "Managing Director, Karim Group",
        text: "Jamil Law Consultant provided exceptional legal guidance for our corporate merger. Their attention to detail and strategic approach saved us months of potential litigation. Truly the best legal team in Bangladesh.",
        rating: 5,
        case: "Corporate Law",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    },
    {
        id: 2,
        name: "Fatema Begum",
        position: "Client",
        text: "During our family property dispute, Advocate Jamil showed genuine care and fought tirelessly for our rights. His human-centered approach made all the difference in a difficult time.",
        rating: 5,
        case: "Property Law",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
        id: 3,
        name: "Tanvir Hossain",
        position: "CEO, Tech Solutions Ltd.",
        text: "The team's expertise in writ petitions is unmatched. They won our case against the regulatory authority with compelling arguments. Highly recommended for any corporate legal needs.",
        rating: 5,
        case: "Writ Petition",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [direction, setDirection] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (autoplay) {
            intervalRef.current = setInterval(() => {
                setDirection(1);
                setCurrentIndex((prev) => (prev + 1) % testimonials.length);
            }, 6000);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [autoplay, testimonials.length]);

    const handleNext = () => {
        setAutoplay(false);
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setAutoplay(true), 8000);
    };

    const handlePrev = () => {
        setAutoplay(false);
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setAutoplay(true), 8000);
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.95,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.23, 0.75, 0.32, 0.98],
            },
        },
        exit: (direction) => ({
            x: direction > 0 ? -300 : 300,
            opacity: 0,
            scale: 0.95,
            transition: {
                duration: 0.5,
                ease: [0.23, 0.75, 0.32, 0.98],
            },
        }),
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#ECF7FF] via-white to-[#ECF7FF]">
            {/* Minimalist background accent */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#027B7A]/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                {/* Section Header - Clean and minimal */}
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-xs uppercase tracking-[3px] text-[#027B7A] font-semibold">
                            Client Voices
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mt-6 mb-4"
                    >
                        What Our <span className="text-[#027B7A]">Clients</span> Say
                    </motion.h2>

                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "6rem" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="h-1 bg-[#027B7A] rounded-full mx-auto mt-6"
                    />
                </div>

                {/* Main Slider */}
                <div className="relative max-w-5xl mx-auto">
                    <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                        <div className="absolute top-8 left-8 z-10">
                            <FaQuoteLeft className="text-[#027B7A]/15 text-6xl" />
                        </div>

                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="min-h-[400px] md:min-h-[380px]"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                                    {/* Left - Visual Quote Area */}
                                    <div className="md:col-span-2 bg-gradient-to-br from-[#027B7A] to-[#025c5c] p-8 md:p-10 flex flex-col justify-between min-h-[280px] md:min-h-full">
                                        <div>
                                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
                                                <FaQuoteLeft className="text-white text-xl" />
                                            </div>
                                            <div className="text-white/80 text-sm tracking-wider">
                                                SERVICE #{String(currentIndex + 1).padStart(2, "0")}
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="text-5xl text-white mb-2">
                                                {currentTestimonial.rating}.0
                                            </div>
                                            <div className="flex gap-1 mb-4">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg
                                                        key={i}
                                                        className={`w-4 h-4 ${i < currentTestimonial.rating ? "text-yellow-300 fill-current" : "text-white/30 fill-current"}`}
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <div className="text-white/70 text-sm uppercase tracking-wide">
                                                {currentTestimonial.case}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right - Testimonial Content */}
                                    <div className="md:col-span-3 p-8 md:p-10 bg-white">
                                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                                            "{currentTestimonial.text}"
                                        </p>

                                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                                                {currentTestimonial.image ? (
                                                    <img
                                                        src={currentTestimonial.image}
                                                        alt={currentTestimonial.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#027B7A]/20 to-[#027B7A]/10 flex items-center justify-center">
                                                        <span className="text-[#027B7A] font-bold text-lg">
                                                            {currentTestimonial.name.charAt(0)}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-lg">
                                                    {currentTestimonial.name}
                                                </h4>
                                                <p className="text-gray-500 text-sm">
                                                    {currentTestimonial.position}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons - Clean minimal */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 lg:-translate-x-5 bg-white border border-gray-200 text-gray-700 w-10 h-10 rounded-full shadow-md hover:bg-[#027B7A] hover:text-white hover:border-[#027B7A] transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#027B7A]/50"
                        aria-label="Previous testimonial"
                    >
                        <FaChevronLeft className="text-sm group-hover:translate-x-[-1px] transition-transform" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 lg:translate-x-5 bg-white border border-gray-200 text-gray-700 w-10 h-10 rounded-full shadow-md hover:bg-[#027B7A] hover:text-white hover:border-[#027B7A] transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-[#027B7A]/50"
                        aria-label="Next testimonial"
                    >
                        <FaChevronRight className="text-sm group:translate-x-[1px] transition-transform" />
                    </button>
                </div>

                {/* Progress Indicator - Minimal dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setAutoplay(false);
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                                if (intervalRef.current) clearInterval(intervalRef.current);
                                setTimeout(() => setAutoplay(true), 8000);
                            }}
                            className={`transition-all duration-300 rounded-full ${
                                idx === currentIndex
                                    ? "w-8 h-1.5 bg-[#027B7A]"
                                    : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
