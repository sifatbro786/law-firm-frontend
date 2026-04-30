import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQAccordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-[#027B7A]/10 last:border-0"
                >
                    <button
                        onClick={() => toggleQuestion(index)}
                        className="w-full flex justify-between items-center py-5 text-left group"
                    >
                        <span
                            className={`text-base md:text-lg font-semibold transition-all duration-300 ${
                                openIndex === index
                                    ? "text-[#027B7A]"
                                    : "text-gray-700 group-hover:text-[#027B7A]"
                            }`}
                        >
                            {faq.question}
                        </span>
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                                openIndex === index
                                    ? "bg-[#027B7A] text-white"
                                    : "bg-gray-100 text-gray-500 group-hover:bg-[#027B7A]/10"
                            }`}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                        {openIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{
                                    height: "auto",
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                                        opacity: { duration: 0.3, delay: 0.1 },
                                    },
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                                        opacity: { duration: 0.2 },
                                    },
                                }}
                                className="overflow-hidden"
                            >
                                <div className="pb-5 pr-6">
                                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                        {faq.answer}
                                    </p>

                                    {/* Optional: Add a small decorative element */}
                                    {faq.highlight && (
                                        <div className="mt-3 pt-3 border-t border-[#027B7A]/10">
                                            <span className="text-xs font-medium text-[#027B7A] bg-[#027B7A]/10 px-2 py-1 rounded">
                                                {faq.highlight}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </div>
    );
};

export default FAQAccordion;
