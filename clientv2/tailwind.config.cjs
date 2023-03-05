const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                'blue-dark': '#145277',
                'blue-light': '#49B0AA',
                'opaque-light': 'rgba(255, 255, 255, 0.8)',
                'c-light': '#ffffff',
                'c-dark': '#062C43',
                'c-red': '#FF605C',
                'c-green': '#37D697',
                'c-yellow': '#FFC12B',
            },
            width: {
                'card-w': '300px',
            },
            height: {
                'vh85': '85vh',
                'card-h': '500px',
            },
            maxWidth: {

            },
            fontSize: {

            },
            backgroundImage: {

            }
        },
	},
	plugins: [],
}