import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code2, Terminal, ArrowRight, Layers, Sparkles, MapPin, Book, Gamepad2, Palette, Activity, Home, Trophy, Calendar, Layout, ArrowLeft, Filter, Lock, ShieldAlert, Unlock, X, EyeOff } from 'lucide-react';

/* =============================================================================
  🔐 CRYPTO ENGINE (SIMPLIFIED CAESAR SHIFT - ROBUST)
  =============================================================================
*/

const CryptoUtils = {
  // Desencripta movendo os caracteres para trás (-1 char code)
  decrypt: (encryptedText) => {
    if (!encryptedText) return "";
    try {
      return encryptedText.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 1)).join('');
    } catch (e) {
      return "ERRO DE LEITURA";
    }
  },
  
  // Encripta movendo os caracteres para a frente (+1 char code)
  encrypt: (text) => {
    return text.split('').map(char => String.fromCharCode(char.charCodeAt(0) + 1)).join('');
  },

  // Validação da Password
  verifyHash: (input) => {
    const normalized = input.toLowerCase().trim();
    // Verifica diretamente a nova password
    return normalized === "atumentalado";
  }
};

/* =============================================================================
  ⚡ CONFIGURAÇÃO DE DADOS
  =============================================================================
*/

const PORTFOLIO_DATA = {
  personal: {
    name: "Ricardo",
    handle: "@Luziferri",
    role: ["Frontend Developer", "Web Designer", "Creative Coder"],
    location: "Portugal",
    bio: "Desenvolvedor focado em criar experiências web únicas e interativas. Especializado em transformar designs criativos em código funcional, com forte domínio de CSS e JavaScript.",
    social: {
      github: "https://github.com/Luziferri",
      linkedin: "#", 
      email: "mailto:ricardo@example.com"
    },
    stats: {
      commits: "150+",
      repos: "9",
      years: "2+"
    }
  },
  techColors: {
    "JavaScript": "text-yellow-300 bg-yellow-300/10 border-yellow-300/20",
    "CSS": "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "HTML": "text-orange-400 bg-orange-400/10 border-orange-400/20",
    "React": "text-sky-400 bg-sky-400/10 border-sky-400/20",
    "Tailwind": "text-cyan-300 bg-cyan-300/10 border-cyan-300/20",
    "Node.js": "text-green-400 bg-green-400/10 border-green-400/20",
    "Open Source": "text-purple-400 bg-purple-400/10 border-purple-400/20",
    "ENCRYPTED": "text-red-500 bg-red-500/10 border-red-500/20 font-mono",
  },
  projects: [
    {
      id: 1,
      title: "BetterDiscordStuff",
      description: "Coleção de plugins e temas personalizados para o BetterDiscord. Melhora a experiência do utilizador com funcionalidades extra e estilos visuais únicos.",
      tags: ["JavaScript", "CSS"],
      category: "Ferramentas & Plugins",
      links: { demo: "https://github.com/Luziferri/BetterDiscordStuff", repo: "https://github.com/Luziferri/BetterDiscordStuff" },
      featured: true, 
      icon: Palette
    },
    {
      id: 2,
      title: "CMD Template",
      description: "Um template de interface web que simula uma linha de comandos (Command Line Interface). Design minimalista e puramente focado em CSS/HTML.",
      tags: ["CSS", "HTML"],
      category: "Design & UI Kits",
      links: { demo: "https://github.com/Luziferri/CMD", repo: "https://github.com/Luziferri/CMD" },
      featured: false,
      icon: Terminal
    },
    {
      id: 3,
      title: "Verdade ou Consequência",
      description: "Aplicação web interativa do clássico jogo social. Lógica implementada em JavaScript puro para garantir leveza e rapidez.",
      tags: ["HTML", "JavaScript"],
      category: "Web Apps & Jogos",
      links: { demo: "https://github.com/Luziferri/VerdadeConsequencia", repo: "https://github.com/Luziferri/VerdadeConsequencia" },
      featured: false,
      icon: Gamepad2
    },
    {
      id: 4,
      // Dados encriptados (Shift +1)
      // Original: "Sistema de Biblioteca"
      titleCipher: "Tjtuenb!ef!Cjcmjpufdb",
      // Original: "Gestão completa de catálogo."
      descCipher: "Hftuão!dpnqmfub!ef!dbuàmphp/",
      tags: ["ENCRYPTED"],
      category: "Web Apps & Jogos",
      links: { demo: "https://github.com/Luziferri/Biblioteca", repo: "https://github.com/Luziferri/Biblioteca" },
      featured: true,
      icon: Book,
      locked: true
    },
    {
      id: 5,
      title: "Wavelength",
      description: "Experiência web focada em estrutura HTML semântica e acessibilidade, explorando layouts fluídos.",
      tags: ["HTML"],
      category: "Experimental",
      links: { demo: "https://github.com/Luziferri/wavelength", repo: "https://github.com/Luziferri/wavelength" },
      featured: false,
      icon: Activity
    },
    {
      id: 6,
      title: "Acolhimento",
      description: "Página de aterragem (Landing Page) desenvolvida para sistemas de onboarding digital, com foco em clareza visual.",
      tags: ["HTML"],
      category: "Design & UI Kits",
      links: { demo: "https://github.com/Luziferri/acolhimento", repo: "https://github.com/Luziferri/acolhimento" },
      featured: false,
      icon: Home
    },
    {
      id: 7,
      title: "WC-Rank",
      description: "Sistema de classificação e ranking. Uma implementação limpa focada na hierarquia de dados.",
      tags: ["HTML"],
      category: "Web Apps & Jogos",
      links: { demo: "https://github.com/Luziferri/WC-Rank", repo: "https://github.com/Luziferri/WC-Rank" },
      featured: false,
      icon: Trophy
    },
    {
      id: 8,
      // Dados encriptados (Shift +1)
      // Original: "Date Utility"
      titleCipher: "Ebuf!Vujmjuz",
      // Original: "Manipulação de Datas"
      descCipher: "Nbojqvmbçáo!ef!Ebubt",
      tags: ["ENCRYPTED"],
      category: "Experimental",
      links: { demo: "https://github.com/Luziferri/date", repo: "https://github.com/Luziferri/date" },
      featured: false,
      icon: Calendar,
      locked: true
    },
    {
      id: 9,
      title: "Legacy Portfolio",
      description: "Versão anterior do portfólio pessoal. Mantido como arquivo da evolução estilística e técnica.",
      tags: ["HTML", "Open Source"],
      category: "Arquivo",
      links: { demo: "https://github.com/Luziferri/portfolio", repo: "https://github.com/Luziferri/portfolio" },
      featured: false,
      icon: Layout
    },
    {
      id: 10,
      title: "Moodboard",
      description: "Espaço visual para organização de inspirações, paletas de cores e referências de design. Uma ferramenta essencial para o processo criativo.",
      tags: ["React", "Tailwind"],
      category: "Design & UI Kits",
      links: { demo: "https://github.com/Luziferri/moodboard", repo: "https://github.com/Luziferri/moodboard" },
      featured: false,
      icon: Sparkles
    }
  ]
};

