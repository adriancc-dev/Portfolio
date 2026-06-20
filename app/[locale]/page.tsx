import Navbar from '@/components/ui/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Stack from '@/components/sections/Stack';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
