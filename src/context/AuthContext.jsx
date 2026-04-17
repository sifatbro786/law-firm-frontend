import { createContext, useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const adminData = localStorage.getItem("adminData");

        if (token && adminData) {
            try {
                const parsedAdmin = JSON.parse(adminData);
                setAdmin(parsedAdmin);
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            } catch (error) {
                console.error("Error parsing admin data:", error);
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminData");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await api.post("/api/auth/login", { email, password });
            const { token, admin: adminData } = response.data;

            localStorage.setItem("adminToken", token);
            localStorage.setItem("adminData", JSON.stringify(adminData));
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAdmin(adminData);
            toast.success(`Welcome back, ${adminData.name}!`);
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || "Login failed");
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const response = await api.post("/api/auth/register", userData);
            toast.success(response.data.message);
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || "Registration failed");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");
        delete api.defaults.headers.common["Authorization"];
        setAdmin(null);
        toast.success("Logged out successfully");
    };

    const changePassword = async (oldPassword, newPassword) => {
        try {
            await api.post("/api/auth/change-password", { oldPassword, newPassword });
            toast.success("Password changed successfully");
            return true;
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to change password");
            return false;
        }
    };

    const isSuperAdmin = () => {
        return admin?.role === "super_admin";
    };

    return (
        <AuthContext.Provider
            value={{
                admin,
                loading,
                login,
                register,
                logout,
                changePassword,
                isSuperAdmin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
