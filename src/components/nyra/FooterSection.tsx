import { Phone, MapPin, Instagram, Plane } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative pt-20 pb-10 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-devotional/60 to-devotional" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary via-accent to-success flex items-center justify-center shadow-lg animate-pulse-glow">
                <Plane className="w-6 h-6 text-white -rotate-45" />
              </div>
              <h3 className="text-3xl font-black gradient-text">Nyra Tours and Travels</h3>
            </div>
            <p className="text-foreground/60 leading-relaxed max-w-md mb-6">
              Bus · Train · Flight · Cargo · Pilgrimage. Crafting unforgettable journeys with care, comfort and trust.
            </p>
            <p className="text-foreground/60 text-sm mb-4">Proprietor: Pulikonda Ravi Santosh</p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/nyra_tours_and_travels"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Instagram className="w-4 h-4 text-foreground/80" />
              </a>
              <a
                href="https://wa.me/919912777717"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-card flex items-center justify-center hover:scale-110 transition-transform"
              >
                <Phone className="w-4 h-4 text-foreground/80" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest">Explore</h4>
            <ul className="space-y-2.5 text-foreground/60 text-sm">
              {["Home", "Services", "Devotional", "Contact"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase()}`} className="hover:text-foreground hover:translate-x-1 inline-block transition-all">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-widest">Reach Us</h4>
            <ul className="space-y-3 text-foreground/60 text-sm">
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 text-success mt-0.5 shrink-0" /> +91 99127 77717</li>
              <li className="flex items-start gap-2"><Phone className="w-4 h-4 text-accent mt-0.5 shrink-0" /> +91 90323 07260</li>
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" /> Near Guntur NTR Bus Stand, beside Ranjith Tyres</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-foreground/40 text-xs">
            © {new Date().getFullYear()} Nyra Travels. All rights reserved.
          </p>
          <p className="text-foreground/40 text-xs">Designed with care · Built for explorers</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
