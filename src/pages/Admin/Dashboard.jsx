import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";
import {
    FaHome,
    FaGavel,
    FaUserFriends,
    FaCalendarAlt,
    FaSignOutAlt,
    FaFolderOpen,
    FaDatabase,
    FaUsers,
} from "react-icons/fa";

const Dashboard = () => {
    const { admin, logout, loading, isSuperAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!loading && !admin) {
            navigate("/admin/login");
        }
    }, [admin, loading, navigate]);

    // Close sidebar on route change on mobile
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const menuItems = [
        {
            path: "/admin/dashboard",
            name: "Dashboard",
            icon: <FaHome />,
            roles: ["super_admin", "admin"],
        },
        {
            path: "/admin/services",
            name: "Services",
            icon: <FaGavel />,
            roles: ["super_admin", "admin"],
        },
        {
            path: "/admin/attorneys",
            name: "Attorneys",
            icon: <FaUserFriends />,
            roles: ["super_admin", "admin"],
        },
        {
            path: "/admin/bookings",
            name: "Bookings",
            icon: <FaCalendarAlt />,
            roles: ["super_admin", "admin"],
        },
        {
            path: "/admin/case-studies",
            name: "Case Studies",
            icon: <FaFolderOpen />,
            roles: ["super_admin", "admin"],
        },
        {
            path: "/admin/case-info",
            name: "Customer Data",
            icon: <FaDatabase />,
            roles: ["super_admin", "admin"],
        },
        {
            path: "/admin/user-management",
            name: "User Management",
            icon: <FaUsers />,
            roles: ["super_admin"],
        },
    ];

    const filteredMenuItems = menuItems.filter((item) => item.roles.includes(admin?.role));

    const isActive = (path) => {
        if (path === "/admin/dashboard" && location.pathname === "/admin/dashboard") {
            return true;
        }
        if (path !== "/admin/dashboard" && location.pathname.startsWith(path)) {
            return true;
        }
        return false;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!admin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full w-64 bg-primary text-white shadow-lg z-40 transition-transform duration-300 transform ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                } overflow-y-auto`}
            >
                <div className="p-6 border-b border-gray-700">
                    <Link to="/" className="text-lg md:text-xl font-playfair font-bold">
                        <span className="text-secondary">Jamil</span> Law Consultant
                    </Link>
                    <p className="text-xs text-gray-400 mt-2">Admin Panel</p>
                    {admin?.role === "super_admin" && (
                        <span className="inline-block mt-2 text-xs bg-secondary text-primary px-2 py-1 rounded">
                            Super Admin
                        </span>
                    )}
                </div>

                <nav className="mt-6 pb-20">
                    {filteredMenuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-6 py-3 transition text-sm md:text-base ${
                                isActive(item.path)
                                    ? "bg-secondary text-primary border-r-4 border-primary"
                                    : "hover:bg-accent"
                            }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}

                    <button
                        onClick={() => {
                            logout();
                            navigate("/admin/login");
                        }}
                        className="w-full flex items-center gap-3 px-6 py-3 hover:bg-accent transition mt-8 text-red-400 text-sm md:text-base"
                    >
                        <FaSignOutAlt />
                        <span>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64 min-h-screen">
                {/* Header */}
                <header className="bg-white shadow-sm sticky top-0 z-20">
                    <div className="px-4 sm:px-6 md:px-8 py-3 md:py-4 flex justify-between items-center">
                        <h1 className="text-lg sm:text-xl md:text-2xl font-playfair font-bold text-primary ml-12 lg:ml-0">
                            {filteredMenuItems.find((item) => isActive(item.path))?.name ||
                                "Dashboard"}
                        </h1>
                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="text-right">
                                <p className="text-sm sm:text-base font-semibold truncate max-w-[120px] sm:max-w-none">
                                    {admin?.name || admin?.email}
                                </p>
                                <p className="text-xs text-gray-500 capitalize">{admin?.role}</p>
                            </div>
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold text-sm sm:text-base">
                                    {admin?.name?.[0] || admin?.email?.[0] || "A"}
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Routes */}
                <div className="p-4 sm:p-6 md:p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
