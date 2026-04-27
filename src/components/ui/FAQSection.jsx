import FAQAccordion from "./FAQAccordion";
import faqImage from "/faq.png";
import { motion } from "framer-motion";
import { faqs } from "../../data/faqs";

export default function FAQSection() {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="py-8 sm:py-20 bg-gray-50">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 mb-5 sm:mb-10">
                            Find answers to common questions about our legal services and processes
                        </p>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <FAQAccordion faqs={faqs.slice(0, 4)} />
                        </motion.div>
                    </motion.div>

                    <img
                        src={faqImage}
                        alt="Frequently Asked Questions"
                        className="w-auto h-auto object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
