"use client";

import React from "react";
import { motion, type AnimationProps } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps: AnimationProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  theme?: "orange" | "blue" | "green" | "default";
  variant?: "solid" | "glass";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  theme = "default",
  variant = "solid",
  href,
  target,
  rel,
  type = "button",
  disabled,
  ...props
}) => {
  // Define exact theme-based colors
  const primaryColor =
    theme === "orange"
      ? "rgb(255, 255, 255)"
      : theme === "blue"
      ? "rgb(255, 255, 255)"
      : theme === "green"
      ? "rgb(255, 255, 255)"
      : "rgb(255, 255, 255)";

  // Shimmer colors
  const shimmerColor = "rgba(255, 255, 255, 0.4)";
  const borderShimmer10 = "rgba(255, 255, 255, 0.1)";
  const borderShimmer50 = "rgba(255, 255, 255, 0.6)";

  const style = {
    "--primary-color": primaryColor,
    "--shimmer-color": shimmerColor,
    "--border-shimmer-10": borderShimmer10,
    "--border-shimmer-50": borderShimmer50,
  } as React.CSSProperties;

  // Solid vs Glass styles
  const themeClasses = 
    variant === "solid"
      ? theme === "orange"
        ? "bg-gradient-to-r from-orange-600 to-[#F97316] text-white shadow-[0_8px_24px_0_rgba(249,115,22,0.35)] hover:shadow-[0_12px_32px_0_rgba(249,115,22,0.55)] border border-orange-500/20"
        : theme === "blue"
        ? "bg-gradient-to-r from-blue-700 to-[#3B82F6] text-white shadow-[0_8px_24px_0_rgba(59,130,246,0.35)] hover:shadow-[0_12px_32px_0_rgba(59,130,246,0.55)] border border-blue-500/20"
        : theme === "green"
        ? "bg-gradient-to-r from-emerald-600 to-[#10B981] text-white shadow-[0_8px_24px_0_rgba(16,185,129,0.35)] hover:shadow-[0_12px_32px_0_rgba(16,185,129,0.55)] border border-emerald-500/20"
        : "bg-white text-black hover:bg-white/95"
      : // Glass theme
        theme === "orange"
        ? "bg-orange-500/10 text-orange-400 border border-orange-500/30 hover:bg-orange-500/20 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        : theme === "blue"
        ? "bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        : theme === "green"
        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]"
        : "bg-white/10 text-white border border-white/20 hover:bg-white/20";

  // Render a link if href is provided, otherwise render a button
  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        {...(animationProps as any)}
        {...(props as any)}
        style={style}
        className={cn(
          "relative rounded-full px-8 py-4 font-bold text-base tracking-wide uppercase transition-all duration-300 ease-in-out hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer overflow-hidden text-center",
          themeClasses,
          className
        )}
      >
        <span
          className="relative z-20 flex items-center justify-center gap-2"
          style={{
            maskImage:
              variant === "glass"
                ? "linear-gradient(-75deg, var(--primary-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary-color) calc(var(--x) + 100%))"
                : "linear-gradient(-75deg, var(--shimmer-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--shimmer-color) calc(var(--x) + 100%))",
            WebkitMaskImage:
              variant === "glass"
                ? "linear-gradient(-75deg, var(--primary-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary-color) calc(var(--x) + 100%))"
                : "linear-gradient(-75deg, var(--shimmer-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--shimmer-color) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>

        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            maskComposite: "exclude",
            WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            WebkitMaskComposite: "xor",
            backgroundImage: "linear-gradient(-75deg, var(--border-shimmer-10) calc(var(--x) + 20%), var(--border-shimmer-50) calc(var(--x) + 25%), var(--border-shimmer-10) calc(var(--x) + 100%))",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        ></span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      {...(animationProps as any)}
      {...(props as any)}
      style={style}
      className={cn(
        "relative rounded-full px-8 py-4 font-bold text-base tracking-wide uppercase transition-all duration-300 ease-in-out hover:scale-[1.02] flex items-center justify-center gap-2 group cursor-pointer overflow-hidden text-center disabled:opacity-50",
        themeClasses,
        className
      )}
    >
      <span
        className="relative z-20 flex items-center justify-center gap-2"
        style={{
          maskImage:
            variant === "glass"
              ? "linear-gradient(-75deg, var(--primary-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary-color) calc(var(--x) + 100%))"
              : "linear-gradient(-75deg, var(--shimmer-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--shimmer-color) calc(var(--x) + 100%))",
          WebkitMaskImage:
            variant === "glass"
              ? "linear-gradient(-75deg, var(--primary-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--primary-color) calc(var(--x) + 100%))"
              : "linear-gradient(-75deg, var(--shimmer-color) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), var(--shimmer-color) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>

      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          WebkitMaskComposite: "xor",
          backgroundImage: "linear-gradient(-75deg, var(--border-shimmer-10) calc(var(--x) + 20%), var(--border-shimmer-50) calc(var(--x) + 25%), var(--border-shimmer-10) calc(var(--x) + 100%))",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] p-px"
      ></span>
    </motion.button>
  );
};

export default ShinyButton;
