// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//     ArrowRight,
//     Shield,
//     Award,
//     Users,
//     Scale,
//     ChevronRight,
//     Clock,
//     Building2,
//     CheckCircle2,
// } from "lucide-react";
// import hero1 from "/hero1.jpeg";
// import hero2 from "/hero2.jpeg";
// import hero3 from "/hero3.jpg";
// import hero4 from "/hero4.jpg";
// import hero5 from "/hero5.jpg";
// import hero6 from "/hero6.jpg";
// import hero7 from "/hero7.png";

// const HeroSection = () => {
//     const stats = [
//         { value: "5+", label: "Expert Lawyers", icon: Users, color: "#027B7A" },
//         { value: "10k+", label: "Cases Won", icon: Scale, color: "#027B7A" },
//         { value: "25+", label: "Years Experience", icon: Award, color: "#027B7A" },
//     ];

//     const services = ["Family Law", "Criminal Defense"];

//     return (
//         <section className="relative bg-[#ECF7FF] h-screen overflow-hidden mt-14 sm:mt-20">
//             {/* Premium Animated Background */}
//             <div className="absolute inset-0 overflow-hidden">
//                 <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#027B7A]/10 to-transparent rounded-full blur-3xl animate-pulse" />
//                 <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#027B7A]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#027B7A]/5 rounded-full blur-3xl" />
//             </div>

//             <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center pt-24 pb-16">
//                 <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//                     {/* Left Content - Premium Text Section */}
//                     <div className="space-y-8">
//                         {/* Main Title with Unique Layout */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.1, duration: 0.5 }}
//                         >
//                             <h1 className="text-4xl sm:text-6xl lg:text-6xl font-bold leading-normal sm:leading-loose">
//                                 <span className="bg-gradient-to-r from-[#027B7A] to-[#04b0b0] bg-clip-text text-transparent">
//                                     Justice{" "}
//                                 </span>

//                                 <span className=" inline-block sm:my-2">
//                                     <span className="text-gray-950">Delivered</span>
//                                 </span>
//                                 <br />
//                                 <span className="text-gray-950">With Excellence</span>
//                             </h1>
//                         </motion.div>

//                         {/* Description with Highlight */}
//                         <motion.p
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.2, duration: 0.5 }}
//                             className="text-lg text-gray-600 leading-relaxed"
//                         >
//                             Since <span className="font-bold text-[#027B7A]">2001</span>, Jamil Law
//                             Consultant has been the cornerstone of legal excellence in Bangladesh.
//                             <span className="block mt-2">
//                                 <CheckCircle2 className="inline w-4 h-4 text-[#027B7A] mr-1" />
//                                 <span className="font-medium text-gray-700">
//                                     {" "}
//                                     10k+ successful cases
//                                 </span>{" "}
//                                 and counting.
//                             </span>
//                         </motion.p>

//                         {/* Service Tags */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.25, duration: 0.5 }}
//                             className="flex flex-wrap gap-2"
//                         >
//                             {services.map((service, idx) => (
//                                 <span
//                                     key={idx}
//                                     className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 shadow-sm border border-gray-100"
//                                 >
//                                     {service}
//                                 </span>
//                             ))}
//                         </motion.div>

//                         {/* CTA Buttons */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3, duration: 0.5 }}
//                             className="flex flex-wrap gap-4 pt-4"
//                         >
//                             <Link
//                                 to="/booking"
//                                 className="w-full sm:w-auto group relative inline-flex justify-center sm:justify-start items-center gap-3 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
//                             >
//                                 <span className="relative z-10">Online Consultation</span>
//                                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform relative z-10" />
//                                 <div className="absolute inset-0 bg-gradient-to-r from-[#04b0b0] to-[#027B7A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                             </Link>
//                             <Link
//                                 to="/about"
//                                 className="w-full sm:w-auto inline-flex justify-center sm:justify-start items-center gap-2 border-2 border-[#027B7A] bg-white/50 backdrop-blur-sm text-[#027B7A] px-8 py-4 rounded-xl font-bold hover:bg-[#027B7A] hover:text-white transition-all duration-300 hover:-translate-y-1"
//                             >
//                                 Our Legacy
//                                 <ChevronRight className="w-5 h-5" />
//                             </Link>
//                         </motion.div>

