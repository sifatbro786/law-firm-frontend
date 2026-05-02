/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1a1a1a",
                secondary: "#04B0B0",
                accent: "#2c2c2c",
            },
            fontFamily: {
                playfair: ["Playfair Display", "serif"],
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
};
