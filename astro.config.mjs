import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import { loadEnv } from 'vite';

const { SITE_URL } = loadEnv('production', process.cwd(), '');

export default defineConfig({
  site: SITE_URL || undefined,
  vite: { plugins: [tailwind()] },
});
