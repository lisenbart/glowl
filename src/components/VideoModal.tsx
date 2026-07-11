import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Reel } from "@/data/reels";

interface VideoModalProps {
  reel: Reel;
  onClose: () => void;
}

export default function VideoModal({ reel, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const video = videoRef.current;
    if (video) video.play().catch(() => {});
    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, [reel]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal-overlay fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${reel.title} video player`}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="modal-panel relative w-full max-w-[420px] overflow-hidden rounded-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="modal-close-btn absolute right-3 top-3 z-10 h-10 w-10 rounded-full backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--link-accent)]"
          aria-label="Close video"
        >
          <X size={20} />
        </button>

        <div className="video-stage relative aspect-[9/16] w-full">
          <video
            ref={videoRef}
            src={reel.video}
            poster={reel.poster}
            controls
            playsInline
            muted
            className="h-full w-full object-cover"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="modal-header px-5 py-4">
          <h3 className="font-display text-base font-light tracking-[0.04em] text-text-primary">{reel.title}</h3>
          <p className="mt-1 text-sm font-light text-text-secondary">{reel.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
