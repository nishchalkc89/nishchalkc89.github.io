import servicesJson from './services.json';
import projectsJson from './projects.json';
import articlesJson from './articles.json';
import { projects as legacyProjects } from '@/data/site';

export const SITE_URL = 'https://nishchalkc.com.np';

export type Service = (typeof servicesJson)[number];
export type CaseStudy = (typeof projectsJson)[number] & { note?: string };
export type Block = { h2?: string; p?: string; ul?: string[]; ol?: string[] };
export type Article = Omit<(typeof articlesJson)[number], 'blocks'> & { blocks: Block[] };

export const services: Service[] = servicesJson;
export const caseStudies: CaseStudy[] = projectsJson as CaseStudy[];
export const articles: Article[] = articlesJson as Article[];

/** screenshot, links and tech chips for each case study. Both lists are in the same order. */
export const media = (slug: string) => {
  const i = caseStudies.findIndex((p) => p.slug === slug);
  return legacyProjects[i];
};

export const imageOf = (slug: string) => {
  const m = media(slug);
  return m?.image ?? (m?.cover ? `/img/cover-${m.cover}.svg` : '/og-image.png');
};

export const serviceBySlug = (slug?: string) => services.find((s) => s.slug === slug);
export const projectBySlug = (slug?: string) => caseStudies.find((p) => p.slug === slug);
export const articleBySlug = (slug?: string) => articles.find((a) => a.slug === slug);

export const urls = {
  service: (slug: string) => `/services/${slug}/`,
  project: (slug: string) => `/projects/${slug}/`,
  article: (slug: string) => `/blog/${slug}/`,
  blog: '/blog/',
};

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** every page that gets its own prerendered HTML file */
export const allRoutes = (): string[] => [
  '/',
  ...services.map((s) => urls.service(s.slug)),
  ...caseStudies.map((p) => urls.project(p.slug)),
  urls.blog,
  ...articles.map((a) => urls.article(a.slug)),
];
