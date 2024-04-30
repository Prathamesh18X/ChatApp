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
		},
	},
	plugins: [require("daisyui")],
};
