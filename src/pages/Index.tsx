import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Envelope from "@/components/Envelope";
import InvitationCard from "@/components/InvitationCard";
import MusicControl from "@/components/MusicControl";

const Index = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setShowConfetti(true);

    // Play paper sound effect (optional)
    const audio = new Audio(
      "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Nkol7dXKBjJWQg3d0gImUkYV5dYGJk5GGeHaAiJKQhXl2gIiSkIV5doCIko+FeXaAiJKPhXl2gIiSj4V5doCIko+FeXaAiJKPhXl2gIiSj4V5doCIko+FeXaAiJKPhXl2gIiSj4V5doCIko+FeXaAiJKPhXl2gIiSj4V5doA="
    );
    audio.volume = 0.3;
    audio.play().catch(() => {});

    // Stop confetti after 4 seconds
    setTimeout(() => {
      setShowConfetti(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Golden Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.15}
          colors={["#D4AF37", "#FFD700", "#B8860B", "#DAA520", "#F0E68C", "#800020"]}
          tweenDuration={4000}
        />
      )}

      {/* Envelope */}
      <Envelope isOpen={isEnvelopeOpen} onOpen={handleEnvelopeOpen} />

      {/* Invitation Card (shows after envelope opens) */}
      {isEnvelopeOpen && <InvitationCard />}

      {/* Music Control (always visible after opening) */}
      {isEnvelopeOpen && <MusicControl />}
    </div>
  );
};

export default Index;
