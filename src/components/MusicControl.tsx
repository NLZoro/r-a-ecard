import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element with a royalty-free Shehnai/Wedding music
    audioRef.current = new Audio("/wedding-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    // Hide tooltip after 5 seconds
    const timer = setTimeout(() => setShowTooltip(false), 5000);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked
        console.log("Autoplay blocked");
      });
    }
    setIsPlaying(!isPlaying);
    setShowTooltip(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-primary text-primary-foreground text-xs px-3 py-2 rounded-lg shadow-lg">
              🎵 Tap for music
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-primary" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleMusic}
        className="music-button text-accent"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { rotate: [0, 5, -5, 0] } : {}}
        transition={isPlaying ? { repeat: Infinity, duration: 0.5 } : {}}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </motion.button>
    </div>
  );
};

export default MusicControl;
