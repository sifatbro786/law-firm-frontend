import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getImageUrl } from "../../utils/api";

const AttorneyCard = ({ attorney }) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
        >
            {attorney.image && (
                <img
                    src={getImageUrl(attorney.image)}
                    alt={attorney.name}
                    className="w-full h-64 object-cover object-top"
                />
            )}
            <div className="p-6">
                <h3 className="text-xl font-playfair font-bold mb-2">{attorney.name}</h3>
                <p className="text-secondary font-semibold mb-3">
                    {attorney.specialization?.join(", ")}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-3">{attorney.bio}</p>
                <Link
                    to={`/attorneys/${attorney._id}`}
                    className="text-secondary font-semibold hover:text-primary transition inline-flex items-center gap-2"
                >
                    View Profile →
                </Link>
            </div>
        </motion.div>
    );
};

export default AttorneyCard;
