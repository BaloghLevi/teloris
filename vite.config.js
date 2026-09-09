import { readFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import { defineConfig } from 'vite';

const root = process.cwd();
const page = (name) => resolve(root, `src/${name}.html`);

// Header and footer live in one place. `<!--#include name -->` pulls the
// partial in at build time, and the nav link whose data-nav matches the page's
// own route is stamped aria-current, so no page hand-maintains its own chrome.
function partials() {
  return {
    name: 'teloris-partials',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const route = '/' + basename(ctx.filename).replace(/\.html$/, '').replace(/^index$/, '');

        let out = html.replace(/<!--#include\s+([a-z-]+)\s*-->/g, (_, name) =>
          readFileSync(resolve(root, `src/partials/${name}.html`), 'utf8')
        );

        out = out.replace(
          new RegExp(`(<a [^>]*data-nav="${route}")>`, 'g'),
          '$1 aria-current="page">'
        );
        return out;
      },
    },
  };
}

export default defineConfig({
  root: 'src',
  publicDir: resolve(root, 'public'),
  plugins: [partials()],
  build: {
    outDir: resolve(root, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: page('index'),
        'how-it-works': page('how-it-works'),
        why: page('why'),
        contact: page('contact'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: { loadPaths: [resolve(root, 'node_modules')] },
    },
  },
});
