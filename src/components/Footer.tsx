import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import logoImg from "@/assets/logo.png";

const serviceLinks = [
  { label: "Meta Ads", to: "/services/meta-ads" },
  { label: "Google Ads", to: "/services/google-ads" },
  { label: "Performance Marketing", to: "/services/performance-marketing" },
  { label: "Video Editing", to: "/services/video-editing" },
  { label: "Content Writing", to: "/services/content-writing" },
  { label: "Social Media Marketing", to: "/services/social-media-marketing" },
  { label: "Web Design", to: "/services/web-design" },
];

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logoImg} alt="PerformanceAura" className="h-8 w-auto brightness-0 invert" />
          </Link>
          <p className="text-primary-foreground/70 text-sm leading-relaxed">
            AI-powered digital marketing agency driving measurable growth for ambitious brands across India.
          </p>
          <div className="flex gap-3 mt-6">
            {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {["Home", "About", "Services", "Courses", "Blog", "Resources", "Contact"].map((label) => (
              <li key={label}>
                <Link to={`/${label === "Home" ? "" : label.toLowerCase()}`} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2">
            {serviceLinks.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-sm text-primary-foreground/70">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>Noida, Uttar Pradesh, India</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <Phone size={16} className="shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3 text-sm text-primary-foreground/70">
              <Mail size={16} className="shrink-0" />
              <span>hello@performanceaura.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-primary-foreground/50">© {new Date().getFullYear()} PerformanceAura. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Terms</Link>
          <Link to="/refund-policy" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">Refund Policy</Link>
          <Link to="/about" className="text-sm text-primary-foreground/50 hover:text-primary-foreground transition-colors">About</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