//                         {/* Stats with Unique Design */}
//                         <motion.div
//                             initial={{ opacity: 0, y: 20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.4, duration: 0.5 }}
//                             className="flex flex-wrap gap-6 pt-6"
//                         >
//                             {stats.map((stat, idx) => (
//                                 <div key={idx} className="flex items-center gap-3 group">
//                                     <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#027B7A]/10 to-[#04b0b0]/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
//                                         <stat.icon className="w-5 h-5 text-[#027B7A]" />
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-2xl text-gray-900">
//                                             {stat.value}
//                                         </p>
//                                         <p className="text-xs text-gray-500">{stat.label}</p>
//                                     </div>
//                                     {idx < stats.length - 1 && (
//                                         <div className="w-px h-8 bg-gray-200 ml-2 hidden sm:block" />
//                                     )}
//                                 </div>
//                             ))}
//                         </motion.div>

//                         {/* Trust Signal */}
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.5 }}
//                             className="flex items-center gap-4 pt-2"
//                         >
//                             <div className="flex -space-x-2">
//                                 {[1, 2, 3, 4].map((_, i) => (
//                                     <div
//                                         key={i}
//                                         className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white"
//                                     />
//                                 ))}
//                             </div>
//                             <p className="text-sm text-gray-500">
//                                 <span className="font-bold text-gray-700">10,000+</span> happy
//                                 clients
//                             </p>
//                             <div className="w-px h-4 bg-gray-300" />
//                             <div className="flex items-center gap-1">
//                                 <Clock className="w-3 h-3 text-[#027B7A]" />
//                                 <p className="text-xs text-gray-500">Response within 24h</p>
//                             </div>
//                         </motion.div>
//                     </div>

//                     {/* Right Content - Unique Tiered Image Layout */}
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.95 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         transition={{ duration: 0.7, delay: 0.2 }}
//                         className="relative"
//                     >
//                         {/* Asymmetrical Image Grid - Middle higher, left/right lower */}
//                         <div className="relative grid grid-cols-3 gap-4 items-end">
//                             {/* Left Image - Lower */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 60 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
//                                 className="relative"
//                             >
//                                 <div className="rounded-2xl overflow-hidden aspect-[3/4] group shadow-xl">
//                                     <img
//                                         src={hero2}
//                                         alt="Legal Team"
//                                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                 </div>
//                                 {/* Decorative Badge */}
//                                 <div className="absolute -bottom-3 -right-3 bg-white rounded-lg shadow-lg p-2 z-10">
//                                     <Building2 className="w-4 h-4 text-[#027B7A]" />
//                                 </div>
//                             </motion.div>

//                             {/* Middle Image - HIGHER (Main focal point) */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: -30 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
//                                 className="relative z-20"
//                             >
//                                 <div className="rounded-2xl overflow-hidden aspect-[3/4] md:mb-10 group shadow-2xl ring-2 ring-white/50">
//                                     <img
//                                         src={hero1}
//                                         alt="Jamil Hossain - Lead Attorney"
//                                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//                                     {/* Attorney Info Overlay */}
//                                     <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
//                                         <p className="font-bold text-lg text-center">
//                                             Noushad Jamil
//                                         </p>
//                                         <p className="text-sm opacity-90 text-center">
//                                             Founder & Lead Attorney
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {/* Premium Badge on Middle Image */}
//                                 <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] rounded-full p-2 shadow-lg">
//                                     <Shield className="w-4 h-4 text-white" />
//                                 </div>
//                             </motion.div>

//                             {/* Right Image - Lower */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 60 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.55, duration: 0.6, type: "spring" }}
//                                 className="relative"
//                             >
//                                 <div className="rounded-2xl overflow-hidden aspect-[3/4] group shadow-xl">
//                                     <img
//                                         src={hero3}
//                                         alt="Legal Excellence"
//                                         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                                     />
//                                     <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                                 </div>
//                                 <div className="absolute -bottom-3 -left-3 bg-white rounded-lg shadow-lg p-2 z-10">
//                                     <Award className="w-4 h-4 text-[#027B7A]" />
//                                 </div>
//                             </motion.div>

