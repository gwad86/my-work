/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  Terminal, 
  Smartphone, 
  Zap, 
  Eye, 
  Users, 
  Lock, 
  AlertTriangle,
  Play,
  Volume2,
  Share2,
  ChevronRight,
  Target,
  CheckCircle2
} from 'lucide-react';
import { MarketingStrategy, ScriptSection } from './types';

const strategy: MarketingStrategy = {
  targetAudience: "Tech enthusiasts, Job seekers, Digital natives",
  tone: "Urgent, High-Impact, Transformative",
  platform: "Both",
  hook: "YOUR WAKE UP CALL",
  callToAction: "JOIN SECURE FUTURE",
  script: [
    {
      id: "hook",
      title: "The Hook (0-3s)",
      duration: "3s",
      visual: "Fast glitch transitions of scrolling phones, credit card digits flying, and a red 'SYSTEM BREACH' warning flashing.",
      audio: "Extreme cinematic hit sound. VO: 'بينما أنت غارق في التمرير، هناك من يسحب بياناتك الآن.. وظيفتك ستختفي خلال 12 شهراً، هل أنت مستعد؟'",
      textOnScreen: ["WAKE UP CALL", "DATA EXPOSED"],
      trigger: "Fear of Loss (FOMO) + Curiosity"
    },
    {
      id: "chaos",
      title: "Digital Chaos (3-15s)",
      duration: "12s",
      visual: "Daily internet activities (Instagram, WhatsApp) melting into lines of binary code. Zooming through fiber optic cables. Rapid shots of news headlines about cyber attacks.",
      audio: "Rising high-tension rhythmic pulse. Digital 'glitch' sound effects on every transition.",
      textOnScreen: ["THE FUTURE IS CYBER", "DON'T GET LEFT BEHIND"],
      trigger: "Rapid Digital Change"
    },
    {
      id: "solution",
      title: "The Specialist (15-30s)",
      duration: "15s",
      visual: "Visuals stabilize. Shot of Jawad Al-Jundi in a high-tech lab. UI elements showing complex security systems being successfully managed.",
      audio: "Beat drop - heavy and confident. VO: 'كن الصياد، لا الفريسة. تعلم من الأفضل. انضم إلى جواد الجندي الآن.'",
      textOnScreen: ["SKILLS = SURVIVAL", "LEAD THE DEFENSE"],
      trigger: "Authority + Empowerment"
    },
    {
      id: "cta",
      title: "The Final Strike (30-40s)",
      duration: "10s",
      visual: "Final logo reveal with a pulsating 'REGISTER NOW' indicator. QR code appearing in 3D.",
      audio: "Full orchestration peaks then stops. VO: 'سجل الآن. مستقبلك يبدأ هنا.'",
      textOnScreen: ["JOIN NOW", "LIMITED SLOTS"],
      trigger: "Urgency + Scarcity"
    }
  ]
};

