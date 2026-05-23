"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, GraduationCap, Shield } from "lucide-react";

const navLinks = [
  { name: "O Problema",     href: "/#problema"     },
  { name: "O Método",       href: "/#metodo"       },
  { name: "Módulos",        href: "/#modulos"      },
  { name: "Ferramentas",    href: "/#ferramentas"  },
  { name: "Quem Ensina",    href: "/#instrutor"    },
];

export function Navigation({ settings, isProgrammer = false }: { settings?: any; isProgrammer?: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-500 ${
        isScrolled 
          ? "top-4 left-4 right-4" 
          : "top-0 left-0 right-0"
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled 
            ? "glass-card rounded-full max-w-[1000px] px-2 shadow-2xl" 
            : isMobileMenuOpen
              ? "glass-card rounded-2xl max-w-[1200px]"
              : "bg-transparent max-w-[1400px]"
        }`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-500 px-6 lg:px-8 ${
            isScrolled ? "h-12 md:h-14" : "h-16 md:h-20"
          }`}
        >
          {/* Logo */}
          <a href={isProgrammer ? "/programador" : "/"} className="flex items-center gap-2 group">
            <img
              src={isProgrammer ? "/images/logo laranja metodo3h.png" : "/images/metodo3h logo.png"}
              alt="Método 3h"
              className={`transition-all duration-500 ${isScrolled ? "h-7 md:h-10" : "h-8 md:h-12"}`}
            />
            {isProgrammer && (
              <span className="px-2 py-0.5 text-[8px] font-mono rounded bg-orange-500/20 border border-orange-500/30 text-orange-400 font-bold uppercase tracking-wider animate-pulse">
                Dev
              </span>
            )}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-300 relative group ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/70 hover:text-white"}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${isScrolled ? "bg-foreground" : "bg-white"}`} />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a 
              href="/portal/dashboard" 
              title="Portal do Aluno"
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isScrolled 
                  ? "border-foreground/15 hover:bg-foreground/5 text-foreground hover:scale-105" 
                  : "border-white/20 hover:bg-white/10 text-white hover:scale-105"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
            </a>
            
            <a 
              href="/admin" 
              title="Área do Administrador"
              className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                isScrolled 
                  ? "border-foreground/15 hover:bg-foreground/5 text-foreground hover:scale-105" 
                  : "border-white/20 hover:bg-white/10 text-white hover:scale-105"
              }`}
            >
              <Shield className="w-4 h-4" />
            </a>

            <Button
              asChild
              size="sm"
              className={`rounded-full transition-all duration-500 cursor-pointer ${isScrolled ? "bg-foreground hover:bg-foreground/90 text-background px-4 h-8 text-xs" : "bg-white hover:bg-white/90 text-black px-6"}`}
            >
              <a href="/#inscricao">
                Garantir vaga
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 transition-colors duration-500 ${isScrolled || isMobileMenuOpen ? "text-foreground" : "text-white"}`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

      </nav>
      
      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`md:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
        style={{ top: 0 }}
      >
        <div className="flex flex-col h-full px-8 pt-28 pb-8">
          {/* Navigation Links */}
          <div className="flex-1 flex flex-col justify-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-5xl font-display text-foreground hover:text-muted-foreground transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? "opacity-100 translate-y-0" 
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 75}ms` : "0ms" }}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          {/* Bottom CTAs */}
          <div className={`flex flex-col gap-4 pt-8 border-t border-foreground/10 transition-all duration-500 ${
            isMobileMenuOpen 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: isMobileMenuOpen ? "300ms" : "0ms" }}
          >
            <div className="flex gap-3">
              <a 
                href="/portal/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 border border-foreground/20 hover:bg-foreground/5 text-foreground rounded-full h-12 text-sm font-medium transition-all"
              >
                <GraduationCap className="w-4 h-4" />
                Portal Aluno
              </a>
              <a 
                href="/admin" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 flex items-center justify-center gap-2 border border-foreground/20 hover:bg-foreground/5 text-foreground rounded-full h-12 text-sm font-medium transition-all"
              >
                <Shield className="w-4 h-4" />
                Área Adm
              </a>
            </div>

            <Button 
              asChild
              className="w-full bg-foreground text-background rounded-full h-14 text-base cursor-pointer"
            >
              <a href="/#inscricao" onClick={() => setIsMobileMenuOpen(false)}>
                Garantir minha vaga
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
