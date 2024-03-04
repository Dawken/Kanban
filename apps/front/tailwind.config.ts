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
            animation: {
                showUp: 'showUp 1s cubic-bezier(0.4, 0, 0.6, 1)',
            },
            keyframes: {
                showUp: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
export default config
