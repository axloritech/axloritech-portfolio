import IntroSequence from "@/components/intro/IntroSequence";
import SiteHeader from "@/components/SiteHeader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhatIBuild from "@/components/WhatIBuild";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";
import SiteFooter from "@/components/SiteFooter";

export default function HomePage() {
  return (
    <>
      <IntroSequence />
      {/* `inert` is applied here while the intro is on screen so nothing
          behind the overlay can be reached with the keyboard or a screen reader. */}
      <div id="site-content">
        <SiteHeader />
        <main>
          <Hero />
          <About />
          <WhatIBuild />
          <Skills />
          <Projects />
          <GitHubSection />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
