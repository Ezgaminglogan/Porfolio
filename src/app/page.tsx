'use client';

import Image from 'next/image';
import { 
  CodeBracketIcon, 
  CommandLineIcon, 
  CpuChipIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  RocketLaunchIcon,
  SparklesIcon,
  ArrowDownIcon,
  Bars3Icon,
  XMarkIcon,
  ServerIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setFormStatus('error');
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  const skills = [
    { name: 'Web Development', icon: CodeBracketIcon, description: 'PHP, HTML, CSS, JavaScript, TailwindCSS, Bootstrap' },
    { name: 'Backend & Database', icon: ServerIcon, description: 'PHP, MySQL, PHPMailer, OTP Authentication , Email Verification , SQL Server Management Studio' },
    { name: '.NET Development', icon: CpuChipIcon, description: 'C#, ASP.NET MVC, .NET Framework' },
    { name: 'Full Stack Projects', icon: RocketLaunchIcon, description: 'End-to-end web applications with modern frameworks' },
  ];

  const projects = [
    {
      title: 'E-Industria',
      description: 'A comprehensive web-based platform for industrial supplies, manpower services, and business management. Designed to solve real-world problems in industrial operations.',
      tech: ['PHP', 'TailwindCSS', 'MySQL'],
      gradient: 'from-emerald-500 to-teal-600',
      image: '/image/Capstone Project.png',
      type: 'Capstone Project'
    },
    {
      title: 'ByteBuilder',
      description: 'Web-based personal computer modeling and simulation platform with rule-based custom recommendations. Helps users build their dream PC with intelligent suggestions.',
      tech: ['PHP', 'Bootstrap', 'MySQL'],
      gradient: 'from-green-500 to-emerald-600',
      image: '/image/Capstone Project 2.png',
      type: 'Capstone Project'
    },
    {
      title: "Mom's Food Delicacies",
      description: 'E-commerce platform for home-cooked food delicacies featuring email verification with PHPMailer, OTP authentication, and secure user management.',
      tech: ['PHP', 'TailwindCSS', 'PHPMailer', 'MySQL'],
      gradient: 'from-teal-500 to-cyan-600',
      image: '/image/Project 3.png',
      type: 'School Project'
    },
  ];

  const experiences = [
    {
      title: 'Bachelor of Science in Information Technology',
      company: 'Cebu Technological University - Naga Extension Campus',
      period: '2022 - Present',
      description: 'Currently in 4th year, focusing on web development, database management, and software engineering. Completed multiple capstone projects addressing real-world problems.'
    },
    {
      title: 'Capstone Project Developer',
      company: 'CTU Naga - Academic Project',
      period: '2024',
      description: 'Developed E-Industria and ByteBuilder as capstone projects, creating solutions for industrial supply management and PC building recommendations.'
    },
    {
      title: 'Web Development Student',
      company: 'Self-Learning & Academic Projects',
      period: '2023 - Present',
      description: 'Building expertise in PHP, MySQL, .NET, and modern web frameworks through hands-on projects and continuous learning.'
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-lg z-50 border-b border-emerald-900/20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-lg flex items-center justify-center">
                <SparklesIcon className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Portfolio
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-8">
              <a href="#home" className={`hover:text-emerald-400 transition-colors ${activeSection === 'home' ? 'text-emerald-400 font-semibold' : ''}`}>Home</a>
              <a href="#about" className={`hover:text-emerald-400 transition-colors ${activeSection === 'about' ? 'text-emerald-400 font-semibold' : ''}`}>About</a>
              <a href="#skills" className={`hover:text-emerald-400 transition-colors ${activeSection === 'skills' ? 'text-emerald-400 font-semibold' : ''}`}>Skills</a>
              <a href="#projects" className={`hover:text-emerald-400 transition-colors ${activeSection === 'projects' ? 'text-emerald-400 font-semibold' : ''}`}>Projects</a>
              <a href="#experience" className={`hover:text-emerald-400 transition-colors ${activeSection === 'experience' ? 'text-emerald-400 font-semibold' : ''}`}>Experience</a>
              <a href="#contact" className={`hover:text-emerald-400 transition-colors ${activeSection === 'contact' ? 'text-emerald-400 font-semibold' : ''}`}>Contact</a>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-emerald-900/20">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" className={`block hover:text-emerald-400 transition-colors ${activeSection === 'home' ? 'text-emerald-400 font-semibold' : ''}`} onClick={() => setMobileMenuOpen(false)}>Home</a>
              <a href="#about" className={`block hover:text-emerald-400 transition-colors ${activeSection === 'about' ? 'text-emerald-400 font-semibold' : ''}`} onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#skills" className={`block hover:text-emerald-400 transition-colors ${activeSection === 'skills' ? 'text-emerald-400 font-semibold' : ''}`} onClick={() => setMobileMenuOpen(false)}>Skills</a>
              <a href="#projects" className={`block hover:text-emerald-400 transition-colors ${activeSection === 'projects' ? 'text-emerald-400 font-semibold' : ''}`} onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#experience" className={`block hover:text-emerald-400 transition-colors ${activeSection === 'experience' ? 'text-emerald-400 font-semibold' : ''}`} onClick={() => setMobileMenuOpen(false)}>Experience</a>
              <a href="#contact" className={`block hover:text-emerald-400 transition-colors ${activeSection === 'contact' ? 'text-emerald-400 font-semibold' : ''}`} onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-black to-black opacity-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="mb-8 flex justify-center">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-emerald-500/50 shadow-2xl shadow-emerald-500/30">
              <Image
                src="/image/profile.jpg"
                alt="Profile"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          <div className="inline-block mb-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">👋 Welcome to my portfolio</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Web Developer
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Building innovative web solutions with PHP, MySQL, .NET, and modern frameworks | A vibe coder crafting digital experiences
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105"
            >
              View My Work
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border-2 border-emerald-500 rounded-full font-semibold hover:bg-emerald-500/10 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>

          <div className="mt-16 animate-bounce">
            <ArrowDownIcon className="w-6 h-6 mx-auto text-emerald-400" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-emerald-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I&apos;m a 4th year IT student at Cebu Technological University - Naga Extension Campus, passionate about 
                web development and creating solutions that solve real-world problems.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My expertise lies in PHP, MySQL, C#, ASP.NET MVC, and modern web frameworks like TailwindCSS and Bootstrap. 
                I&apos;ve developed multiple capstone and academic projects that address practical challenges in various industries.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                From industrial supply management systems to e-commerce platforms, I love building full-stack applications 
                that make a difference. Currently expanding my skills in Node.js and modern JavaScript frameworks.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="p-6 bg-gradient-to-br from-emerald-900/30 to-black border border-emerald-500/20 rounded-2xl">
                <div className="text-3xl font-bold text-emerald-400 mb-2">4th</div>
                <div className="text-gray-400">Year IT Student</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-900/30 to-black border border-teal-500/20 rounded-2xl">
                <div className="text-3xl font-bold text-teal-400 mb-2">3+</div>
                <div className="text-gray-400">Major Projects</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-900/30 to-black border border-green-500/20 rounded-2xl">
                <div className="text-3xl font-bold text-green-400 mb-2">2</div>
                <div className="text-gray-400">Capstone Projects</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-900/30 to-black border border-emerald-500/20 rounded-2xl">
                <div className="text-3xl font-bold text-emerald-400 mb-2">100%</div>
                <div className="text-gray-400">Dedication</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={index}
                className="p-6 bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 hover:scale-105 group"
              >
                <skill.icon className="w-12 h-12 text-emerald-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-white">{skill.name}</h3>
                <p className="text-gray-400 text-sm">{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-emerald-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 hover:scale-105"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Project Image */}
                <div className="relative h-48 w-full overflow-hidden bg-black">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 bg-emerald-500/90 text-black text-xs font-semibold rounded-full">
                    {project.type}
                  </div>
                </div>
                
                <div className="relative p-6 space-y-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="relative pl-8 pb-8 border-l-2 border-emerald-500/30 last:pb-0"
              >
                <div className="absolute -left-2 top-0 w-4 h-4 bg-emerald-500 rounded-full"></div>
                
                <div className="bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/20 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <BriefcaseIcon className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <span className="text-gray-400 text-sm mt-2 sm:mt-0">{exp.period}</span>
                  </div>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-emerald-950/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Let&apos;s Work Together
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto text-center">
            Have a project in mind or want to discuss opportunities? I&apos;d love to hear from you!
          </p>
          
          {/* Contact Form */}
          <div className="max-w-2xl mx-auto mb-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  required
                  className="w-full px-4 py-3 bg-emerald-900/10 border border-emerald-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              {formStatus === 'success' && (
                <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 text-center">
                  Message sent successfully! ✓
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
                  Something went wrong. Please try again.
                </div>
              )}
              
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <EnvelopeIcon className="w-5 h-5" />
                {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 border-t border-emerald-500/20">
            <a 
              href="mailto:logan.panucat2@gmail.com"
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <EnvelopeIcon className="w-5 h-5" />
              Gmail
            </a>
            <a 
              href="https://github.com/ezgaminglogan"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-emerald-900/20 bg-black">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Portfolio. Built with Next.js and Tailwind CSS
          </p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">Twitter</a>
            <a href="https://www.linkedin.com/in/logan-panucat-b319562a9/" className="text-gray-400 hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="https://github.com/ezgaminglogan" className="text-gray-400 hover:text-emerald-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
