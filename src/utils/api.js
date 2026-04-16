import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminData");
            delete axios.defaults.headers.common["Authorization"];

            // Only redirect if not already on login page
            if (!window.location.pathname.includes("/admin/login")) {
                toast.error("Session expired. Please login again.");
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    },
);

export default api;
