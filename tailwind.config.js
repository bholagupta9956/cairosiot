module.exports = {
  mode: 'jit',
  purge: {
    enabled: false,
    content: [
      './src/**/*.js',
      './src/**/*.jsx',
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'sans': 'Ubuntu, Arial, sans-serif',
    },
    extend: {
      width: {
        'table': 'calc(100vw - 2rem)'
      },
      left: {
        'sidebar': '-300px'
      },
      margin: {
        'sidebar': '300px'
      },
      colors: {
        "primary": 'rgba(47, 73, 209, 1)',
        "primary-50": 'rgba(47,73,209, 0.50)',
        "background": 'rgba(244, 245, 247, 1)',
        "light": "rgba(255, 255, 255, 1)",
        "light-50": "rgba(255, 255, 255, 0.5)",
        "dark": "rgba(0, 0, 0, 1)",
        "dark-50": "rgba(0, 0, 0, 0.5)",
        "red": 'rgba(231, 17, 17, 1)',
        "red-50": 'rgba(231, 17, 17, 0.5)'
      }
    },
    fontSize: {
      'heading': '1.75rem',
      'subHeading': '1.50rem',
      'cardHeading': '1rem',
      'cardSubHeading': '.75rem',
      'small': '0.75rem'
    },
    fontWeight: {
      "bold": "700",
      "medium": "500",
      "normal": "400"
    }
  },
  variants: {
  extend: {},
  },
  plugins: []
};