// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

// const ServiceCard = ({ service }) => {
//     return (
//         <motion.div
//             whileHover={{ y: -5 }}
//             transition={{ duration: 0.3 }}
//             className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
//         >
//             <div className="p-6 h-[220px] flex flex-col justify-between">
//                 {service.icon && (
//                     <div className="text-4xl text-secondary mb-4">
//                         <i className={service.icon}></i>
//                     </div>
//                 )}
//                 <h3 className="text-xl font-playfair font-bold mb-3">{service.title}</h3>
//                 <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
//                 <Link
//                     to={`/services/${service.slug}`}
//                     className="text-secondary font-semibold hover:text-primary transition inline-flex items-center gap-2"
//                 >
//                     Learn More →
//                 </Link>
//             </div>
//         </motion.div>
//     );
// };

// export default ServiceCard;

// ServiceCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaBalanceScale } from "react-icons/fa";

const ServiceCard = ({ service }) => {
    // Placeholder image - replace with actual service.image when available
    const imageUrl =
        service.image ||
        `https://placehold.co/600x400/ECF7FF/027B7A?text=${encodeURIComponent(service.title)}`;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
        >
            {/* Image Section */}
            <div className="relative h-56 overflow-hidden bg-gradient-to-br from-[#027B7A]/10 to-[#ECF7FF]">
                <img
                    src={imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon Overlay */}
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center text-[#027B7A] text-xl group-hover:bg-[#027B7A] group-hover:text-white transition-all duration-300">
                    <FaBalanceScale />
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                <h3 className="text-xl font-playfair font-bold text-gray-900 mb-2 group-hover:text-[#027B7A] transition-colors line-clamp-2">
                    {service.title}
                </h3>
                <p className="text-gray-500 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {service.description}
                </p>

                {/* Tags/Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#ECF7FF] text-[#027B7A] font-medium">
                        Legal
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 font-medium">
                        Expert
                    </span>
                </div>

                <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-[#027B7A] font-semibold hover:gap-3 transition-all duration-300 group/link"
                >
                    <span>Learn More</span>
                    <FaArrowRight className="text-sm group-hover/link:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
