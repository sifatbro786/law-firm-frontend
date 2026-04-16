import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGavel, FaHome } from "react-icons/fa";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary to-accent flex items-center justify-center py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center max-w-2xl mx-auto"
            >
                <div className="inline-flex items-center justify-center w-32 h-32 bg-secondary rounded-full mb-8">
                    <FaGavel className="text-5xl text-primary" />
                </div>
                <h1 className="text-8xl font-playfair font-bold text-white mb-4">404</h1>
                <h2 className="text-3xl font-playfair font-bold text-white mb-4">Page Not Found</h2>
                <p className="text-gray-300 text-lg mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>
                <Link to="/" className="inline-flex items-center gap-2 btn-primary">
                    <FaHome /> Back to Home
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
