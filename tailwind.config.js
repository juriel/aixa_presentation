/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./js/**/*.{js,ts,jsx,tsx}",
        "./css/**/*.css",
    ],
    theme: {
        extend: {
            colors: {
                aixa: {
                    dark: '#001a2c',
                    blue: '#005bb7',
                    light: '#e0f2fe',
                }
            }
        },
    },
    plugins: [],
}
