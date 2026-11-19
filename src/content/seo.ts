import {
  SITE_URL, articleBySlug, caseStudies, imageOf, projectBySlug, serviceBySlug, urls, articles, services,
} from './index';

export type PageMeta = {
  title: string;
  description: string;
  canonical: string;
  image: string;
  type: 'website' | 'article';
  noindex?: boolean;
  jsonLd: object[];
};

const abs = (p: string) => (p.startsWith('http') ? p : SITE_URL + p);

const person = { '@type': 'Person', name: 'Nishchal KC', url: SITE_URL + '/' };

const crumbs = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({
    '@type': 'ListItem', position: i + 1, name, item: abs(path),
  })),
});

const HOME: PageMeta = {
  title: 'Nishchal KC | Blockchain Engineer & Full-Stack Developer',
  description: 'Nishchal KC is a blockchain engineer and full-stack developer from Nepal, building Solidity smart contracts, React web apps and clean UI. Available to hire.',
  canonical: SITE_URL + '/',
  image: SITE_URL + '/og-image.png',
  type: 'website',
  jsonLd: [],
};

export const NOT_FOUND: PageMeta = {
  title: 'Page not found | Nishchal KC',
  description: 'This page does not exist. Go back to the portfolio of Nishchal KC.',
  canonical: SITE_URL + '/',
  image: SITE_URL + '/og-image.png',
  type: 'website',
  noindex: true,
  jsonLd: [],
};

export const getPageMeta = (rawPath: string): PageMeta => {
  const path = rawPath.replace(/\/+$/, '') + '/';
  if (path === '/') return HOME;

  const [, section, slug] = path.split('/');

  if (section === 'services') {
    const s = serviceBySlug(slug);
    if (!s) return NOT_FOUND;
    const canonical = abs(urls.service(s.slug));
    return {
      title: s.metaTitle, description: s.metaDescription, canonical, image: SITE_URL + '/og-image.png', type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org', '@type': 'Service', name: s.name, description: s.metaDescription,
          url: canonical, serviceType: s.name, areaServed: 'Worldwide', provider: person,
        },
        {
          '@context': 'https://schema.org', '@type': 'FAQPage',
          mainEntity: s.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        },
        crumbs([['Home', '/'], ['Services', '/#services'], [s.name, urls.service(s.slug)]]),
      ],
    };
  }

  if (section === 'projects') {
    const p = projectBySlug(slug);
    if (!p) return NOT_FOUND;
    const canonical = abs(urls.project(p.slug));
    const image = abs(imageOf(p.slug));
    return {
      title: p.metaTitle, description: p.metaDescription, canonical, image, type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.title, description: p.metaDescription,
          url: canonical, image, creator: person, author: person,
        },
        crumbs([['Home', '/'], ['Projects', '/#work'], [p.title, urls.project(p.slug)]]),
      ],
    };
  }

  if (section === 'blog' && !slug) {
    return {
      title: 'Blog | Nishchal KC',
      description: 'Practical articles on blockchain development, full-stack web apps and working with a freelance developer from Nepal.',
      canonical: abs(urls.blog), image: SITE_URL + '/og-image.png', type: 'website',
      jsonLd: [
        {
          '@context': 'https://schema.org', '@type': 'Blog', name: 'Nishchal KC, Blog', url: abs(urls.blog), author: person,
          blogPost: articles.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: abs(urls.article(a.slug)), datePublished: a.date })),
        },
        crumbs([['Home', '/'], ['Blog', urls.blog]]),
      ],
    };
  }

  if (section === 'blog') {
    const a = articleBySlug(slug);
    if (!a) return NOT_FOUND;
    const canonical = abs(urls.article(a.slug));
    return {
      title: a.metaTitle, description: a.metaDescription, canonical, image: SITE_URL + '/og-image.png', type: 'article',
      jsonLd: [
        {
          '@context': 'https://schema.org', '@type': 'Article', headline: a.title, description: a.metaDescription,
          datePublished: a.date, dateModified: a.date, image: SITE_URL + '/og-image.png',
          mainEntityOfPage: canonical, author: person,
          publisher: { '@type': 'Person', name: 'Nishchal KC', url: SITE_URL + '/' },
        },
        crumbs([['Home', '/'], ['Blog', urls.blog], [a.title, urls.article(a.slug)]]),
      ],
    };
  }

  return NOT_FOUND;
};

export { caseStudies, services };
