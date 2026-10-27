import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Work } from '@/components/sections/Work';
import { Services } from '@/components/sections/Services';
import { Stack } from '@/components/sections/Stack';
import { Experience } from '@/components/sections/Experience';
import { Gallery } from '@/components/sections/Gallery';
import { Contact } from '@/components/sections/Contact';

const Index = () => (
  <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <Header />
    <main>
      <Hero />
      <About />
      <Work />
      <Services />
      <Stack />
      <Experience />
      <Gallery />
      <Contact />
    </main>
    <Footer />
  </div>
);

export default Index;
