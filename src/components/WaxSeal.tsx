import { motion } from "framer-motion";

interface WaxSealProps {
  onClick: () => void;
  initials?: string;
}

const WaxSeal = ({ onClick, initials = "R&A" }: WaxSealProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="wax-seal-pulse relative w-24 h-24 rounded-full cursor-pointer focus:outline-none"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: "linear-gradient(145deg, #D4AF37 0%, #B8960C 50%, #D4AF37 100%)",
        boxShadow: `
          0 8px 32px rgba(212, 175, 55, 0.4),
          inset 0 2px 4px rgba(255, 255, 255, 0.3),
          inset 0 -2px 4px rgba(0, 0, 0, 0.2)
        `,
      }}
    >
      {/* Wax texture overlay */}
      <div 
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4) 0%, transparent 60%)",
        }}
      />
      
      {/* Decorative border */}
      <div 
        className="absolute inset-2 rounded-full border-2"
        style={{ borderColor: "rgba(128, 0, 32, 0.3)" }}
      />
      
      {/* Inner decorative ring */}
      <div 
        className="absolute inset-4 rounded-full border"
        style={{ borderColor: "rgba(128, 0, 32, 0.2)" }}
      />
      
      {/* Initials */}
      <span 
        className="relative z-10 font-display text-xl font-bold tracking-wide"
        style={{ color: "#800020" }}
      >
        {initials}
      </span>
      
      {/* Tap hint */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-accent whitespace-nowrap font-body"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Tap to open
      </motion.div>
    </motion.button>
  );
};

export default WaxSeal;
