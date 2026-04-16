/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1a1a1a",
                secondary: "#c9a03d",
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
