import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { ThemeProvider } from "next-themes";
import ServicePage from "./components/pages/ServicePage";
import ProjectPage from "./components/pages/ProjectPage";
import { BlogIndex, BlogPost } from "./components/pages/BlogPages";

/** Used only at build time: turns a page into plain HTML so search engines can read it without running scripts. */
export const render = (path: string): string => {
  const [, section, slug] = path.split("/");
  const page =
    section === "services" ? <ServicePage slug={slug} /> :
    section === "projects" ? <ProjectPage slug={slug} /> :
    section === "blog" && slug ? <BlogPost slug={slug} /> :
    section === "blog" ? <BlogIndex /> : null;
  if (!page) throw new Error("No page for " + path);
  return renderToString(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="nk-theme">
      <StaticRouter location={path}>{page}</StaticRouter>
    </ThemeProvider>
  );
};

export { getPageMeta, NOT_FOUND } from "./content/seo";
export { allRoutes, articles, caseStudies, imageOf, services, urls, SITE_URL } from "./content";
