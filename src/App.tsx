import { motion, useScroll, useSpring, useMotionValue, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Mail,
  Quote,
  X,
  Menu
} from "lucide-react";
import { useState, useEffect, Suspense, lazy } from "react";
import { Globe } from "./components/Globe";
import { founderPhoto } from "./assets/founder";
const PrivacyPolicy = lazy(() => import("./components/PrivacyPolicy"));
const logo = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cGF0aCBkPSJNMTcwIDQxOHYtMjg4YzI0MCAwIDI0MCAxNzAgMCAxNzAiIHN0cm9rZT0iI2M5YTg0YyIgc3Ryb2tlLXdpZHRoPSI2MCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTI1IiByPSI0MCIgZmlsbD0iI2M5YTg0YyIvPgo8L3N2Zz4=";
// import logo from "./logo.svg";
// const logo = "/logo.svg";

// --- DATA ---
const services = [
  { icon: "◈", title: "Content Strategy", desc: "Data-driven roadmaps aligning your message with business goals and audience needs." },
  { icon: "✦", title: "Professional Writing", desc: "Clear, persuasive copy for websites, brochures, and corporate communications." },
  { icon: "◉", title: "Ghostwriting", desc: "Capturing your unique voice to produce high-impact books, articles, and speeches." },
  { icon: "⟡", title: "Resume Development", desc: "Strategic career narratives designed to open doors and showcase professional value." },
  { icon: "◌", title: "Editing & Proofreading", desc: "Polishing your work to perfection with meticulous attention to detail and flow." },
  { icon: "⬡", title: "Thought Leadership", desc: "Establishing authority through consistent, high-quality blogging and insights." },
  { icon: "▣", title: "Website Development", desc: "High-end, responsive digital experiences combining stunning design with functionality." },
];

const processSteps = [
  { num: "01", title: "Discover", desc: "We dive deep into your goals, audience, and unique value proposition to understand what truly sets you apart." },
  { num: "02", title: "Strategize", desc: "We develop a tailored content plan that aligns with your objectives and speaks directly to your audience." },
  { num: "03", title: "Create", desc: "Our expert writers craft high-impact content that resonates deeply and compels your audience to act." },
  { num: "04", title: "Deliver", desc: "We refine, polish, and finalize your content, ensuring every word earns its place on the page." },
];

const testimonials = [
  { initials: "RG", name: "Riya Ghosh", role: "MBA Student", text: "As an MBA student, I wasn't sure how to position myself on paper. Prosify turned my scattered experience into a clear, confident narrative, and I got 5 interview calls I genuinely didn't expect." },
  { initials: "CA", name: "Chetna Aggarwal", role: "Strategic Consultant", text: "The ghostwriting service was seamless. They captured my perspective perfectly, allowing me to share my vision without spending hours at a keyboard." },
  { initials: "PB", name: "Priya Bansal", role: "CA Finalist", text: "My new resume didn't just look better, it told a story. I landed three interviews within a week of updating my profile." },
];

const sectionIds = ['hero', 'philosophy', 'global', 'services', 'process', 'testimonials', 'cta'];

