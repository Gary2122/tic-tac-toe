import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        Unocss(),
        AutoImport({
            imports: [
                'react', // Automatically imports react and react hooks (e.g., useState, useEffect)
                // 'react-dom', // Automatically imports react-dom
                // Add more APIs here if you want to auto-import them
            ],
            dts: './auto-imports.d.ts', // Optional: generates a TypeScript declaration file for auto-imports
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        },
    },
});
