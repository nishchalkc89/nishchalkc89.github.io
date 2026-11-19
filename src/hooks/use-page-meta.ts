import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMeta } from '@/content/seo';

const setMeta = (selector: string, attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

/** keeps the title, description, canonical and structured data in step with the page when visitors move between pages */
export const usePageMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const m = getPageMeta(pathname);
    document.title = m.title;
    setMeta('meta[name="description"]', 'name', 'description', m.description);
    setMeta('meta[name="robots"]', 'name', 'robots', m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1');
    setMeta('meta[property="og:title"]', 'property', 'og:title', m.title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', m.description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', m.canonical);
    setMeta('meta[property="og:type"]', 'property', 'og:type', m.type);
    setMeta('meta[property="og:image"]', 'property', 'og:image', m.image);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', m.title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', m.description);
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', m.image);
    const link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) link.href = m.canonical;

    // the home page keeps the structured data from index.html; other pages swap in their own
    document.head.querySelectorAll('script[data-page-ld]').forEach((n) => n.remove());
    m.jsonLd.forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.pageLd = '1';
      s.text = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [pathname]);
};
