"use client";

import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutHero from "../components/about/AboutHero";
import AboutProject from "../components/about/AboutProject";
import AboutAuthor from "../components/about/AboutAuthor";
import SkillsSection from "../components/about/SkillsSection";
import TechStackSection from "../components/about/TechStackSection";
import AboutCTA from "../components/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white dark:bg-neutral-950">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <AboutHero />
          <AboutProject />
          <AboutAuthor />
          <SkillsSection />
          <TechStackSection />
          <AboutCTA />
        </div>
      </main>
      <Footer />
    </>
  );
}

