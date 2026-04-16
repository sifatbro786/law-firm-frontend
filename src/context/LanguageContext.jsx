import { createContext, useState, useContext } from "react";

const LanguageContext = createContext();

const translations = {
    en: {
        // Navigation
        home: "Home",
        about: "About",
        services: "Services",
        attorneys: "Attorneys",
        caseStudies: "Case Studies",
        blog: "Blog",
        faq: "FAQ",
        contact: "Contact",
        bookConsultation: "Book Consultation",

        // Hero
        heroTitle: "Expert Legal Solutions for Your Business & Family",
        heroSubtitle:
            "With over 20 years of experience in Bangladeshi law, we provide trusted legal counsel and representation.",
        getStarted: "Get Started",

        // Footer
        practiceAreas: "Practice Areas",
        quickLinks: "Quick Links",
        contactInfo: "Contact Info",
        copyright: "© 2024 Law Firm Bangladesh. All rights reserved.",

        // Common
        learnMore: "Learn More",
        readMore: "Read More",
        contactUs: "Contact Us",
        sendMessage: "Send Message",
        submit: "Submit",
    },
    bn: {
        // Navigation
        home: "হোম",
        about: "পরিচয়",
        services: "সেবাসমূহ",
        attorneys: "আইনজীবীগণ",
        caseStudies: "কেস স্টাডিজ",
        blog: "ব্লগ",
        faq: "জিজ্ঞাসা",
        contact: "যোগাযোগ",
        bookConsultation: "পরামর্শ নিন",

        // Hero
        heroTitle: "আপনার ব্যবসা ও পরিবারের জন্য বিশেষজ্ঞ আইনি সমাধান",
        heroSubtitle:
            "বাংলাদেশী আইনে ২০ বছরেরও বেশি অভিজ্ঞতা নিয়ে, আমরা বিশ্বস্ত আইনি পরামর্শ এবং প্রতিনিধিত্ব প্রদান করি।",
        getStarted: "শুরু করুন",

        // Footer
        practiceAreas: "আইনি ক্ষেত্রসমূহ",
        quickLinks: "দ্রুত লিংক",
        contactInfo: "যোগাযোগের তথ্য",
        copyright: "© ২০২৪ ল ফার্ম বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত।",

        // Common
        learnMore: "আরও জানুন",
        readMore: "আরও পড়ুন",
        contactUs: "যোগাযোগ করুন",
        sendMessage: "বার্তা পাঠান",
        submit: "জমা দিন",
    },
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within LanguageProvider");
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState("en");

    const t = (key) => translations[language][key] || key;

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === "en" ? "bn" : "en"));
    };

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
