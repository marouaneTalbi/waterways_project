module.exports = {
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    theme: {
      colors: {
        'dark-orange': '#FE7768',
        'light-orange': '#FFF3F2',
      },
      extend: {
        backgroundImage: {
          'hero-pattern': "url('/public/background.png')",
        }
      },
    },
    plugins: [
      require('flowbite/plugin')
    ],
  }
  