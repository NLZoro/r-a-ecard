import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

interface VenueCardProps {
  name: string;
  address: string;
  events: string;
  mapsUrl: string;
  delay?: number;
}

const VenueCard = ({ name, address, events, mapsUrl, delay = 0 }: VenueCardProps) => {
  return (
    <motion.div
      className="p-5 rounded-2xl border border-accent/30 overflow-hidden relative"
      style={{
        background: "linear-gradient(135deg, rgba(255, 253, 208, 0.9) 0%, rgba(255, 253, 208, 0.6) 100%)",
        boxShadow: "0 8px 32px rgba(128, 0, 32, 0.1)",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
        <svg viewBox="0 0 100 100" className="text-primary">
          <circle cx="100" cy="0" r="60" fill="currentColor" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Event type badge */}
        <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 bg-primary/10 text-primary">
          {events}
        </div>

        {/* Venue name */}
        <h3 className="font-display text-xl font-bold text-primary mb-2">
          {name}
        </h3>

        {/* Address */}
        <div className="flex items-start gap-2 mb-4 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent" />
          <p className="text-sm">{address}</p>
        </div>

        {/* Google Maps button */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-button inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
        >
          <Navigation className="w-4 h-4" />
          Open in Google Maps
        </a>
      </div>
    </motion.div>
  );
};

export default VenueCard;
