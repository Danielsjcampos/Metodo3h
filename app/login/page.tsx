"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Sparkles, KeyRound, Mail, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Algo deu errado. Verifique seus dados.");
      } else {
        // Redirect depending on user role
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/portal/dashboard");
        }
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickLogin = async (quickEmail: string, quickPassword: string) => {
    setEmail(quickEmail);
    setPassword(quickPassword);
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: quickEmail, password: quickPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Algo deu errado. Verifique seus dados.");
      } else {
        if (data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/portal/dashboard");
        }
      }
    } catch (err) {
      setError("Erro de conexão. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden noise-overlay">
      {/* Dynamic Gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3B82F6] rounded-full blur-[160px] opacity-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-[#60A5FA] rounded-full blur-[160px] opacity-15 pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.03] select-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-white"
            style={{ top: `${8.33 * (i + 1)}%`, left: 0, right: 0 }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-white"
            style={{ left: `${8.33 * (i + 1)}%`, top: 0, bottom: 0 }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md animate-char-in">
        {/* Brand/Logo Header */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-14 h-14 bg-foreground/[0.03] border border-white/10 rounded-full flex items-center justify-center mb-4 hover:border-white/20 transition-all duration-300">
            <Shield className="w-6 h-6 text-[#3B82F6]" />
          </div>
          <h1 className="text-3xl font-display text-white tracking-tight">
            SITE <span className="text-[#3B82F6]">DINO</span>
          </h1>
          <p className="text-sm text-muted-foreground font-mono mt-1">Portal de Acesso Interno</p>
        </div>

        {/* Login Card */}
        <Card className="bg-foreground/[0.01] border-white/10 backdrop-blur-2xl rounded-2xl relative overflow-hidden group">
          {/* Subtle border shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
          
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl font-display text-white tracking-tight">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Insira seus dados para acessar sua conta de administrador ou aluno.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-lg animate-pulse">
                  ⚠️ {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono block">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="exemplo@sitedino.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 pl-11 bg-black/40 border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white placeholder:text-muted-foreground/60 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-muted-foreground font-mono block">Senha</label>
                <div className="relative">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pl-11 bg-black/40 border-white/10 hover:border-white/20 focus:border-[#3B82F6] transition-colors rounded-xl text-white placeholder:text-muted-foreground/60 text-sm"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white hover:bg-white/90 text-black h-12 text-sm rounded-xl font-medium tracking-tight mt-6 cursor-pointer flex items-center justify-center transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Verificando..."
                ) : (
                  <>
                    Acessar o Painel
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Acesso Rápido (Dev)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickLogin("aluno@sitedino.com", "aluno123")}
                  disabled={isSubmitting}
                  className="flex flex-col items-start text-left bg-white/[0.01] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 p-3 rounded-xl transition-all duration-300 group/btn cursor-pointer disabled:opacity-50"
                >
                  <span className="text-white block font-sans font-semibold text-xs mb-0.5 group-hover/btn:text-purple-300 transition-colors">
                    Entrar como Aluno
                  </span>
                  <span className="text-[9px] text-muted-foreground font-mono block truncate w-full">
                    aluno@sitedino.com
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin("admin@sitedino.com", "admin123")}
                  disabled={isSubmitting}
                  className="flex flex-col items-start text-left bg-white/[0.01] hover:bg-white/[0.05] border border-white/5 hover:border-[#3B82F6]/20 p-3 rounded-xl transition-all duration-300 group/btn cursor-pointer disabled:opacity-50"
                >
                  <span className="text-[#3B82F6] block font-sans font-semibold text-xs mb-0.5 group-hover/btn:text-pink-300 transition-colors">
                    Entrar como Admin
                  </span>
                  <span className="text-[9px] text-muted-foreground font-mono block truncate w-full">
                    admin@sitedino.com
                  </span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer info link */}
        <p className="text-center text-xs text-muted-foreground/40 mt-8">
          Site Dino · Área Protegida por Criptografia SSL
        </p>
      </div>
    </main>
  );
}
