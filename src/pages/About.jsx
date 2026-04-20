import { motion } from "framer-motion";
import { FaGavel, FaHandshake, FaBalanceScale, FaGlobe } from "react-icons/fa";
import UserImage from "/jamil2.jpeg";

const About = () => {
    const values = [
        {
            icon: <FaGavel />,
            title: "Excellence",
            description:
                "We strive for excellence in every case we handle, providing top-tier legal representation.",
        },
        {
            icon: <FaHandshake />,
            title: "Integrity",
            description:
                "We operate with complete transparency and ethical practices in all our dealings.",
        },
        {
            icon: <FaBalanceScale />,
            title: "Justice",
            description:
                "We are committed to upholding justice and protecting our clients fundamental rights.",
        },
        {
            icon: <FaGlobe />,
            title: "Accessibility",
            description: "Making quality legal services accessible to all segments of society.",
        },
    ];

    const teamStats = [
        { number: "20+", label: "Years of Experience" },
        { number: "50+", label: "Expert Lawyers" },
        { number: "5000+", label: "Clients Served" },
        { number: "100%", label: "Client Satisfaction" },
    ];

    return (
        <div className="overflow-hidden">
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
                            About Our Jamil Law Consultant
                        </h1>
                        <p className="text-lg text-gray-300">
                            With over two decades of legal excellence, we have established ourselves
                            as one of Bangladesh's most trusted law consultants, committed to
                            delivering justice and protecting our clients' interests.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Founded in 2003, Jamil Law Consultant began with a simple yet
                                    powerful vision: to provide exceptional legal services with
                                    unwavering integrity and dedication to justice. What started as
                                    a small practice with two passionate attorneys has grown into
                                    one of Bangladesh's premier law consultants.
                                </p>
                                <p>
                                    Over the years, we have successfully handled thousands of cases
                                    across various practice areas, from complex corporate disputes
                                    to sensitive family matters. Our growth is a testament to the
                                    trust our clients place in us and our commitment to achieving
                                    the best possible outcomes.
                                </p>
                                <p>
                                    Today, we are proud to have a team of over 50 experienced
                                    attorneys, supported by skilled paralegals and support staff,
                                    all working together to provide comprehensive legal solutions to
                                    individuals and businesses across Bangladesh.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                            Our Core Values
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-xl transition"
                            >
                                <div className="text-4xl text-secondary mb-4 flex justify-center">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-playfair font-bold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-secondary">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {teamStats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-primary font-semibold">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-primary mb-4">
                            Leadership Team
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Meet the experienced leaders guiding our firm towards excellence
                        </p>
                    </motion.div>

                    <div className="flex justify-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-gray-50 rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row"
                        >
                            <img
                                src={UserImage}
                                alt="Founder"
                                className="w-full md:w-48 h-48 object-cover"
                            />
                            <div className="p-6">
                                <h3 className="text-2xl font-playfair font-bold mb-2">
                                    আহমেদ নওশাদ জামিল
                                </h3>
                                <p className="text-secondary font-semibold mb-3">Advocate</p>
                                <p className="text-gray-600">
                                    With over 15+ years of experience in corporate and criminal law,
                                    Advocate Mr. Jamil has established himself as one of
                                    Bangladesh's leading legal minds. He is known for his strategic
                                    approach to complex cases and his unwavering commitment to his
                                    clients' success. Under his leadership, Jamil Law Consultant has
                                    achieved numerous landmark victories and continues to set new
                                    standards in legal excellence.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary text-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                            Ready to Work With Us?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Let our experienced team help you with your legal matters
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/booking"
                                className="btn-primary bg-secondary text-primary hover:bg-opacity-90"
                            >
                                Book Consultation
                            </a>
                            <a
                                href="/contact"
                                className="btn-outline border-white text-white hover:bg-white hover:text-primary"
                            >
                                Contact Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
