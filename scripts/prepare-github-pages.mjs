import { copyFile, cp, lstat, readFile, realpath, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = await realpath(fileURLToPath(new URL('../', import.meta.url)));
const dist = join(root, 'dist');
const source = join(dist, 'online-education', 'browser');
const target = join(dist, 'github-pages');
const publishTarget = join(root, 'docs');

async function inspect(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

// Only clean the fixed output directories beneath the resolved repository root.
for (const directory of [dist, target, publishTarget]) {
  const info = await inspect(directory);
  if (info && (info.isSymbolicLink() || !info.isDirectory())) {
    throw new Error(`Expected a regular directory: ${directory}`);
  }
}

const entry = (await inspect(join(source, 'index.html')))?.isFile()
  ? 'index.html'
  : 'index.csr.html';
const html = await readFile(join(source, entry), 'utf8');
// Both the discovery link and its actual prerendered destination must be present.
const landingHtml = await readFile(join(source, 'online-kuran-egitimi', 'index.html'), 'utf8');
if (!landingHtml.includes('https://ikraeducationn.github.io/ikra/online-kuran-egitimi/')) {
  throw new Error('Expected the prerendered landing page with its canonical URL.');
}
// Use the prerendered not-found page so the error message also works without JavaScript.
const notFound = join(source, 'sayfa-bulunamadi', 'index.html');
await readFile(notFound, 'utf8');
// Validate the build before removing the previous prepared output.
if (!html.includes('<base href="/ikra/">')) {
  throw new Error('Expected a GitHub Pages build with base href /ikra/. Run npm run build:pages.');
}
if (!/<a\b[^>]*\bhref="\/ikra\/online-kuran-egitimi\/"[^>]*>/.test(html)) {
  throw new Error('Expected a crawlable landing-page link in the prerendered root index.html.');
}

await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
await copyFile(notFound, join(target, '404.html'));
if (entry === 'index.csr.html') {
  await copyFile(join(target, entry), join(target, 'index.html'));
}
console.log(`GitHub Pages files prepared in ${target}`);
await rm(publishTarget, { recursive: true, force: true });
await cp(target, publishTarget, { recursive: true });
console.log(`GitHub Pages main/docs output prepared in ${publishTarget}`);
