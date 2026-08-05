/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        bounce: "bounce 0.6s infinite",
        fadeInRight: "fadeInRight 0.5s ease-out",
        fadeOutLeft: "fadeOutLeft 0.5s ease-in",
        fadeIn: "fadeIn 1s ease-in-out",
        scapeUpTop: "scapeUpTop 1s ease-in-out",
        scapeUpCenter: "scapeUpCenter 1s ease-in",
        slideLeft: "slideLeft 1s ease-in-out",
        jiggle: "jiggle 0.5s ease-in-out",
        flyInDown: "flyInDown 1s ease-out",
        dropIn: "dropIn 0.8s cubic-bezier(0.25, 0.8, 0.5, 1)",
        zoomIn: "zoomIn 0.8s ease-out",
        zoomInLeft: "zoomInLeft 1s ease-in-out",
        zoomInRight: "zoomInRight 1s ease-in-out",
        bounceInDown: "bounceInDown 1s ease-in-out",
        puffIn: "puffIn 0.8s ease-out",
        jumpIn: "jumpIn 0.8s ease-out",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-15px)",
          },
        },
        fadeInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(100%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        fadeOutLeft: {
          "0%": {
            opacity: "1",
            transform: "translateX(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(-100%)",
          },
        },
        scapeUpTop: {
          "0%": {
            transform: "scale(0.5)",
            transformOrigin: "50% 0%",
          },
          "100%": {
            transform: "scale(1)",
            transformOrigin: "50% 0%",
          },
        },
        scapeUpCenter: {
          "0%": {
            transform: "scale(0.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        slideLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        jiggle: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
        flyInDown: {
          "0%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        dropIn: {
          "0%": {
            transform: "translateY(-200%) scale(0.5)",
            opacity: "0",
          },
          "80%": {
            transform: "translateY(0) scale(1.1)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
          },
        },
        zoomIn: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        bounceInDown: {
          "0%": {
            transform: "translateY(3000px)",
            opacity: "0",
          },
          "60%": {
            transform: "translateY(-20px)",
            opacity: "1",
          },
          "80%": {
            transform: "translateY(10px)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        zoomInLeft: {
          "0%": {
            transform: "scale(0.5) translateX(-100%)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(0.7) translateX(0)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(1) translateX(0)",
            opacity: "1",
          },
        },
        zoomInRight: {
          "0%": {
            transform: "scale(0.5) translateX(100%)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(0.7) translateX(0)",
            opacity: "0.5",
          },
          "100%": {
            transform: "scale(1) translateX(0)",
            opacity: "1",
          },
        },
        puffIn: {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.2)",
            opacity: "0.7",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        jumpIn: {
          "0%": {
            transform: "translateY(100%) scale(0.5)",
            opacity: "0",
          },
          "50%": {
            transform: "translateY(-10%) scale(1.1)",
            opacity: "0.8",
          },
          "100%": {
            transform: "translateY(0) scale(1)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
