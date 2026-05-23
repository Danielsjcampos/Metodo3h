"use client";

import * as React from "react";
import { Player } from "@remotion/player";
import { PerspectiveMarquee } from "@/components/ui/remotion-perspective-marquee";

function usePrefersDark() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setIsDark(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isDark;
}

function PerspectiveMarqueeScene({ isDark }: { isDark: boolean }) {
  return (
    <PerspectiveMarquee
      items={[
        { type: "image", src: "/images/antigravity logo.webp", alt: "Antigravity", heightClass: "h-10 md:h-12" },
        { type: "image", src: "/images/Vercel_logo_2025.svg", alt: "Vercel", heightClass: "h-7 md:h-8 invert" },
        { type: "image", src: "/images/claudecode-color.png", alt: "Cloud Code", heightClass: "h-9 md:h-10" },
        { type: "image", src: "/images/google-search-console-icon.webp", alt: "Google Search Console", heightClass: "h-9 md:h-10" },
      ]}
      rotateY={-28}
      rotateX={8}
      perspective={1200}
      pixelsPerFrame={2}
      background={isDark ? "#050505" : "#fafafa"}
      fadeColor={isDark ? "#050505" : "#fafafa"}
      color={isDark ? "#fafafa" : "#171717"}
    />
  );
}

export default function Demo() {
  const isDark = usePrefersDark();

  return (
    <div
      className="min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: isDark ? "#050505" : "#fafafa" }}
    >
      <Player
        component={PerspectiveMarqueeScene}
        inputProps={{ isDark }}
        durationInFrames={240}
        fps={30}
        compositionWidth={1280}
        compositionHeight={720}
        style={{ width: "100vw", height: "100vh" }}
        controls={false}
        autoPlay
        loop
        clickToPlay={false}
        acknowledgeRemotionLicense={true}
      />
    </div>
  );
}
