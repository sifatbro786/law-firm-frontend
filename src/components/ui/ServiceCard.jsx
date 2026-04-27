import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
        >
            <div className="p-6 h-[220px] flex flex-col justify-between">
                {service.icon && (
                    <div className="text-4xl text-secondary mb-4">
                        <i className={service.icon}></i>
                    </div>
                )}
                <h3 className="text-xl font-playfair font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                <Link
                    to={`/services/${service.slug}`}
                    className="text-secondary font-semibold hover:text-primary transition inline-flex items-center gap-2"
                >
                    Learn More →
                </Link>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
