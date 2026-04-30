import { motion } from "framer-motion";
import { FaExpand, FaCalendar, FaUserTie } from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";

const Gallery = () => {
    const galleryImages = [
        {
            id: 1,
            title: "Supreme Court Victory Celebration",
            category: "Events",
            date: "March 15, 2024",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop",
            description: "Celebrating a landmark victory at the Supreme Court",
        },
        {
            id: 2,
            title: "Legal Workshop 2024",
            category: "Workshop",
            date: "February 10, 2024",
            image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
            description: "Conducting legal awareness workshop for young professionals",
        },
        {
            id: 3,
            title: "Client Consultation Session",
            category: "Consultation",
            date: "January 25, 2024",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop",
            description: "Providing expert legal advice to corporate clients",
        },
        {
            id: 4,
            title: "Award Ceremony",
            category: "Awards",
            date: "December 5, 2023",
            image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop",
            description: "Receiving Excellence in Legal Practice Award",
        },
        {
            id: 5,
            title: "Legal Aid Camp",
            category: "Community",
            date: "November 20, 2023",
            image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
            description: "Free legal aid camp for underprivileged communities",
        },
        {
            id: 6,
            title: "Team Meeting",
            category: "Team",
            date: "October 15, 2023",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
            description: "Strategic planning session with legal team",
        },
        {
            id: 7,
            title: "Courtroom Presentation",
            category: "Court",
            date: "September 8, 2023",
            image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&h=400&fit=crop",
            description: "Presenting arguments at the High Court",
        },
        {
            id: 8,
            title: "Client Success Story",
            category: "Success",
            date: "August 22, 2023",
            image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop",
            description: "Celebrating client's successful case resolution",
        },
        {
            id: 9,
            title: "Legal Seminar",
            category: "Seminar",
            date: "July 30, 2023",
            image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
            description: "Speaking at International Legal Seminar",
        },
    ];

    const categories = [
        "All",
        "Events",
        "Workshop",
        "Consultation",
        "Awards",
        "Community",
        "Team",
        "Court",
        "Success",
        "Seminar",
    ];

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
                            A glimpse into our legal practice, events, and successes
                        </p>
                        <div className="w-16 h-1 bg-[#027B7A] mx-auto mt-6 rounded-full" />
                    </motion.div>

                    {/* Category Filter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-[#027B7A] hover:text-white"
                            >
                                {category}
                            </button>
                        ))}
                    </motion.div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {galleryImages.map((image, index) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="relative overflow-hidden h-64">
                                    <img
                                        src={image.image}
                                        alt={image.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Expand Icon */}
                                    <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                                        <FaExpand />
                                    </button>

                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#027B7A] text-white text-xs font-semibold">
                                        {image.category}
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
                                            <div className="flex items-center gap-1">
                                                <FaCalendar className="w-3 h-3" />
                                                <span>{image.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FaUserTie className="w-3 h-3" />
                                                <span>Jamil Law</span>
                                            </div>
                                        </div>
                                        <h3 className="text-white font-bold text-lg mb-1">
                                            {image.title}
                                        </h3>
                                        <p className="text-white/80 text-sm">{image.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 md:py-24 bg-[#ECF7FF]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#027B7A] mb-2">10000+</div>
                            <div className="text-gray-600">Cases Won</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#027B7A] mb-2">50+</div>
                            <div className="text-gray-600">Legal Events</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#027B7A] mb-2">1000+</div>
                            <div className="text-gray-600">Happy Clients</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-[#027B7A] mb-2">25+</div>
                            <div className="text-gray-600">Years Legacy</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Gallery;
