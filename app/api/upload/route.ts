import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb } from "@/lib/db";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Helper to authenticate admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return false;

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);
  return !!user && user.role === "admin";
}

// POST /api/upload - Receives file uploads from admin page and stores locally in /public/uploads
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Clean and validate file name/extension
    const name = (formData.get("name") as string) || "upload.png";
    const extension = path.extname(name) || ".png";
    const cleanExtension = extension.toLowerCase();

    const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".ico"];
    if (!allowedExtensions.includes(cleanExtension)) {
      return NextResponse.json(
        { error: "Formato de arquivo não suportado. Use PNG, JPG, JPEG, WEBP, SVG ou ICO." },
        { status: 400 }
      );
    }

    // Generate unique name
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 11)}${cleanExtension}`;
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    // Ensure dir exists
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, uniqueFileName);

    // Save file
    await writeFile(filePath, buffer);

    const relativeUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({ success: true, url: relativeUrl });
  } catch (error: any) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { error: error.message || "Falha interna no upload do arquivo." },
      { status: 500 }
    );
  }
}
