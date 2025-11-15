'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  ChevronDown,
  Linkedin,
  Github,
  Mail,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';

// Typing Animation Hook with delay control
const useTypewriter = (text: string, shouldStart: boolean = true, speed: number = 50) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    if (!shouldStart) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, shouldStart, speed]);

  return displayedText;
};

// Typing Paragraph Component
const TypingParagraph = ({ text, shouldStart = true, speed = 30 }: { text: string; shouldStart?: boolean; speed?: number }) => {
  const displayedText = useTypewriter(text, shouldStart, speed);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-gray-700 leading-relaxed text-sm sm:text-base min-h-[1.5em]"
    >
      {displayedText}
      {displayedText.length < text.length && (
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-amber-600 ml-1"
        />
      )}
    </motion.p>
  );
};

// Typing Progress Tracker to advance to next paragraph
const TypingProgressTracker = ({ texts, currentIndex, onComplete }: { texts: string[]; currentIndex: number; onComplete: () => void }) => {
  const currentText = texts[currentIndex];
  const displayedText = useTypewriter(currentText, currentIndex < texts.length, 30);

  useEffect(() => {
    if (displayedText.length === currentText.length && currentIndex < texts.length - 1) {
      const timer = setTimeout(onComplete, 500); // Wait 500ms before starting next
      return () => clearTimeout(timer);
    }
  }, [displayedText, currentText, currentIndex, texts.length, onComplete]);

  return null; // This component doesn't render anything
};

