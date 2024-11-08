/* eslint-disable no-undef */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Satoshi400: ["Satoshi-Regular"],
        Satoshi500: ["Satoshi-Medium"],
        Satoshi700: ["Satoshi-Bold"],
        Satoshi900: ["Satoshi-Black"],

        EBGaramond600: ["EBGaramond-Medium"],
        EBGaramond500: ["EBGaramond-Regular"],
      },
      colors: {
        primary: {
          light: "#00AFEF",
          text: "#333333",
          pink: "#DD4A6B",
        },
        searchBg: "#EFEFEF",
        messageFont: "rgba(63, 99, 77, 0.80)",
        brand: "#2F929C",
        secondary: {
          main: "#00AFEF8A",
          // light: "var(--color-secondary-light)",
          // dark: "var(--color-secondary-dark)",
          // contrastText: "var(--color-secondary-contrastText)",
        },
      },
      utilities: {
        ".tick": {
          display: "inline-block",
          width: "1.55rem",
          height: "0.5rem",
          border: "2px solid currentColor",
          borderTop: "none",
          borderRight: "none",
          transform: "rotate(-45deg)",
          marginRight: "0.25rem",
        },
      },
      gridTemplateColumns: {
        'temp': 'auto 1fr auto',
        'temp2': '1.5fr 3.333fr',
        'temp3': '1fr 1.5fr',
        'customGrid': 'repeat(auto-fit, minmax(200px, 1fr))',
        'customGrid2': 'repeat(auto-fit, minmax(250px, 1fr))',
        'customGrid3': 'repeat(auto-fit, minmax(150px, 1fr))',
      },
      gridtemplateRows: {
        'temp': 'auto 1fr auto',
        'temp2': 'auto 1fr',
      },
      screens: {
        'msgBreak': {'max': '1134px'},
        'msgTab': {'max': '800px'},
        'msgTab2': {'min': '800px'},
        'msgTab3': {'min': '900px'},
        'msgTab4': {'max': '900px'},
        'msgMob': {'max': '576px'},
        'dashBreak': {'max': '1240px'},
        'dashBreak2': {'max': '1280px'},
        'eventBreak': {'max': '1024px'},
        'eventBreak1': {'max': '1250px'},
      },
      boxShadow: {
        '3xl': '2px 2px 1px 2px rgba(0, 0, 0, 0.25)',
        '4xl': '1px 2px 2px 2px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
};