/* =============================================================================
  🔒 MÓDULO DE SEGURANÇA & UI COMPONENTS
  =============================================================================
*/

const PasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setError(false);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (CryptoUtils.verifyHash(password)) {
      onSuccess(); 
      onClose();
    } else {
      setError(true);
      setShake(prev => prev + 1);
      setTimeout(() => setError(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, x: error ? [0, -10, 10, -10, 10, 0] : 0 }}
        key={shake}
        className="w-full max-w-md bg-slate-900 border border-red-500/50 rounded-lg shadow-[0_0_50px_rgba(239,68,68,0.2)] overflow-hidden relative"
      >
        <div className="bg-red-500/10 p-4 border-b border-red-500/20 flex justify-between items-center relative z-10">
          <div className="flex items-center gap-2 text-red-500 font-mono font-bold">
            <ShieldAlert size={20} />
            SECURITY LEVEL 4
          </div>
          <button onClick={onClose} className="text-red-500 hover:text-red-400"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-900/20 rounded-full flex items-center justify-center border border-red-500/30 animate-pulse">
               <EyeOff size={32} className="text-red-500" />
            </div>
          </div>

          <p className="text-slate-400 font-mono text-sm mb-6 text-center">
            Este conteúdo está protegido. 
            <br/><span className="text-xs text-slate-500">Credenciais de administrador necessárias.</span>
          </p>
          
          <label className="block text-red-500 text-xs font-mono font-bold tracking-widest mb-2 uppercase">
            &gt; Inserir Password:
          </label>

          <div className="relative mb-8 group">
            <div className="absolute -inset-0.5 bg-red-500/30 rounded blur opacity-75 animate-pulse"></div>
            <div className="relative flex items-center bg-slate-950 border border-red-500 rounded">
                <div className="pl-3 pr-2 text-red-500 animate-pulse">
                    <Terminal size={18} />
                </div>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border-none text-white font-mono py-3 focus:outline-none focus:ring-0 text-lg tracking-widest"
                autoFocus
                autoComplete="off"
                />
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-slate-400 hover:text-white font-mono text-sm transition-colors"
            >
              CANCELAR
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-sm font-bold rounded shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all"
            >
              DESBLOQUEAR
            </button>
          </div>
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-red-500 text-xs font-mono text-center bg-red-500/10 py-2 rounded border border-red-500/20"
            >
              🚫 ERRO: Acesso negado.
            </motion.div>
          )}
        </form>
        
        <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif')] opacity-5 pointer-events-none mix-blend-screen bg-cover"></div>
      </motion.div>
    </div>
  );
};

