import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import courtImage from "/court.webp";

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-r from-primary to-accent text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10 -z-10">
                <div className="absolute top-0 left-0 w-64 h-64 bg-secondary rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary rounded-full filter blur-3xl"></div>
            </div>

            <div className="container-custom py-20 z-[100] flex flex-col md:flex-row items-center gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 leading-tight">
                        Expert Legal Solutions for Your Business & Family
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                        With over 20 years of experience in Bangladeshi law, we provide trusted
                        legal counsel and representation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/booking" className="btn-primary text-lg">
                            Book Consultation
                        </Link>
                        <Link to="/about" className="btn-outline text-lg">
                            Learn More
                        </Link>
                    </div>
                </motion.div>

                <img
                    src={courtImage}
                    alt="High Court Dhaka"
                    className="w-full h-[600px] object-cover rounded-lg"
                />
            </div>
        </section>
    );
};

export default HeroSection;
