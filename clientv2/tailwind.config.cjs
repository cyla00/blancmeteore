const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            colors: {
                'blue-dark': '#ff6a00',
                'blue-light': '#ee0979', 
                'opaque-light': 'rgba(255, 255, 255, 0.8)',
                'c-light': '#ffffff',
                'c-dark': '#062C43',
                'c-red': '#FF605C',
                'c-green': '#37D697',
                'c-yellow': '#FFC12B',
                'c-cont': '#d7dadd',
                'c-env': '#7a8793',
                'c-sign': '#09aeae',
            },
            width: {
                'card-w': '300px',
                'connection-card': '1000px',
            },
            height: {
                'vh85': '85vh',
                'vh90': '90vh',
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
