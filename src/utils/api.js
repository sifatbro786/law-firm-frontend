import axios from "axios";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL || "https://law-firm-backend-yuxn.onrender.com";

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});


export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;


    if (imagePath.startsWith("http")) return imagePath;

  
    if (imagePath.startsWith("/uploads")) {
        return `${BACKEND_URL}${imagePath}`;
    }


    if (imagePath.startsWith("uploads/")) {
        return `${BACKEND_URL}/${imagePath}`;
    }


    return `${BACKEND_URL}/uploads/${imagePath}`;
};


export const getFileUrl = (filePath) => {
    if (!filePath) return null;


    if (filePath.startsWith("http")) return filePath;


    if (filePath.startsWith("/uploads")) {
        return `${BACKEND_URL}${filePath}`;
    }

    return `${BACKEND_URL}/uploads/cases/${filePath}`;
};


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


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminData");
            delete axios.defaults.headers.common["Authorization"];

            if (!window.location.pathname.includes("/admin/login")) {
                toast.error("Session expired. Please login again.");
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(error);
    },
);

export default api;
