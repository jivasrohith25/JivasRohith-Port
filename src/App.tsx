import { motion, useScroll, useTransform } from 'motion/react';
import { Brain, Cloud, Code2, Cpu, Database, GitBranch, Github, Linkedin, Mail, Network, Phone, Server, Shield, Terminal, Users, ChevronDown } from 'lucide-react';
import Background3D from './components/Background3D';
import { PROJECTS, SKILLS_LIST } from './constants';

export default function App() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const skillIcons = [
    Terminal,
    Brain,
    Cpu,
    Database,
    GitBranch,
    Server,
    Cloud,
    Network,
    Users,
    Shield
  ];

  return (
    <div className="min-h-screen selection:bg-blue-600/30 selection:text-blue-600 text-slate-900">
      <Background3D />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 px-6 py-8 border-b border-blue-600/10 glass">
        <div className="max-w-7xl mx-auto flex justify-center items-center">
          <div className="flex gap-12 text-sm font-bold uppercase tracking-[0.2em]">
            {['Skills', 'Projects', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-blue-600 transition-all relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            style={{ opacity, scale }}
            className="flex flex-col items-center"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-8xl md:text-[12rem] font-black tracking-tighter mb-8 bg-gradient-to-b from-slate-900 via-slate-700 to-blue-600 bg-clip-text text-transparent leading-none"
            >
              JIVAS<br/>ROHITH
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl text-xl md:text-2xl text-slate-700/70 mb-12 font-sans font-medium italic"
            >
              "Passion Driven Software Enthusiast Interested in Learning AI Related Systems and CyberSecurity"
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <a
                href={`${import.meta.env.BASE_URL}Jivas Rohith Resume.pdf`}
                download
                className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-[0_0_30px_rgba(37,99,235,0.35)] uppercase tracking-widest text-lg"
              >
                Download Resume
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 animate-bounce"
          >
            <ChevronDown className="text-blue-600/60 w-8 h-8" />
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 max-w-7xl mx-auto overflow-hidden">
          <motion.div 
            style={{ y: y1 }}
            className="mb-24 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-sans tracking-tight uppercase italic italic">Tech Stack</h2>
            <div className="w-32 h-1 bg-blue-600 mx-auto shadow-[0_0_15px_rgba(37,99,235,0.35)]" />
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {SKILLS_LIST.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl flex flex-col items-center justify-center gap-4 group hover:border-blue-600/40 transition-all border-blue-600/10 text-center hover:bg-blue-600/5"
              >
                <div className="p-4 bg-blue-600/10 rounded-2xl group-hover:scale-110 transition-transform">
                  {(() => {
                    const Icon = skillIcons[i % skillIcons.length];
                    return <Icon className="text-blue-600 w-8 h-8" />;
                  })()}
                </div>
                <span className="font-bold text-sm uppercase tracking-widest text-slate-900">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto">
          <motion.div 
            style={{ y: y2 }}
            className="mb-24 flex flex-col items-center text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 font-sans tracking-tight uppercase italic">Projects</h2>
            <p className="text-slate-800/80 max-w-xl text-lg">Deploying intelligence across diverse environments from Edge AI to Secure Infrastructures.</p>
            <div className="w-32 h-1 bg-blue-600 mt-8 shadow-[0_0_15px_rgba(37,99,235,0.35)]" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -15, transition: { duration: 0.3 } }}
                transition={{ 
                  duration: 0.7, 
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="glass rounded-[3rem] p-10 group relative overflow-hidden flex flex-col justify-between border-blue-600/10 hover:border-blue-600/25 transition-all h-[520px]"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (i * 0.1) }}
                      className="px-5 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full text-[10px] uppercase font-black text-blue-600 tracking-[0.2em] shadow-[0_0_15px_rgba(37,99,235,0.15)]"
                    >
                      {project.category}
                    </motion.span>
                  </div>
                  <h3 className="text-4xl font-black mb-6 group-hover:text-blue-600 transition-colors tracking-tighter leading-none uppercase italic">
                    {project.title}
                  </h3>
                  <p className="text-slate-800/85 text-lg leading-relaxed font-sans font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-4 mt-8 pt-8 border-t border-blue-600/10">
                  {project.tech.map((t) => (
                    <span 
                      key={t} 
                      className="text-xs font-mono text-blue-700/70 uppercase tracking-[0.1em] group-hover:text-blue-700/90 transition-colors"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 blur-[120px] group-hover:bg-blue-600/20 group-hover:scale-150 transition-all duration-1000" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6 max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-16 rounded-[4rem] border-blue-600/20 relative overflow-hidden"
          >
            <div className="relative z-20 flex flex-col md:flex-row gap-16 items-center">
              {/* Photo */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-[3rem] glass border-2 border-blue-600/20 p-4 shadow-[0_0_50px_rgba(37,99,235,0.15)] shrink-0 overflow-hidden">
                <img
                  src={`${import.meta.env.BASE_URL}me.png`}
                  alt="Jivas Rohith"
                  className="w-full h-full rounded-[2rem] object-cover"
                />
              </div>
              
              <div className="flex-1 text-left">
                <h2 className="text-6xl md:text-7xl font-black mb-8 font-sans tracking-tight uppercase italic leading-none">Get in Touch</h2>
                            
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <a href="mailto:jivasrohith25@gmail.com" className="flex items-center gap-4 glass px-8 py-5 rounded-2xl font-bold transition-all hover:bg-blue-600/10 hover:border-blue-600/40 group border-blue-600/10">
                    <Mail className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-blue-700/80">Email</span>
                      <span className="text-sm">jivasrohith25@gmail.com</span>
                    </div>
                  </a>
                  <a href="https://linkedin.com/in/jivasrohith" className="flex items-center gap-4 glass px-8 py-5 rounded-2xl font-bold transition-all hover:bg-blue-600/10 hover:border-blue-600/40 group border-blue-600/10">
                    <Linkedin className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-blue-700/80">LinkedIn</span>
                      <span className="text-sm">Jivas Rohith</span>
                    </div>
                  </a>
                  <a href="https://github.com/jivasrohith25" className="flex items-center gap-4 glass px-8 py-5 rounded-2xl font-bold transition-all hover:bg-blue-600/10 hover:border-blue-600/40 group border-blue-600/10">
                    <Github className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-blue-700/80">GitHub</span>
                      <span className="text-sm">jivasrohith25</span>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 glass px-8 py-5 rounded-2xl font-bold border-blue-600/10">
                    <Phone className="w-6 h-6 text-blue-600" />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-widest text-blue-700/80">Contact</span>
                      <span className="text-sm text-slate-800/80 italic">Available on request</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-600/20 blur-[150px] rounded-full" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-blue-700/20 blur-[150px] rounded-full" />
            </div>
          </motion.div>
        </section>

        {/* Footer */}
          <footer className="py-20 border-t border-blue-600/10 text-center text-blue-600/30 text-[10px] font-mono uppercase tracking-[1em]">
           © 2026 JIVAS ROHITH | All rights reserved. Crafted with passion and code.  
        </footer>
      </main>
    </div>
  );
}
