import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, writeDb, HighlightItem } from "@/lib/db";

// Helper to authenticate admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return false;

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);
  return !!user && user.role === "admin";
}

// GET /api/highlights (Available to logged in users)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    
    if (!sessionToken) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 401 });
    }

    const db = await readDb();
    return NextResponse.json({ highlights: db.highlights });
  } catch (error) {
    console.error("Fetch highlights error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar destaques." },
      { status: 500 }
    );
  }
}

// POST /api/highlights (Admin only - publish new highlight)
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const { title, description, link, badge, category } = await req.json();

    if (!title || !description || !link || !badge || !category) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const newHighlight: HighlightItem = {
      id: "h_" + Math.random().toString(36).substr(2, 9),
      title,
      description,
      link,
      badge,
      category,
    };

    db.highlights.push(newHighlight);
    await writeDb(db);

    return NextResponse.json({ success: true, highlightItem: newHighlight }, { status: 201 });
  } catch (error) {
    console.error("Create highlight error:", error);
    return NextResponse.json(
      { error: "Erro ao criar destaque." },
      { status: 500 }
    );
  }
}
