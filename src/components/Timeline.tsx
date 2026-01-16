import { motion } from "framer-motion";
import { Gem, Flower2, Heart, Church, PartyPopper } from "lucide-react";

interface TimelineEvent {
  icon: React.ReactNode;
  title: string;
  date: string;
  time: string;
}

const events: TimelineEvent[] = [
  {
    icon: <Flower2 className="w-5 h-5" />,
    title: "Haldi Ceremony",
    date: "Feb 13, 2026",
    time: "2:00 PM",
  },
  {
    icon: <Heart className="w-5 h-5" />,
    title: "Ring Ceremony",
    date: "Feb 13, 2026",
    time: "7:00 PM",
  },
  {
    icon: <Church className="w-5 h-5" />,
    title: "Wedding (Phere)",
    date: "Feb 14, 2026",
    time: "12:00 PM",
  },
  {
    icon: <PartyPopper className="w-5 h-5" />,
    title: "Reception",
    date: "Feb 14, 2026",
    time: "7:00 PM",
  },
];

const Timeline = () => {
  return (
    <div className="relative pl-8 pr-4">
      {/* Vertical line */}
      <div className="timeline-line" />

      <div className="space-y-8">
        {events.map((event, index) => (
          <motion.div
            key={event.title}
            className="relative flex items-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Timeline dot */}
            <div className="timeline-dot absolute left-[-26px] mt-1 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-accent" />
            </div>

            {/* Event card */}
            <div
              className="flex-1 p-4 rounded-xl border border-accent/20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 253, 208, 0.8) 0%, rgba(255, 253, 208, 0.4) 100%)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-accent">
                  {event.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
              </div>
              <div className="ml-13 text-sm font-medium text-accent">
                ⏰ {event.time}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
