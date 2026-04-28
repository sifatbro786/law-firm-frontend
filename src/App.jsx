import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Attorneys from "./pages/Attorneys";
import AttorneyDetail from "./pages/AttorneyDetail";
import CaseStudies from "./pages/CaseStudies";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import AdminLogin from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import ServicesManager from "./pages/Admin/ServicesManager";
import BlogsManager from "./pages/Admin/BlogsManager";
import AttorneysManager from "./pages/Admin/AttorneysManager";
import BookingsView from "./pages/Admin/BookingsView";
import CaseStudiesManager from "./pages/Admin/CaseStudiesManager";
import DashboardHome from "./pages/Admin/DashboardHome";
import ScrollToTop from "./components/layout/ScrollToTop";
import NotFound from "./pages/NotFound";
import CaseInfoManager from "./pages/Admin/CaseInfoManager";
import AdminRegister from "./pages/Admin/Register";
import UserManagement from "./pages/Admin/UserManagement";
// import School from "./pages/school/School";

const Layout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    // Admin routes: no navbar, no footer, no whatsapp button
    if (isAdminRoute) {
        return (
            <>
                <ScrollToTop />
                {children}
                <Toaster position="top-right" />
            </>
        );
    }

    // Public routes: show navbar, footer, and whatsapp button
    return (
        <div className="">
            <Navbar />
            <main className="flex-grow">
                <ScrollToTop />
                {children}
            </main>
            <Footer />
            <WhatsAppButton />
            <Toaster position="top-right" />
        </div>
    );
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/:slug" element={<ServiceDetail />} />
                        <Route path="/attorneys" element={<Attorneys />} />
                        <Route path="/attorneys/:id" element={<AttorneyDetail />} />
                        <Route path="/case-studies" element={<CaseStudies />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogDetail />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/booking" element={<Booking />} />
                        {/* <Route path="/school" element={<School />} /> */}

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/register" element={<AdminRegister />} />
                        <Route path="/admin" element={<Dashboard />}>
                            <Route index element={<DashboardHome />} />
                            <Route path="dashboard" element={<DashboardHome />} />
                            <Route path="services" element={<ServicesManager />} />
                            <Route path="attorneys" element={<AttorneysManager />} />
                            <Route path="blogs" element={<BlogsManager />} />
                            <Route path="bookings" element={<BookingsView />} />
                            <Route path="case-studies" element={<CaseStudiesManager />} />
                            <Route path="case-info" element={<CaseInfoManager />} />
                            <Route path="user-management" element={<UserManagement />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
}

export default App;
