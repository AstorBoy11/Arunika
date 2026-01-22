import type { Config } from "tailwindcss";

const config: Config = {
    // PENTING: Baris ini yang mengaktifkan fitur dark mode via class
    darkMode: "class",

    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Ini warna kustom project Arunika kita
                primary: "#ec6d13",
                "background-light": "#fdf8f2",
                "background-dark": "#231910",
                "surface-dark": "#1a140e",
                "border-brown": "#3e342b",
                "text-secondary": "#b9a89d",
            },
            fontFamily: {
                display: ["Work Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;
