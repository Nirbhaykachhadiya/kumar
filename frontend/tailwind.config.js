/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "1000mm": "1000mm",
        "500mm":"500mm",
        "800mm":"800mm",
        "2000mm": "2000mm",
        "2000mm": "2000mm",
        "4000mm": "4000mm",
        "2400mm": "2400mm",
        "4400mm": "4400mm",
        "3600mm":"3600mm"
        // Add more custom widths as needed
      },
      fontSize: {
        "10mm": "10mm",
        "20mm": "20mm",
        // Add more custom widths as needed
      },
      height: {
        "100mm": "100mm",
        "200mm": "200mm",
        "400mm": "400mm",
        "800mm": "800mm",

        // Add more custom heights as needed
      },
    },
  },
  plugins: [],
};