// Hero Typing Animation Component
const HeroTypingAnimation = () => {
  const greetingText = "Hi, I'm Suhruth Madarapu";
  const displayedText = useTypewriter(greetingText, true, 100);

  return (
    <motion.h1
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-4xl sm:text-5xl md:text-7xl font-bold mb-2 sm:mb-4 bg-linear-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent min-h-[1.2em]"
    >
      {displayedText}
      {displayedText.length < greetingText.length && (
        <motion.span
          animate={{ opacity: [0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          className="inline-block w-2 h-16 bg-amber-600 ml-2"
        />
      )}
    </motion.h1>
  );
};

/**
 * Personal Portfolio - Mobile-Optimized & Saffron-Themed
 * - Responsive design for 320px+ screens
 * - Saffron background (#fffbf0 to #fde68a gradient)
 * - Dark text on light background for contrast
 * - Hamburger menu on mobile (< md breakpoint)
 * - Disabled flashlight on touch devices
 * - Touch-optimized buttons and spacing
 */
export default function Home() {
  // State management
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [showFlashlight, setShowFlashlight] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState(''); // 'success', 'error', or ''
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Typing animation state for sequential paragraphs
  const [typingParagraph, setTypingParagraph] = useState(0);
  const typingTexts = [
    "I'm a Developer with a strong foundation in Engineering Physics. I specialize in building intelligent systems that combine deep learning, data analysis, and practical business insights.",
    "Previously I worked on digital banking platforms analyzing user journeys and building predictive models. My expertise spans audio deepfake detection, GPU-accelerated computing, and real-time data pipelines—all designed to solve complex, real-world problems at scale.",
    "Beyond code, I'm passionate about computational physics, open-source contributions, and exploring the intersection of AI and engineering innovation.",
    "Hobbies: I'm an avid chess player—challenge me at chess.com! I also practice MMA in my spare time to stay sharp and grounded."
  ];

  // Refs
  const flashlightRef = useRef<HTMLDivElement>(null);
  const throttleRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init('eHh-hPD8gSDQd3Fo5'); // We'll update this next
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'experience', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Color Shift + Cursor Flashlight Effect + Mobile Detection
  useEffect(() => {
    // Detect touch device
    const isTouchDevice = () => {
      return (
        (typeof window !== 'undefined' &&
          ('ontouchstart' in window ||
            navigator.maxTouchPoints > 0 ||
            (navigator as any).msMaxTouchPoints > 0)) ||
        false
      );
    };

    if (isTouchDevice()) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse events for performance (~60fps)
      if (throttleRef.current) clearTimeout(throttleRef.current);

      throttleRef.current = setTimeout(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;

        setMousePos({ x, y });
        setShowFlashlight(true);

        // Update CSS custom properties for flashlight effect
        document.documentElement.style.setProperty('--cursor-x', `${x}%`);
        document.documentElement.style.setProperty('--cursor-y', `${y}%`);
      }, 16); // ~60fps
    };

    const handleMouseLeave = () => {
      setShowFlashlight(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (throttleRef.current) clearTimeout(throttleRef.current);
    };
  }, []);

  // Close mobile menu on link click
  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Handle form submission
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
      return;
    }

    setIsSubmitting(true);
    
    try {
      await emailjs.send('service_zdntujp', 'template_fmpzxh9', {
        to_email: 'suhruth9b@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      });
      
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const experience = [
    {
      company: 'Wipro',
      role: 'Business Analyst - Technical',
      dates: 'Mar 2025 - Oct 2025',
      achievements: [
        'Deployed & monitored Adobe Analytics + Dynatrace RUM on Angular SPA (5M MAU) to track 100% user journeys & detect edge-case errors',
        'Built 10+ dashboards (Adobe Workspace, Excel, Python) for funnels & drop-offs; implemented offer-decisioning logic based on segmentation',
        'Built Python scripts for log analysis, improving visibility into user trends & error hotspots; supported release validation & SLA compliance',
      ],
    },
    {
      company: 'ThinkApps',
      role: 'Business Analyst - Technical',
      dates: 'May 2024 - Mar 2025',
      achievements: [
        'Managed production deployments of Angular SPA modules via Git workflows & Docker, handling env-specific configs in regulated banking setup',
        'Used Dynatrace dashboards & alerts to monitor API latency, error rates & infrastructure health',
        'Created Python scripts to clean and analyze user metrics from analytics logs, improving visibility into user behavior trends',
      ],
    },
  ];

  const skills = [
    {
      category: 'Programming',
      items: [
        { name: 'Python', level: 95 },
        { name: 'C++', level: 85 },
        { name: 'SQL', level: 90 },
      ],
    },
    {
      category: 'ML & Libraries',
      items: [
        { name: 'TensorFlow', level: 92 },
        { name: 'Scikit-Learn', level: 90 },
        { name: 'CUDA/pyCUDA', level: 88 },
      ],
    },
    {
      category: 'Tools & Platforms',
      items: [
        { name: 'Docker', level: 85 },
        { name: 'Git', level: 90 },
        { name: 'Adobe Analytics', level: 88 },
      ],
    },
  ];

  const projects = [
    {
      title: 'Real-time Audio Deepfake Detection',
      description: 'AI system detecting synthetic voices using spectrogram analysis + CNN-Transformer model with 92%+ accuracy across multiple languages',
      tech: ['TensorFlow', 'Librosa', 'Python'],
      github: 'https://github.com/Suhruth007/DeepFakeAudioExp',
      live: 'https://huggingface.co/spaces/Suhruth007/DeepFakeAudioExp',
    },
    {
      title: 'GPU-Accelerated Image Compression',
      description: 'Parallel K-Means clustering with CUDA, replacing CPU loops with 65K+ GPU threads. Achieved 12× speedup on 1080p images.',
      tech: ['CUDA', 'C++', 'Python'],
      github: '#',
      live: '#',
    },
    {
      title: 'Resume-Matcher AI',
      description: 'NLP pipeline (TF-IDF + cosine similarity + spaCy) matching resumes vs JDs with 90%+ accuracy and <1s latency',
      tech: ['TensorFlow', 'spaCy', 'Python'],
      github: '#',
      live: '#',
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-yellow-50 to-orange-100 text-gray-800 overflow-x-hidden">
      {/* SAFFRON BACKGROUND: Animated gradient wrapper for fade-in effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, #fffbf0 0%, #fef3c7 50%, #fde68a 100%)`,
          zIndex: 0,
        }}
      />

      {/* DESKTOP FLASHLIGHT: Cursor spotlight (disabled on touch) */}
      {!isTouch && (
        <div
          ref={flashlightRef}
          className={`flashlight-overlay ${showFlashlight ? 'active' : ''}`}
        />
      )}

      {/* STICKY NAVIGATION */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 shadow-md backdrop-blur-md border-b border-amber-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex justify-center gap-6 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleNavClick}
                className={`text-sm font-medium transition-colors pb-2 ${
                  activeSection === link.href.slice(1)
                    ? 'text-amber-600 border-b-2 border-amber-600'
                    : 'text-gray-700 hover:text-amber-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Menu - Visible only on mobile */}
          <button
            className="md:hidden ml-auto p-2 text-gray-800 hover:text-amber-600 transition-colors touch-manipulation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-amber-200 overflow-hidden"
          >
            <div className="flex flex-col gap-0 px-4 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={handleNavClick}
                  className={`py-3 px-2 text-sm font-medium transition-colors border-l-4 ${
                    activeSection === link.href.slice(1)
                      ? 'text-amber-600 border-l-amber-600 bg-amber-50'
                      : 'text-gray-700 border-l-transparent hover:text-amber-600 hover:bg-amber-50'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center px-4 pt-16 sm:pt-20 z-10"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center max-w-4xl mx-auto w-full"
        >
          {/* Profile Picture - Responsive sizing (w-24 sm:w-32 md:w-48) */}
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-8 md:mb-12 flex justify-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-amber-400/30 to-orange-300/30 rounded-full blur-xl" />
              <img
                src="/DSC_2447.JPG"
                alt="Profile"
                className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 rounded-full border-4 border-amber-200 ring-4 ring-amber-400/50 object-cover shadow-lg sm:shadow-xl"
              />
            </div>
          </motion.div>

          {/* Name with Typing Animation */}
          <HeroTypingAnimation />

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-2xl md:text-3xl text-gray-700 mb-3 sm:mb-4"
          >
            Machine learning Developer
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-2"
          >
            Passionate about AI, deep learning, and building scalable solutions. Physics + Engineering background with expertise in audio deepfake detection and GPU-accelerated computing.
          </motion.p>

          {/* CTA Buttons - Full width on mobile, responsive */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 sm:gap-4 justify-center flex-col sm:flex-row items-center sm:items-start px-2"
          >
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg font-semibold transition-colors text-white shadow-md hover:shadow-lg touch-manipulation"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 border-2 border-amber-500 text-amber-700 hover:bg-amber-50 rounded-lg font-semibold transition-colors touch-manipulation"
            >
              View My Work
            </a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative py-8 sm:py-16 md:py-20 px-4 bg-white/40 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800"
          >
            About <span className="text-amber-600">Me</span>
          </motion.h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
              <TypingParagraph text={typingTexts[0]} shouldStart={typingParagraph >= 0} />
              <TypingParagraph text={typingTexts[1]} shouldStart={typingParagraph >= 1} />
              <TypingParagraph text={typingTexts[2]} shouldStart={typingParagraph >= 2} />
              <TypingParagraph text={typingTexts[3]} shouldStart={typingParagraph >= 3} />
              
              {/* Hidden element to track typing completion and advance to next paragraph */}
              <TypingProgressTracker 
                texts={typingTexts}
                currentIndex={typingParagraph}
                onComplete={() => setTypingParagraph(p => Math.min(p + 1, typingTexts.length - 1))}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop"
                alt="Workspace"
                className="rounded-lg shadow-lg w-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="relative py-8 sm:py-16 md:py-20 px-4 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800"
          >
            Experience
          </motion.h2>

          <div className="space-y-4 sm:space-y-6">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="bg-white/60 p-5 sm:p-6 md:p-8 rounded-lg hover:shadow-lg transition-all duration-300 border border-amber-200 hover:border-amber-400"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-amber-700">
                      {exp.role}
                    </h3>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">{exp.company}</p>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">{exp.dates}</span>
                </div>
                <ul className="space-y-2">
                  {exp.achievements.map((achievement, idx) => (
                    <li key={idx} className="text-gray-700 flex gap-3 text-xs sm:text-sm">
                      <span className="text-amber-600 mt-0.5 shrink-0">▸</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="relative py-8 sm:py-16 md:py-20 px-4 bg-white/40 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800"
          >
            Skills
          </motion.h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {skills.map((skillCategory, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-amber-700">
                  {skillCategory.category}
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  {skillCategory.items.map((skill, sidx) => (
                    <motion.div
                      key={sidx}
                      whileHover={{ x: 5 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className="flex justify-between mb-2 text-xs sm:text-sm">
                        <span className="font-semibold text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-amber-600">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="bg-linear-to-r from-amber-500 to-orange-400 h-full"
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="relative py-8 sm:py-16 md:py-20 px-4 z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center text-gray-800"
          >
            Featured <span className="text-amber-600">Projects</span>
          </motion.h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white/60 rounded-lg overflow-hidden border border-amber-200 hover:border-amber-400 transition-colors hover:shadow-lg"
              >
                <div className="relative h-32 sm:h-40 md:h-48 bg-amber-100 overflow-hidden group">
                  <img
                    src={`https://images.unsplash.com/photo-${1517694712202 + idx}-14dd9538aa97?w=400&h=250&fit=crop`}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center"
                  >
                    <ExternalLink className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                  </motion.div>
                </div>

                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-800">{project.title}</h3>
                  <p className="text-gray-700 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    {project.tech.map((tech, tidx) => (
                      <span
                        key={tidx}
                        className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    <a
                      href={project.github}
                      className="flex-1 text-center py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors text-xs sm:text-sm font-medium text-gray-800 touch-manipulation"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.live}
                      className="flex-1 text-center py-2 bg-amber-500 hover:bg-amber-600 rounded transition-colors text-xs sm:text-sm font-medium text-white touch-manipulation"
                    >
                      Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="relative py-8 sm:py-16 md:py-20 px-4 bg-white/40 min-h-screen flex items-center z-10"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          className="max-w-2xl mx-auto w-full"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4 text-center text-gray-800"
          >
            Let's <span className="text-amber-600">Connect</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-center text-gray-700 mb-8 sm:mb-12 text-sm sm:text-base"
          >
            I'm always interested in hearing about new projects and opportunities.
          </motion.p>

          <motion.div
            variants={containerVariants}
            className="space-y-3 sm:space-y-4 mb-8 sm:mb-12"
          >
            <motion.input
              variants={itemVariants}
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-800 rounded-lg border border-amber-200 focus:border-amber-500 focus:outline-none transition-colors text-sm sm:text-base touch-manipulation"
            />
            <motion.input
              variants={itemVariants}
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-800 rounded-lg border border-amber-200 focus:border-amber-500 focus:outline-none transition-colors text-sm sm:text-base touch-manipulation"
            />
            <motion.textarea
              variants={itemVariants}
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-white text-gray-800 rounded-lg border border-amber-200 focus:border-amber-500 focus:outline-none transition-colors resize-none text-sm sm:text-base touch-manipulation"
            />
            
            {/* Status Messages */}
            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm text-center"
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </motion.div>
            )}
            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm text-center"
              >
                ✗ Please fill in all fields correctly.
              </motion.div>
            )}
            
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitForm}
              disabled={isSubmitting}
              className="w-full py-2 sm:py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 rounded-lg font-semibold transition-colors text-white shadow-md touch-manipulation text-sm sm:text-base"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 sm:gap-6"
          >
            <a
              href="https://linkedin.com/in/suhruth-madarapu"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-gray-200 hover:bg-amber-500 rounded-lg transition-colors text-gray-800 hover:text-white touch-manipulation"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://github.com/Suhruth007"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 bg-gray-200 hover:bg-amber-500 rounded-lg transition-colors text-gray-800 hover:text-white touch-manipulation"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a
              href="mailto:suhruth9b@gmail.com"
              className="p-2 sm:p-3 bg-gray-200 hover:bg-amber-500 rounded-lg transition-colors text-gray-800 hover:text-white touch-manipulation"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-center text-gray-600 text-xs sm:text-sm mt-8 sm:mt-12"
          >
            © 2025 Suhruth Madarapu. All rights reserved.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
