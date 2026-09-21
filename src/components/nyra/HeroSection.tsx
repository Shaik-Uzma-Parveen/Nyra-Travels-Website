import { motion } from "framer-motion";
import { Play, Ticket } from "lucide-react";
import heroTravel from "@/assets/hero-travel-v4.png.asset.json";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Destinations", href: "#destinations" },
  { label: "Packages", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-gradient-to-b from-[#eaf6ff] via-[#f5fbff] to-[#eafff7] px-3 py-4 text-foreground md:px-6 md:py-8"
    >
    <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_-30px_rgba(15,23,42,0.18)] md:rounded-[36px]">
      {/* Soft background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-20 h-[520px] w-[520px] rounded-full bg-[#7EE8D8]/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[600px] w-[600px] rounded-full bg-[#FFD08A]/30 blur-3xl"
      />

      {/* Curved bottom landscape */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[32%]">
        <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="land" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#7EE8D8" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#3ccfb0" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          <path
            d="M0,180 C320,80 760,260 1120,170 C1280,135 1380,180 1440,160 L1440,400 L0,400 Z"
            fill="url(#land)"
          />
        </svg>
      </div>

      {/* Top nav */}
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 md:pt-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="font-display text-xl font-extrabold tracking-tight">
            <span className="text-primary">Nyra</span>{" "}
            <span className="text-foreground">Tours</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(60,207,176,0.7)] transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Book Now
        </a>
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-10 lg:grid-cols-[45fr_55fr] lg:pt-16">
        {/* LEFT */}
        <div className="relative flex flex-col">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute -z-10 h-60 w-60 rounded-full bg-[#7EE8D8]/55 blur-[1px] md:h-80 md:w-80"
            style={{ left: "30%", top: "-8%" }}
          />

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-success"
          >
            ✈ TRAVEL & TEMPLE BOOKING SERVICES
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Your Trusted Partner for{" "}
            <span className="relative z-10 text-primary">Travel & Temple</span>{" "}
            Bookings
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Book flights, train tickets, and temple darshan reservations across
            India through one convenient platform. Fast booking, secure payments,
            and reliable service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-[#ff8b6b] px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-10px_rgba(255,107,94,0.65)]"
            >
              <Ticket className="h-4 w-4" />
              Book Now
            </motion.a>

            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#services"
              className="group flex items-center gap-3 rounded-full border-2 border-accent bg-white px-6 py-[14px] text-sm font-semibold text-success transition-colors hover:bg-accent/10"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-white">
                <Play className="h-3 w-3 fill-white" />
              </span>
              Explore Services
            </motion.a>
          </motion.div>


          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-xs font-medium text-muted-foreground"
          >
            <div>
              <div className="font-display text-2xl font-extrabold text-foreground">50K+</div>
              <div>Happy travellers</div>
            </div>
            <div className="h-8 w-px bg-foreground/10" />
            <div>
              <div className="font-display text-2xl font-extrabold text-foreground">200+</div>
              <div>Destinations</div>
            </div>
            <div className="h-8 w-px bg-foreground/10" />
            <div>
              <div className="font-display text-2xl font-extrabold text-foreground">4.9★</div>
              <div>Google rating</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — travel illustration background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full overflow-hidden rounded-2xl"
          style={{
            aspectRatio: "1710 / 919",
            backgroundImage: `url(/hero-travel-v4.png)`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
    </section>
  );
};

export default HeroSection;
