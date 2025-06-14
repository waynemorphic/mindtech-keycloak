/** @type {import("tailwindcss").Config} */
import colors from "tailwindcss/colors";

export default {
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                secondary: colors.gray
            }
        }
    },
    plugins: []
};
