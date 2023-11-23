import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['src/app/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundColor: {
                black: '#090909',
            },
            fontFamily: {
                raleway: ['Raleway'],
            },
        },
    },
    plugins: [],
}
export default config
