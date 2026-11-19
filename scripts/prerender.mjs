// Runs after the two Vite builds. For every page it writes dist/<route>/index.html with that page's own
// title, description, structured data and readable content, then writes sitemap.xml, feed.xml and 404.html.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);
const { render, getPageMeta, NOT_FOUND, allRoutes, articles, caseStudies, imageOf, SITE_URL } = ssr;

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p) => (p.startsWith('http') ? p : SITE_URL + p);

const metaTag = (html, attr, key, value) =>
  html.replace(new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`), (_, a, b) => a + esc(value) + b);

function withMeta(html, m, bodyHtml) {
  html = html.replace(/<title>[\s\S]*?<\/title>/, () => `<title>${escText(m.title)}</title>`);
  html = metaTag(html, 'name', 'description', m.description);
  html = metaTag(html, 'name', 'robots', m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1');
  html = html.replace(/<meta name="keywords"[^>]*>\s*/, '');
  if (m.noindex) html = html.replace(/<link rel="canonical"[^>]*>\s*/, '');
  else html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => a + esc(m.canonical) + b);
  html = metaTag(html, 'property', 'og:type', m.type);
  html = metaTag(html, 'property', 'og:url', m.canonical);
  html = metaTag(html, 'property', 'og:title', m.title);
  html = metaTag(html, 'property', 'og:description', m.description);
  html = metaTag(html, 'property', 'og:image', m.image);
  html = metaTag(html, 'name', 'twitter:title', m.title);
  html = metaTag(html, 'name', 'twitter:description', m.description);
  html = metaTag(html, 'name', 'twitter:image', m.image);
  // the home page's structured data is replaced by this page's own
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '');
  const ld = m.jsonLd.map((o) => `<script type="application/ld+json" data-page-ld="1">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n    ');
  html = html.replace('</head>', () => `    ${ld}\n  </head>`);
  html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  html = html.replace('<div id="root"></div>', () => `<div id="root">${bodyHtml}</div>`);
  return html;
}

const write = (rel, content) => {
  const file = path.join(dist, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

const routes = allRoutes().filter((r) => r !== '/');
for (const r of routes) {
  write(path.join(r, 'index.html'), withMeta(template, getPageMeta(r), render(r)));
}

// 404 page: a real 404 status from Netlify, kept out of search results
const notFoundBody =
  '<main style="min-height:100vh;display:grid;place-items:center;text-align:center;font-family:system-ui,sans-serif"><div><h1>404</h1><p>This page does not exist.</p><p><a href="/">Back to the portfolio</a></p></div></main>';
write('404.html', withMeta(template, NOT_FOUND, notFoundBody));

// ---------- sitemap ----------
const today = new Date().toISOString().slice(0, 10);
const oldSitemap = fs.readFileSync(path.join(root, 'public', 'sitemap.xml'), 'utf8');
const homeBlock = oldSitemap.match(/<url>[\s\S]*?<\/url>/)[0].replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${today}</lastmod>`);

const imageOfRoute = (r) => {
  const [, section, slug] = r.split('/');
  if (section === 'projects') {
    const p = caseStudies.find((x) => x.slug === slug);
    return { loc: abs(imageOf(slug)), title: `${p.title} website`, caption: `${p.title}, a project built by Nishchal KC` };
  }
  return null;
};

const entry = (r) => {
  const [, section, slug] = r.split('/');
  const isPost = section === 'blog' && slug;
  const lastmod = isPost ? articles.find((a) => a.slug === slug).date : today;
  const priority = section === 'services' ? '0.9' : section === 'projects' ? '0.7' : isPost ? '0.6' : '0.7';
  const img = imageOfRoute(r);
  const imgXml =
    img && !img.loc.endsWith('.svg')
      ? `\n    <image:image>\n      <image:loc>${escText(img.loc)}</image:loc>\n      <image:title>${escText(img.title)}</image:title>\n      <image:caption>${escText(img.caption)}</image:caption>\n    </image:image>`
      : '';
  return `  <url>\n    <loc>${abs(r)}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>${imgXml}\n  </url>`;
};

write(
  'sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n  ${homeBlock}\n${routes.map(entry).join('\n')}\n</urlset>\n`
);

// ---------- RSS feed ----------
const item = (a) => `    <item>
      <title>${escText(a.title)}</title>
      <link>${abs('/blog/' + a.slug + '/')}</link>
      <guid isPermaLink="true">${abs('/blog/' + a.slug + '/')}</guid>
      <pubDate>${new Date(a.date + 'T00:00:00Z').toUTCString()}</pubDate>
      <description>${escText(a.metaDescription)}</description>
    </item>`;
write(
  'feed.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Nishchal KC, Blog</title>
    <link>${SITE_URL}/blog/</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Practical articles on blockchain development, full-stack web apps and working with a freelance developer from Nepal.</description>
    <language>en</language>
${articles.map(item).join('\n')}
  </channel>
</rss>
`
);

fs.writeFileSync(path.join(root, 'dist-ssr', 'urls.txt'), ['/', ...routes].map(abs).join('\n') + '\n');
console.log(`Prerendered ${routes.length} pages, sitemap, feed and 404.`);
