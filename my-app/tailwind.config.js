/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {

      fontFamily:{
        bp:[
          'Poppins'
        ]
      }
    },
  },
  plugins: [require("daisyui")],
  // darkMode: "false",
  themes: ["light", "dark", "cupcake"],
};
