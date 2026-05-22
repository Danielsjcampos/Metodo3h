"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Megaphone, AlertCircle, Calendar, PlusCircle, LayoutGrid, AlertOctagon } from "lucide-react";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: string;
  important: boolean;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Geral");
  const [important, setImportant] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const data = await res.json();
        setNews(data.news);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Preencha o título e o conteúdo.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content, category, important }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Comunicado publicado com sucesso!");
        setTitle("");
        setContent("");
        setImportant(false);
        // Refresh local list
        setNews((prev) => [data.newsItem, ...prev]);
      } else {
        toast.error(data.error || "Erro ao publicar comunicado.");
      }
    } catch (err) {
      toast.error("Falha ao comunicar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-10 animate-char-in">
      {/* Header */}
      <div className="pb-6 border-b border-white/5">
        <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight text-white leading-none">
          Mural de Notícias & Comunicados
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Publique anúncios, atualizações de aulas e dicas importantes diretamente para o portal de alunos.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* News Publisher Form */}
        <Card className="lg:col-span-1 bg-white/[0.01] border-white/10 rounded-2xl relative overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-lg font-display text-white">Criar Novo Comunicado</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Preencha os campos abaixo para divulgar um aviso no painel de alunos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePublish} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono block">Título do Aviso *</label>
                <Input
                  placeholder="Ex: 🔥 Nova Mentoria ao Vivo agendada!"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono block">Categoria *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 bg-black border border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs outline-none"
                >
                  <option value="Geral">Geral</option>
                  <option value="Atualizações">Atualizações</option>
                  <option value="Dicas">Dicas</option>
                  <option value="Avisos Urgentes">Avisos Urgentes</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono block">Mensagem / Conteúdo *</label>
                <Textarea
                  placeholder="Escreva a mensagem detalhada para seus alunos..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[140px] bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/[0.01] border border-white/5 rounded-xl">
                <div className="space-y-0.5">
                  <span className="text-xs text-white font-medium block">Marcar como Importante</span>
                  <span className="text-[10px] text-muted-foreground font-mono block">Destacar no mural de avisos</span>
                </div>
                <Switch
                  checked={important}
                  onCheckedChange={setImportant}
                  className="data-[state=checked]:bg-[#3B82F6]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-white/90 text-black h-11 text-xs rounded-xl font-mono tracking-tight mt-4 cursor-pointer flex items-center justify-center disabled:opacity-50"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                {isSubmitting ? "Publicando..." : "PUBLICAR COMUNICADO"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Existing Announcements Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-4">
            <LayoutGrid className="w-4 h-4" />
            <span>ÚLTIMAS PUBLICAÇÕES NO PORTAL</span>
          </div>

          {news.length === 0 ? (
            <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl text-sm text-muted-foreground font-mono">
              Nenhuma notícia publicada ainda.
            </div>
          ) : (
            news.map((item) => (
              <div
                key={item.id}
                className={`bg-white/[0.01] border p-6 rounded-2xl space-y-4 relative transition-colors ${
                  item.important 
                    ? "border-red-500/30 hover:border-red-500/40" 
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                {/* Ribbon Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      item.important 
                        ? "bg-red-500/10 text-red-400 border border-red-500/20" 
                        : "bg-white/5 text-muted-foreground border border-white/5"
                    }`}>
                      {item.category}
                    </span>
                    {item.important && (
                      <span className="inline-flex items-center text-[10px] text-red-400 font-mono gap-1">
                        <AlertOctagon className="w-3 h-3" />
                        IMPORTANTE
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.date}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-display text-white font-medium">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {item.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
