import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, writeDb, NewsItem } from "@/lib/db";

// Helper to authenticate admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return false;

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);
  return !!user && user.role === "admin";
}

// GET /api/news (Available to logged in users)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
    }

    const db = await readDb();
    
    // Sort news so important ones appear first, then sorted by newest date
    const news = [...db.news].sort((a, b) => {
      if (a.important && !b.important) return -1;
      if (!a.important && b.important) return 1;
      return b.id.localeCompare(a.id); // fallback
    });

    return NextResponse.json({ news });
  } catch (error) {
    console.error("Fetch news error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar notícias." },
      { status: 500 }
    );
  }
}

// POST /api/news (Admin only - publish new announcement)
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const { title, content, category, important } = await req.json();

    if (!title || !content || !category) {
      return NextResponse.json(
        { error: "Título, conteúdo e categoria são obrigatórios." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const newAnnouncement: NewsItem = {
      id: "n_" + Math.random().toString(36).substr(2, 9),
      title,
      content,
      category,
      important: !!important,
      date: new Date().toLocaleDateString("pt-BR"),
    };

    db.news.unshift(newAnnouncement); // newest first
    await writeDb(db);

    return NextResponse.json({ success: true, newsItem: newAnnouncement }, { status: 201 });
  } catch (error) {
    console.error("Create news error:", error);
    return NextResponse.json(
      { error: "Erro ao publicar notícia." },
      { status: 500 }
    );
  }
}
