/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        "1000mm": "1000mm",
        "500mm": "500mm",
        "800mm": "800mm",
        "2000mm": "2000mm",
        "2000mm": "2000mm",
        "4000mm": "4000mm",
        "2400mm": "2400mm",
        "4400mm": "4400mm",
        "3600mm": "3600mm",
        // Add more custom widths as needed
      },
      fontSize: {
        "3mm": "3mm",
        "4mm": "4mm",
        "5mm": "5mm",
        "10mm": "10mm",
        "20mm": "20mm",
        "6mm": "6mm",
        "7mm": "7mm",
        "8mm": "8mm",
        "9mm": "9mm",
        "10mm": "10mm",
        "12mm":"12mm",
        "14mm":"14mm"
        // Add more custom widths as needed
      },
      height: {
        "20mm":"20mm",
        "10mm":"10mm",
        "15mm":"15mm",
        "27mm": "27mm",
        "40mm": "40mm",
        "100mm": "100mm",
        "200mm": "200mm",
        "400mm": "400mm",
        "800mm": "800mm",

        // Add more custom heights as needed
      },
      padding: {
        "2mm":"2mm",
        "3mm":"3mm",
        "4mm":"4mm",
        "10mm": "10mm",
        "20mm": "20mm",
      },
      margin: {
        "10mm": "10mm",
        "20mm": "20mm",
      },
    },
  },
  plugins: [],
};