const useTypewriter = (texts, speed = 150, pause = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[index % texts.length];
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
      }
      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), pause);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed, pause]);
  return displayText;
};

const SpotlightCard = ({ children, className = "", featured = false, locked = false, onUnlock }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative border overflow-hidden rounded-xl ${featured ? 'md:col-span-2' : 'col-span-1'} ${className} ${locked ? 'border-red-900/50 bg-red-950/10' : 'border-slate-800 bg-slate-900/50'}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${locked ? 'rgba(239, 68, 68, 0.15)' : 'rgba(14, 165, 233, 0.15)'},
              transparent 80%
            )
          `,
        }}
      />
      
      {/* LOCKED OVERLAY - CLIQUE EM QUALQUER LUGAR */}
      {locked && (
        <div 
          onClick={onUnlock} 
          className="absolute inset-0 z-20 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none group/lock"
        >
          <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none"></div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mb-4 border border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.3)] transition-all group-hover/lock:bg-red-600/30"
          >
            <Lock size={32} className="text-red-500" />
          </motion.div>
          
          <h3 className="text-xl font-bold text-red-500 tracking-widest mb-2 font-mono">ENCRYPTED</h3>
          <p className="text-red-400/60 text-xs font-mono max-w-[200px] mb-6">
            DATA OBFUSCATED IN SOURCE CODE
          </p>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 bg-red-950/50 border border-red-900 text-red-500 text-xs font-mono rounded transition-colors group-hover/lock:bg-red-900 group-hover/lock:text-white"
          >
            <Terminal size={12} />
            <span>&gt;_ INSERIR PASSWORD</span>
            <span className="animate-pulse">_</span>
          </button>
        </div>
      )}

      <div className={`relative h-full ${locked ? 'blur-sm opacity-20 pointer-events-none grayscale' : ''}`}>
        {children}
      </div>
    </motion.div>
  );
};

const Button = ({ children, icon: Icon, onClick, href, primary = false }) => {
  const Component = href ? motion.a : motion.button;
  return (
    <Component
      href={href}
      onClick={onClick}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium transition-all duration-300 cursor-pointer
        ${primary 
          ? 'bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:bg-indigo-500 hover:shadow-[0_0_30px_rgba(79,70,229,0.5)]' 
          : 'bg-slate-800/50 text-slate-300 border border-slate-700 hover:bg-slate-800 hover:text-white hover:border-slate-500'}
      `}
    >
      {Icon && <Icon size={16} />}
      {children}
    </Component>
  );
};

const TechTag = ({ name }) => {
  const styleClass = PORTFOLIO_DATA.techColors[name] || "text-slate-400 bg-slate-800/50 border-slate-700";
  return (
    <span className={`px-2 py-1 rounded-md text-xs font-mono border ${styleClass} bg-opacity-20`}>
      {name}
    </span>
  );
};

/* =============================================================================
  🧩 PÁGINAS & SECÇÕES
  =============================================================================
*/

