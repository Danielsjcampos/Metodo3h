"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Megaphone, Calendar, ArrowRight, ExternalLink, 
  Download, BookOpen, Compass, Award, ShieldAlert 
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  important: boolean;
}

interface HighlightItem {
  id: string;
  title: string;
  description: string;
  link: string;
  badge: string;
  category: string;
}

export default function StudentDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [highlights, setHighlights] = useState<HighlightItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, highlightsRes] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/highlights")
        ]);

        if (newsRes.ok && highlightsRes.ok) {
          const newsData = await newsRes.json();
          const highlightsData = await highlightsRes.json();
          setNews(newsData.news);
          setHighlights(highlightsData.highlights);
        }
      } catch (err) {
        console.error("Dashboard fetching error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-12 animate-char-in">
      {/* Visual Welcome Banner Header */}
      <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-white/[0.01] p-8 lg:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group">
        {/* Decorative dynamic glows */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#3B82F6] rounded-full blur-[100px] opacity-10 pointer-events-none group-hover:opacity-15 transition-opacity duration-700" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#60A5FA] rounded-full blur-[100px] opacity-5 pointer-events-none" />

        <div className="space-y-4 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-[10px] font-mono rounded-full uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Acesso Premium Ativado
          </span>
          <h2 className="text-4xl lg:text-5xl font-display font-medium tracking-tight text-white leading-[0.95]">
            Seu site profissional
            <br />
            <span className="text-muted-foreground">começa aqui.</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Bem-vindo à sua área de membros exclusiva. Aqui você tem acesso ao curso Site Dino completo, ferramentas, scripts de IA e materiais complementares prontos para download.
          </p>
        </div>

        <Link href="/portal/courses">
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-black px-8 h-14 rounded-full font-mono text-xs tracking-tight cursor-pointer group/btn"
          >
            IR PARA AS VÍDEO AULAS
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 items-start">
        {/* Left Columns - Announcements board */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Megaphone className="w-4 h-4 text-[#3B82F6]" />
              MURAL DE COMUNICADOS
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">ORGANIZADO POR RELEVÂNCIA</span>
          </div>

          {isLoading ? (
            <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl text-xs text-muted-foreground font-mono">
              Carregando avisos de Daniel Marques...
            </div>
          ) : news.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl text-xs text-muted-foreground font-mono">
              Nenhum aviso no mural até o momento.
            </div>
          ) : (
            <div className="space-y-4">
              {news.map((item) => (
                <div
                  key={item.id}
                  className={`bg-white/[0.01] border p-6 rounded-2xl space-y-4 hover:bg-white/[0.02] transition-all duration-300 relative group/news ${
                    item.important 
                      ? "border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.02)]" 
                      : "border-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider ${
                        item.important 
                          ? "bg-red-500/10 text-red-400 border border-red-500/10" 
                          : "bg-white/5 text-muted-foreground border border-white/5"
                      }`}>
                        {item.category}
                      </span>
                      {item.important && (
                        <span className="inline-flex items-center text-[9px] text-red-400 font-mono gap-1">
                          <ShieldAlert className="w-3 h-3 animate-pulse" />
                          URGENTE
                        </span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-display text-white font-medium group-hover/news:text-[#3B82F6] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {item.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Highlights, tools & templates */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#3B82F6]" />
              MATERIAIS E DESTAQUES
            </span>
          </div>

          {isLoading ? (
            <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl text-xs text-muted-foreground font-mono">
              Carregando destaques VIP...
            </div>
          ) : highlights.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl text-xs text-muted-foreground font-mono">
              Nenhum material de destaque disponível.
            </div>
          ) : (
            <div className="space-y-4">
              {highlights.map((hl) => (
                <a
                  key={hl.id}
                  href={hl.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/[0.01] border border-white/5 rounded-2xl p-5 hover:border-white/15 hover:bg-white/[0.02] transition-all duration-300 group/hl relative overflow-hidden"
                >
                  {/* Subtle right border highlight */}
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3B82F6] to-transparent opacity-0 group-hover/hl:opacity-100 transition-opacity" />

                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] rounded uppercase">
                          {hl.badge}
                        </span>
                        <span className="text-[9px] text-muted-foreground font-mono">{hl.category}</span>
                      </div>
                      <h4 className="text-sm font-medium text-white group-hover/hl:text-[#3B82F6] transition-colors leading-tight">
                        {hl.title}
                      </h4>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {hl.description}
                      </p>
                    </div>

                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground group-hover/hl:text-white group-hover/hl:border-white/10 transition-colors shrink-0">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
