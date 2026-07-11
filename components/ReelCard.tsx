"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import type { Reel } from "@/data/reels";

interface ReelCardProps {
  reel: Reel;
  onPlay: (reel: Reel) => void;
  index: number;
}

const fallbackGradients: Record<string, string> = {
  commercial:
    "linear-gradient(160deg, #0a1628 0%, #1a0a3e 40%, #2d1055 70%, #0d2847 100%)",
  gaming:
    "linear-gradient(160deg, #1a0530 0%, #3d0a5c 35%, #6b1040 65%, #2a0845 100%)",
  cinema:
    "linear-gradient(160deg, #0a0f1a 0%, #151525 40%, #1a1028 70%, #0d1520 100%)",
};

export default function ReelCard({ reel, onPlay, index }: ReelCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full shrink-0 snap-center"
    >
      <button
        type="button"
        onClick={() => onPlay(reel)}
        className="glass-panel-glow relative w-full overflow-hidden rounded-[28px] text-left transition-transform duration-400 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400 group-hover:-translate-y-2"
        aria-label={`Play ${reel.title} reel`}
      >
        <div
          className="glass-panel relative aspect-[9/16] w-full overflow-hidden"
          style={{ background: fallbackGradients[reel.id] }}
        >
          {!imgError && (
            <Image
              src={reel.poster}
              alt={reel.title}
              fill
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
            />
          )}

          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-white/50 group-hover:bg-white/20 md:h-[72px] md:w-[72px]">
              <Play
                size={28}
                fill="white"
                className="ml-1 text-white"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-4">
            <span className="text-sm font-light tracking-wide text-white md:text-[15px]">
              {reel.title}
            </span>
            <ArrowRight
              size={18}
              style={{ color: reel.accent }}
              aria-hidden="true"
            />
          </div>
        </div>
      </button>
    </motion.article>
  );
}
