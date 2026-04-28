import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Star,
    Check,
    Phone,
    Mail,
    MapPin,
    // Facebook,
    // Instagram,
    // Twitter,
    // Youtube,
    Calendar,
    User,
    Quote,
    ArrowRight,
    Play,
    Award,
    Users,
    ThumbsUp,
    BookOpen,
    Heart,
    Leaf,
    Sun,
    Clock,
    Globe,
    GraduationCap,
    Building,
    Sparkles,
    LogIn,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

// ============================================================
// FONTS & GLOBAL STYLES (inject via useEffect)
// ============================================================
const injectFonts = () => {
    const link1 = document.createElement("link");
    link1.href =
        "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap";
    link1.rel = "stylesheet";
    document.head.appendChild(link1);
};

// ============================================================
// DATA
// ============================================================
const programCards = [
    {
        id: 1,
        name: "Early Reading & Play",
        tag: "POPULAR",
        features: [
            "Phonics-based learning",
            "Interactive story sessions",
            "Vocabulary building games",
        ],
        image: "https://picsum.photos/id/100/400/200",
        color: "bg-amber-50",
    },
    {
        id: 2,
        name: "Language & Communication",
        tag: "NEW",
        features: ["Bilingual exposure", "Speech development", "Social expression activities"],
        image: "https://picsum.photos/id/20/400/200",
        color: "bg-emerald-50",
    },
    {
        id: 3,
        name: "After School Care",
        tag: "",
        features: ["Homework support", "Creative arts & crafts", "Outdoor free play"],
        image: "https://picsum.photos/id/30/400/200",
        color: "bg-orange-50",
    },
];

const educators = [
    {
        name: "Dr. Emily Chen",
        title: "Lead Early Childhood Educator",
        bio: "15+ years inspiring young minds, Montessori certified.",
        image: "https://picsum.photos/id/64/400/500",
        specialty: "Montessori & Play Therapy",
    },
    {
        name: "Michael Thompson",
        title: "Creative Arts Director",
        bio: "Former children's theater performer, nurturing creativity.",
        image: "https://picsum.photos/id/91/400/500",
        specialty: "Music & Movement",
    },
    {
        name: "Sarah Williams",
        title: "Literacy Specialist",
        bio: "Reading recovery expert, author of children's books.",
        image: "https://picsum.photos/id/84/400/500",
        specialty: "Early Literacy",
    },
    {
        name: "James Rodriguez",
        title: "Outdoor Learning Coordinator",
        bio: "Nature-based education advocate, forest school leader.",
        image: "https://picsum.photos/id/99/400/500",
        specialty: "Outdoor Exploration",
    },
];

const testimonials = [
    {
        name: "Jessica & Mark Wilson",
        child: "Sophia (Pre-K)",
        rating: 5,
        text: "Edefy has been a second home for our daughter. The teachers genuinely care about each child’s emotional and academic growth.",
        image: "https://picsum.photos/id/27/100/100",
    },
    {
        name: "David Park",
        child: "Leo (Kindergarten)",
        rating: 5,
        text: "We've seen incredible progress in Leo’s reading and social skills. The play-based approach works wonders!",
        image: "https://picsum.photos/id/22/100/100",
    },
    {
        name: "Rachel Green",
        child: "Emma (Preschool)",
        rating: 5,
        text: "Warm, safe, and so engaging. The facilities are amazing and the staff are truly passionate about early education.",
        image: "https://picsum.photos/id/29/100/100",
    },
];

const events = [
    {
        title: "Spring Garden Festival",
        date: "APR 12",
        description: "Outdoor planting & crafts day",
        image: "https://picsum.photos/id/15/400/250",
    },
    {
        title: "Parent-Child Reading Night",
        date: "APR 18",
        description: "Interactive storytelling session",
        image: "https://picsum.photos/id/24/400/250",
    },
    {
        title: "STEAM Discovery Fair",
        date: "APR 25",
        description: "Science & art exploration",
        image: "https://picsum.photos/id/96/400/250",
    },
    {
        title: "Art in the Park",
        date: "MAY 5",
        description: "Outdoor painting & nature collage",
        image: "https://picsum.photos/id/76/400/250",
    },
];

