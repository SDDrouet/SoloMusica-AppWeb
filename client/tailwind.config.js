module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primaryColor: "#222831", // Negro
        primaryColorLight: "#2e333b",
        secondaryColor: "#393E46", // Gris
        secondaryColorLight: "#42464d", // Gris
        tertiaryColor: "#0EA5E9", // Cyan
        tertiaryColorLight: "#20bbff",
        quaternaryColor: "#EEEEEE", // Blanco
        quaternaryColorLight: "FFFFFF",
        deleteColor: "#e90e28", // Rojo


        headingColor: "#1a1d23", // Negro oscuro
        textColor: "#4f5d6e", // Gris azulado oscuro
        textLight: "#e6f1f4", // Blanco claro
        cartNumBg: "#00acee", // Cyan claro
        primary: "#2f343a", // Negro azulado oscuro
        cardOverlay: "rgba(0, 150, 255, 0.4)", // Celeste transparente
        darkOverlay: "rgba(0, 0, 0, 0.7)", // Negro transparente oscuro
        lightOverlay: "rgba(0, 150, 255, 0.2)", // Celeste transparente claro
        lighttextGray: "#657786", // Gris azulado claro
        card: "rgba(0, 150, 255, 0.8)", // Celeste transparente
        cartBg: "#1a1d23", // Negro oscuro
        cartItem: "#2e343a", // Negro azulado oscuro
        cartTotal: "#343739", // Negro azulado oscuro claro
        loaderOverlay: "rgba(0, 150, 255, 0.1)", // Celeste transparente muy claro
      },
    },
  },
  plugins: [
    // require("tailwind-scrollbar")
  ],
};