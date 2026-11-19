import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useParams } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { usePageMeta } from "@/hooks/use-page-meta";

const ServicePage = lazy(() => import("./components/pages/ServicePage"));
const ProjectPage = lazy(() => import("./components/pages/ProjectPage"));
const BlogPages = lazy(() => import("./components/pages/BlogPages").then((m) => ({ default: m.BlogIndex })));
const BlogPostPage = lazy(() => import("./components/pages/BlogPages").then((m) => ({ default: m.BlogPost })));

const queryClient = new QueryClient();

const Service = () => <ServicePage slug={useParams().slug ?? ""} />;
const Project = () => <ProjectPage slug={useParams().slug ?? ""} />;
const Post = () => <BlogPostPage slug={useParams().slug ?? ""} />;

/** page title and tags follow the route; the page scrolls to the top, or to the section named in the link */
const RouteEffects = () => {
  const { pathname, hash } = useLocation();
  usePageMeta();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteEffects />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/:slug" element={<Service />} />
            <Route path="/projects/:slug" element={<Project />} />
            <Route path="/blog" element={<BlogPages />} />
            <Route path="/blog/:slug" element={<Post />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
