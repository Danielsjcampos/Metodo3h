"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Plus, PlayCircle, Clock, Video, ListCollapse, FolderPlus } from "lucide-react";
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

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  
  // Module Form States
  const [moduleTitle, setModuleTitle] = useState("");
  const [isAddingModule, setIsAddingModule] = useState(false);

  // Lesson Form States
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("");
  const [lessonVideoUrl, setLessonVideoUrl] = useState("https://www.w3schools.com/html/mov_bbb.mp4");
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  const fetchCourses = async () => {
    try {
      const res = await fetch("/api/courses");
      if (res.ok) {
        const data = await res.json();
        setCourses(data.courses);
        if (data.courses.length > 0) {
          setActiveCourse(data.courses[0]);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse || !moduleTitle) return;

    setIsAddingModule(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_module",
          courseId: activeCourse.id,
          moduleTitle,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Módulo adicionado com sucesso!");
        setModuleTitle("");
        setActiveCourse(data.course);
        // Refresh local courses list
        setCourses((prev) => prev.map((c) => (c.id === data.course.id ? data.course : c)));
      } else {
        toast.error(data.error || "Erro ao adicionar módulo.");
      }
    } catch (err) {
      toast.error("Falha ao comunicar com o servidor.");
    } finally {
      setIsAddingModule(false);
    }
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeCourse || !activeModuleId || !lessonTitle || !lessonDuration || !lessonVideoUrl) {
      toast.error("Preencha todos os campos da aula.");
      return;
    }

    setIsAddingLesson(true);
    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add_lesson",
          courseId: activeCourse.id,
          moduleId: activeModuleId,
          lessonTitle,
          lessonDuration,
          lessonVideoUrl,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Aula adicionada com sucesso!");
        setLessonTitle("");
        setLessonDuration("");
        setActiveModuleId(null);
        setActiveCourse(data.course);
        setCourses((prev) => prev.map((c) => (c.id === data.course.id ? data.course : c)));
      } else {
        toast.error(data.error || "Erro ao adicionar aula.");
      }
    } catch (err) {
      toast.error("Falha ao comunicar com o servidor.");
    } finally {
      setIsAddingLesson(false);
    }
  };

  return (
    <div className="space-y-10 animate-char-in">
      {/* Header */}
      <div className="pb-6 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight text-white leading-none">
            Grade Curricular de Cursos
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Adicione módulos de ensino, registre novas vídeo aulas e controle o conteúdo do portal do aluno.
          </p>
        </div>
      </div>

      {!activeCourse ? (
        <div className="text-center py-12 bg-white/[0.01] border border-white/5 rounded-2xl text-sm text-muted-foreground font-mono">
          Nenhum curso cadastrado no banco de dados.
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Syllabus Curriculum Overview List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <ListCollapse className="w-4 h-4" />
              <span>GRADE CURRICULAR E AULAS ATUAIS</span>
            </div>

            <div className="space-y-4">
              {activeCourse.modules.map((mod, index) => (
                <div
                  key={mod.id}
                  className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden"
                >
                  {/* Module header */}
                  <div className="p-5 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider block">
                        MÓDULO 0{index + 1}
                      </span>
                      <h3 className="text-base text-white font-medium mt-0.5">{mod.title}</h3>
                    </div>

                    <Button
                      onClick={() => setActiveModuleId(mod.id)}
                      className="bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#3B82F6] border border-[#3B82F6]/20 rounded-xl text-xs font-mono h-8 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" />
                      Add Aula
                    </Button>
                  </div>

                  {/* Lessons in module */}
                  <div className="p-4 divide-y divide-white/5">
                    {mod.lessons.length === 0 ? (
                      <p className="text-xs text-muted-foreground py-4 px-2 font-mono">
                        Nenhuma aula cadastrada neste módulo.
                      </p>
                    ) : (
                      mod.lessons.map((lesson) => (
                        <div key={lesson.id} className="py-3 px-2 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-3">
                            <PlayCircle className="w-4 h-4 text-muted-foreground" />
                            <span className="text-white">{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {lesson.duration}
                            </span>
                            <span className="text-white/40">·</span>
                            <span className="flex items-center gap-1">
                              <Video className="w-3.5 h-3.5" />
                              VOD
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor Workspaces sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* 1. Add module */}
            <Card className="bg-white/[0.01] border-white/10 rounded-2xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg font-display text-white">Criar Novo Módulo</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Insira o título para agrupar as aulas subsequentes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddModule} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-muted-foreground font-mono block">Nome do Módulo *</label>
                    <Input
                      placeholder="Ex: Módulo 4: Integrações Avançadas"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                      className="bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isAddingModule}
                    className="w-full bg-white hover:bg-white/90 text-black h-10 text-xs rounded-xl font-mono tracking-tight cursor-pointer flex items-center justify-center"
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    {isAddingModule ? "Adicionando..." : "CRIAR MÓDULO"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* 2. Add Lesson inside module */}
            {activeModuleId && (
              <Card className="bg-white/[0.01] border-white/10 rounded-2xl border-l-[#3B82F6] border-l-2 animate-char-in">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-lg font-display text-white">Criar Nova Aula</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Adicione uma vídeo aula ao módulo selecionado.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddLesson} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-mono block">Título da Aula *</label>
                      <Input
                        placeholder="Ex: 4.1 Conectando ao Banco Neon"
                        value={lessonTitle}
                        onChange={(e) => setLessonTitle(e.target.value)}
                        className="bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-mono block">Duração (Min:Seg) *</label>
                      <Input
                        placeholder="Ex: 14:35"
                        value={lessonDuration}
                        onChange={(e) => setLessonDuration(e.target.value)}
                        className="bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs text-muted-foreground font-mono block">URL do Vídeo (MP4/Vimeo) *</label>
                      <Input
                        placeholder="URL de Streaming de Vídeo"
                        value={lessonVideoUrl}
                        onChange={(e) => setLessonVideoUrl(e.target.value)}
                        className="bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs"
                        required
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        type="button"
                        onClick={() => setActiveModuleId(null)}
                        className="flex-1 bg-transparent hover:bg-white/5 border border-white/10 text-white h-10 text-xs rounded-xl font-mono cursor-pointer"
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="submit"
                        disabled={isAddingLesson}
                        className="flex-1 bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-black h-10 text-xs rounded-xl font-mono cursor-pointer disabled:opacity-50"
                      >
                        {isAddingLesson ? "Salvando..." : "SALVAR AULA"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
