import { useState, useEffect } from 'react';
import type { SectionId, ProjectData } from './types/portfolio';
import { UniverseCanvas } from './components/3d/UniverseCanvas';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { Navbar } from './components/Navigation/Navbar';
import { UniverseControls } from './components/Navigation/UniverseControls';
import { HeroSection } from './components/Hero/HeroSection';
import { MissionProfile } from './components/About/MissionProfile';
import { SkillsGalaxy } from './components/SkillsGalaxy/SkillsGalaxy';
import { ProjectMissions } from './components/ProjectMission/ProjectMissions';
import { AchievementsSection } from './components/Achievements/AchievementsSection';
import { ContactSection } from './components/Contact/ContactSection';
import { Footer } from './components/Footer/Footer';
import { ResumeModal } from './components/Modals/ResumeModal';
import { ProjectDetailModal } from './components/Modals/ProjectDetailModal';
import { universeAudio } from './services/audio';

export function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [warpSpeed, setWarpSpeed] = useState(false);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [cameraMode, setCameraMode] = useState<'cinematic' | 'orbit' | 'topdown'>('cinematic');

  // Modals state
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  // Scroll spy to update active section in 3D universe
  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setSelectedProject(null);
      } else if (e.key === 'm' || e.key === 'M') {
        universeAudio.toggleMute();
      } else if (e.key === 'w' || e.key === 'W') {
        setWarpSpeed((prev) => !prev);
      } else if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const map: Record<string, SectionId> = {
          '1': 'about',
          '2': 'skills',
          '3': 'projects',
          '4': 'achievements',
          '5': 'contact'
        };
        const target = map[e.key];
        if (target) {
          handleNavigate(target);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (sectionId: SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleWarp = () => {
    setWarpSpeed((prev) => !prev);
  };

  const handleToggleWireframe = () => {
    setWireframeMode((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans">
      
      {/* Cinematic Loading Experience */}
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {/* Persistent 3D Space Universe Canvas */}
      <UniverseCanvas
        activeSection={activeSection}
        warpSpeed={warpSpeed}
        wireframeMode={wireframeMode}
        cameraMode={cameraMode}
      />

      {/* Floating Holographic Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Floating Universe HUD Controls */}
      <UniverseControls
        warpSpeed={warpSpeed}
        onToggleWarp={handleToggleWarp}
        wireframeMode={wireframeMode}
        onToggleWireframe={handleToggleWireframe}
        cameraMode={cameraMode}
        onChangeCameraMode={setCameraMode}
      />

      {/* Main Sections Flow */}
      <main className="relative z-10">
        <HeroSection
          onNavigate={handleNavigate}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <MissionProfile
          onOpenResume={() => setIsResumeOpen(true)}
        />

        <SkillsGalaxy />

        <ProjectMissions
          onOpenProjectDetail={(project) => setSelectedProject(project)}
        />

        <AchievementsSection />

        <ContactSection
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Modals */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}

export default App;
