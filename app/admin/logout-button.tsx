"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth", {
        method: "DELETE",
      });

      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all duration-300 cursor-pointer"
    >
      <LogOut className="w-4 h-4" />
      Terminar Sessão
    </button>
  );
}
