import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useSetting } from "@/hooks/useSiteSettings";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const timeAgo = (iso?: string) => {
  if (!iso) return "";
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Math.max(0, Date.now() - t);
  const mins = Math.round(diff / 60000);
  if (mins <= 0) return "Just now";
  if (mins < 60) return `${mins} mins ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} hrs ago`;
  const days = Math.round(hrs / 24);
  return `${days} days ago`;
};

const NotificationPopup = () => {
  const location = useLocation();
  const { value: notifData } = useSetting("elementor_notifications");
  const { value: bannerData } = useSetting("elementor_banners");
  const { value: popupData } = useSetting("elementor_popups");
  const { value: globalStyles } = useSetting("elementor_global_styles");

  const [currentNotif, setCurrentNotif] = useState<number | null>(null);
  const [dismissedNotifs, setDismissedNotifs] = useState(false);
  const [dismissedBannerIds, setDismissedBannerIds] = useState<Record<string, boolean>>({});
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const [dismissedPopupIds, setDismissedPopupIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("dismissedPopupIds");
      if (raw) setDismissedPopupIds(JSON.parse(raw));
    } catch {
      setDismissedPopupIds({});
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dismissedPopupIds", JSON.stringify(dismissedPopupIds));
    } catch {
      return;
    }
  }, [dismissedPopupIds]);

  const bannerItems = (bannerData?.items || []).filter((b: any) => b.enabled);
  const activeBanner = bannerItems.find((b: any) => !dismissedBannerIds[b.id]);

  const notifItems = (notifData?.items || []).filter((n: any) => n.enabled);

  const popupItems = (popupData?.items || []).filter((p: any) => p.enabled);
  const activePopup = popupItems.find((p: any) => !dismissedPopupIds[p.id]) || null;

  const radius = `${Number(globalStyles?.borderRadius || 12)}px`;
  const shadowClass =
    globalStyles?.shadowIntensity === "none"
      ? "shadow-none"
      : globalStyles?.shadowIntensity === "sm"
        ? "shadow-sm"
        : globalStyles?.shadowIntensity === "lg"
          ? "shadow-xl"
          : "shadow-lg";

  useEffect(() => {
    if (dismissedNotifs) return;
    if (!notifItems.length) return;
    const initialDelay = setTimeout(() => {
      setCurrentNotif(0);
    }, 3000);
    return () => clearTimeout(initialDelay);
  }, [dismissedNotifs, notifItems.length]);

  useEffect(() => {
    if (currentNotif === null || dismissedNotifs) return;
    if (!notifItems.length) return;
    const timer = setTimeout(() => {
      setCurrentNotif((prev) => (prev !== null ? (prev + 1) % notifItems.length : 0));
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentNotif, dismissedNotifs, notifItems.length]);

  useEffect(() => {
    if (!activePopup) return;
    if (openPopupId) return;
    if (location.pathname.startsWith("/admin")) return;

    const popup = activePopup;
    const trigger = popup.trigger || "on-load";
    const delayMs = Math.max(0, Number(popup.delay || 0)) * 1000;

    if (trigger === "on-load") {
      const t = setTimeout(() => setOpenPopupId(popup.id), 700);
      return () => clearTimeout(t);
    }

    if (trigger === "after-delay") {
      const t = setTimeout(() => setOpenPopupId(popup.id), Math.max(700, delayMs));
      return () => clearTimeout(t);
    }

    if (trigger === "on-scroll") {
      const pct = Math.max(0, Math.min(100, Number(popup.scrollPercent || 50)));
      const onScroll = () => {
        const h = document.documentElement;
        const total = Math.max(1, h.scrollHeight - h.clientHeight);
        const progress = (h.scrollTop / total) * 100;
        if (progress >= pct) {
          setOpenPopupId(popup.id);
          window.removeEventListener("scroll", onScroll);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const t = setTimeout(() => setOpenPopupId(popup.id), Math.max(700, delayMs));
    return () => clearTimeout(t);
  }, [activePopup, location.pathname, openPopupId]);

  const notif = currentNotif !== null ? notifItems[currentNotif] : null;
  const notifBg =
    notif?.type === "success"
      ? "bg-emerald-500/10 border-emerald-500/20"
      : notif?.type === "warning"
        ? "bg-amber-500/10 border-amber-500/20"
        : notif?.type === "offer"
          ? "bg-purple-500/10 border-purple-500/20"
          : "bg-card border-border";

  const popup = openPopupId ? popupItems.find((p: any) => p.id === openPopupId) : null;
  const popupPositionClass =
    popup?.position === "bottom-right"
      ? "items-end justify-end"
      : popup?.position === "bottom-left"
        ? "items-end justify-start"
        : popup?.position === "top-right"
          ? "items-start justify-end"
          : popup?.position === "full-screen"
            ? "items-stretch justify-stretch"
            : "items-center justify-center";

  const popupCardClass =
    popup?.position === "full-screen"
      ? "w-full h-full rounded-none"
      : "w-full max-w-md";

  return (
    <>
      {activeBanner && (
        <div
          className={`fixed left-0 right-0 z-50 px-4 ${activeBanner.position === "bottom" ? "bottom-0" : "top-20"}`}
        >
          <div
            className={`mx-auto max-w-6xl border ${shadowClass} px-4 py-3 flex flex-wrap items-center justify-between gap-3`}
            style={{
              background: activeBanner.bgColor || undefined,
              color: activeBanner.textColor || undefined,
              borderRadius: radius,
            }}
          >
            <div className="text-sm font-semibold">{activeBanner.text}</div>
            <div className="flex items-center gap-2">
              {activeBanner.buttonText && (
                <Button size="sm" variant="secondary" asChild>
                  <Link to={activeBanner.buttonLink || "/"}>{activeBanner.buttonText}</Link>
                </Button>
              )}
              {activeBanner.closeable && (
                <button
                  onClick={() => setDismissedBannerIds((p) => ({ ...p, [activeBanner.id]: true }))}
                  className="opacity-80 hover:opacity-100"
                  aria-label="Close banner"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {!dismissedNotifs && notif && (
        <div className="fixed top-24 right-6 z-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={notif.id || currentNotif}
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className={`relative border p-4 pr-10 max-w-xs ${shadowClass} ${notifBg}`}
              style={{ borderRadius: radius }}
            >
              <button
                onClick={() => setDismissedNotifs(true)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                aria-label="Dismiss notifications"
              >
                <X size={14} />
              </button>
              {notif.link ? (
                <Link to={notif.link} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-base">{notif.icon || "🔔"}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground leading-snug">{notif.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(notif.created_at)}</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-base">{notif.icon || "🔔"}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-card-foreground leading-snug">{notif.text}</p>
                    <p className="text-xs text-muted-foreground mt-1">{timeAgo(notif.created_at)}</p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {popup && (
        <div className={`fixed inset-0 z-50 flex p-4 ${popupPositionClass}`}>
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => {
              setOpenPopupId(null);
              setDismissedPopupIds((p) => ({ ...p, [popup.id]: true }));
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`relative border bg-card ${shadowClass} ${popupCardClass}`}
            style={{
              borderRadius: popup.position === "full-screen" ? undefined : radius,
              background: popup.bgColor || undefined,
              color: popup.textColor || undefined,
            }}
          >
            <button
              onClick={() => {
                setOpenPopupId(null);
                setDismissedPopupIds((p) => ({ ...p, [popup.id]: true }));
              }}
              className="absolute top-3 right-3 opacity-80 hover:opacity-100"
              aria-label="Close popup"
            >
              <X size={16} />
            </button>
            {popup.image && (
              <img src={popup.image} alt={popup.title || "Popup"} className="w-full h-48 object-cover rounded-t-xl" />
            )}
            <div className="p-6 space-y-3">
              {popup.title && <div className="font-display text-xl font-bold">{popup.title}</div>}
              {popup.message && <div className="text-sm opacity-90">{popup.message}</div>}
              {popup.buttonText && (
                <Button asChild className="mt-2">
                  <Link to={popup.buttonLink || "/"}>{popup.buttonText}</Link>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default NotificationPopup;
