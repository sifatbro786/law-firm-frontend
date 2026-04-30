import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Gavel from "/gavel.svg";
import Scales from "/scales.svg";

const PageHeader = ({ title = "Home", path = "Home" }) => {
    return (
        <section className="relative bg-[#ECF7FF] py-16 md:py-28 overflow-hidden flex items-center justify-center text-center mt-16 sm:mt-32">
            <div className="absolute top-1/2 -left-10 md:left-10 lg:left-20 -translate-y-1/2 opacity-5 md:opacity-10 hidden sm:block">
                <img
                    src={Scales}
                    alt=""
                    className="w-40 md:w-40 object-cover brightness-0 rotate-[20deg] md:rotate-[30deg] scale-125 md:scale-150"
                />
            </div>

            {/* Right Side Vector - Gavel */}
            <div className="absolute top-1/2 -right-10 md:right-10 lg:right-20 -translate-y-1/2 opacity-5 md:opacity-10 hidden sm:block">
                <img
                    src={Gavel}
                    alt=""
                    className="w-40 md:w-40 object-contain brightness-0 rotate-[-20deg] md:rotate-[-30deg] scale-125 md:scale-150"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Page Title - Responsive Font Sizes */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl  font-bold text-slate-900 mb-4 md:mb-6 tracking-tight px-2">
                        {title}
                    </h1>

                    {/* Breadcrumbs - Stacked on very small screens if needed, otherwise inline */}
                    <nav className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2 text-sm md:text-lg font-medium">
                        <Link
                            to="/"
                            className="text-gray-500 hover:text-[#027B7A] transition-colors duration-300"
                        >
                            Home
                        </Link>
                        <ChevronRight className="w-4 h-4 text-[#027B7A]/40" />
                        <span className="text-[#027B7A] font-semibold tracking-wide break-words max-w-[250px] sm:max-w-none">
                            {path}
                        </span>
                    </nav>
                </motion.div>
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#027B7A]/20 to-transparent" />
        </section>
    );
};

export default PageHeader;
