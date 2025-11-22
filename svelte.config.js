import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter(),
    },
    compilerOptions: {
        // disable all warnings coming from node_modules and all accessibility warnings
        warningFilter: (warning) => {
            return warning.code.includes("ally_");
        },
    },
};

export default config;
