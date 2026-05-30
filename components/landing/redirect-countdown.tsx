"use client";

import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";

interface RedirectCountdownProps {
  url: string;
  delaySeconds?: number;
}

export function RedirectCountdown({ url, delaySeconds = 3 }: RedirectCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(delaySeconds);
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (!hasRedirected) {
        setHasRedirected(true);
        window.location.href = url;
      }
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, url, hasRedirected]);

  return (
    <div className="border border-white/5 bg-white/[0.02] rounded-2xl p-6 text-center space-y-4 max-w-md mx-auto relative overflow-hidden">
      {/* Top micro-progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/5">
        <div 
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000 ease-linear"
          style={{ width: `${(secondsLeft / delaySeconds) * 100}%` }}
        />
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="relative flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-emerald-400 opacity-60" />
          <span className="absolute text-sm font-bold font-mono text-emerald-400">
            {secondsLeft}
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">
            {secondsLeft > 0 
              ? "Redirecionando para o Grupo VIP..." 
              : "Abrindo o WhatsApp..."}
          </p>
          <p className="text-xs text-white/50">
            Você está sendo redirecionado de forma segura em <span className="font-mono font-bold text-emerald-400">{secondsLeft}s</span>.
          </p>
        </div>
      </div>

      {/* Graceful fallback if redirect gets blocked */}
      <div className="pt-2">
        <a 
          href={url}
          className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors hover:underline"
        >
          Se não for redirecionado, clique aqui para entrar
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
