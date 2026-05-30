import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, getSettings, saveSettings, SiteSettings } from "@/lib/db";

// Helper to authenticate admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return false;

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);
  return !!user && user.role === "admin";
}

// GET /api/settings (Publicly readable to configure the frontend logo, metadata and widget)
export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar as configurações." },
      { status: 500 }
    );
  }
}

// POST /api/settings (Admin only - updates site configurations in Neon DB)
export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const body = await req.json();
    const {
      logoText,
      logoImage,
      seoTitle,
      seoDescription,
      seoFavicon,
      seoImage,
      vslVideoUrl,
      testimonialsVideoUrl,
      geoCity,
      geoState,
      socialInstagram,
      socialYoutube,
      whatsappEnabled,
      whatsappNumber,
      whatsappMessage,
      whatsappGroupUrl,
      launchPrice,
      regularPrice,
      showCoursePrice,
    } = body;

    // Validate essential parameters
    if (!logoText || !seoTitle || !seoDescription) {
      return NextResponse.json(
        { error: "O logotipo, título e descrição de SEO são campos obrigatórios." },
        { status: 400 }
      );
    }

    const settingsToSave: SiteSettings = {
      logoText,
      logoImage: logoImage || "/images/metodo3h logo.png",
      seoTitle,
      seoDescription,
      seoFavicon: seoFavicon || "/favicon.ico",
      seoImage: seoImage || "/images/preview.png",
      vslVideoUrl: vslVideoUrl !== undefined ? vslVideoUrl : "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      testimonialsVideoUrl: testimonialsVideoUrl !== undefined ? testimonialsVideoUrl : "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      geoCity: geoCity || "São José dos Campos",
      geoState: geoState || "SP",
      socialInstagram: socialInstagram || "",
      socialYoutube: socialYoutube || "",
      whatsappEnabled: !!whatsappEnabled,
      whatsappNumber: whatsappNumber || "",
      whatsappMessage: whatsappMessage || "",
      whatsappGroupUrl: whatsappGroupUrl || "",
      launchPrice: launchPrice || "97",
      regularPrice: regularPrice || "247",
      showCoursePrice: !!showCoursePrice,
    };

    await saveSettings(settingsToSave);

    return NextResponse.json({ success: true, settings: settingsToSave });
  } catch (error) {
    console.error("Save settings error:", error);
    return NextResponse.json(
      { error: "Erro ao salvar as configurações." },
      { status: 500 }
    );
  }
}
