
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                'ABeeZee': ['ABeeZee', 'sans-serif'],
            },
            width:{
                "1/8": '5.55%',
            },
            height:{
                "1/8": '5.55%',
            }
        },
    },
    plugins: [],
};