const SectionCard = ({ section, index }: { section: ScriptSection; index: number }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
    className="border-l-2 border-white/10 pl-6 py-8 group hover:border-emerald-500 transition-colors"
  >
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xs font-mono text-emerald-500">0{index + 1}</span>
      <h3 className="text-xl font-bold uppercase tracking-tighter">{section.title}</h3>
      <span className="text-xs font-mono bg-white/5 px-2 py-1 ml-auto">{section.duration}</span>
    </div>
    
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Visual Flow</label>
          <p className="text-sm text-white/80 leading-relaxed font-light">{section.visual}</p>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Voice Over / Audio</label>
          <div className="bg-white/5 p-4 rounded border border-white/10 flex gap-3 italic">
            <Volume2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <p className="text-sm text-emerald-100">{section.audio}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Screen Text (Viral)</label>
          <div className="flex flex-wrap gap-2">
            {section.textOnScreen.map(text => (
              <span key={text} className="bg-emerald-500 text-black font-black text-xs px-2 py-1">
                {text}
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">Psych Trigger</label>
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <Zap className="w-3 h-3" />
            {section.trigger}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);

const CinematicPreview = ({ onFinish }: { onFinish: () => void }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const sectionDurations = [3, 12, 15, 10]; // seconds
    const totalTime = sectionDurations.reduce((a, b) => a + b, 0) * 1000;
    
    let startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percent = Math.min((elapsed / totalTime) * 100, 100);
      setProgress(percent);

      // Glitch effect trigger
      if (Math.random() > 0.95) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 50);
      }

      let currentElapsed = 0;
      for (let i = 0; i < sectionDurations.length; i++) {
        currentElapsed += sectionDurations[i] * 1000;
        if (elapsed < currentElapsed) {
          setStep(i);
          break;
        }
      }

      if (elapsed >= totalTime) {
        clearInterval(interval);
        setTimeout(onFinish, 1000);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onFinish]);

  const currentSection = strategy.script[step];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden ${glitch ? 'invert transition-none' : 'transition-colors duration-200'}`}
    >
      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent opacity-80" />
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent opacity-80" />
        <div className="absolute inset-0 border-[20px] border-black" />
      </div>

      {/* Recording Indicator */}
      <div className="absolute top-12 left-12 flex items-center gap-3">
        <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse" />
        <span className="font-mono text-xs tracking-widest text-white/60">REC [VIRAL_AD_SIM]</span>
      </div>

      <div className="relative w-full max-w-lg aspect-[9/16] bg-neutral-900 border border-white/10 rounded-2xl flex flex-col items-center justify-center overflow-hidden shadow-2xl shadow-emerald-500/10">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#10b981_0%,transparent_70%)] animate-pulse" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-50 mix-blend-overlay" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={step}
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
            transition={{ type: "spring", damping: 15 }}
            className="text-center p-8 z-10 w-full"
          >
            <div className="inline-block bg-emerald-500 text-black px-2 py-1 text-[10px] font-black mb-6 rotate-[-2deg]">
              {currentSection.duration} DURATION
            </div>
            
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              {currentSection.textOnScreen.map((text, i) => (
                <h2 
                  key={i}
                  className={`text-6xl md:text-7xl font-display uppercase leading-none mb-2 ${i % 2 === 0 ? 'text-white' : 'text-emerald-500 underline decoration-4'}`}
                >
                  {text}
                </h2>
              ))}

              {currentSection.id === 'cta' && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16, 185, 129, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsRegistered(true)}
                  disabled={isRegistered}
                  className={`mt-12 px-10 py-5 font-black uppercase tracking-widest text-xl transition-all duration-500 rounded-sm flex items-center gap-4 mx-auto ${
                    isRegistered 
                      ? 'bg-white text-black border-none' 
                      : 'bg-emerald-500 text-black animate-pulse'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 animate-bounce" />
                      Slot Secured
                    </>
                  ) : (
                    <>
                      <Zap className="w-6 h-6 fill-current" />
                      Register Now
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 bg-black/60 backdrop-blur-md p-4 border-t border-white/10"
            >
              <p className="text-white/40 text-[10px] uppercase tracking-widest mb-2 font-mono">Current Audio / VO</p>
              <p className="md:text-sm text-xs text-emerald-100 italic leading-relaxed">
                {currentSection.audio}
              </p>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* UI Elements Simulation */}
        <div className="absolute bottom-12 right-6 space-y-6 flex flex-col items-center">
          <div className="w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div className="w-12 h-12 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-black">
            <Play className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="absolute bottom-8 left-6 text-left">
          <p className="text-xs font-bold text-white mb-1">@JawadAlJundi</p>
          <p className="text-[10px] text-white/60">Cyber Sentinel Training ... #CyberSecurity</p>
        </div>

        {/* Progress Timeline */}
        <div className="absolute bottom-0 left-0 h-1.5 bg-white/20 w-full overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-emerald-500 shadow-[0_0_10px_#10b981]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-12 flex items-center gap-8">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Current State</div>
          <div className="text-sm font-mono text-emerald-500 uppercase">{currentSection.id === 'hook' ? 'Capturing Attention' : currentSection.id === 'chaos' ? 'Stirring Urgency' : currentSection.id === 'solution' ? 'Establishing Authority' : 'Closing Conversion'}</div>
        </div>
        <button 
          onClick={onFinish}
          className="group flex flex-col items-center"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all mb-2">
            <ChevronRight className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Exit Sim</span>
        </button>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500 selection:text-black">
      <AnimatePresence>
        {isPreviewing && <CinematicPreview onFinish={() => setIsPreviewing(false)} />}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b ${isScrolled ? 'bg-black/80 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-sm flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-black" />
            </div>
            <span className="font-bold tracking-tighter uppercase text-xl">Sentinel <span className="text-emerald-500">Node</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-medium text-white/50">
            <a href="#" className="hover:text-emerald-500 transition-colors">Campaign</a>
            <a href="#" className="hover:text-emerald-500 transition-colors">Strategy</a>
            <a href="#" className="hover:text-white transition-colors">Jawad Al-Jundi</a>
          </div>
          <button 
            onClick={() => setIsPreviewing(true)}
            className="bg-white text-black px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-colors flex items-center gap-2"
          >
            <Play className="fill-current w-2 h-2" />
            Live Script Preview
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[length:40px_40px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-8">
              <Zap className="w-3 h-3 text-emerald-500" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-500">Viral Performance Framework</span>
            </div>
            <h1 className="text-7xl md:text-[140px] font-black leading-[0.8] italic uppercase tracking-tighter mb-8 glow-text">
              Cyber <br />
              <span className="text-emerald-500">Sentinel</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed mb-12">
              A high-impact viral content strategy for Jawad Al-Jundi. Designed to stop the scroll, evoke urgency, and drive immediate cyber security enrollment.
            </p>
            
            <div className="flex flex-wrap gap-8 items-end">
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Targeting", value: "Digital Natives", icon: Users },
                  { label: "Duration", value: "30-40 Seconds", icon: Eye },
                  { label: "Goal", value: "High Conversion", icon: Zap }
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col border-l border-white/20 pl-4 py-1">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon className="w-3 h-3 text-white/40" />
                      <span className="text-[10px] uppercase tracking-widest text-white/40">{stat.label}</span>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-tight">{stat.value}</span>
                  </div>
                ))}
              </div>

              {/* Mentor Quick Profile */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4 bg-white/5 p-3 rounded-lg border border-white/10 group cursor-help"
              >
                <div className="relative w-12 h-12 rounded overflow-hidden border border-emerald-400/50">
                  <div className="absolute inset-0 bg-emerald-500/20 animate-pulse z-10" />
                  <img 
                    src="/profile.jpg" 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200";
                    }}
                    alt="Director Profile" 
                    className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Ad Director</p>
                  <p className="text-sm font-black uppercase tracking-tighter">Your Identity</p>
                  <p className="text-[8px] text-white/30 uppercase">Upload profile.jpg to replace</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Modern Director Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-[120px] rounded-full" />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-emerald-500/10 blur-3xl opacity-30 rounded-full" />
            <motion.div 
               whileHover={{ scale: 1.02 }}
               className="relative aspect-[4/5] max-w-sm mx-auto bg-neutral-900 border border-white/10 overflow-hidden flex items-center justify-center shadow-2xl"
            >
              <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
              <img 
                src="/profile.jpg" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=800";
                }}
                alt="Viral Director" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-10 left-10 z-20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-[1px] bg-emerald-500" />
                  <span className="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.3em]">Lead Creative</span>
                </div>
                <h3 className="text-4xl font-display uppercase italic text-white leading-none">The Director's <br/><span className="text-emerald-500">Vision</span></h3>
              </div>
            </motion.div>
          </div>
          
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <h4 className="text-emerald-500 font-mono text-xs uppercase tracking-widest">Strategy Phase 01</h4>
              <h2 className="text-6xl font-black uppercase tracking-tighter leading-[0.9]">
                Viral <br />
                <span className="text-emerald-500">Engineering.</span>
              </h2>
            </div>
            
            <p className="text-white/60 leading-relaxed text-xl font-light max-w-xl">
              لقد قمنا بتحويل صورتك الشخصية إلى <span className="text-white font-bold">هوية بصرية سيبرانية</span>. التصميم الآن يعتمد على قوة الحضور والكاريزما لدفع المستخدمين للتوقف عن التمرير فوراً.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Viral Hook", value: "3.2s Retention", color: "emerald" },
                { label: "CTA Energy", value: "High Intensity", color: "white" }
              ].map(card => (
                <div key={card.label} className="bg-white/5 border border-white/10 p-6 rounded-sm">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2">{card.label}</p>
                  <p className={`text-lg font-bold uppercase ${card.color === 'emerald' ? 'text-emerald-500' : 'text-white'}`}>{card.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Content */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-20">
          {/* Main Script */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-16">
              <h2 className="text-4xl font-bold uppercase tracking-tighter">Script Breakdown</h2>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            
            <div className="space-y-4">
              {strategy.script.map((section, idx) => (
                <SectionCard key={section.id} section={section} index={idx} />
              ))}
            </div>
          </div>

          {/* Sidebar Tools */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-8">
              {/* Asset Box */}
              <div className="bg-white/5 border border-white/10 p-8 rounded-lg">
                <h4 className="text-xs font-black uppercase tracking-widest text-emerald-500 mb-6 flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Asset Configuration
                </h4>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0">
                      <Target className="w-5 h-5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">Psychological Edge</p>
                      <p className="text-[11px] text-white/50 leading-relaxed">Built on FOMO, Authority bias, and the Survival instinct.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0">
                      <Volume2 className="w-5 h-5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">Audio Signature</p>
                      <p className="text-[11px] text-white/50 leading-relaxed">Cinematic Glitch + High Tension Rhythmic Cinematic pulse.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0">
                      <Smartphone className="w-5 h-5 text-white/40" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-tight mb-1">Aspect Ratio</p>
                      <p className="text-[11px] text-white/50 leading-relaxed">Optimized for 9:16 Vertical format (Full Screen).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Box */}
              <div className="bg-emerald-500 p-8 rounded-lg text-black">
                <h4 className="text-xs font-black uppercase tracking-widest mb-4">Export Directive</h4>
                <p className="text-sm font-bold leading-tight mb-6 uppercase italic">"Execution must be surgical. Every frame must contribute to the retention cycle."</p>
                <div className="space-y-3">
                  <button className="w-full bg-black text-white py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Share2 className="w-3 h-3" />
                    Deploy Strategy
                  </button>
                  <button className="w-full border border-black/20 text-black py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    Download Full Brief
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-mono uppercase text-white/40 tracking-widest">
             2026 Sentinel Node Strategy // For Jawad Al-Jundi
          </p>
          <div className="flex gap-4">
            <Lock className="w-4 h-4 text-white/20" />
            <ShieldAlert className="w-4 h-4 text-white/20" />
            <AlertTriangle className="w-4 h-4 text-white/20" />
          </div>
        </div>
      </footer>

      <style>{`
        .glow-text {
          text-shadow: 0 0 40px rgba(16, 185, 129, 0.2);
        }
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;700;900&display=swap');
      `}</style>
    </div>
  );
}
