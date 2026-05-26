"use client";

import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Curso: [
    { name: "O Problema", href: "/#problema" },
    { name: "O Método", href: "/#metodo" },
    { name: "Módulos", href: "/#modulos" },
    { name: "Ferramentas", href: "/#ferramentas" },
  ],
  Instrutor: [
    { name: "Quem é Daniel", href: "/#instrutor" },
    { name: "Depoimentos", href: "#" },
    { name: "Portfólio", href: "#" },
  ],
  Suporte: [
    { name: "WhatsApp", href: "#" },
    { name: "E-mail", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  Legal: [
    { name: "Privacidade", href: "/privacidade" },
    { name: "Termos", href: "/termos" },
    { name: "Reembolso", href: "/reembolso" },
  ],
};

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
  { name: "LinkedIn", href: "#" },
];

export function FooterSection({ settings, isProgrammer = false }: { settings?: any; isProgrammer?: boolean }) {
  const socialInstagram = settings?.socialInstagram || "https://instagram.com/danielmarques.dino";
  const socialYoutube = settings?.socialYoutube || "https://youtube.com/c/danielmarques";

  const socialLinks = [
    { name: "Instagram", href: socialInstagram },
    { name: "YouTube", href: socialYoutube },
  ];

  const whatsappNumber = settings?.whatsappNumber || "5512999999999";
  const whatsappMessage = settings?.whatsappMessage || "Olá! Gostaria de saber mais sobre o Método 3h.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const dynamicFooterLinks = {
    ...footerLinks,
    Suporte: [
      { name: "WhatsApp", href: waLink },
      { name: "E-mail", href: "mailto:suporte@metodo3horas.com.br" },
      { name: "FAQ", href: "/#faq" },
    ],
  };

  return (
    <footer className="relative bg-black border-t border-white/10">
      {/* Footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="pt-16 pb-8 lg:pt-24 lg:pb-12">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href={isProgrammer ? "/programador" : "/"} className="inline-flex items-center gap-2 mb-6">
                <img 
                  src={settings?.logoImage || (isProgrammer ? "/images/logo laranja metodo3h.png" : "/images/metodo3h logo.png")} 
                  alt={settings?.logoText || "Método 3h"} 
                  className="h-8 object-contain" 
                />
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                {isProgrammer 
                  ? "Aprenda a construir e monetizar aplicações web profissionais com IA em tempo recorde. Com Daniel Marques, 30 anos de mercado."
                  : "Aprenda a criar sites profissionais com IA em apenas 3 horas. Com Daniel Marques, 30 anos de mercado."
                }
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/40 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(dynamicFooterLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium text-white mb-6">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-sm text-white/40 hover:text-white transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/30">
            &copy; 2026 Método 3h. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isProgrammer ? "bg-orange-500 animate-pulse" : "bg-[#3B82F6]"}`} />
              {settings?.geoCity || "São José dos Campos"}, {settings?.geoState || "SP"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
