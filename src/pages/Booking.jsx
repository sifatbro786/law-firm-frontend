// Booking.jsx
import { motion } from "framer-motion";
import BookingForm from "../components/ui/BookingForm";
import {
    FaCheckCircle,
    FaClock,
    FaUserTie,
    FaShieldAlt,
    FaVideo,
    FaBuilding,
    FaPhoneAlt,
    FaCalendarCheck,
    FaBalanceScale,
    FaStar,
    FaArrowRight,
} from "react-icons/fa";
import PageHeader from "../components/ui/PageHeader";

const benefits = [
    {
        icon: <FaUserTie />,
        title: "Expert Consultation",
        description: "Get advice from experienced legal professionals with 25+ years of practice",
    },
    {
        icon: <FaVideo />,
        title: "Online & Offline Options",
        description: "Choose between video consultation or in-person meeting",
    },
    {
        icon: <FaShieldAlt />,
        title: "100% Confidential",
        description: "Your information is protected by attorney-client privilege",
    },
    {
        icon: <FaClock />,
        title: "Flexible Scheduling",
        description: "Monday-Saturday with convenient time slots",
    },
];

const Booking = () => {
    return (
        <div className="bg-white">
            <PageHeader title="Book Consultation" path="Booking" />

            {/* Hero Section with Gradient */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#027B7A]/5 via-white to-[#ECF7FF]/30 py-16 md:py-24">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-[#027B7A]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#ECF7FF] rounded-full blur-3xl" />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                Get Started
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6 leading-tight">
                            Schedule Your{" "}
                            <span className="text-[#027B7A] relative">Consultation</span>
                        </h1>
                        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto">
                            Connect with our expert attorneys for personalized legal guidance.
                            Choose between online or in-person sessions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Booking Section */}
            <section className="pb-16 bg-white relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Booking Form - 7 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                                {/* Form Header */}
                                <div className="bg-gradient-to-r from-[#027B7A] to-[#025c5c] px-8 py-6">
                                    <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white">
                                        Request Consultation
                                    </h2>
                                    <p className="text-white/80 mt-2">
                                        Fill out the form below and we'll get back to you within 24
                                        hours
                                    </p>
                                </div>

                                <div className="p-8">
                                    <BookingForm />
                                </div>
                            </div>
                        </motion.div>

                        {/* Information Sidebar - 5 columns */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-5 space-y-6"
                        >
                            {/* Premium Price Card */}
                            <div className="relative overflow-hidden bg-gradient-to-br from-[#027B7A] via-[#027B7A] to-[#004d4d] rounded-3xl p-8 text-white shadow-2xl">
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaBalanceScale className="text-2xl opacity-80" />
                                        <span className="text-sm uppercase tracking-wider opacity-80">
                                            Premium Service
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-playfair font-bold mb-6">
                                        Consultation Fee
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-medium">
                                                        Online Consultation
                                                    </p>
                                                    <p className="text-3xl font-bold">5,000 BDT</p>
                                                </div>
                                                <FaVideo className="text-xl opacity-70" />
                                            </div>
                                            <p className="text-sm opacity-80">
                                                ✓ 60 minutes video call
                                            </p>
                                            <p className="text-sm opacity-80">✓ Zoom/Google Meet</p>
                                        </div>
                                        <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="font-medium">Office Visit</p>
                                                    <p className="text-3xl font-bold">20,000 BDT</p>
                                                </div>
                                                <FaBuilding className="text-xl opacity-70" />
                                            </div>
                                            <p className="text-sm opacity-80">
                                                ✓ 60 minutes face-to-face
                                            </p>
                                            <p className="text-sm opacity-80">
                                                ✓ Premium office environment
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* How It Works - Premium Timeline */}
                            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-2xl bg-[#027B7A]/10 flex items-center justify-center">
                                        <FaCalendarCheck className="text-[#027B7A] text-xl" />
                                    </div>
                                    <h3 className="text-2xl font-playfair font-bold text-gray-900">
                                        How It Works
                                    </h3>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        "Fill out the consultation request form",
                                        "We'll confirm your appointment via email/phone",
                                        "Make the payment to confirm your slot",
                                        "Attend your consultation with our expert attorney",
                                    ].map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-4 group">
                                            <div className="relative">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#027B7A] to-[#025c5c] text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-[#027B7A]/20">
                                                    {idx + 1}
                                                </div>
                                                {idx < 3 && (
                                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-200 group-hover:bg-[#027B7A]/30 transition-colors" />
                                                )}
                                            </div>
                                            <span className="text-gray-600 pt-1">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Benefits & Emergency Section - Horizontal Layout */}
            <section className="md:py-16 bg-gradient-to-b from-white to-[#ECF7FF]/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Benefits Grid - Premium Cards */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-[#ECF7FF] to-white rounded-3xl p-8 border border-[#027B7A]/10 shadow-xl"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-[#027B7A]/10 flex items-center justify-center">
                                    <FaStar className="text-[#027B7A] text-xl" />
                                </div>
                                <h3 className="text-2xl font-playfair font-bold text-gray-900">
                                    Why Choose Us?
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-[#027B7A] text-xl group-hover:bg-gradient-to-br group-hover:from-[#027B7A] group-hover:to-[#025c5c] group-hover:text-white transition-all duration-300 flex-shrink-0">
                                            {benefit.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-1">
                                                {benefit.title}
                                            </h4>
                                            <p className="text-sm text-gray-500 leading-relaxed">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Emergency Contact - Premium CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-center shadow-xl"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-[#027B7A]/20 rounded-full blur-2xl" />
                            <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#027B7A]/20 rounded-full blur-2xl" />
                            <div className="relative z-10">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#027B7A] to-[#025c5c] flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#027B7A]/30">
                                    <FaPhoneAlt className="text-white text-2xl" />
                                </div>
                                <h3 className="text-2xl font-playfair font-bold text-white mb-3">
                                    Need Immediate Assistance?
                                </h3>
                                <p className="text-gray-300 text-sm mb-6 max-w-md mx-auto">
                                    Call us directly for urgent legal matters. Our team is ready to
                                    help you 24/7.
                                </p>
                                <a
                                    href="tel:+8801712245511"
                                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#027B7A] to-[#025c5c] text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-[#027B7A]/30 transition-all duration-300 group"
                                >
                                    Call Now: +880 1712245511
                                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                                </a>
                                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-white/10">
                                    <span className="text-xs text-gray-400">📞 24/7 Support</span>
                                    <span className="text-xs text-gray-400">
                                        ⚡ Emergency Response
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section - Premium Accordion Style */}
            <section className="py-20 md:py-28 bg-gradient-to-b from-[#ECF7FF]/20 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#027B7A]/10 mb-6">
                            <FaStar className="text-[#027B7A] text-xs" />
                            <span className="text-[#027B7A] text-xs font-semibold uppercase tracking-wider">
                                FAQ
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                            Everything you need to know about our consultation process
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-4">
                        {[
                            {
                                q: "Is the consultation confidential?",
                                a: "Yes, all consultations are protected by attorney-client privilege under Bangladeshi law. Your privacy and confidentiality are our top priorities.",
                            },
                            {
                                q: "Can I reschedule my appointment?",
                                a: "Yes, please contact us at least 24 hours in advance to reschedule without penalty. We understand that schedules can change.",
                            },
                            {
                                q: "What documents should I bring?",
                                a: "Bring any relevant documents, case files, or evidence related to your legal matter. This helps us provide you with the most accurate advice.",
                            },
                            {
                                q: "Do you offer online consultations?",
                                a: "Yes, we offer Zoom/Google Meet video consultations for your convenience. Choose the online option when booking.",
                            },
                            {
                                q: "How do I pay the consultation fee?",
                                a: "We accept bKash, Nagad, bank transfer, and cash payments at our office. Payment details will be shared upon confirmation.",
                            },
                            {
                                q: "Is the fee refundable if I cancel?",
                                a: "Full refund if cancelled 24 hours before appointment. No refund for no-shows. We appreciate your understanding.",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#027B7A]/20"
                            >
                                <h3 className="font-bold text-gray-900 text-lg mb-2 flex items-start gap-2">
                                    <span className="text-[#027B7A]">Q.</span> {item.q}
                                </h3>
                                <p className="text-gray-500 pl-6">{item.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Booking;
