import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const FAQAccordion = ({ faqs }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                    <button
                        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition"
                        onClick={() => toggleFAQ(index)}
                    >
                        <span className="font-semibold text-lg">{faq.question}</span>
                        {openIndex === index ? <FaMinus /> : <FaPlus />}
                    </button>
                    {openIndex === index && (
                        <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FAQAccordion;
