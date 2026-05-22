"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Users, UserCheck, MessageSquare, Hourglass, 
  Trash2, Search, CheckCircle, Smartphone, Download, ExternalLink 
} from "lucide-react";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  status: "pending" | "contacted" | "converted";
  createdAt: string;
}

export default function AdminDashboardLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch leads function
  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const query = new URLSearchParams({
        search,
        status: statusFilter,
      });
      const res = await fetch(`/api/leads?${query.toString()}`);
      const data = await res.json();
      if (res.ok) {
        setLeads(data.leads);
      } else {
        toast.error("Erro ao carregar leads.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLeads();
  };

  // Change lead status
  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Lead atualizado para ${newStatus === "converted" ? "Convertido" : "Contatado"}!`);
        // Refresh local leads list
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus as any } : l))
        );
      } else {
        toast.error(data.error || "Erro ao atualizar lead.");
      }
    } catch (err) {
      toast.error("Falha ao comunicar com o servidor.");
    }
  };

  // Delete lead
  const deleteLead = async (id: string) => {
    if (!confirm("Tem certeza que deseja remover este lead da lista de espera?")) return;

    try {
      const res = await fetch(`/api/leads?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Lead removido da lista de espera.");
        setLeads((prev) => prev.filter((l) => l.id !== id));
      } else {
        toast.error(data.error || "Erro ao remover lead.");
      }
    } catch (err) {
      toast.error("Falha ao comunicar com o servidor.");
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const query = new URLSearchParams({
      search,
      status: statusFilter,
      export: "csv",
    });
    window.open(`/api/leads?${query.toString()}`, "_blank");
  };

  // Calculate Metrics
  const totalLeads = leads.length;
  const pendingCount = leads.filter((l) => l.status === "pending").length;
  const contactedCount = leads.filter((l) => l.status === "contacted").length;
  const convertedCount = leads.filter((l) => l.status === "converted").length;
  const conversionRate = totalLeads > 0 ? Math.round((convertedCount / totalLeads) * 100) : 0;

  return (
    <div className="space-y-10 animate-char-in">
      {/* HUD Header Overview */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h2 className="text-3xl lg:text-4xl font-display font-medium tracking-tight text-white leading-none">
            Waitlist Dashboard
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Gerencie contatos de interessados, marque retornos e controle a taxa de conversão oficial.
          </p>
        </div>

        <Button
          onClick={handleExportCSV}
          className="bg-white hover:bg-white/90 text-black rounded-xl text-xs font-mono h-11 tracking-tight cursor-pointer"
        >
          <Download className="w-4 h-4 mr-2" />
          EXPORTAR CSV COMPLETO
        </Button>
      </div>

      {/* Metrics Analytics Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "Total de Leads", value: totalLeads, icon: Users, color: "text-white" },
          { label: "Pendentes", value: pendingCount, icon: Hourglass, color: "text-amber-400" },
          { label: "Contatados", value: contactedCount, icon: MessageSquare, color: "text-sky-400" },
          { label: "Convertidos", value: convertedCount, icon: UserCheck, color: "text-emerald-400" },
          { label: "Taxa de Conversão", value: `${conversionRate}%`, icon: CheckCircle, color: "text-[#3B82F6]" },
        ].map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">{metric.label}</span>
                <Icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <p className="text-3xl font-display font-semibold text-white tracking-tight mt-4 leading-none">
                {metric.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Leads Controls Hub */}
      <div className="bg-white/[0.01] border border-white/5 rounded-2xl overflow-hidden p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status filtering tabs */}
          <div className="flex items-center border border-white/10 rounded-xl p-1 bg-black w-fit">
            {[
              { label: "Todos", value: "all" },
              { label: "Pendentes", value: "pending" },
              { label: "Contatados", value: "contacted" },
              { label: "Convertidos", value: "converted" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-4 py-2 text-xs font-mono rounded-lg transition-colors cursor-pointer ${
                  statusFilter === tab.value
                    ? "bg-white/[0.05] text-[#3B82F6] border border-white/5"
                    : "text-muted-foreground hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 max-w-md w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Pesquisar por nome, e-mail ou whatsapp..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 pl-9 bg-black border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white text-xs placeholder:text-muted-foreground/60"
              />
            </div>
            <Button
              type="submit"
              className="bg-foreground hover:bg-foreground/90 text-background h-10 px-4 rounded-xl text-xs font-mono cursor-pointer"
            >
              Pesquisar
            </Button>
          </form>
        </div>

        {/* Lead Table Grid */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
          <Table>
            <TableHeader className="bg-white/[0.01]">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-muted-foreground font-mono text-xs h-12">NOME</TableHead>
                <TableHead className="text-muted-foreground font-mono text-xs h-12">CONTATO</TableHead>
                <TableHead className="text-muted-foreground font-mono text-xs h-12">STATUS</TableHead>
                <TableHead className="text-muted-foreground font-mono text-xs h-12">DATA CADASTRO</TableHead>
                <TableHead className="text-muted-foreground font-mono text-xs h-12 text-right">AÇÕES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-sm text-muted-foreground font-mono">
                    Carregando leads da lista de espera...
                  </TableCell>
                </TableRow>
              ) : leads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-sm text-muted-foreground font-mono">
                    Nenhum lead encontrado com os filtros atuais.
                  </TableCell>
                </TableRow>
              ) : (
                leads.map((lead) => {
                  // Direct link for whatsapp chat
                  const cleanedPhone = lead.whatsapp.replace(/\D/g, "");
                  const waUrl = `https://web.whatsapp.com/send?phone=55${cleanedPhone}`;

                  return (
                    <TableRow key={lead.id} className="border-white/5 hover:bg-white/[0.01]">
                      {/* Name & Email column */}
                      <TableCell className="py-4">
                        <p className="text-white font-medium text-sm">{lead.name}</p>
                        <span className="text-xs text-muted-foreground block">{lead.email}</span>
                      </TableCell>

                      {/* WhatsApp Column */}
                      <TableCell className="py-4">
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-[#3B82F6] hover:text-[#3B82F6]/80 font-mono transition-colors"
                        >
                          <Smartphone className="w-3.5 h-3.5" />
                          {lead.whatsapp.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
                          <ExternalLink className="w-3 h-3 opacity-50" />
                        </a>
                      </TableCell>

                      {/* Status Column */}
                      <TableCell className="py-4">
                        <Badge
                          className={`rounded-md px-2 py-0.5 text-[10px] font-mono select-none tracking-tight ${
                            lead.status === "pending"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : lead.status === "contacted"
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          }`}
                        >
                          {lead.status === "pending"
                            ? "Pendente"
                            : lead.status === "contacted"
                            ? "Contatado"
                            : "Convertido"}
                        </Badge>
                      </TableCell>

                      {/* Created date column */}
                      <TableCell className="py-4 text-xs text-muted-foreground font-mono">
                        {new Date(lead.createdAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>

                      {/* Administrative Actions column */}
                      <TableCell className="py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.status === "pending" && (
                            <Button
                              onClick={() => updateStatus(lead.id, "contacted")}
                              size="sm"
                              className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/20 h-8 rounded-lg text-[10px] font-mono cursor-pointer"
                            >
                              Marcar Contato
                            </Button>
                          )}
                          {lead.status !== "converted" && (
                            <Button
                              onClick={() => updateStatus(lead.id, "converted")}
                              size="sm"
                              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 h-8 rounded-lg text-[10px] font-mono cursor-pointer"
                            >
                              Converter
                            </Button>
                          )}
                          <Button
                            onClick={() => deleteLead(lead.id)}
                            size="sm"
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 h-8 w-8 p-0 rounded-lg cursor-pointer flex items-center justify-center"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
