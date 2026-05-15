import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: '/stranger-woods/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@rps-story': path.resolve(__dirname, './src/data/stories-data/rock-paper-scissors-story')
        }
    }
});