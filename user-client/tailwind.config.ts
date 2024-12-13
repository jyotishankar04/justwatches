import flowbite from "flowbite-react/tailwind"
import type { Config } from "tailwindcss"

const config = {
 content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content()
  ],
  theme: {

    extend: {
      colors:{
        heroOrange: "#895022",
      }
    },
  },
  daisyui: {
    themes: ["light"],
  },
  plugins: [ require("daisyui"), flowbite.plugin(),require("@tailwindcss/typography")],
} satisfies Config

export default config