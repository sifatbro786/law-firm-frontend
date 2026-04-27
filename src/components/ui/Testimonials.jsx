import { useState, useEffect } from "react";
import {FaChevronLeft, FaChevronRight, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../../data/testimonial";

const Testimonials = () => {
    const [current, setCurrent] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        if (!autoplay) return;
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [autoplay, testimonials.length]);

    const next = () => {
        setAutoplay(false);
        setCurrent((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => setAutoplay(true), 10000);
    };

    const prev = () => {
        setAutoplay(false);
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => setAutoplay(true), 10000);
    };

    const StarRating = ({ rating }) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        return (
            <div className="flex justify-center gap-1">
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                ))}
                {hasHalfStar && <FaStarHalfAlt className="text-yellow-400 text-lg" />}
                {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                    <FaStar key={i} className="text-gray-300 text-lg" />
                ))}
            </div>
        );
    };

    return (
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-20 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary mb-4">
                        What Our Clients Say
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                        Trusted by hundreds of clients across Bangladesh
                    </p>
                    <div className="w-24 h-1 bg-secondary mx-auto mt-4 rounded-full"></div>
                </motion.div>

                <div className="relative max-w-5xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3">
                                {/* Image Section */}
                                {/* <div className="relative h-64 md:h-full">
                                    <img
                                        src={testimonials[current].image}
                                        alt={testimonials[current].name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                        <div className="text-white">
                                            <FaQuoteLeft className="text-3xl text-secondary mb-2" />
                                            <p className="text-sm font-semibold">
                                                {testimonials[current].position}
                                            </p>
                                        </div>
                                    </div>
                                </div> */}

                                {/* Content Section */}
                                <div className="col-span-3 text-center p-8 md:p-12">
                                    <div className="mb-4">
                                        <StarRating rating={testimonials[current].rating} />
                                    </div>

                                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6 italic">
                                        "{testimonials[current].text}"
                                    </p>

                                    <div className="border-t pt-6">
                                        <h3 className="text-2xl font-playfair font-bold text-primary">
                                            {testimonials[current].name}
                                        </h3>
                                        <p className="text-secondary font-semibold mt-1">
                                            {testimonials[current].case}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-white text-primary w-12 h-12 rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center z-20"
                        aria-label="Previous testimonial"
                    >
                        <FaChevronLeft className="text-xl" />
                    </button>

                    <button
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-white text-primary w-12 h-12 rounded-full shadow-lg hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center z-20"
                        aria-label="Next testimonial"
                    >
                        <FaChevronRight className="text-xl" />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center mt-10 gap-3">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setAutoplay(false);
                                setCurrent(idx);
                                setTimeout(() => setAutoplay(true), 10000);
                            }}
                            className={`transition-all duration-300 rounded-full ${
                                idx === current
                                    ? "w-10 h-3 bg-secondary"
                                    : "w-3 h-3 bg-gray-300 hover:bg-gray-400"
                            }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Trust Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="hidden sm:flex justify-center mt-12"
                >
                    <div className="flex items-center gap-8 bg-white rounded-full px-8 py-3 shadow-md">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">10k+</div>
                            <div className="text-sm text-gray-500">Happy Clients</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">95%</div>
                            <div className="text-sm text-gray-500">Success Rate</div>
                        </div>
                        <div className="w-px h-8 bg-gray-300"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-primary">25+</div>
                            <div className="text-sm text-gray-500">Years Experience</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Testimonials;
