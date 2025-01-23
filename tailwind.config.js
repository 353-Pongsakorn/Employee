import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";
import withMT from "@material-tailwind/react/utils/withMT";
const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default withMT({
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        flowbite.content(), // เพิ่ม content ของ Flowbite
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [
        forms,
        flowbite.plugin(), // เพิ่ม plugin ของ Flowbite
    ],
});
