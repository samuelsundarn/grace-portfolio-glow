
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Linkedin, Moon, Sun, Download, MessageCircle } from 'lucide-react';

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });
  const heroRef = useRef<HTMLDivElement>(null);

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

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    // Create a sample CV download
    toast({
      title: "CV Download",
      description: "CV download would be triggered here. Please upload your CV file to enable this feature.",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This would integrate with Google Sheets via Apps Script
      // For demo purposes, we'll simulate the submission
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

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDark ? 'dark' : ''}`}>
      {/* Hero Section */}
      <section ref={heroRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${8 + Math.random() * 16}px`,
                height: `${4 + Math.random() * 8}px`,
                animationDelay: `${Math.random() * 5}s`,
                transform: `translateY(${scrollY * (0.2 + Math.random() * 0.3)}px)`,
              }}
            />
          ))}
        </div>

        <div className="text-center z-10 px-6 max-w-4xl mx-auto">
          <h1 className="hero-title text-6xl md:text-8xl font-serif mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Nakkina Karunya Grace
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Quality-focused B.Pharm graduate passionate about data-driven drug safety & medical coding.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={scrollToContact}
              className="bg-coral hover:bg-coral/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Let's Talk
            </Button>
            <Button 
              onClick={handleDownloadCV}
              variant="outline"
              className="border-2 border-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg rounded-xl transition-all duration-300"
            >
              <Download className="mr-2 h-5 w-5" />
              Download CV
            </Button>
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section className="py-20 px-6">
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
                  className="skill-card text-center p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <p className="text-sm font-medium text-primary">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-mint/10 to-coral/10 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        <div className="relative z-10 px-6">
          <h2 className="text-4xl font-serif text-primary text-center mb-12">Experience Journey</h2>
          <div className="max-w-6xl mx-auto">
            <div className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory">
              {experiences.map((exp, index) => (
                <Card key={index} className="min-w-80 snap-start hover:shadow-xl transition-all duration-300 hover:scale-105">
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
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-primary text-center mb-12">Education & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="education-card hover:shadow-xl transition-all duration-300 hover:rotate-1">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-primary mb-2">Bachelor of Pharmacy</h3>
                <p className="text-muted-foreground mb-4">B.Pharm Degree</p>
                <p className="text-sm leading-relaxed">
                  Comprehensive pharmaceutical education covering drug discovery, formulation, 
                  quality control, and clinical applications.
                </p>
              </CardContent>
            </Card>
            
            <Card className="education-card hover:shadow-xl transition-all duration-300 hover:-rotate-1">
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
        <div className="absolute inset-0 bg-gradient-to-r from-mint to-coral opacity-20" />
        <div className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-primary mb-6 max-w-4xl mx-auto leading-tight">
            Ready to code clinical data or optimise pharma production?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">Let's connect and discuss opportunities.</p>
          <Button 
            onClick={scrollToContact}
            className="bg-coral hover:bg-coral/90 text-white px-10 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-primary text-center mb-12">Let's Connect</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <Mail className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-primary">Email</p>
                  <p className="text-muted-foreground">karunya.grace@email.com</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <Phone className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-primary">Phone</p>
                  <p className="text-muted-foreground">+91 XXXXX XXXXX</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-primary">Location</p>
                  <p className="text-muted-foreground">Available for opportunities nationwide</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-coral/10 rounded-xl flex items-center justify-center">
                  <Linkedin className="h-6 w-6 text-coral" />
                </div>
                <div>
                  <p className="font-semibold text-primary">LinkedIn</p>
                  <a href="#" className="text-coral hover:underline">linkedin.com/in/karunya-grace</a>
                </div>
              </div>
              
              <Button 
                onClick={handleDownloadCV}
                variant="outline"
                className="w-full border-2 border-primary hover:bg-primary hover:text-primary-foreground py-6 text-lg rounded-xl transition-all duration-300"
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
                className="rounded-xl border-2 py-6 text-lg"
                required
              />
              <Input
                placeholder="Email or Phone"
                value={formData.contact}
                onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                className="rounded-xl border-2 py-6 text-lg"
                required
              />
              <Textarea
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="rounded-xl border-2 text-lg resize-none"
                required
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-coral hover:bg-coral/90 text-white py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
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
            className="rounded-xl"
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