const partners = [
    "https://placehold.co/120x40/e2e8f0/1e293b?text=NAEYC",
    "https://placehold.co/120x40/e2e8f0/1e293b?text=AMS",
    "https://placehold.co/120x40/e2e8f0/1e293b?text=KidsFirst",
    "https://placehold.co/120x40/e2e8f0/1e293b?text=EarlyEd",
    "https://placehold.co/120x40/e2e8f0/1e293b?text=ParentChoice",
];

const featuresWhy = [
    {
        number: 1,
        title: "Building Strong Learning Foundations",
        desc: "Research-based curriculum focusing on cognitive and motor skills.",
    },
    {
        number: 2,
        title: "Encouraging Social & Emotional Growth",
        desc: "Daily mindfulness, empathy exercises, and collaborative play.",
    },
    {
        number: 3,
        title: "Nurturing Creative & Independence",
        desc: "Child-led projects, arts integration, and problem-solving challenges.",
    },
];

// ============================================================
// MAIN School COMPONENT
// ============================================================
const School = () => {
    // State
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");
    const [typingWord, setTypingWord] = useState("safe space");
    const words = ["safe space", "joyful environment", "bright future"];
    const [wordIndex, setWordIndex] = useState(0);

    // Refs for carousels
    const teamCarouselRef = useRef(null);
    const eventsCarouselRef = useRef(null);
    const sectionRefs = useRef({});

    // Register section refs for intersection observer
    const registerRef = (name, element) => {
        if (element) sectionRefs.current[name] = element;
    };

    // Typing animation for mission heading
    useEffect(() => {
        const interval = setInterval(() => {
            setWordIndex((prev) => (prev + 1) % words.length);
            setTypingWord(words[(wordIndex + 1) % words.length]);
        }, 2800);
        return () => clearInterval(interval);
    }, [wordIndex]);

    // Intersection Observer for active nav & fade-in is handled by Framer Motion's whileInView
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute("data-section");
                        if (id) setActiveSection(id);
                    }
                });
            },
            { threshold: 0.4, rootMargin: "-80px 0px -20% 0px" },
        );

        Object.keys(sectionRefs.current).forEach((key) => {
            if (sectionRefs.current[key]) observer.observe(sectionRefs.current[key]);
        });

        return () => observer.disconnect();
    }, []);

    // Smooth scroll to section
    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            setMobileMenuOpen(false);
        }
    };

    // Carousel scroll functions
    const scrollTeam = (direction) => {
        if (teamCarouselRef.current) {
            const scrollAmount = direction === "left" ? -320 : 320;
            teamCarouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const scrollEvents = (direction) => {
        if (eventsCarouselRef.current) {
            const scrollAmount = direction === "left" ? -320 : 320;
            eventsCarouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    useEffect(() => {
        injectFonts();
        document.documentElement.style.scrollBehavior = "smooth";
    }, []);

    // Framer Motion variants
    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const cardHover = {
        rest: { scale: 1, y: 0 },
        hover: { scale: 1.02, y: -6, transition: { duration: 0.2 } },
    };

    return (
        <div className="bg-[#FDFAF5] font-dmsans overflow-x-hidden">
            {/* ==================== NAVBAR ==================== */}
            <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-[#EDE8E0] shadow-sm transition-shadow duration-300">
                <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-between items-center h-[68px]">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => scrollToSection("hero")}
                    >
                        <Leaf className="w-6 h-6 text-[#E8622A]" />
                        <span className="font-playfair text-2xl font-bold text-[#1C1917]">
                            Edefy
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {["About", "Programs", "Curriculum", "Pages", "Team", "Contact"].map(
                            (item) => {
                                const sectionMap = {
                                    About: "about",
                                    Programs: "programs",
                                    Curriculum: "why-us",
                                    Pages: "testimonials",
                                    Team: "team",
                                    Contact: "footer",
                                };
                                const id = sectionMap[item];
                                return (
                                    <button
                                        key={item}
                                        onClick={() => scrollToSection(id)}
                                        className="relative text-[15px] font-medium text-[#1C1917] hover:text-[#E8622A] transition-colors duration-200"
                                    >
                                        {item}
                                        {activeSection === id && (
                                            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#E8622A] rounded-full"></span>
                                        )}
                                    </button>
                                );
                            },
                        )}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        <button className="flex items-center gap-2 px-5 py-2 border border-[#1C1917]/20 rounded-full text-[#1C1917] font-medium hover:bg-[#1C1917]/5 transition">
                            <LogIn size={16} /> Sign In
                        </button>
                        <button className="bg-[#E8622A] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#d4531e] transition transform hover:scale-105 shadow-md">
                            Enroll Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-[#1C1917]"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu Slide Down */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t border-[#EDE8E0] overflow-hidden"
                        >
                            <div className="flex flex-col p-6 gap-4">
                                {[
                                    "About",
                                    "Programs",
                                    "Curriculum",
                                    "Pages",
                                    "Team",
                                    "Contact",
                                ].map((item) => (
                                    <button
                                        key={item}
                                        onClick={() =>
                                            scrollToSection(
                                                {
                                                    About: "about",
                                                    Programs: "programs",
                                                    Curriculum: "why-us",
                                                    Pages: "testimonials",
                                                    Team: "team",
                                                    Contact: "footer",
                                                }[item],
                                            )
                                        }
                                        className="text-left py-2 text-lg font-medium border-b border-[#EDE8E0]"
                                    >
                                        {" "}
                                        {item}{" "}
                                    </button>
                                ))}
                                <div className="flex gap-3 pt-4">
                                    <button className="flex-1 border border-[#1C1917]/20 rounded-full py-2">
                                        Sign In
                                    </button>
                                    <button className="flex-1 bg-[#E8622A] text-white rounded-full py-2">
                                        Enroll Now
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <main className="pt-[68px]">
                {/* ==================== HERO ==================== */}
                <section
                    id="hero"
                    data-section="hero"
                    ref={(el) => registerRef("hero", el)}
                    className="min-h-[90vh] flex items-center px-6 lg:px-12 py-20 bg-[#FDFAF5]"
                >
                    <div className="max-w-[1440px] mx-auto w-full flex flex-col lg:flex-row items-center gap-12">
                        <motion.div
                            className="lg:w-[55%]"
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                        >
                            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-sm mb-6">
                                <span className="text-[#E8622A] text-xl">🌱</span>
                                <span className="text-sm font-medium text-[#3D6B58]">
                                    Nurturing Young Minds Since 2010
                                </span>
                            </div>
                            <h1 className="font-playfair text-5xl lg:text-6xl font-bold text-[#1C1917] leading-[1.2] tracking-tight">
                                A Joyful Place for Early Learning
                            </h1>
                            <p className="text-[#6B6560] text-lg mt-6 leading-relaxed">
                                Where curiosity meets creativity — a play-based curriculum that
                                builds confident, compassionate lifelong learners in a warm,
                                nurturing environment.
                            </p>
                            <div className="flex flex-wrap gap-4 mt-8">
                                <button className="bg-[#E8622A] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#d4531e] transition shadow-md">
                                    Explore Programs <ArrowRight size={18} />
                                </button>
                                <button className="border border-[#1C1917]/30 text-[#1C1917] px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#1C1917]/5 transition">
                                    {" "}
                                    <Play size={18} /> Watch a Tour
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-6 mt-10">
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[#3D6B58]" />
                                    <span className="text-sm text-[#6B6560]">
                                        Winning Reading Programs
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[#3D6B58]" />
                                    <span className="text-sm text-[#6B6560]">
                                        Safe & Excellent Rating
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-[#3D6B58]" />
                                    <span className="text-sm text-[#6B6560]">
                                        Skilled Childhood Educators
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="lg:w-[45%] relative"
                            initial="hidden"
                            animate="visible"
                            variants={fadeUp}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="absolute -z-10 w-72 h-72 bg-[#3D6B58]/10 rounded-full blur-3xl -top-10 -right-10"></div>
                            <img
                                src="https://picsum.photos/id/124/800/700"
                                alt="Children learning"
                                className="rounded-2xl shadow-2xl w-full object-cover"
                                style={{ aspectRatio: "5/4" }}
                            />
                            {/* Floating Card 1 */}
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex gap-4 items-center">
                                <div className="bg-[#E8622A]/10 p-2 rounded-full">
                                    <Users className="text-[#E8622A]" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#1C1917]">12k+ Students</p>
                                    <p className="text-xs text-[#6B6560]">75k+ Reviews</p>
                                </div>
                            </div>
                            {/* Floating Card 2 */}
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg flex gap-2 items-center">
                                <div className="flex text-[#E8622A]">
                                    <Star fill="#E8622A" size={16} />
                                    <Star fill="#E8622A" size={16} />
                                    <Star fill="#E8622A" size={16} />
                                    <Star fill="#E8622A" size={16} />
                                    <Star fill="#E8622A" size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">4.9 Rating</p>
                                    <p className="text-xs">“Best decision we made!”</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ==================== ABOUT / MISSION STRIP ==================== */}
                <section
                    id="about"
                    data-section="about"
                    ref={(el) => registerRef("about", el)}
                    className="bg-[#F4EFE6] py-24 px-6"
                >
                    <motion.div
                        className="max-w-[900px] mx-auto text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeUp}
                    >
                        <span className="text-[#3D6B58] tracking-widest text-xs font-semibold uppercase">
                            ABOUT US
                        </span>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1C1917] mt-4">
                            Our mission is to create a{" "}
                            <span className="text-[#E8622A] border-b-4 border-[#E8622A]/30 inline-block min-w-[200px]">
                                {typingWord}
                            </span>
                        </h2>
                        <p className="text-[#6B6560] text-lg mt-6 leading-relaxed">
                            We blend Montessori principles with modern early childhood research,
                            offering a dynamic curriculum that respects each child's natural
                            curiosity. Our experienced educators foster emotional intelligence,
                            creative thinking, and a lifelong love of learning.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                            <div>
                                <div className="text-3xl mb-2">👧🏽</div>
                                <p className="font-bold text-[#1C1917]">12k+</p>
                                <p className="text-sm text-[#6B6560]">Happy Students</p>
                            </div>
                            <div>
                                <div className="text-3xl mb-2">⭐</div>
                                <p className="font-bold text-[#1C1917]">4.9</p>
                                <p className="text-sm text-[#6B6560]">Star Rating</p>
                            </div>
                            <div>
                                <div className="text-3xl mb-2">🎓</div>
                                <p className="font-bold text-[#1C1917]">25+</p>
                                <p className="text-sm text-[#6B6560]">Expert Educators</p>
                            </div>
                            <div>
                                <div className="text-3xl mb-2">📅</div>
                                <p className="font-bold text-[#1C1917]">15+</p>
                                <p className="text-sm text-[#6B6560]">Years Experience</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8 mt-12 opacity-60 grayscale">
                            {partners.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt="partner"
                                    className="h-10 object-contain"
                                />
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* ==================== PROGRAMS ==================== */}
                <section
                    id="programs"
                    data-section="programs"
                    ref={(el) => registerRef("programs", el)}
                    className="bg-white py-24 px-6"
                >
                    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16">
                        <motion.div
                            className="lg:w-[40%]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <span className="text-[#3D6B58] tracking-widest text-xs font-semibold uppercase">
                                PROGRAMS
                            </span>
                            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1C1917] mt-3">
                                Play-Based Programs for Early Childhood Development
                            </h2>
                            <ul className="mt-8 space-y-3 text-[#6B6560]">
                                <li className="flex gap-2">
                                    <Check className="text-[#E8622A]" />
                                    Integrated Literacy & Numeracy
                                </li>
                                <li className="flex gap-2">
                                    <Check className="text-[#E8622A]" />
                                    Social-Emotional Learning
                                </li>
                                <li className="flex gap-2">
                                    <Check className="text-[#E8622A]" />
                                    Outdoor & Nature Exploration
                                </li>
                            </ul>
                            <button className="mt-8 bg-[#E8622A] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#d4531e] transition">
                                Explore All Programs <ArrowRight size={18} />
                            </button>
                        </motion.div>
                        <div className="lg:w-[60%] space-y-6">
                            {programCards.map((card) => (
                                <motion.div
                                    key={card.id}
                                    className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(28,25,23,0.05)] p-5 flex flex-col md:flex-row gap-6 hover:shadow-lg transition-all hover:-translate-y-1 duration-300"
                                    variants={cardHover}
                                    initial="rest"
                                    whileHover="hover"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <span className="bg-[#3D6B58]/10 text-[#3D6B58] text-xs px-3 py-1 rounded-full">
                                                {card.tag || "FEATURED"}
                                            </span>
                                            <h3 className="font-playfair font-bold text-xl text-[#1C1917]">
                                                {card.name}
                                            </h3>
                                        </div>
                                        <ul className="mt-4 space-y-2">
                                            <li className="flex gap-2 text-sm text-[#6B6560]">
                                                <Check size={14} className="text-[#E8622A]" />
                                                {card.features[0]}
                                            </li>
                                            <li className="flex gap-2 text-sm text-[#6B6560]">
                                                <Check size={14} className="text-[#E8622A]" />
                                                {card.features[1]}
                                            </li>
                                            <li className="flex gap-2 text-sm text-[#6B6560]">
                                                <Check size={14} className="text-[#E8622A]" />
                                                {card.features[2]}
                                            </li>
                                        </ul>
                                        <button className="mt-3 text-[#E8622A] font-medium flex items-center gap-1 text-sm">
                                            Learn More <ArrowRight size={14} />
                                        </button>
                                    </div>
                                    <div className="md:w-36 h-36 rounded-2xl overflow-hidden">
                                        <img
                                            src={card.image}
                                            className="w-full h-full object-cover"
                                            alt={card.name}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==================== WHY CHOOSE US ==================== */}
                <section
                    id="why-us"
                    data-section="why-us"
                    ref={(el) => registerRef("why-us", el)}
                    className="bg-[#FDFAF5] py-24 px-6"
                >
                    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="lg:w-[45%]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            <img
                                src="https://picsum.photos/id/133/800/900"
                                className="rounded-2xl shadow-xl w-full object-cover"
                                style={{ aspectRatio: "3/4" }}
                                alt="classroom"
                            />
                        </motion.div>
                        <motion.div
                            className="lg:w-[55%]"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                        >
                            <span className="text-[#3D6B58] tracking-widest text-xs font-semibold uppercase">
                                WHY US
                            </span>
                            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1C1917] mt-3">
                                Why Early Learning Shapes a Child's Future
                            </h2>
                            <div className="mt-10 space-y-8">
                                {featuresWhy.map((feat) => (
                                    <div key={feat.number} className="flex gap-5">
                                        <div className="bg-[#E8622A] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                            {feat.number}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xl text-[#1C1917]">
                                                {feat.title}
                                            </h3>
                                            <p className="text-[#6B6560]">{feat.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ==================== EDUCATORS / TEAM with carousel ==================== */}
                <section
                    id="team"
                    data-section="team"
                    ref={(el) => registerRef("team", el)}
                    className="bg-[#F4EFE6] py-24 px-6"
                >
                    <div className="max-w-[1440px] mx-auto">
                        <div className="flex justify-between items-end flex-wrap gap-4 mb-12">
                            <div>
                                <span className="text-[#3D6B58] tracking-widest text-xs font-semibold uppercase">
                                    CARING EDUCATORS
                                </span>
                                <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1C1917] max-w-2xl">
                                    Guiding Every Child's Growth
                                </h2>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => scrollTeam("left")}
                                    className="border border-[#1C1917]/20 rounded-full p-3 hover:bg-white transition"
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    onClick={() => scrollTeam("right")}
                                    className="border border-[#1C1917]/20 rounded-full p-3 hover:bg-white transition"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                        <div
                            ref={teamCarouselRef}
                            className="flex overflow-x-auto scroll-smooth gap-8 pb-6 hide-scrollbar"
                            style={{ scrollbarWidth: "none" }}
                        >
                            {educators.map((teacher, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[280px] md:min-w-[300px] group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
                                >
                                    <div className="relative overflow-hidden h-72">
                                        <img
                                            src={teacher.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    </div>
                                    <div className="p-5">
                                        <h4 className="font-bold text-lg">{teacher.name}</h4>
                                        <p className="text-[#3D6B58] text-sm">{teacher.title}</p>
                                        <p className="text-xs text-[#6B6560] mt-1 opacity-0 group-hover:opacity-100 transition-all">
                                            {teacher.bio}
                                        </p>
                                        <div className="mt-3">
                                            <span className="bg-[#E8622A]/10 text-[#E8622A] text-xs px-3 py-1 rounded-full">
                                                {teacher.specialty}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==================== TESTIMONIALS ==================== */}
                <section
                    id="testimonials"
                    data-section="testimonials"
                    ref={(el) => registerRef("testimonials", el)}
                    className="bg-white py-24 px-6"
                >
                    <div className="max-w-[1440px] mx-auto text-center">
                        <span className="text-[#3D6B58] tracking-widest text-xs font-semibold uppercase">
                            WHAT PARENTS SAY
                        </span>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-[#1C1917] mt-3">
                            Stories from Parents Who Trust Our Kindergarten
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            {testimonials.map((t, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-white rounded-2xl p-6 shadow-md border-l-4 border-l-[#E8622A] hover:-translate-y-2 transition-all text-left"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                >
                                    <Quote className="text-[#E8622A] mb-3" size={40} />
                                    <p className="italic text-[#6B6560] mb-5">"{t.text}"</p>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={t.image}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-bold">{t.name}</p>
                                            <p className="text-xs text-[#6B6560]">{t.child}</p>
                                            <div className="flex text-[#E8622A] text-xs">★★★★★</div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==================== EVENTS carousel ==================== */}
                <section
                    id="events"
                    data-section="events"
                    ref={(el) => registerRef("events", el)}
                    className="bg-[#FDFAF5] py-24 px-6"
                >
                    <div className="max-w-[1440px] mx-auto">
                        <div className="flex justify-between items-center flex-wrap mb-12">
                            <div>
                                <span className="text-[#3D6B58] tracking-widest text-xs font-semibold uppercase">
                                    EVENTS
                                </span>
                                <h2 className="font-playfair text-4xl md:text-5xl font-bold">
                                    Exciting Activities for Young Learners
                                </h2>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => scrollEvents("left")}
                                    className="border rounded-full p-3 hover:bg-white"
                                >
                                    <ChevronLeft />
                                </button>
                                <button
                                    onClick={() => scrollEvents("right")}
                                    className="border rounded-full p-3 hover:bg-white"
                                >
                                    <ChevronRight />
                                </button>
                            </div>
                        </div>
                        <div
                            ref={eventsCarouselRef}
                            className="flex overflow-x-auto gap-6 pb-4 hide-scrollbar"
                        >
                            {" "}
                            {events.map((e, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[280px] bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all"
                                >
                                    <div className="relative h-48 rounded-t-2xl overflow-hidden">
                                        <img src={e.image} className="w-full h-full object-cover" />
                                        <div className="absolute top-3 left-3 bg-[#E8622A] text-white text-xs font-bold px-3 py-1 rounded-full">
                                            {e.date}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg">{e.title}</h3>
                                        <p className="text-[#6B6560] text-sm">{e.description}</p>
                                        <button className="mt-3 text-[#E8622A] text-sm font-semibold flex items-center gap-1">
                                            View Details <ArrowRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==================== FINAL CTA BANNER ==================== */}
                <section className="bg-[#1C1917] py-24 px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#E8622A] blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#3D6B58] blur-3xl"></div>
                    </div>
                    <motion.div
                        className="relative text-center max-w-3xl mx-auto"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                    >
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
                            Secure Your Child's Spot at Our Kindergarten
                        </h2>
                        <p className="text-[#A09890] mt-4 text-lg">
                            Limited spots available for the upcoming academic year.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <button className="bg-[#E8622A] text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-[#d4531e]">
                                Enroll Now <ArrowRight size={18} />
                            </button>
                            <button className="border border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10">
                                Schedule a Visit
                            </button>
                        </div>
                    </motion.div>
                </section>

                {/* ==================== FOOTER ==================== */}
                <footer
                    id="footer"
                    data-section="footer"
                    ref={(el) => registerRef("footer", el)}
                    className="bg-[#1C1917] text-[#FDFAF5] pt-20 pb-8 px-6"
                >
                    <div className="max-w-[1440px] mx-auto grid md:grid-cols-4 gap-12">
                        <div>
                            <div className="flex items-center gap-2">
                                <Leaf className="text-[#E8622A]" />
                                <span className="font-playfair text-2xl font-bold">Edefy</span>
                            </div>
                            <p className="text-[#A09890] mt-4 text-sm">Where every child blooms.</p>
                            <div className="flex gap-4 mt-6">
                                <FaFacebook className="w-5 h-5 hover:text-white cursor-pointer" />
                                <FaInstagram className="w-5 h-5 hover:text-white" />
                                <FaTwitter className="w-5 h-5 hover:text-white" />
                                <FaYoutube className="w-5 h-5 hover:text-white" />
                            </div>
                        </div>
                        <div>
                            <h4 className="font-bold text-white">Programs</h4>
                            <ul className="mt-4 space-y-2 text-[#A09890] text-sm">
                                <li>Reading & Play</li>
                                <li>Language & Comm</li>
                                <li>After School</li>
                                <li>STEM Basics</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white">Quick Links</h4>
                            <ul className="mt-4 space-y-2 text-[#A09890] text-sm">
                                <li>About</li>
                                <li>Curriculum</li>
                                <li>Events</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-white">Contact Info</h4>
                            <ul className="mt-4 space-y-3 text-[#A09890] text-sm">
                                <li className="flex gap-2">
                                    <Phone size={16} /> (555) 123-4567
                                </li>
                                <li className="flex gap-2">
                                    <Mail size={16} /> hello@edefy.com
                                </li>
                                <li className="flex gap-2">
                                    <MapPin size={16} /> 123 Learning Lane, Austin, TX
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-[#242120] mt-16 pt-8 flex flex-col md:flex-row justify-between text-sm text-[#A09890]">
                        <span>© 2025 Edefy Kindergarten. All rights reserved.</span>
                        <div className="flex gap-6">
                            <span>Privacy Policy</span>
                            <span>Terms of Service</span>
                        </div>
                    </div>
                </footer>
            </main>
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
};

export default School;
