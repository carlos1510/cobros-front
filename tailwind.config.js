/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import forms from '@tailwindcss/forms';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    /* screens: {
      xs: "340px",
      sm: "440px",
      md: "720px",
      lg: "1200px",
      xl: "1540px"
    }, */
    extend: {
      backgroundImage: {
        'background': "url('./src/assets/J4o.gif')"
      },
      screens: {
        xs: "340px",
        sm: "440px",
        md: "720px",
        lg: "1200px",
        xl: "1540px"
      },
      borderWidth: {
        3: '3px',
      },
      minWidth: {
        36: '9rem',
        44: '11rem',
        56: '14rem',
        60: '15rem',
        72: '18rem',
        80: '20rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      zIndex: {
        60: '60',
      },
    },
    fontFamily: {
      Jost: ["Jost", "sans-serif"],
      Lobster: ["Lobster", "sans-serif"]
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "12px",
        md: "32px"
      }
    }
  },
  plugins: [
    forms,
    // add custom variant for expanding sidebar
    plugin(({ addVariant, e }) => {
      addVariant('sidebar-expanded', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => `.sidebar-expanded .${e(`sidebar-expanded${separator}${className}`)}`);
      });
    }),
  ],
}

