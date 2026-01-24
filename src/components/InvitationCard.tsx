import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import Timeline from "./Timeline";
import VenueCard from "./VenueCard";
import couplePhoto from "@/assets/couple-photo.png";

const InvitationCard = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: "y", dragFree: false });
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <motion.div
      className="fixed inset-0 paper-texture overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Carousel Container */}
      <div className="h-full overflow-hidden" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {/* Slide 1: Hero */}
          <div className="flex-[0_0_100%] min-h-0 h-full w-full relative overflow-hidden">
            <SlideHero onViewDetails={() => scrollTo(1)} />
          </div>

          {/* Slide 2: Timeline */}
          <div className="flex-[0_0_100%] min-h-0 h-full w-full overflow-y-auto">
            <SlideTimeline />
          </div>

          {/* Slide 3: Venue */}
          <div className="flex-[0_0_100%] min-h-0 h-full w-full overflow-y-auto">
            <SlideVenue />
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`slide-indicator ${currentSlide === index ? "active" : ""}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <AnimatePresence>
        {currentSlide > 0 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scrollTo(currentSlide - 1)}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          >
            <ChevronLeft className="w-5 h-5 rotate-90" />
          </motion.button>
        )}
        {currentSlide < 2 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => scrollTo(currentSlide + 1)}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-40 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"
          >
            <ChevronRight className="w-5 h-5 rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Slide 1: Hero
const SlideHero = ({ onViewDetails }: { onViewDetails: () => void }) => {
  return (
    <div className="h-full flex flex-col relative">
      {/* Background Photo */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Rohil & Ashwini"
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(128, 0, 32, 0.3) 0%, rgba(255, 253, 208, 0.9) 70%, rgba(255, 253, 208, 1) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-end pb-8 px-6">
        {/* Save the Date */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="gold-text text-lg font-display italic">Save the Date</span>
        </motion.div>

        {/* Names */}
        <motion.h1
          className="font-display text-5xl sm:text-6xl font-bold text-primary mb-2 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Rohil
          <span className="gold-text mx-3">&</span>
          <br />
          Ashwini
        </motion.h1>

        {/* Date */}
        <motion.p
          className="text-xl text-foreground/80 font-display mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          13 - 14 February 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={onViewDetails}
          className="glass-button flex items-center justify-center gap-2 mx-auto text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Details
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
};

// Slide 2: Timeline
const SlideTimeline = () => {
  return (
    <div className="min-h-full py-12 px-4">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="gold-text text-sm uppercase tracking-widest">The Journey</span>
        <h2 className="font-display text-3xl font-bold text-primary mt-2">
          Wedding Events
        </h2>
      </motion.div>

      <Timeline />

      <motion.p
        className="text-center text-sm text-muted-foreground mt-8 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        Swipe up to see venues →
      </motion.p>
    </div>
  );
};

// Slide 3: Venue
const SlideVenue = () => {
  const venues = [
    {
      name: "Dhani Hotel Station Road",
      address: "Niwari Lawns, Niwari, Madhya Pradesh",
      events: "Haldi & Ring Ceremony",
      mapsUrl: "https://maps.google.com/?q=Dhani+Hotel+Niwari",
    },
    {
      name: "Balaji Garden",
      address: "Niwari, Madhya Pradesh",
      events: "Wedding & Reception",
      mapsUrl: "https://maps.google.com/?q=Balaji+Garden+Niwari",
    },
  ];

  return (
    <div className="min-h-full py-12 px-4">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="gold-text text-sm uppercase tracking-widest">Location</span>
        <h2 className="font-display text-3xl font-bold text-primary mt-2">
          Venues
        </h2>
      </motion.div>

      <div className="space-y-6">
        {venues.map((venue, index) => (
          <VenueCard key={venue.name} {...venue} delay={index * 0.2} />
        ))}
      </div>

      {/* Footer message */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <p className="font-display text-lg text-primary italic">
          "Two souls, one heart"
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          We can't wait to celebrate with you! 💕
        </p>
      </motion.div>
    </div>
  );
};

export default InvitationCard;