export default function App() {
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchActive, setIsTouchActive] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Body scroll lock
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring for the main dot to remove any pixel-snapping jitter
  const dotX = useSpring(mouseX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(mouseY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // Spring for the lagging ring
  const ringX = useSpring(mouseX, { stiffness: 400, damping: 30, mass: 0.1 });
  const ringY = useSpring(mouseY, { stiffness: 400, damping: 30, mass: 0.1 });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Cursor logic
  useEffect(() => {
    const handleMove = (x: number, y: number) => {
      if (!hasMoved) setHasMoved(true);
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setIsTouchActive(false);
      handleMove(e.clientX, e.clientY);
    };
    const handleTouchStart = (e: TouchEvent) => {
      setIsTouchActive(true);
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY - 40);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      setIsTouchActive(true);
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY - 40);
      }
    };
    const handleTouchEnd = () => {
      setTimeout(() => {
        setIsTouchActive(false);
      }, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mouseX, mouseY]);

  // Active section logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
          setActiveSection(i);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
  };

  return (
    <div className="bg-ink text-parchment font-sans selection:bg-gold selection:text-ink overflow-x-hidden">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light z-[200] origin-left shadow-[0_0_10px_rgba(201,168,76,0.5)]"
        style={{ scaleX }}
      />

      {/* Custom Cursor */}
      <motion.div 
        className="custom-cursor fixed top-0 left-0 border border-gold rounded-full pointer-events-none z-[9998] md:mix-blend-difference will-change-transform"
        style={{ 
          x: ringX, 
          y: ringY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          width: isHovering || isTouchActive ? 80 : 36,
          height: isHovering || isTouchActive ? 80 : 36,
          opacity: hasMoved ? (isHovering || isTouchActive ? 0.5 : 0.3) : 0,
          scale: isTouchActive ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.div 
        className="custom-cursor fixed top-0 left-0 w-2.5 h-2.5 bg-gold rounded-full pointer-events-none z-[9999] md:mix-blend-difference will-change-transform"
        style={{ 
          x: dotX, 
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hasMoved ? (isTouchActive ? 0.8 : 1) : 0,
        }}
        animate={{
          scale: isHovering ? 2.5 : (isTouchActive ? 1.5 : 1),
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-5 md:px-12 py-4 md:py-6 bg-ink/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none border-b border-gold/5 md:border-none">
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3.5 group transition-all duration-300" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gold/5 rounded-full blur-md group-hover:bg-gold/15 transition-all" />
            <img src={logo} alt="Prosify Logo" className="relative w-6 h-6 sm:w-8 sm:h-8 object-contain" />
          </div>
          <span className="font-bebas text-xl sm:text-2xl tracking-[0.2em] sm:tracking-[0.3em] text-gold group-hover:text-gold-light transition-colors">PROSIFY</span>
        </a>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gold p-2 relative z-[101] active:scale-90 transition-transform"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={28} />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-9 list-none">
          {['About', 'Services', 'Process', 'Testimonials', 'Contact'].map((item) => (
            <li key={item}>
              <a 
                href={`#${item === 'About' ? 'philosophy' : item === 'Contact' ? 'cta' : item.toLowerCase()}`} 
                className="text-[11px] tracking-[0.2em] uppercase text-parchment opacity-70 hover:opacity-100 hover:text-gold transition-all"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0a0806] z-[2000] md:hidden flex flex-col"
          >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-[-10%] right-[-10%] w-[60%] aspect-square rounded-full bg-gold/10 blur-[100px]" />
              <div className="absolute bottom-[-10%] left-[-10%] w-[60%] aspect-square rounded-full bg-gold/5 blur-[100px]" />
            </div>

            <div className="relative flex flex-col h-full p-6 sm:p-8 overflow-y-auto">
              {/* Menu Header */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2.5">
                  <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                  <span className="font-bebas text-2xl tracking-[0.3em] text-gold">PROSIFY</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gold p-2 active:scale-90 transition-transform"
                  aria-label="Close Menu"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Navigation Links */}
              <motion.div 
                className="flex flex-col gap-6"
                initial="closed"
                animate="open"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                {[
                  { label: 'About', href: '#philosophy' },
                  { label: 'Services', href: '#services' },
                  { label: 'Process', href: '#process' },
                  { label: 'Testimonials', href: '#testimonials' },
                  { label: 'Contact', href: '#cta' }
                ].map((link) => (
                  <motion.div
                    key={link.label}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: 20 }
                    }}
                  >
                    <a 
                      href={link.href} 
                      className="group flex items-center gap-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="font-serif text-4xl sm:text-6xl italic tracking-tight text-parchment group-active:text-gold transition-colors">
                        {link.label}
                      </span>
                      <ArrowRight className="text-gold opacity-0 -translate-x-4 group-active:opacity-100 group-active:translate-x-0 transition-all" size={24} />
                    </a>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Footer inside menu */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-auto pt-12 pb-4"
              >
                <div className="w-12 h-[1px] bg-gold mb-8" />
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-3">Inquiries</p>
                    <a href="mailto:team@contactprosify.com" className="text-lg text-parchment hover:text-gold transition-colors">team@contactprosify.com</a>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-3">WhatsApp</p>
                    <a href="https://wa.me/916371413878" target="_blank" rel="noopener noreferrer" className="text-lg text-parchment hover:text-gold transition-colors">+91 6371413878</a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Dots */}
      <div className="fixed right-7 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2.5 z-[100]">
        {sectionIds.map((id, i) => (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === i ? 'bg-gold scale-[1.4]' : 'bg-gold/30'}`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="hero" className="flex-col text-center">
        <div className="hero-bg" />
        <div className="hero-lines" />
        <div className="relative z-10 max-w-[900px] px-6">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-[11px] tracking-[0.4em] uppercase text-gold mb-7"
          >
            Premium Content Agency · India & Beyond
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="font-serif text-[clamp(42px,12vw,110px)] font-light leading-[0.95] tracking-tight text-ivory mb-7"
          >
            Transform<br />Ideas Into<br /><span className="italic text-gold">Narratives.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="text-sm leading-[1.8] text-warm-grey max-w-[500px] mx-auto mb-11"
          >
            A fully virtual agency helping brands and professionals communicate with precision, power, and unmistakable clarity.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <a 
              href="#cta" 
              className="px-10 py-3.5 bg-gold text-ink text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-gold-light transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Start Your Story
            </a>
            <a 
              href="#services" 
              className="px-10 py-3.5 border border-gold/40 text-gold text-[11px] tracking-[0.2em] uppercase hover:border-gold hover:bg-gold/5 transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Explore Services
            </a>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent animate-scroll-pulse" />
          <span className="text-[10px] tracking-[0.3em] uppercase text-warm-grey">Scroll</span>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section id="philosophy" className="bg-parchment text-ink">
        <div className="grid md:grid-cols-2 w-full h-full max-w-[1200px] px-6 md:px-12 py-20 gap-10 md:gap-15 items-center">
          <div className="relative">
            <div className="hidden md:block absolute -top-15 -left-5 font-serif text-[280px] font-light leading-none text-ink/5 pointer-events-none select-none">
              01
            </div>
            <motion.p {...fadeIn} className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Our Philosophy</motion.p>
            <motion.h2 {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif text-[clamp(36px,4vw,58px)] font-normal leading-[1.1] text-ink relative z-10">
              Communication<br />is the <span className="italic text-gold">Currency</span><br />of Influence
            </motion.h2>
          </div>
          <div className="flex flex-col gap-7 justify-center">
            <motion.p {...fadeIn} className="text-[15px] leading-[1.9] text-[#3a3028]">
              At Prosify, we believe every brand and professional has a unique story that deserves to be told with precision and power. We deliver premium, tailored content that helps you stand out in a crowded marketplace and convert interest into action.
            </motion.p>
            <motion.div {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="border-l-2 border-gold pl-5 font-serif text-xl italic text-ink leading-[1.6]">
              "Words have the power<br />to change worlds."
            </motion.div>
            <motion.div {...fadeIn} transition={{ delay: 0.2, duration: 0.8 }} className="flex flex-wrap gap-x-8 gap-y-6 md:gap-10">
              <div className="stat-item">
                <div className="font-bebas text-[52px] tracking-[0.02em] text-gold leading-none">100+</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-warm-grey">Clients Served</div>
              </div>
              <div className="stat-item">
                <div className="font-bebas text-[52px] tracking-[0.02em] text-gold leading-none">2+</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-warm-grey">Years of Excellence</div>
              </div>
              <div className="stat-item">
                <div className="font-bebas text-[52px] tracking-[0.02em] text-gold leading-none">∞</div>
                <div className="text-[11px] tracking-[0.15em] uppercase text-warm-grey">Geographic Reach</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section id="founder" className="flex justify-center py-[60px] px-5 bg-[#f9f9f9]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-10 max-w-[900px] bg-white rounded-2xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        >
          <div className="flex-shrink-0">
            <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-4 border-[#e0e0e0] shadow-md bg-white">
              <img 
                src={founderPhoto} 
                alt="Rahul - Founder" 
                className="w-full h-full object-cover scale-[1.3]"
                style={{ objectPosition: '50% 35%' }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="m-0 mb-3 text-2xl text-[#111] font-serif font-medium">Meet Our Founder</h2>
            <p className="m-0 text-base leading-[1.7] text-[#555]">
              As the driving force behind Prosify, Rahul Goyal combines deep strategic 
              expertise with a relentless passion for excellence. His mission is to 
              empower professionals and businesses to communicate with unparalleled 
              clarity and impact, ensuring that every narrative we craft is not just 
              heard, but remembered.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Global Presence Section */}
      <section id="global" className="bg-ink flex-col py-20">
        <div className="max-w-[1200px] w-full px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 flex justify-center">
            <Globe />
          </div>
          <div className="order-1 md:order-2">
            <motion.p {...fadeIn} className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Global Reach</motion.p>
            <motion.h2 {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif text-[clamp(36px,4vw,58px)] font-light leading-[1.1] text-ivory mb-8">
              Connecting <span className="italic text-gold">Stories</span><br />Across Borders
            </motion.h2>
            <motion.p {...fadeIn} transition={{ delay: 0.2, duration: 0.8 }} className="text-[15px] leading-[1.9] text-warm-grey mb-8">
              Based in India, Prosify operates as a fully virtual agency, serving a diverse global clientele. From New York to Tokyo, we bridge the gap between ideas and impact, ensuring your voice resonates wherever your audience may be.
            </motion.p>
            <div className="grid grid-cols-2 gap-8">
              <motion.div {...fadeIn} transition={{ delay: 0.3, duration: 0.8 }}>
                <h4 className="font-serif text-xl text-gold mb-2">Virtual-First</h4>
                <p className="text-[12px] text-warm-grey">Seamless collaboration regardless of time zones or geography.</p>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.4, duration: 0.8 }}>
                <h4 className="font-serif text-xl text-gold mb-2">Global Standards</h4>
                <p className="text-[12px] text-warm-grey">Premium quality content tailored for international markets.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="flex-col px-6 md:px-12 py-20 items-stretch justify-center">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 max-w-[1200px] mx-auto w-full">
          <div>
            <motion.p {...fadeIn} className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Our Expertise</motion.p>
            <motion.h2 {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif text-[clamp(32px,4vw,56px)] font-light leading-[1.05] text-ivory">
              Core <span className="italic text-gold">Services</span>
            </motion.h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gold/10 max-w-[1200px] mx-auto w-full">
          {services.map((s, i) => (
            <motion.div 
              key={s.title}
              {...fadeIn}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-ink p-8 transition-colors duration-400 relative overflow-hidden group hover:bg-gold/5"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="service-card-border group-hover:scale-x-100" />
              <span className="text-[28px] mb-4 block">{s.icon}</span>
              <h3 className="font-serif text-xl font-normal text-ivory mb-2.5 leading-[1.2]">{s.title}</h3>
              <p className="text-[12px] leading-[1.7] text-warm-grey">{s.desc}</p>
            </motion.div>
          ))}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-gold/5 p-8 border border-gold/15 transition-colors duration-400 relative overflow-hidden group hover:bg-gold/10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <span className="text-[28px] mb-4 block text-gold">→</span>
            <h3 className="font-serif text-xl font-normal text-gold mb-2.5 leading-[1.2]">Let's Talk</h3>
            <p className="text-[12px] leading-[1.7] text-warm-grey">Have a unique need? We craft custom solutions for every communication challenge.</p>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="bg-[#0f0d0a]">
        <div className="max-w-[1100px] px-6 md:px-12 w-full">
          <motion.p {...fadeIn} className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">How We Work</motion.p>
          <motion.h2 {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif text-[clamp(32px,4vw,56px)] font-light leading-[1.05] text-ivory">
            The Prosify <span className="italic text-gold">Process</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 mt-14 relative">
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-30" />
            {processSteps.map((step, i) => (
              <motion.div 
                key={step.title}
                {...fadeIn}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="text-center px-4 relative"
              >
                <div 
                  className="w-14 h-14 border border-gold/40 rounded-full flex items-center justify-center mx-auto mb-7 relative transition-all duration-300 hover:border-gold hover:bg-gold/10"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="font-bebas text-[22px] text-gold tracking-[0.05em]">{step.num}</span>
                </div>
                <h3 className="font-serif text-[22px] font-normal text-ivory mb-3">{step.title}</h3>
                <p className="text-[12px] leading-[1.7] text-warm-grey">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-parchment text-ink flex-col">
        <div className="max-w-[1100px] px-6 md:px-12 w-full">
          <motion.p {...fadeIn} className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Client Success</motion.p>
          <motion.h2 {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif text-[clamp(32px,4vw,56px)] font-light leading-[1.05] text-ink">
            Voices of <span className="italic text-gold">Impact</span>
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name}
                {...fadeIn}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="bg-white p-9 relative shadow-[0_4px_40px_rgba(10,8,6,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_60px_rgba(10,8,6,0.1)]"
              >
                <div className="font-serif text-[120px] text-gold opacity-15 absolute -top-5 left-4 leading-none pointer-events-none z-0">“</div>
                <p className="font-serif text-[17px] italic leading-[1.7] text-[#2a2018] mb-6 relative z-10">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-gold to-[#8a5a10] rounded-full flex items-center justify-center font-serif text-sm font-semibold text-ink">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-[13px] font-medium text-ink">{t.name}</div>
                    <div className="text-[11px] text-warm-grey tracking-[0.05em]">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="flex-col text-center relative">
        <div className="cta-bg" />
        <div className="relative z-10 max-w-[700px] px-6">
          <motion.p {...fadeIn} className="text-[10px] tracking-[0.4em] uppercase text-gold mb-5">Ready to Begin?</motion.p>
          <motion.h2 {...fadeIn} transition={{ delay: 0.1, duration: 0.8 }} className="font-serif text-[clamp(44px,7vw,88px)] font-light leading-none text-ivory mb-5">
            Elevate Your<br /><span className="italic text-gold">Narrative.</span>
          </motion.h2>
          <motion.p {...fadeIn} transition={{ delay: 0.2, duration: 0.8 }} className="text-sm text-warm-grey leading-[1.8] mb-11">
            Experience the power of a professional virtual agency. Let's communicate your story with the precision and impact it deserves, regardless of where you are.
          </motion.p>
          <motion.div {...fadeIn} transition={{ delay: 0.3, duration: 0.8 }}>
            <a 
              href="mailto:team@contactprosify.com" 
              className="px-10 py-5 bg-gold text-ink text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-gold-light transition-all"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              Start Your Story Today
            </a>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.4, duration: 0.8 }} className="mt-8 flex flex-col items-center gap-4">
            <a 
              href="mailto:team@contactprosify.com" 
              className="text-[13px] tracking-[0.1em] text-gold opacity-80 hover:opacity-100 transition-opacity"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              team@contactprosify.com
            </a>
            <a 
              href="https://wa.me/916371413878" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] tracking-[0.1em] text-gold opacity-80 hover:opacity-100 transition-opacity"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              WhatsApp: +91 6371413878
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="snap-start bg-[#050403] px-6 md:px-12 pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-gold/10">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 flex items-center justify-center bg-gold/5 rounded-lg border border-gold/10 hover:border-gold/30 transition-colors">
              <img src={logo} alt="Prosify Logo" className="w-9 h-9 object-contain" />
            </div>
            <div className="font-bebas text-[28px] tracking-[0.3em] text-gold">PROSIFY</div>
          </div>
          <p className="text-[13px] leading-[1.8] text-warm-grey max-w-[260px]">
            A premium virtual agency dedicated to high-impact communication for brands and professionals across India and beyond.
          </p>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Menu</p>
          <ul className="list-none flex flex-col gap-2.5">
            {['About', 'Services', 'Process', 'Testimonials'].map(item => (
              <li key={item}>
                <a href={`#${item === 'About' ? 'philosophy' : item.toLowerCase()}`} className="text-[13px] text-warm-grey hover:text-parchment transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Expertise</p>
          <ul className="list-none flex flex-col gap-2.5">
            {['Content Strategy', 'Professional Writing', 'Ghostwriting', 'Resume Development', 'Thought Leadership'].map(item => (
              <li key={item}>
                <a href="#services" className="text-[13px] text-warm-grey hover:text-parchment transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>{item}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-gold mb-5">Reach Us</p>
          <ul className="list-none flex flex-col gap-2.5">
            <li><a href="mailto:team@contactprosify.com" className="text-[13px] text-warm-grey hover:text-parchment transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>team@contactprosify.com</a></li>
            <li><a href="https://wa.me/916371413878" target="_blank" rel="noopener noreferrer" className="text-[13px] text-warm-grey hover:text-parchment transition-colors" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>WhatsApp: +91 6371413878</a></li>
          </ul>
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-4 border-t border-gold/10 pt-7 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <img src={logo} alt="Prosify Logo" className="w-5 h-5 object-contain opacity-40" />
              <span className="font-bebas text-lg tracking-[0.1em] text-gold/60">PROSIFY</span>
            </div>
            <span className="text-gold/20 hidden sm:block">|</span>
            <span className="text-[11px] text-warm-grey/50 tracking-[0.1em]">© {new Date().getFullYear()} · PROSIFY BY RAHUL GOYAL</span>
            <span className="text-gold/20 hidden sm:block">|</span>
            <span className="text-[11px] text-warm-grey/50 tracking-[0.1em]">VIRTUAL AGENCY EXCELLENCE</span>
          </div>
          <button 
            onClick={() => setShowPrivacy(true)}
            className="text-[11px] text-warm-grey/50 tracking-[0.1em] hover:text-warm-grey transition-colors"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            Privacy Policy
          </button>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {showPrivacy && (
          <Suspense fallback={<div className="fixed inset-0 z-[2000] bg-[#fdfcfa] flex items-center justify-center text-gold font-serif italic text-2xl">Loading...</div>}>
            <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
          </Suspense>
        )}
      </AnimatePresence>
    </div>
  );
}
