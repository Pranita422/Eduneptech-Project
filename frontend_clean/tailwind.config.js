/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "rgb(var(--background) / <alpha-value>)",
                surface: {
                    DEFAULT: "rgb(var(--surface) / <alpha-value>)",
                    highlight: "rgb(var(--surface-highlight) / <alpha-value>)",
                },
                text: {
                    primary: "rgb(var(--text-primary) / <alpha-value>)",
                    secondary: "rgb(var(--text-secondary) / <alpha-value>)",
                    muted: "rgb(var(--text-muted) / <alpha-value>)",
                },
                border: {
                    DEFAULT: "rgb(var(--border) / <alpha-value>)",
                    highlight: "rgb(var(--border-highlight) / <alpha-value>)",
                },
                primary: {
                    DEFAULT: "rgb(var(--primary) / <alpha-value>)",
                    fg: "rgb(var(--primary-fg) / <alpha-value>)",
                },
            },
        },
    },
    plugins: [],
}
