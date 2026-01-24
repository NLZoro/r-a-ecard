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
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEnvelopeOpen = () => {
    setIsEnvelopeOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    // TRANSPARENT CONTAINER: Letting the CSS Body background show through!
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-transparent">
      
      {/* Dark Overlay (To make text readable against the background) */}
      <div className="fixed inset-0 bg-black/40 -z-10" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={300} />}
        
        <Envelope isOpen={isEnvelopeOpen} onOpen={handleEnvelopeOpen} />
        
        {isEnvelopeOpen && <InvitationCard />}
        
        {isEnvelopeOpen && <MusicControl />}
      </div>
    </div>
  );
};

export default Index;