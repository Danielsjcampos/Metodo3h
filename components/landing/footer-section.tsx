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

export function FooterSection({ settings }: { settings?: any }) {
  const socialInstagram = settings?.socialInstagram || "https://instagram.com/danielmarques.dino";
  const socialYoutube = settings?.socialYoutube || "https://youtube.com/c/danielmarques";

  const socialLinks = [
    { name: "Instagram", href: socialInstagram },
    { name: "YouTube", href: socialYoutube },
  ];

  const whatsappNumber = settings?.whatsappNumber || "5512999999999";
  const whatsappMessage = settings?.whatsappMessage || "Olá! Gostaria de saber mais sobre o método Site Dino.";
  const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const dynamicFooterLinks = {
    ...footerLinks,
    Suporte: [
      { name: "WhatsApp", href: waLink },
      { name: "E-mail", href: "mailto:suporte@sitedino.com" },
      { name: "FAQ", href: "/#faq" },
    ],
  };

  return (
    <footer className="relative bg-black">
      {/* Panoramic banner image */}
      <div className="relative w-full h-[340px] md:h-[420px] overflow-hidden">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2810%29-UnDKstODkIENp5xqTYUEpt0Sm8tNOw.png"
          alt="Bioluminescent landscape"
          className="w-full h-full object-cover object-center"
          style={{ filter: "hue-rotate(200deg) saturate(1.5) brightness(0.85)" }}
        />
        {/* Blue tint overlay */}
        <div className="absolute inset-0 bg-[#3B82F6]/10 mix-blend-screen pointer-events-none" />
        {/* Gradient fade to black at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
        {/* Subtle dark vignette on sides */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
      </div>

      {/* Footer content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="/" className="inline-flex items-center gap-2 mb-6">
                <span className="text-2xl font-display text-white">{settings?.logoText || "SITECOMIA"}</span>
              </a>

              <p className="text-white/50 leading-relaxed mb-8 max-w-xs text-sm">
                Aprenda a criar sites profissionais com IA em apenas 3 horas. Com Daniel Marques, 30 anos de mercado.
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
            &copy; 2025 {settings?.logoText || "SITECOMIA"}. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4 text-sm text-white/30">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              {settings?.geoCity || "São José dos Campos"}, {settings?.geoState || "SP"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
