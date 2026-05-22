"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, BookOpen, Clock, CheckCircle2, ChevronRight, 
  MessageSquare, FileText, Sparkles, ChevronDown, ListCollapse 
} from "lucide-react";
import { toast } from "sonner";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
}

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data.courses);
          if (data.courses.length > 0) {
            setActiveCourse(data.courses[0]);
            
            // Set first lesson of first module as active
            const firstCourse = data.courses[0];
            if (firstCourse.modules.length > 0 && firstCourse.modules[0].lessons.length > 0) {
              setActiveLesson(firstCourse.modules[0].lessons[0]);
            }

            // Expand all modules by default
            const initialExpanded: Record<string, boolean> = {};
            firstCourse.modules.forEach((mod: Module) => {
              initialExpanded[mod.id] = true;
            });
            setExpandedModules(initialExpanded);
          }
        }
      } catch (err) {
        console.error("Courses portal fetch error:", err);
      }
    };

    fetchCourses();
  }, []);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const isCompleted = prev.includes(lessonId);
      if (isCompleted) {
        toast.info("Marcada como não assistida.");
        return prev.filter((id) => id !== lessonId);
      } else {
        toast.success("Parabéns! Aula concluída com sucesso!");
        return [...prev, lessonId];
      }
    });
  };

  // Calculate overall course progress
  const totalLessonsCount = activeCourse
    ? activeCourse.modules.reduce((acc, mod) => acc + mod.lessons.length, 0)
    : 0;
  const completedCount = completedLessons.length;
  const progressPercent = totalLessonsCount > 0 ? Math.round((completedCount / totalLessonsCount) * 100) : 0;

  return (
    <div className="space-y-8 animate-char-in">
      {/* Visual syllabus progress HUD bar */}
      {activeCourse && (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
          <div className="space-y-1">
            <span className="text-[10px] text-[#3B82F6] font-mono tracking-widest block uppercase">CURSO ATIVO</span>
            <h3 className="text-xl text-white font-medium">{activeCourse.title}</h3>
          </div>
          
          <div className="w-full lg:w-80 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>Seu Progresso de Estudos</span>
              <span className="text-white font-medium">{progressPercent}% Concluído</span>
            </div>
            <div className="h-2 bg-white/5 border border-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-mono">
              {completedCount} de {totalLessonsCount} aulas assistidas
            </p>
          </div>
        </div>
      )}

      {/* Portal workspace grid */}
      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Cinema video viewport & interactive tabs (Left column) */}
        <div className="lg:col-span-2 space-y-6">
          {activeLesson ? (
            <div className="space-y-6">
              {/* Cinema player screen container */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <video
                  key={activeLesson.id}
                  src={activeLesson.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title & lesson mark complete toggle */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-white/5">
                <div className="space-y-1">
                  <h2 className="text-2xl font-display font-medium text-white tracking-tight leading-snug">
                    {activeLesson.title}
                  </h2>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {activeLesson.duration}
                    </span>
                    <span>·</span>
                    <span className="text-[#3B82F6]">Site Dino VOD</span>
                  </div>
                </div>

                <Button
                  onClick={() => toggleLessonCompleted(activeLesson.id)}
                  className={`rounded-xl text-xs font-mono h-11 tracking-tight cursor-pointer transition-all duration-300 ${
                    completedLessons.includes(activeLesson.id)
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                      : "bg-white text-black hover:bg-white/90"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {completedLessons.includes(activeLesson.id) ? "AULA CONCLUÍDA ✓" : "MARCAR COMO CONCLUÍDA"}
                </Button>
              </div>

              {/* Lesson details Tabs */}
              <Tabs defaultValue="description" className="w-full bg-white/[0.01] border border-white/5 rounded-2xl p-6">
                <TabsList className="bg-black border border-white/10 p-1 rounded-xl w-fit">
                  <TabsTrigger value="description" className="text-xs font-mono cursor-pointer data-[state=active]:bg-white/[0.05] data-[state=active]:text-[#3B82F6]">
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    Descrição da Aula
                  </TabsTrigger>
                  <TabsTrigger value="forum" className="text-xs font-mono cursor-pointer data-[state=active]:bg-white/[0.05] data-[state=active]:text-[#3B82F6]">
                    <MessageSquare className="w-3.5 h-3.5 mr-2" />
                    Fórum / Dúvidas
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="mt-6 space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Nesta aula abordamos detalhadamente a execução passo a passo do método Site Dino. Siga as instruções do vídeo para configurar as dependências gratuitas e preparar a estrutura inicial em menos de 10 minutos.
                  </p>
                  <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl space-y-2 max-w-md">
                    <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider block">Arquivos de Apoio</span>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        toast.success("Download do checklist de setup iniciado!");
                      }}
                      className="flex items-center justify-between text-xs text-[#3B82F6] hover:text-[#3B82F6]/80 font-mono transition-colors"
                    >
                      📄 Checklist de Configuração Dino.pdf
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </TabsContent>

                <TabsContent value="forum" className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[10px] text-[#3B82F6] font-mono shrink-0">
                        DM
                      </div>
                      <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl flex-1 space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-white font-medium">Daniel Marques (Instrutor)</span>
                          <span className="text-muted-foreground">Ontem</span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Se você tiver qualquer problema na configuração do domínio personalizado, verifique a propagação dos registros CNAME. Costuma levar até 2 horas. Qualquer dúvida poste aqui abaixo!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Write question block */}
                  <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                    <input 
                      placeholder="Deixe sua dúvida sobre esta aula..."
                      className="h-10 bg-black border border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs placeholder:text-muted-foreground/60 px-4 flex-1 outline-none"
                    />
                    <Button
                      onClick={() => toast.success("Sua dúvida foi enviada! O professor responderá em breve.")}
                      className="bg-foreground hover:bg-foreground/90 text-background h-10 px-4 rounded-xl text-xs font-mono cursor-pointer"
                    >
                      Enviar Dúvida
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          ) : (
            <div className="text-center py-20 bg-white/[0.01] border border-white/5 rounded-2xl text-sm text-muted-foreground font-mono">
              Selecione uma aula no menu lateral para começar a assistir.
            </div>
          )}
        </div>

        {/* Syllabus video curriculum navigation tree (Right column) */}
        <div className="lg:col-span-1 space-y-6 bg-white/[0.01] border border-white/5 p-6 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pb-4 border-b border-white/5">
            <ListCollapse className="w-4 h-4" />
            <span>MÓDULOS E AULAS</span>
          </div>

          {activeCourse && (
            <div className="space-y-4 mt-4">
              {activeCourse.modules.map((mod, modIndex) => {
                const isExpanded = !!expandedModules[mod.id];
                return (
                  <div key={mod.id} className="space-y-2">
                    {/* Collapsible Module header trigger */}
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center justify-between text-left p-3 hover:bg-white/[0.02] border border-transparent hover:border-white/5 rounded-xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="space-y-0.5">
                        <span className="text-[9px] text-[#3B82F6] font-mono uppercase tracking-wider block">
                          MÓDULO 0{modIndex + 1}
                        </span>
                        <span className="text-xs text-white font-medium group-hover:text-[#3B82F6] transition-colors">
                          {mod.title.split(": ").slice(1).join("") || mod.title}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`} />
                    </button>

                    {/* Lesson lists in module */}
                    {isExpanded && (
                      <div className="space-y-1 pl-2 border-l border-white/10 animate-char-in">
                        {mod.lessons.map((lesson) => {
                          const isActive = activeLesson?.id === lesson.id;
                          const isCompleted = completedLessons.includes(lesson.id);
                          return (
                            <button
                              key={lesson.id}
                              onClick={() => setActiveLesson(lesson)}
                              className={`w-full flex items-center justify-between p-2.5 rounded-lg text-left text-xs transition-all duration-300 cursor-pointer ${
                                isActive
                                  ? "bg-white/[0.05] text-[#3B82F6] font-medium"
                                  : "text-muted-foreground hover:text-white hover:bg-white/[0.01]"
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate pr-2">
                                <Play className={`w-3.5 h-3.5 ${
                                  isActive ? "text-[#3B82F6]" : "text-muted-foreground/60"
                                }`} />
                                <span className="truncate">{lesson.title}</span>
                              </div>
                              
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-[10px] font-mono text-muted-foreground/60">{lesson.duration}</span>
                                {isCompleted && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
