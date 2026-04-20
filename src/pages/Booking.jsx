import { motion } from "framer-motion";
import BookingForm from "../components/ui/BookingForm";
import { FaCheckCircle, FaClock, FaUserTie, FaShieldAlt } from "react-icons/fa";

const benefits = [
    {
        icon: <FaUserTie />,
        title: "Expert Consultation",
        description: "Get advice from experienced legal professionals",
    },
    {
        icon: <FaClock />,
        title: "Flexible Scheduling",
        description: "Choose a time that works for you",
    },
    {
        icon: <FaShieldAlt />,
        title: "Confidential",
        description: "Your information is protected and private",
    },
    {
        icon: <FaCheckCircle />,
        title: "No Obligation",
        description: "Initial consultation with no commitment",
    },
];

const Booking = () => {
    return (
        <div>
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-6">
                            Book a Consultation
                        </h1>
                        <p className="text-lg text-gray-300">
                            Schedule a confidential consultation with our experienced legal team
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Booking Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Booking Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-playfair font-bold mb-6">
                                Request Consultation
                            </h2>
                            <BookingForm />
                        </motion.div>

                        {/* Information Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h3 className="text-2xl font-playfair font-bold mb-4">
                                    কীভাবে শুরু করতে হয়
                                </h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-secondary mt-1" />
                                        <span>৫০০০ টাকা ফি সহ একটি প্রাথমিক পরামর্শ সেশন</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-secondary mt-1" />
                                        <span>অভিজ্ঞ আইনজীবীর সাথে ৩০-৪৫ মিনিটের পরামর্শ</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-secondary mt-1" />
                                        <span>মামলার মূল্যায়ন এবং প্রাথমিক আইনি পরামর্শ</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <FaCheckCircle className="text-secondary mt-1" />
                                        <span>সম্ভাব্য আইনি কৌশল নিয়ে আলোচনা</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-6">
                                <h3 className="text-2xl font-playfair font-bold mb-4">
                                    আমাদের সাথে কেন যোগাযোগ করবেন?
                                </h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {benefits.map((benefit, index) => (
                                        <div key={index} className="flex gap-3">
                                            <div className="text-secondary text-xl">
                                                {benefit.icon}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold">{benefit.title}</h4>
                                                <p className="text-sm text-gray-600">
                                                    {benefit.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 p-6 bg-secondary rounded-lg">
                                <h3 className="text-xl font-playfair font-bold text-primary mb-3">
                                    জরুরি সহায়তা প্রয়োজন?
                                </h3>
                                <p className="text-primary mb-4">
                                    জরুরি আইনি বিষয়ের জন্য আমাদের সরাসরি কল করুন
                                </p>
                                <a
                                    href="tel:+8801234567890"
                                    className="btn-primary block text-center bg-primary text-white"
                                >
                                    এখনই কল করুন: +880 1712245511
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-playfair font-bold text-center mb-8">
                        Frequently Asked Questions About Consultations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-2">
                                Is the consultation confidential?
                            </h3>
                            <p className="text-gray-600">
                                Yes, all consultations are protected by attorney-client privilege.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-2">
                                Can I reschedule my appointment?
                            </h3>
                            <p className="text-gray-600">
                                Yes, please contact us at least 24 hours in advance.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-2">What should I prepare?</h3>
                            <p className="text-gray-600">
                                Bring any relevant documents related to your legal matter.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="font-semibold text-lg mb-2">
                                Do you offer online consultations?
                            </h3>
                            <p className="text-gray-600">
                                Yes, we offer video consultations for your convenience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Booking;
