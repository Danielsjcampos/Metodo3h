import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, writeDb, Course, Module, Lesson } from "@/lib/db";

// Helper to authenticate admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return false;

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);
  return !!user && user.role === "admin";
}

// GET /api/courses (Available to logged in users)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
    }

    const db = await readDb();
    return NextResponse.json({ courses: db.courses });
  } catch (error) {
    console.error("Fetch courses error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar cursos." },
      { status: 500 }
    );
  }
}

// POST /api/courses (Admin only - save entire course/module list or add a course)
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const { action, courseId, moduleTitle, lessonTitle, lessonDuration, lessonVideoUrl, moduleId } = await req.json();
    const db = await readDb();

    if (action === "add_module") {
      if (!courseId || !moduleTitle) {
        return NextResponse.json({ error: "Campos inválidos." }, { status: 400 });
      }

      const courseIndex = db.courses.findIndex((c) => c.id === courseId);
      if (courseIndex === -1) {
        return NextResponse.json({ error: "Curso não encontrado." }, { status: 404 });
      }

      const newModule: Module = {
        id: "m_" + Math.random().toString(36).substr(2, 9),
        title: moduleTitle,
        lessons: [],
      };

      db.courses[courseIndex].modules.push(newModule);
      await writeDb(db);
      return NextResponse.json({ success: true, course: db.courses[courseIndex] });
    }

    if (action === "add_lesson") {
      if (!courseId || !moduleId || !lessonTitle || !lessonDuration || !lessonVideoUrl) {
        return NextResponse.json({ error: "Campos inválidos." }, { status: 400 });
      }

      const courseIndex = db.courses.findIndex((c) => c.id === courseId);
      if (courseIndex === -1) {
        return NextResponse.json({ error: "Curso não encontrado." }, { status: 404 });
      }

      const moduleIndex = db.courses[courseIndex].modules.findIndex((m) => m.id === moduleId);
      if (moduleIndex === -1) {
        return NextResponse.json({ error: "Módulo não encontrado." }, { status: 404 });
      }

      const newLesson: Lesson = {
        id: "le_" + Math.random().toString(36).substr(2, 9),
        title: lessonTitle,
        duration: lessonDuration,
        videoUrl: lessonVideoUrl,
      };

      db.courses[courseIndex].modules[moduleIndex].lessons.push(newLesson);
      await writeDb(db);
      return NextResponse.json({ success: true, course: db.courses[courseIndex] });
    }

    return NextResponse.json({ error: "Ação desconhecida." }, { status: 400 });
  } catch (error) {
    console.error("Courses CRUD error:", error);
    return NextResponse.json(
      { error: "Erro ao modificar curso." },
      { status: 500 }
    );
  }
}
