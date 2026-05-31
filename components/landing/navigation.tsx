"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { TopBanner } from "./top-banner";

const navLinks = [
  { name: "O Problema",     href: "/#problema"     },
  { name: "O Método",       href: "/#metodo"       },
  { name: "Módulos",        href: "/#modulos"      },
  { name: "Ferramentas",    href: "/#ferramentas"  },
  { name: "Quem Ensina",    href: "/#instrutor"    },
];

export function Navigation({ 
  settings, 
  isProgrammer = false,
  isWaitlist = false 
}: { 
  settings?: any; 
  isProgrammer?: boolean; 
  isWaitlist?: boolean;
}) {
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
      className={`fixed z-50 transition-all duration-500 top-0 left-0 right-0`}
    >
      {/* Top Countdown Banner (shrinks out smoothly on scroll) */}
      <div 
        className={cn(
          "transition-all duration-500 ease-in-out overflow-hidden w-full",
          isScrolled ? "max-h-0 opacity-0 transform -translate-y-full" : "max-h-[120px] opacity-100 transform translate-y-0"
        )}
      >
        <TopBanner isWaitlist={isWaitlist} isProgrammer={isProgrammer} />
      </div>

      <nav 
        className={`mx-auto transition-all duration-500 ${
          isScrolled 
            ? "mt-4 bg-black/90 md:bg-black/80 backdrop-blur-xl border border-white/10 rounded-full max-w-[1000px] px-2 shadow-2xl" 
            : isMobileMenuOpen
              ? "mt-0 bg-black/95 md:bg-black/90 backdrop-blur-2xl border border-white/10 rounded-2xl max-w-[1200px]"
              : "mt-4 bg-black/80 backdrop-blur-md border border-white/5 rounded-full max-w-[1200px] px-2 shadow-lg"
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
              src={settings?.logoImage || (isProgrammer ? "/images/logo laranja metodo3h.png" : "/images/metodo3h logo.png")}
              alt={settings?.logoText || "Método 3h"}
              className={`transition-all duration-500 ${isScrolled ? "h-7 md:h-10" : "h-8 md:h-12"} object-contain`}
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
            <ShinyButton
              theme={isProgrammer ? "orange" : "blue"}
              variant="solid"
              href="/#inscricao"
              className="px-5 h-9 text-xs font-bold"
            >
              Garantir vaga
            </ShinyButton>
          </div>

        </div>

      </nav>
    </header>
  );
}
