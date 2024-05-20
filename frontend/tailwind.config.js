/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				purple: "#833ab4",
				red: "#fd1d1d",
				yellow: "#fcb045",
			},
			screens: {
				'xs': '320px',  // Mobile S
				'sm': '376px',  // Mobile M
				'md': '431px',  // Mobile L
				'tablet': '769px', // Tablet
				'laptop': '1025px', // Laptop
				'laptopL': '1440px', // Laptop L
				'4k': '2560px', // 4K
			},
		},
	},
	plugins: [require("daisyui")],
};
