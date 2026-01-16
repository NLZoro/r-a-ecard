import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TimeUnit {
  value: number;
  label: string;
}

const CountdownTimer = () => {
  const weddingDate = new Date("2026-02-14T00:00:00").getTime();
  
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>([
    { value: 0, label: "Days" },
    { value: 0, label: "Hours" },
    { value: 0, label: "Mins" },
    { value: 0, label: "Secs" },
  ]);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = weddingDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft([
          { value: days, label: "Days" },
          { value: hours, label: "Hours" },
          { value: minutes, label: "Mins" },
          { value: seconds, label: "Secs" },
        ]);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {timeLeft.map((unit, index) => (
        <motion.div
          key={unit.label}
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div 
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center glass-button"
            style={{
              background: "linear-gradient(135deg, rgba(128, 0, 32, 0.2) 0%, rgba(128, 0, 32, 0.1) 100%)",
            }}
          >
            <span className="font-display text-xl sm:text-2xl font-bold text-primary">
              {unit.value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs mt-2 text-muted-foreground uppercase tracking-wider">
            {unit.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
};

export default CountdownTimer;