const Navbar = ({ onViewChange, currentView }) => (
  <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-white/5">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <motion.button 
        onClick={() => onViewChange('home')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-xl font-bold tracking-tighter text-white flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <Terminal size={20} className="text-indigo-500" />
        <span>{PORTFOLIO_DATA.personal.name}<span className="text-indigo-500">.</span></span>
      </motion.button>
      
      <div className="flex items-center gap-6">
        <div className="hidden md:flex gap-4 text-sm font-mono">
          <button 
            onClick={() => onViewChange('home')}
            className={`transition-colors ${currentView === 'home' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            _home
          </button>
          <button 
            onClick={() => onViewChange('projects')}
            className={`transition-colors ${currentView === 'projects' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
          >
            _work
          </button>
        </div>
        <div className="h-4 w-[1px] bg-slate-800 hidden md:block"></div>
        <div className="flex gap-4">
          {[Github, Linkedin, Mail].map((Icon, i) => (
            <motion.a
              key={i}
              href={i === 0 ? PORTFOLIO_DATA.personal.social.github : "#"}
              whileHover={{ y: -2, color: '#818cf8' }}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </nav>
);

const Hero = ({ onViewChange }) => {
  const typewriterText = useTypewriter(PORTFOLIO_DATA.personal.role);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-mono mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for hire
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6">
            Olá, sou o {PORTFOLIO_DATA.personal.name} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient bg-300%">
              {PORTFOLIO_DATA.personal.handle}
            </span>
          </h1>

          <div className="h-8 mb-8 font-mono text-xl text-slate-400">
            &gt; {typewriterText}<span className="animate-pulse">_</span>
          </div>

          <p className="max-w-2xl mx-auto text-slate-400 text-lg mb-8 leading-relaxed">
            {PORTFOLIO_DATA.personal.bio}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-slate-500 mb-10 text-sm">
             <MapPin size={14} /> {PORTFOLIO_DATA.personal.location}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button icon={ArrowRight} primary onClick={() => onViewChange('projects')}>
              Ver Todos os Projetos
            </Button>
            <Button icon={Github} href={PORTFOLIO_DATA.personal.social.github}>GitHub</Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] -z-10" />
    </section>
  );
};

const ContributionGraph = () => {
  const weeks = 20;
  const days = 7;
  
  const getIntensity = (w, d) => {
    const val = Math.sin(w * 0.5) * Math.cos(d * 0.5) * 10;
    const rand = Math.abs(val) % 1;
    if (rand > 0.85) return 4;
    if (rand > 0.65) return 3;
    if (rand > 0.45) return 2;
    if (rand > 0.2) return 1;
    return 0;
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="flex gap-1 justify-center opacity-80 rotate-0 hover:opacity-100 transition-opacity duration-300">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1">
            {Array.from({ length: days }).map((_, d) => {
              const level = getIntensity(w, d);
              const colors = [
                'bg-slate-800/50', 'bg-indigo-900/40', 'bg-indigo-700/60', 'bg-indigo-500/80', 'bg-purple-400'
              ];
              return (
                <motion.div
                  key={`${w}-${d}`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (w * 0.05) + (d * 0.01) }}
                  viewport={{ once: true }}
                  className={`w-3 h-3 rounded-sm ${colors[level]}`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsSection = () => (
  <section className="py-20 border-y border-white/5 bg-slate-900/30">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/3">
          <h3 className="text-2xl font-bold text-white mb-4">Github Stats</h3>
          <p className="text-slate-400 mb-6">
            Sempre a aprender e a construir. O meu foco está em projetos open-source e no desenvolvimento de ferramentas úteis.
          </p>
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-bold text-white">{PORTFOLIO_DATA.personal.stats.commits}</div>
              <div className="text-sm text-slate-500 font-mono">Commits Total</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">{PORTFOLIO_DATA.personal.stats.repos}</div>
              <div className="text-sm text-slate-500 font-mono">Repositórios</div>
            </div>
          </div>
        </div>
        <div className="md:w-2/3">
          <ContributionGraph />
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 border-t border-white/5 bg-slate-950 text-center relative z-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-slate-500 text-sm font-mono">
        © {new Date().getFullYear()} {PORTFOLIO_DATA.personal.name}. Built with React & Tailwind.
      </p>
      <div className="flex gap-6">
        <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Termos</a>
        <a href="#" className="text-slate-500 hover:text-indigo-400 text-sm transition-colors">Privacidade</a>
      </div>
    </div>
  </footer>
);

// --- COMPONENTE NOVA PÁGINA DE PROJETOS ---
const AllProjectsPage = ({ onViewChange, unlockedProjects, onUnlockRequest, sessionKey }) => {
  // Extrair categorias únicas
  const categories = [...new Set(PORTFOLIO_DATA.projects.map(p => p.category))];

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <button 
              onClick={() => onViewChange('home')}
              className="group flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-mono text-sm mb-4"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Voltar ao Início
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Todos os Projetos</h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Um arquivo completo de experimentos, ferramentas e aplicações desenvolvidas ao longo do tempo.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-slate-500 font-mono text-sm bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-800">
             <Filter size={14} />
             {PORTFOLIO_DATA.projects.length} Repositórios Indexados
          </div>
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <div key={category}>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-white">{category}</h2>
                <div className="h-px bg-slate-800 flex-grow"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PORTFOLIO_DATA.projects
                  .filter(p => p.category === category)
                  .map(project => {
                    const Icon = project.icon || Code2;
                    const isLocked = project.locked && !unlockedProjects.includes(project.id);
                    
                    // Lógica de desencriptação em tempo real
                    let displayTitle = project.title;
                    let displayDesc = project.description;

                    if (project.locked) {
                        if (isLocked) {
                            displayTitle = "ENCRYPTED_DATA";
                            displayDesc = "Conteúdo protegido por encriptação. Chave necessária para visualizar.";
                        } else {
                            // Desencripta usando a função infalível
                            displayTitle = CryptoUtils.decrypt(project.titleCipher);
                            displayDesc = CryptoUtils.decrypt(project.descCipher);
                        }
                    }
                    
                    return (
                      <SpotlightCard 
                        key={project.id} 
                        className="bg-slate-900/30" 
                        locked={isLocked}
                        onUnlock={() => onUnlockRequest(project.id)}
                      >
                        <div className="p-6 h-full flex flex-col">
                          <div className="flex justify-between items-start mb-4">
                            <div className={`p-2 rounded-lg border ${isLocked ? 'bg-red-950/30 border-red-900 text-red-500' : 'bg-slate-800 border-slate-700'}`}>
                              <Icon size={20} className={isLocked ? "text-red-500" : "text-indigo-400"} />
                            </div>
                            <div className="flex gap-2">
                              {isLocked ? (
                                <Lock size={18} className="text-red-500" />
                              ) : (
                                <>
                                  <a href={project.links.repo} className="text-slate-500 hover:text-white transition-colors" title="Ver Código"><Github size={18} /></a>
                                  <a href={project.links.demo} className="text-slate-500 hover:text-white transition-colors" title="Live Demo"><ExternalLink size={18} /></a>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <h3 className={`text-lg font-bold mb-2 ${isLocked ? 'text-red-400 font-mono tracking-wider' : 'text-white'}`}>
                            {displayTitle}
                          </h3>
                          <p className={`text-sm mb-4 flex-grow leading-relaxed ${isLocked ? 'text-red-500/50 font-mono' : 'text-slate-400'}`}>
                            {displayDesc}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-auto">
                            {project.tags.map(tag => (
                              <TechTag key={tag} name={tag} />
                            ))}
                          </div>
                        </div>
                      </SpotlightCard>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-12 border-t border-slate-800 text-center">
            <h3 className="text-white text-xl font-bold mb-4">Tens uma ideia de projeto?</h3>
            <Button primary onClick={() => window.location.href = PORTFOLIO_DATA.personal.social.email} icon={Mail}>
              Vamos conversar
            </Button>
        </div>
      </div>
    </div>
  );
};

// Componente Wrapper para a Homepage (para manter o layout limpo)
const HomePage = ({ onViewChange, unlockedProjects, onUnlockRequest, sessionKey }) => (
  <>
    <Hero onViewChange={onViewChange} />
    <StatsSection />
    
    {/* Featured Projects Preview Section */}
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Layers className="text-indigo-500" />
            Destaques
          </h2>
          <p className="text-slate-400">Uma seleção dos meus trabalhos favoritos.</p>
        </div>
        <Button onClick={() => onViewChange('projects')} icon={ArrowRight}>Ver Todos</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.projects.filter(p => p.featured).slice(0, 3).map((project) => {
          const Icon = project.icon || Code2;
          const isLocked = project.locked && !unlockedProjects.includes(project.id);

          // Lógica de desencriptação em tempo real para a Homepage
          let displayTitle = project.title;
          let displayDesc = project.description;

          if (project.locked) {
              if (isLocked) {
                  displayTitle = "ENCRYPTED_DATA";
                  displayDesc = "Conteúdo protegido.";
              } else {
                  displayTitle = CryptoUtils.decrypt(project.titleCipher);
                  displayDesc = CryptoUtils.decrypt(project.descCipher);
              }
          }
          
          return (
            <SpotlightCard 
              key={project.id} 
              featured={project.featured}
              locked={isLocked}
              onUnlock={() => onUnlockRequest(project.id)}
            >
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-lg border ${isLocked ? 'bg-red-950/30 border-red-900 text-red-500' : 'bg-slate-800 border-slate-700'}`}>
                    <Icon size={24} className={isLocked ? "text-red-500" : "text-indigo-400"} />
                  </div>
                  <div className="flex gap-3">
                    {isLocked ? (
                        <Lock size={20} className="text-red-500" />
                      ) : (
                        <a href={project.links.repo} className="text-slate-500 hover:text-white transition-colors"><Github size={20} /></a>
                    )}
                  </div>
                </div>
                <h3 className={`text-xl font-bold mb-3 ${isLocked ? 'text-red-400 font-mono tracking-wider' : 'text-white'}`}>
                    {displayTitle}
                </h3>
                <p className={`mb-6 flex-grow ${isLocked ? 'text-red-500/50 font-mono' : 'text-slate-400'}`}>
                    {displayDesc}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map(tag => <TechTag key={tag} name={tag} />)}
                </div>
              </div>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  </>
);

/* =============================================================================
  🚀 APLICAÇÃO PRINCIPAL
  =============================================================================
*/

export default function App() {
  const [view, setView] = useState('home'); // 'home' or 'projects'
  const [unlockedProjects, setUnlockedProjects] = useState([]);
  const [sessionKey, setSessionKey] = useState(null); // Armazena a password válida da sessão
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingUnlockId, setPendingUnlockId] = useState(null);

  // Initial console message for developer
  useEffect(() => {
    console.log("%c🔐 FERRAMENTA DE ENCRIPTAÇÃO ATIVA", "color: #ef4444; font-size: 20px; font-weight: bold;");
    console.log("Para gerar novos códigos encriptados, use o comando abaixo na consola:");
    console.log('CryptoUtils.encrypt("Seu Texto Aqui")');
    // Exposing to window for dev usage
    window.CryptoUtils = CryptoUtils;
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  // Gestão do bloqueio
  const handleUnlockRequest = (id) => {
    setPendingUnlockId(id);
    setIsModalOpen(true);
  };

  const handleUnlockSuccess = () => {
    // Agora não precisamos da chave para desencriptar, apenas desbloqueamos
    setSessionKey("admin"); // Chave dummy
    
    if (pendingUnlockId) {
      setUnlockedProjects(prev => [...prev, pendingUnlockId]);
      // Desbloqueia automaticamente outros projetos se a chave for a mesma (UX)
      const otherLocked = PORTFOLIO_DATA.projects
        .filter(p => p.locked && p.id !== pendingUnlockId)
        .map(p => p.id);
      setUnlockedProjects(prev => [...prev, ...otherLocked]);
      
      setPendingUnlockId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      <Navbar currentView={view} onViewChange={setView} />
      
      {/* SECURITY MODAL */}
      <PasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleUnlockSuccess} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage 
                onViewChange={setView} 
                unlockedProjects={unlockedProjects}
                onUnlockRequest={handleUnlockRequest}
                sessionKey={sessionKey}
              />
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AllProjectsPage 
                onViewChange={setView}
                unlockedProjects={unlockedProjects}
                onUnlockRequest={handleUnlockRequest}
                sessionKey={sessionKey}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}