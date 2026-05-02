import { useState, useEffect } from "react";
import HeroSection from "../components/ui/HeroSection";
import Testimonials from "../components/ui/Testimonials";
import api from "../utils/api";
import ProfileSection from "../components/ui/ProfileSection";
import FAQSection from "../components/ui/FAQSection";
import ServicesSection from "../components/ui/ServicesSection";
import WhyChooseUs from "../components/ui/WhyChooseUs";
import AttorneysSection from "../components/ui/AttorneysSection";
// import CaseStudiesCard from "../components/ui/CaseStudiesCard";

const Home = () => {
    const [services, setServices] = useState([]);
    const [attorneys, setAttorneys] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [caseStudies, setCaseStudies] = useState([]);

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            const [servicesRes, attorneysRes, caseStudiesRes] = await Promise.all([
                api.get("/api/services"),
                api.get("/api/attorneys"),
                // api.get("/api/case-studies?limit=3"),
            ]);

            setServices(servicesRes.data.slice(0, 3));
            setAttorneys(attorneysRes.data.slice(0, 4));
            // setCaseStudies(caseStudiesRes.data.slice(0, 3));
        } catch (error) {
            console.error("Error fetching home data:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#027B7A] mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <HeroSection />

            {/* Profile Section */}
            <ProfileSection />

            {/* Services Section */}
            <ServicesSection services={services} />

            {/* About Section */}
            <WhyChooseUs />

            {/* Attorneys Section */}
            <AttorneysSection attorneys={attorneys} />

            {/* Testimonials Section */}
            <Testimonials />

            {/* FAQ Preview Section */}
            <FAQSection />
        </div>
    );
};

export default Home;
