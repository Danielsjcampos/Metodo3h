import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readDb, writeDb, Lead } from "@/lib/db";

// Helper to authenticate admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) return false;

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);
  return !!user && user.role === "admin";
}

// POST /api/leads (Public - landing page lead registration)
export async function POST(req: NextRequest) {
  try {
    const { name, email, whatsapp } = await req.json();

    if (!name || !email || !whatsapp) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const db = await readDb();
    
    // Check if lead already exists with this email
    const existingLead = db.leads.find(
      (l) => l.email.toLowerCase() === email.toLowerCase()
    );

    if (existingLead) {
      return NextResponse.json(
        { message: "Você já está na nossa lista de espera! Fique atento ao seu WhatsApp." },
        { status: 200 }
      );
    }

    const newLead: Lead = {
      id: "l_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      whatsapp: whatsapp.replace(/\D/g, ""), // clean format
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    db.leads.push(newLead);
    await writeDb(db);

    return NextResponse.json(
      { success: true, message: "Cadastro realizado com sucesso na lista de espera!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead capture error:", error);
    return NextResponse.json(
      { error: "Erro ao cadastrar na lista de espera." },
      { status: 500 }
    );
  }
}

// GET /api/leads (Admin only - retrieve and filter waitlist)
export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const status = searchParams.get("status") || "all";
    const exportFormat = searchParams.get("export");

    const db = await readDb();
    let leads = db.leads;

    // Apply filters
    if (status !== "all") {
      leads = leads.filter((l) => l.status === status);
    }

    if (search) {
      leads = leads.filter(
        (l) =>
          l.name.toLowerCase().includes(search) ||
          l.email.toLowerCase().includes(search) ||
          l.whatsapp.includes(search)
      );
    }

    // Sort by newest first
    leads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    // Export to CSV if requested
    if (exportFormat === "csv") {
      const csvHeaders = "ID,Nome,Email,WhatsApp,Status,Data de Criacao\n";
      const csvRows = leads
        .map(
          (l) =>
            `"${l.id}","${l.name.replace(/"/g, '""')}","${l.email}","${
              l.whatsapp
            }","${l.status}","${l.createdAt}"`
        )
        .join("\n");

      return new NextResponse(csvHeaders + csvRows, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": "attachment; filename=leads_lista_de_espera.csv",
        },
      });
    }

    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json(
      { error: "Erro ao carregar leads." },
      { status: 500 }
    );
  }
}

// PATCH /api/leads (Admin only - update lead status)
export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID e Status são obrigatórios." },
        { status: 400 }
      );
    }

    if (!["pending", "contacted", "converted"].includes(status)) {
      return NextResponse.json({ error: "Status inválido." }, { status: 400 });
    }

    const db = await readDb();
    const leadIndex = db.leads.findIndex((l) => l.id === id);

    if (leadIndex === -1) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    db.leads[leadIndex].status = status;
    await writeDb(db);

    return NextResponse.json({ success: true, lead: db.leads[leadIndex] });
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar lead." },
      { status: 500 }
    );
  }
}

// DELETE /api/leads (Admin only - delete lead)
export async function DELETE(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID do lead é obrigatório." }, { status: 400 });
    }

    const db = await readDb();
    const initialLength = db.leads.length;
    db.leads = db.leads.filter((l) => l.id !== id);

    if (db.leads.length === initialLength) {
      return NextResponse.json({ error: "Lead não encontrado." }, { status: 404 });
    }

    await writeDb(db);
    return NextResponse.json({ success: true, message: "Lead removido com sucesso." });
  } catch (error) {
    console.error("Delete lead error:", error);
    return NextResponse.json(
      { error: "Erro ao remover lead." },
      { status: 500 }
    );
  }
}
