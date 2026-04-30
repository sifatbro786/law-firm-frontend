import { motion } from "framer-motion";
import { HelpCircle, MessageCircle } from "lucide-react";
import FAQAccordion from "./FAQAccordion";
import { faqs } from "../../data/faqs";
import { Link } from "react-router-dom";

export default function FAQSection() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section className="py-20 lg:py-28 bg-[#ECF7FF] overflow-hidden relative">
            {/* Premium Background Decor */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-40 right-10 w-72 h-72 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#027B7A]/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#027B7A]/[0.02] rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left Side: Premium Content */}
                    <motion.div
                        className="lg:col-span-5 space-y-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants} className="space-y-5">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 border border-[#027B7A]/20">
                                <HelpCircle className="w-4 h-4 text-[#027B7A]" />
                                <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                    FAQ & Support
                                </span>
                            </div>
                            <h2 className="text-4xl md:text-5xl lg:text-5xl font-playfair font-bold text-gray-900 leading-[1.2]">
                                Questions? We Have{" "}
                                <span className="text-[#027B7A] relative inline-block">
                                    Answers.
                                    <svg
                                        className="absolute -bottom-2 left-0 w-full h-2 text-[#027B7A]/20"
                                        viewBox="0 0 200 8"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M0,5 Q50,0 100,5 Q150,10 200,5"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                        />
                                    </svg>
                                </span>
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Clear answers to your legal concerns. We believe in transparency and
                                making the legal process accessible for everyone.
                            </p>
                        </motion.div>

                        {/* Premium Contact Card - No stats */}
                        <motion.div
                            variants={itemVariants}
                            className="relative p-8 rounded-2xl bg-gradient-to-br from-white to-[#ECF7FF] shadow-xl border border-[#027B7A]/10 overflow-hidden group"
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#027B7A]/5 group-hover:scale-150 transition-transform duration-700" />
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-all duration-500">
                                <MessageCircle size={100} className="text-[#027B7A]" />
                            </div>

                            <div className="relative z-10">
                                <h4 className="text-xl font-bold text-gray-900 mb-2 font-playfair">
                                    Still have questions?
                                </h4>
                                <p className="text-gray-500 mb-6 leading-relaxed">
                                    Our legal team is ready to assist you with a personalized
                                    consultation.
                                </p>
                                <Link
                                    to="/contact"
                                    className="group/link w-fit px-6 py-3 bg-[#027B7A] text-white rounded-xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-[#027B7A]/20 hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
                                >
                                    <span>Contact Experts</span>
                                    <svg
                                        className="w-4 h-4 group-hover/link:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Premium Accordion */}
                    <motion.div
                        className="lg:col-span-7"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <div className="bg-white rounded-3xl p-5 md:p-8 shadow-2xl shadow-[#027B7A]/5 border border-[#027B7A]/10">
                            <FAQAccordion faqs={faqs.slice(0, 5)} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
