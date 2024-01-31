import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                black: '#090909',
                delete: '#ff4f4d',
            },
            fontFamily: {
                raleway: ['Raleway'],
            },
            textColor: {
                disabled: 'rgba(255,255,255,0.3)',
                delete: '#ff4f4d',
            },
        },
    },
    plugins: [],
}
export default config
