import { NextRequest, NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { identifier } = await req.json();

    if (!identifier) {
      return NextResponse.json(
        { error: "Por favor, insira seu e-mail ou WhatsApp." },
        { status: 400 }
      );
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const cleanPhone = identifier.replace(/\D/g, "");

    const db = await readDb();
    
    // Find lead by email or whatsapp
    const lead = db.leads.find((l) => {
      const matchEmail = l.email.toLowerCase() === cleanIdentifier;
      const matchPhone = l.whatsapp.replace(/\D/g, "") === cleanPhone && cleanPhone.length >= 8;
      return matchEmail || matchPhone;
    });

    if (!lead) {
      return NextResponse.json(
        { error: "Cadastro não encontrado. Por favor, registre-se na página principal." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: {
        name: lead.name,
        email: lead.email,
        whatsapp: lead.whatsapp,
      }
    });
  } catch (error) {
    console.error("Lead auth error:", error);
    return NextResponse.json(
      { error: "Erro interno ao validar seu acesso." },
      { status: 500 }
    );
  }
}
