import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, hashPassword } from "@/lib/db";

// POST /api/auth (Login)
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const db = await readDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    const hashedInput = hashPassword(password);
    if (user.passwordHash !== hashedInput) {
      return NextResponse.json(
        { error: "Credenciais inválidas." },
        { status: 401 }
      );
    }

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session_token", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      sameSite: "lax",
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Auth login error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

// GET /api/auth (Check session status)
export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;

    if (!sessionToken) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const db = await readDb();
    const user = db.users.find((u) => u.id === sessionToken);

    if (!user) {
      // Remove stale cookie
      cookieStore.delete("session_token");
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Auth session fetch error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}

// DELETE /api/auth (Logout)
export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("session_token");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Auth logout error:", error);
    return NextResponse.json(
      { error: "Erro ao efetuar logout." },
      { status: 500 }
    );
  }
}