//                             <img
//                                 src={hero7}
//                                 alt="icon"
//                                 className="hidden md:block md:absolute bottom-[105%] right-[35%]"
//                             />
//                         </div>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* Premium Scroll Indicator */}
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1.5, duration: 1 }}
//                 className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
//             >
//                 <div className="flex flex-col items-center gap-2">
//                     <span className="text-[10px] text-gray-400 uppercase tracking-[3px] font-medium">
//                         Explore
//                     </span>
//                     <div className="w-5 h-8 border border-[#027B7A]/30 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
//                         <motion.div
//                             animate={{ y: [0, 12, 0] }}
//                             transition={{ repeat: Infinity, duration: 1.5 }}
//                             className="w-1 h-1.5 bg-[#027B7A] rounded-full mt-2"
//                         />
//                     </div>
//                 </div>
//             </motion.div>
//         </section>
//     );
// };

// export default HeroSection;

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Scale, ChevronRight, Clock, CheckCircle2 } from "lucide-react";
import hero1 from "/hero1.jpeg";
import hero2 from "/hero2.jpeg";
import hero3 from "/hero3.jpg";
import hero4 from "/hero4.jpg";
import hero5 from "/hero5.jpg";
import hero6 from "/hero6.jpg";
import hero7 from "/hero7.png";

const teamImages = [
    { src: hero2, name: "Shoukat Ara", role: "International Law" },
    { src: hero3, name: "HM Borhan", role: "Corporate Law" },
    { src: hero4, name: "Fatima Nasrin", role: "Corporate Law" },
    { src: hero5, name: "Fatema", role: "Family Law" },
    { src: hero6, name: "radha Krishna", role: "Corporate Law" },
];

// default peek positions (30%) — left side mirror of right
const defaultTransforms = [
    "translateX(0px)    rotate(0deg)   scale(1.15)",
    "translateX(-90px)  rotate(-7deg)  scale(1)",
    "translateX(90px)   rotate(7deg)   scale(1)",
    "translateX(-180px) rotate(-11deg) scale(0.9)",
    "translateX(180px)  rotate(11deg)  scale(0.9)",
    "translateX(270px) rotate(13deg) scale(0.75)",
];

const zIndexes = [10, 8, 8, 6, 6, 4];
const defaultOpacity = [1, 0.88, 0.88, 0.72, 0.72, 0.6];

// card order: main, left1, right1, left2, right2, left3
// maps teamImages index → card slot
const cardOrder = [
    { type: "main" },
    { type: "team", idx: 0 }, // left1
    { type: "team", idx: 1 }, // right1
    { type: "team", idx: 2 }, // left2
    { type: "team", idx: 3 }, // right2
    { type: "team", idx: 4 }, // right3
];

const stats = [
    { value: "5+", label: "Expert Lawyers", icon: Users },
    { value: "10k+", label: "Cases Won", icon: Scale },
    { value: "25+", label: "Years Experience", icon: Award },
];

const services = ["Family Law", "Criminal Defense", "Corporate Law", "Property Law"];

