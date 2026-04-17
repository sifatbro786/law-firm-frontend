import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { getImageUrl } from "../../utils/api";

const CaseStudiesCard = ({ caseStudy }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group h-[460px]"
        >
            <div className="relative overflow-hidden">
                <img
                    src={getImageUrl(caseStudy.image) || "https://via.placeholder.com/600x400"}
                    alt={caseStudy.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-semibold">
                        {caseStudy.category}
                    </span>
                </div>
            </div>
            <div className="p-6 flex flex-col justify-between">
                <h3 className="text-xl font-playfair font-bold mb-2 group-hover:text-secondary transition">
                    {caseStudy.title}
                </h3>
                <p className="text-gray-600 mb-2">
                    <span className="font-semibold">Client:</span> {caseStudy.client}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">{caseStudy.problem}</p>
                <Link
                    to={`/case-studies`}
                    onClick={(e) => {
                        e.preventDefault();
                        // Scroll to case studies page or open modal logic
                        window.location.href = "/case-studies";
                    }}
                    className="text-secondary font-semibold flex items-center gap-2 group-hover:gap-3 transition"
                >
                    Read Case Study <FaArrowRight />
                </Link>
            </div>
        </motion.div>
    );
};

export default CaseStudiesCard;
