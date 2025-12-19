import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingSocialDock from './animations/FloatingSocialDock';
import AboutMe from './components/AboutMe';
import ExperienceTimeline from './components/ExperienceTimeline';
import ProjectsGallery from './components/ProjectsGallery';
import SkillsMatrix from './components/SkillsMatrix';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import Aurora from './animations/Aurora';
import ResumePage from './components/ResumePage';

function App() {
  return (
    <div className="min-h-screen bg-transparent text-white overflow-x-hidden">
      <Navbar />

      <main className="relative">
        <div className="fixed inset-0 -z-20 pointer-events-none">
          <Aurora
            colorStops={["#4a0404", "#8B1538", "#000000"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>

        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_50%,#4a0404_0%,#000000_100%)] opacity-40 pointer-events-none" />
        
        {/* Each section is full-width, but we use scroll-mt to handle the Navbar overlap */}
        <section id="hero">
          <Hero />
        </section>

        <section id="aboutme" className="scroll-mt-28">
          <AboutMe />
        </section>

        <section id="resume" className="scroll-mt-28">
          <ResumePage />
        </section>

        <section id="experience" className="scroll-mt-28">
          <ExperienceTimeline />
        </section>

        <section id="skills" className="scroll-mt-28">
          <SkillsMatrix />
        </section>

        <section id="projects" className="scroll-mt-28">
          <ProjectsGallery />
        </section>

        <section id="contact" className="scroll-mt-28">
          <ContactSection />
        </section>
      </main>

      <Footer />
      <FloatingSocialDock />
    </div>
  );
}

export default App;