const HeroSection = () => {
    return (
        <section className="relative bg-[#ECF7FF] overflow-hidden mt-14 sm:mt-20">
            {/* Background blobs */}
            <div className="absolute md:hidden inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#027B7A]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#027B7A]/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center py-24">
                <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center w-full">
                    {/* ── LEFT: Text ── */}
                    <div className="space-y-6 xl:space-y-8 order-2 lg:order-1">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="text-4xl sm:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight"
                        >
                            <span className="bg-gradient-to-r from-[#027B7A] to-[#04b0b0] bg-clip-text text-transparent">
                                Justice{" "}
                            </span>
                            <span className="text-gray-950">Delivered</span>
                            <br />
                            <span className="text-gray-950">With Excellence</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-base lg:text-lg text-gray-600 leading-relaxed max-w-lg"
                        >
                            Since <span className="font-bold text-[#027B7A]">2001</span>, Jamil Law
                            Consultant has been the cornerstone of legal excellence in Bangladesh.
                            <span className="flex items-center gap-1.5 mt-2">
                                <CheckCircle2 className="w-4 h-4 text-[#027B7A] flex-shrink-0" />
                                <span className="font-medium text-gray-700">
                                    10k+ successful cases and counting.
                                </span>
                            </span>
                        </motion.p>

                        {/* Service Tags */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25, duration: 0.5 }}
                            className="flex flex-wrap gap-2"
                        >
                            {services.map((s, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-600 shadow-sm border border-gray-100"
                                >
                                    {s}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link
                                to="/booking"
                                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#027B7A] to-[#04b0b0] text-white px-7 py-3.5 rounded-xl font-bold hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
                            >
                                <span className="relative z-10">Online Consultation</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-[#04b0b0] to-[#027B7A] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                            <Link
                                to="/about"
                                className="inline-flex items-center gap-2 border-2 border-[#027B7A] bg-white/50 backdrop-blur-sm text-[#027B7A] px-7 py-3.5 rounded-xl font-bold hover:bg-[#027B7A] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Our Legacy
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="flex flex-wrap gap-6"
                        >
                            {stats.map((stat, i) => (
                                <div key={i} className="flex items-center gap-3 group">
                                    <div className="w-10 h-10 rounded-lg bg-[#027B7A]/10 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                                        <stat.icon className="w-5 h-5 text-[#027B7A]" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl text-gray-900">
                                            {stat.value}
                                        </p>
                                        <p className="text-xs text-gray-500">{stat.label}</p>
                                    </div>
                                    {i < stats.length - 1 && (
                                        <div className="w-px h-8 bg-gray-200 ml-3 hidden sm:block" />
                                    )}
                                </div>
                            ))}
                        </motion.div>

                        {/* Trust signal */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-wrap items-center gap-4"
                        >
                            <div className="flex -space-x-2">
                                {[...Array(4)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white"
                                    />
                                ))}
                            </div>
                            <p className="text-sm text-gray-500">
                                <span className="font-bold text-gray-700">10,000+</span> happy
                                clients
                            </p>
                            <div className="w-px h-4 bg-gray-300" />
                            <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-[#027B7A]" />
                                <p className="text-xs text-gray-500">Response within 24h</p>
                            </div>
                        </motion.div>
                    </div>

                    {/* ── RIGHT: Fan Stack ── */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative order-1 lg:order-3 flex justify-center"
                    >
                        <img
                            src={hero7}
                            alt=""
                            className="hidden lg:block absolute bottom-[95%] right-0 xl:right-[38%] h-28 w-28 object-contain opacity-70 z-10"
                        />

                        {/* Stack wrapper — overflow visible so fan cards show */}
                        <div className="group relative flex items-start justify-center w-[320px] sm:w-[400px] h-[360px] sm:h-[420px] cursor-pointer">
                            {cardOrder.map((card, slot) => {
                                const isMain = card.type === "main";
                                const src = isMain ? hero1 : teamImages[card.idx].src;
                                const name = isMain ? "Noushad Jamil" : teamImages[card.idx].name;
                                const role = isMain
                                    ? "Founder & Lead Attorney"
                                    : teamImages[card.idx].role;

                                return (
                                    <div
                                        key={slot}
                                        data-slot={slot}
                                        className="absolute top-16 md:top-12 w-[150px] sm:w-[170px] rounded-2xl overflow-hidden border-[3px] border-white transition-all duration-500"
                                        style={{
                                            zIndex: zIndexes[slot],
                                            transform: defaultTransforms[slot],
                                            opacity: defaultOpacity[slot],
                                            boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
                                        }}
                                    >
                                        <img
                                            src={src}
                                            alt={name}
                                            className="w-full h-[210px] sm:h-[240px] object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                                        <div
                                            className={`absolute bottom-0 ${card.idx === 1 || card.idx === 3 || card.idx === 4 ? "right-0" : "left-0"} px-2.5 py-2`}
                                        >
                                            <p className="text-white text-[10px] sm:text-[11px] font-bold leading-tight">
                                                {name}
                                            </p>
                                            <p className="text-white/70 text-[9px] mt-0.5">
                                                {role}
                                            </p>
                                        </div>
                                        {isMain && (
                                            <div className="absolute top-2.5 right-2.5 bg-[#027B7A] text-white text-[8px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                                                OWNER
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 z-20"
            >
                <span className="text-[10px] text-gray-400 uppercase tracking-[3px] font-medium">
                    Explore
                </span>
                <div className="w-5 h-8 border border-[#027B7A]/30 rounded-full flex justify-center bg-white/20 backdrop-blur-sm">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-1 h-1.5 bg-[#027B7A] rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
