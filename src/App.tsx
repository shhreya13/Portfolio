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
      {/* CustomCursor has been removed from here. 
          The browser will now default to the standard OS pointer. 
      */}
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
        
        <Hero />
        <AboutMe />
        <ResumePage/>
        <ExperienceTimeline />
        <SkillsMatrix />

        <ProjectsGallery />
        <ContactSection />
      </main>

      <Footer />
      <FloatingSocialDock />
    </div>
  );
}

export default App;