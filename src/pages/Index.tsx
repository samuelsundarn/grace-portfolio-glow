
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Moon, Sun, Download, MessageCircle, Menu, X, ArrowDown } from 'lucide-react';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const heroRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Auto detect system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : '';
  }, [isDark]);

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    // Observe all sections
    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => {
      if (observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsNavOpen(false);
  };

  const scrollToContact = () => scrollToSection('contact');

  const handleDownloadCV = () => {
    toast({
      title: "CV Download",
      description: "CV download would be triggered here. Please upload your CV file to enable this feature.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Thanks for reaching out! 🙂",
        description: "I'll get back to you soon.",
      });
      
      setFormData({ name: '', contact: '', message: '' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = [
    { name: 'Quality Control', icon: '🔬' },
    { name: 'Pharmaceutical Analysis', icon: '💊' },
    { name: 'ADR Monitoring', icon: '⚠️' },
    { name: 'Prescription Handling', icon: '📋' },
    { name: 'Patient Counselling', icon: '💬' },
    { name: 'MS Office', icon: '💻' },
    { name: 'Communication', icon: '🗣️' },
    { name: 'Time Management', icon: '⏰' },
    { name: 'Quick Learning', icon: '🚀' }
  ];

  const experiences = [
    {
      title: "Quality Control Intern",
      company: "CMS Labs",
      period: "2024",
      description: "Pharmaceutical testing and quality assurance"
    },
    {
      title: "Medical Coding Training",
      company: "LSSDC",
      period: "2024",
      description: "ICD-10, CPT coding certification"
    },
    {
      title: "Clinical Exposure",
      company: "Government Hospital",
      period: "2023",
      description: "Patient care and clinical operations"
    },
    {
      title: "Professional Development",
      company: "Industry Workshop",
      period: "2023",
      description: "Pharmaceutical manufacturing processes"
    }
  ];

  const navbarOpacity = Math.min(scrollY / 300, 0.95);
  const heroParallax = scrollY * 0.3;

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Transparent Navbar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: `hsl(var(--background) / ${navbarOpacity})`,
          backdropFilter: scrollY > 50 ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrollY > 50 ? '1px solid hsl(var(--border) / 0.2)' : 'none',
          boxShadow: scrollY > 50 ? '0 8px 32px hsl(var(--primary) / 0.1)' : 'none'
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-xl font-serif font-bold text-primary cursor-pointer transition-all duration-300 hover:scale-110 hover:text-coral"
            onClick={() => scrollToSection('hero')}
          >
            Karunya Grace
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Experience', 'Education', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-muted-foreground hover:text-primary transition-all duration-300 relative group py-2"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral transition-all duration-300 group-hover:w-full rounded-full"></span>
              </button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDark(!isDark)}
              className="rounded-xl hover:bg-coral/10 transition-all duration-300"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            {isNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isNavOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-20 border-b border-border/10 shadow-xl">
            <div className="px-6 py-6 space-y-6">
              {['About', 'Experience', 'Education', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
                >
                  {item}
                </button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsDark(!isDark)}
                className="w-full justify-start hover:bg-coral/10"
              >
                {isDark ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                {isDark ? 'Light' : 'Dark'} Mode
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Redesigned */}
      <section 
        id="hero"
        ref={heroRef} 
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-mint/30 to-background"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large Geometric Shapes */}
          <div 
            className="absolute top-20 left-10 w-32 h-32 bg-coral/10 rounded-full blur-xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)` }}
          />
          <div 
            className="absolute bottom-32 right-16 w-48 h-48 bg-primary/5 rounded-3xl blur-2xl animate-pulse"
            style={{ transform: `translateY(${-scrollY * 0.15}px) rotate(${-scrollY * 0.08}deg)`, animationDelay: '1s' }}
          />
          <div 
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-coral/5 rounded-2xl blur-xl animate-pulse"
            style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`, animationDelay: '0.5s' }}
          />
          
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-coral/20 to-primary/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 3}s`,
                transform: `translateY(${scrollY * (0.05 + Math.random() * 0.1)}px)`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="text-center z-10 px-6 max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Main Title with Staggered Animation */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight">
                <span className="block text-primary animate-fade-in opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  Nakkina
                </span>
                <span className="block bg-gradient-to-r from-primary via-coral to-primary bg-clip-text text-transparent animate-fade-in opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
                  Karunya Grace
                </span>
              </h1>
              
              {/* Animated Underline */}
              <div className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-coral to-transparent animate-scale-in opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }} />
            </div>

            {/* Tagline */}
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: '1s', animationFillMode: 'forwards' }}>
              Quality-focused <span className="text-coral font-semibold">B.Pharm graduate</span> passionate about 
              <span className="text-primary font-semibold"> data-driven drug safety</span> & medical coding.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in opacity-0" style={{ animationDelay: '1.3s', animationFillMode: 'forwards' }}>
              <Button 
                onClick={scrollToContact}
                className="group bg-coral hover:bg-coral/90 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl hover:shadow-coral/25 transition-all duration-500 hover:scale-105 hover:-translate-y-2 border-2 border-coral/20"
              >
                <MessageCircle className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                Let's Talk
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-coral/0 via-white/20 to-coral/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </Button>
              <Button 
                onClick={handleDownloadCV}
                variant="outline"
                className="group border-2 border-primary/30 hover:border-primary hover:bg-primary/5 hover:text-primary px-8 py-6 text-lg rounded-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 backdrop-blur-sm"
              >
                <Download className="mr-3 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1" />
                Download CV
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <button 
                onClick={() => scrollToSection('about')}
                className="p-3 rounded-full bg-coral/10 hover:bg-coral/20 transition-all duration-300 hover:scale-110"
              >
                <ArrowDown className="h-5 w-5 text-coral" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section 
        id="about" 
        className="py-20 px-6" 
        data-animate
        style={{
          opacity: isVisible['about'] ? 1 : 0,
          transform: `translateY(${isVisible['about'] ? 0 : 50}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl font-serif text-primary mb-6">About Me</h2>
            <div className="text-lg leading-relaxed text-muted-foreground space-y-4">
              <p>
                As a dedicated B.Pharm graduate with hands-on experience in quality control and pharmaceutical analysis, 
                I bring a unique blend of clinical knowledge and analytical precision to healthcare data management.
              </p>
              <p>
                My passion lies in bridging the gap between pharmaceutical science and healthcare informatics, 
                ensuring drug safety through meticulous data analysis and coding accuracy.
              </p>
              <p>
                Currently seeking opportunities in medical coding and pharmaceutical manufacturing where I can contribute 
                to improving patient outcomes through quality-driven processes.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-serif text-primary mb-8">Core Skills</h3>
            <div className="grid grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="skill-card text-center p-4 rounded-xl hover:shadow-lg transition-all duration-500 hover:-translate-y-3 hover:rotate-1"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    opacity: isVisible['about'] ? 1 : 0,
                    transform: `translateY(${isVisible['about'] ? 0 : 30}px)`,
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
                  }}
                >
                  <div className="text-3xl mb-2 transition-transform duration-300 hover:scale-125">{skill.icon}</div>
                  <p className="text-sm font-medium text-primary">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section 
        id="experience"
        className="py-20 relative overflow-hidden" 
        data-animate
        style={{
          opacity: isVisible['experience'] ? 1 : 0,
          transform: `translateY(${isVisible['experience'] ? 0 : 50}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-r from-mint/10 to-coral/10 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div className="relative z-10 px-6">
          <h2 className="text-4xl font-serif text-primary text-center mb-12">Experience Journey</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory">
              {experiences.map((exp, index) => (
                <Card 
                  key={index} 
                  className="min-w-80 snap-start hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                  style={{
                    opacity: isVisible['experience'] ? 1 : 0,
                    transform: `translateY(${isVisible['experience'] ? 0 : 30}px)`,
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`
                  }}
                >
                  <CardContent className="p-6">
                    <div className="text-coral font-semibold text-sm mb-2">{exp.period}</div>
                    <h3 className="text-xl font-semibold text-primary mb-2">{exp.title}</h3>
                    <div className="text-muted-foreground font-medium mb-3">{exp.company}</div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section 
        id="education"
        className="py-20 px-6" 
        data-animate
        style={{
          opacity: isVisible['education'] ? 1 : 0,
          transform: `translateY(${isVisible['education'] ? 0 : 50}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-primary text-center mb-12">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="education-card hover:shadow-xl transition-all duration-500 hover:rotate-2 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-2">Bachelor of Pharmacy</h3>
                <p className="text-muted-foreground mb-4">B.Pharm Degree</p>
                <p className="text-sm leading-relaxed">
                  Comprehensive pharmaceutical education covering drug discovery, formulation, 
                  quality control, and clinical applications.
                </p>
              </CardContent>
            </Card>
            
            <Card className="education-card hover:shadow-xl transition-all duration-500 hover:-rotate-2 hover:scale-105">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-2">Medical Coding</h3>
                <p className="text-muted-foreground mb-4">Professional Training</p>
                <p className="text-sm leading-relaxed">
                  Specialized training in ICD-10, CPT coding systems, and healthcare data management 
                  for clinical documentation accuracy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-mint to-coral opacity-20" 
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 max-w-4xl mx-auto leading-tight">
            Ready to code clinical data or optimise pharma production?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">Let's connect and discuss opportunities.</p>
          <Button 
            onClick={scrollToContact}
            className="bg-coral hover:bg-coral/90 text-white px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact" 
        className="py-20 px-6" 
        data-animate
        style={{
          opacity: isVisible['contact'] ? 1 : 0,
          transform: `translateY(${isVisible['contact'] ? 0 : 50}px)`,
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-primary text-center mb-12">Let's Connect</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              {[
                { icon: Mail, title: "Email", content: "karunya.grace@email.com" },
                { icon: Phone, title: "Phone", content: "+91 XXXXX XXXXX" },
                { icon: MapPin, title: "Location", content: "Available for opportunities nationwide" },
                { icon: Linkedin, title: "LinkedIn", content: "linkedin.com/in/karunya-grace", isLink: true }
              ].map((item, index) => (
                <div 
                  key={item.title}
                  className="flex items-center space-x-4 transition-all duration-300 hover:translate-x-2"
                  style={{
                    opacity: isVisible['contact'] ? 1 : 0,
                    transform: `translateX(${isVisible['contact'] ? 0 : -30}px)`,
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
                  }}
                >
                  <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-coral/20 hover:scale-110">
                    <item.icon className="h-6 w-6 text-coral" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary">{item.title}</p>
                    {item.isLink ? (
                      <a href="#" className="text-coral hover:underline transition-colors duration-300">{item.content}</a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              <Button 
                onClick={handleDownloadCV}
                variant="outline"
                className="w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </Button>
            </div>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="rounded-xl border-2 py-6 text-lg transition-all duration-300 focus:scale-105"
                required
              />
              <Input
                placeholder="Email or Phone"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                className="rounded-xl border-2 py-6 text-lg transition-all duration-300 focus:scale-105"
                required
              />
              <Textarea
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="rounded-xl border-2 text-lg resize-none transition-all duration-300 focus:scale-105"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral/90 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 hover:scale-105 hover:-translate-y-1"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Nakkina Karunya Grace. All rights reserved.
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDark(!isDark)}
            className="rounded-xl hover:scale-105 transition-transform duration-300"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="ml-2">{isDark ? 'Light' : 'Dark'} Mode</span>
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Index;
