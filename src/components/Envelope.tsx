import { motion, AnimatePresence } from "framer-motion";
import WaxSeal from "./WaxSeal";

interface EnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
}

const Envelope = ({ isOpen, onOpen }: EnvelopeProps) => {
  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 paper-texture"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Envelope Container */}
          <motion.div
            className="envelope-3d relative"
            style={{ perspective: "1000px" }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Envelope Body */}
            <div
              className="relative w-72 h-48 sm:w-80 sm:h-52 rounded-lg shadow-2xl"
              style={{
                background: "linear-gradient(180deg, #800020 0%, #5a0016 100%)",
                boxShadow: "0 20px 60px rgba(128, 0, 32, 0.5)",
              }}
            >
              {/* Envelope texture pattern */}
              <div 
                className="absolute inset-0 rounded-lg opacity-10"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(212, 175, 55, 0.1) 10px,
                    rgba(212, 175, 55, 0.1) 20px
                  )`,
                }}
              />
              
              {/* Gold border accent */}
              <div 
                className="absolute inset-2 rounded-md border"
                style={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
              />

              {/* Bottom flap (decorative) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16 rounded-b-lg"
                style={{
                  background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 100%)",
                }}
              />
            </div>

            {/* Envelope Flap (top triangle) */}
            <motion.div
              className="absolute -top-1 left-0 right-0 origin-top"
              style={{
                transformStyle: "preserve-3d",
              }}
              animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <svg
                viewBox="0 0 320 100"
                className="w-72 sm:w-80"
                style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))" }}
              >
                <defs>
                  <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#6a0018" />
                    <stop offset="100%" stopColor="#800020" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 100 L160 20 L320 100 Z"
                  fill="url(#flapGradient)"
                />
                {/* Gold trim on flap */}
                <path
                  d="M10 95 L160 25 L310 95"
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.4)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>

            {/* Wax Seal - Centered on envelope */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <WaxSeal onClick={onOpen} />
            </div>
          </motion.div>

          {/* Decorative corner flourishes */}
          <div className="absolute top-8 left-8 w-16 h-16 opacity-20">
            <svg viewBox="0 0 100 100" className="text-accent">
              <path
                d="M0 0 Q50 0 50 50 Q50 0 100 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="absolute bottom-8 right-8 w-16 h-16 opacity-20 rotate-180">
            <svg viewBox="0 0 100 100" className="text-accent">
              <path
                d="M0 0 Q50 0 50 50 Q50 0 100 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Envelope;
