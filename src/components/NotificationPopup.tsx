import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Bell, Gift } from "lucide-react";

const notifications = [
  { icon: Bell, text: "New client joined PerformanceAura!", time: "Just now" },
  { icon: Gift, text: "50% off on Digital Marketing services — Limited time!", time: "2 mins ago" },
  { icon: Star, text: '"Best ROI we\'ve ever seen!" — Arjun, D2C Brand', time: "5 mins ago" },
  { icon: Bell, text: "A healthcare brand signed up for Meta Ads", time: "8 mins ago" },
  { icon: Star, text: '"4.2x ROAS in just 3 months" — Priya, E-commerce', time: "12 mins ago" },
  { icon: Gift, text: "Free strategy call — Only 3 slots left this week!", time: "15 mins ago" },
  { icon: Bell, text: "An education brand started Google Ads campaign", time: "20 mins ago" },
  { icon: Star, text: '"PerformanceAura transformed our lead gen" — Rahul, B2B', time: "25 mins ago" },
];

const NotificationPopup = () => {
  const [current, setCurrent] = useState<number | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const initialDelay = setTimeout(() => {
      setCurrent(0);
    }, 3000);
    return () => clearTimeout(initialDelay);
  }, [dismissed]);

  useEffect(() => {
    if (current === null || dismissed) return;
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev !== null ? (prev + 1) % notifications.length : 0));
    }, 4000);
    return () => clearTimeout(timer);
  }, [current, dismissed]);

  if (dismissed || current === null) return null;

  const notif = notifications[current];

  return (
    <div className="fixed top-20 right-6 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: -40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.35 }}
          className="relative bg-card border border-border rounded-xl shadow-2xl p-4 pr-10 max-w-xs"
        >
          <button
            onClick={() => setDismissed(true)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss notifications"
          >
            <X size={14} />
          </button>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <notif.icon size={16} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground leading-snug">{notif.text}</p>
              <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NotificationPopup;
