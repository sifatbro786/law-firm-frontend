// import axios from "axios";
// import toast from "react-hot-toast";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
// });

// // Request interceptor to add token
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem("adminToken");
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     },
// );

// // Response interceptor to handle 401 errors
// api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response?.status === 401) {
//             // Token expired or invalid
//             localStorage.removeItem("adminToken");
//             localStorage.removeItem("adminData");
//             delete axios.defaults.headers.common["Authorization"];

//             // Only redirect if not already on login page
//             if (!window.location.pathname.includes("/admin/login")) {
//                 toast.error("Session expired. Please login again.");
//                 window.location.href = "/admin/login";
//             }
//         }
//         return Promise.reject(error);
//     },
// );

// export default api;

import axios from "axios";
import toast from "react-hot-toast";

// ব্যাকএন্ড URL - এনভায়রনমেন্ট ভেরিয়েবল থেকে নিবে
const BACKEND_URL = import.meta.env.VITE_API_URL || "https://law-firm-backend-yuxn.onrender.com";

const api = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ইমেজ URL জেনারেট করার ফাংশন - সঠিকভাবে ফিক্সড
export const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    // যদি ইতিমধ্যেই ফুল URL থাকে
    if (imagePath.startsWith("http")) return imagePath;

    // যদি /uploads দিয়ে শুরু হয়
    if (imagePath.startsWith("/uploads")) {
        return `${BACKEND_URL}${imagePath}`;
    }

    // যদি uploads/ দিয়ে শুরু হয়
    if (imagePath.startsWith("uploads/")) {
        return `${BACKEND_URL}/${imagePath}`;
    }

    // ডিফল্ট
    return `${BACKEND_URL}/uploads/${imagePath}`;
};

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
