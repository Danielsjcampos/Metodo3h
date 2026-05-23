import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { readDb } from "@/lib/db";
import { Shield, Users, BookOpen, Megaphone, LogOut, LayoutDashboard, ArrowLeft, Settings } from "lucide-react";
import { LogoutButton } from "./logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;

  if (!sessionToken) {
    redirect("/login");
  }

  const db = await readDb();
  const user = db.users.find((u) => u.id === sessionToken);

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row noise-overlay">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black flex flex-col z-20">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#3B82F6]" />
            <span className="font-display text-lg tracking-tight font-medium">Método 3h</span>
          </Link>
          <Link href="/" className="text-muted-foreground hover:text-white transition-colors md:hidden">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Profile Card Summary */}
        <div className="p-6 border-b border-white/10 bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-xs text-[#3B82F6] font-mono">
              DM
            </div>
            <div className="truncate">
              <p className="text-xs text-white font-medium truncate">{user.name}</p>
              <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest block mt-0.5">Admin</span>
            </div>
          </div>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 p-4 space-y-1">
          {[
            { label: "Leads da Espera", path: "/admin", icon: Users },
            { label: "Grade de Cursos", path: "/admin/courses", icon: BookOpen },
            { label: "Notícias & Mural", path: "/admin/news", icon: Megaphone },
            { label: "Configurações", path: "/admin/settings", icon: Settings },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                href={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-300 group"
              >
                <Icon className="w-4 h-4 group-hover:text-[#3B82F6] transition-colors" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs text-muted-foreground hover:text-white transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Landing Page
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* HUD Toolbar Header */}
        <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-black/40 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
            <span>PAINEL ADMINISTRATIVO</span>
            <span>·</span>
            <span className="text-white font-medium">LIVE MONITORING</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <span className="text-muted-foreground">Status do Servidor: Conectado</span>
          </div>
        </header>

        {/* Content body */}
        <div className="flex-1 p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
