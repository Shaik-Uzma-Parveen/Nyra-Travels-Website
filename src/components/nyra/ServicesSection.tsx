import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileCheck,
  Hotel,
  BookUser,
  CreditCard,
  Send,
  Banknote,
  Ship,
  Landmark,
} from "lucide-react";

type Service = {
  icon: typeof FileCheck;
  title: string;
  desc: string;
  back: string;
  image: string;
  color: "primary" | "success" | "accent" | "highlight";
  cta: string;
};

const services: Service[] = [
  {
    icon: FileCheck,
    title: "Visa Booking",
    desc: "Hassle-free visa applications worldwide",
    back: "End-to-end visa assistance for tourist, business and student travel with expert document support.",
    image:
      "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=900&q=80",
    color: "primary",
    cta: "Know More",
  },
  {
    icon: Hotel,
    title: "Hotel Booking",
    desc: "Luxury stays at the best prices",
    back: "From boutique resorts to 5-star hotels — handpicked stays across India and abroad.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    color: "accent",
    cta: "Book Now",
  },
  {
    icon: BookUser,
    title: "Passport Seva",
    desc: "New passport & renewal assistance",
    back: "Complete passport application, renewal and tatkal services with doorstep document pickup.",
    image:
      "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=900&q=80",
    color: "success",
    cta: "Know More",
  },
  {
    icon: CreditCard,
    title: "Credit Card Swipe",
    desc: "Secure POS payment options",
    back: "Pay for any of our services seamlessly with all major credit & debit cards.",
    image: "/service-credit-card.png",
    color: "highlight",
    cta: "Know More",
  },
  {
    icon: Send,
    title: "Money Transfer",
    desc: "Fast & secure global transfers",
    back: "Send money to family and friends abroad with competitive rates and instant settlement.",
    image:
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80",
    color: "primary",
    cta: "Know More",
  },
  {
    icon: Banknote,
    title: "Foreign Exchange",
    desc: "Best forex rates, all currencies",
    back: "Buy & sell foreign currency, forex cards and travellers cheques at unbeatable rates.",
    image:
      "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=900&q=80",
    color: "success",
    cta: "Know More",
  },
  {
    icon: Ship,
    title: "Cruise Booking",
    desc: "Premium cruise experiences",
    back: "Luxury cruise packages — Caribbean, Mediterranean, Singapore and Dubai itineraries.",
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=900&q=80",
    color: "accent",
    cta: "Book Now",
  },
  {
    icon: Landmark,
    title: "Sabarimala & Velankanni Tours",
    desc: "Full devotional tour packages",
    back: "Complete pilgrimage packages with travel, stay, darshan & priest assistance included.",
    image: "/service-pilgrimage.png",
    color: "highlight",
    cta: "Book Now",
  },
];

const colorMap: Record<Service["color"], { bg: string; icon: string; ring: string }> = {
  primary: { bg: "bg-primary/15", icon: "text-primary", ring: "ring-primary/40" },
  success: { bg: "bg-success/15", icon: "text-success", ring: "ring-success/40" },
  accent: { bg: "bg-accent/15", icon: "text-accent", ring: "ring-accent/40" },
  highlight: { bg: "bg-highlight/15", icon: "text-highlight", ring: "ring-highlight/40" },
};

const ServicesSection = () => {
  const [tapped, setTapped] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-3">
            What we offer
          </p>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Hover any card to reveal the service — tap on mobile. Premium travel & booking
            assistance, all in one place.
          </p>
        </motion.div>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: "1200px" }}
        >
          {services.map((service, i) => {
            const c = colorMap[service.color];
            const Icon = service.icon;
            const isTapped = tapped === i;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="group relative h-72 cursor-pointer"
                onClick={() => setTapped(isTapped ? null : i)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 ${
                    isTapped ? "[transform:rotateY(180deg)]" : ""
                  } group-hover:[transform:rotateY(180deg)]`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 glass-card rounded-3xl p-7 flex flex-col justify-between"
                    style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl ${c.bg} ring-1 ${c.ring} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className={`w-7 h-7 ${c.icon}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-card-foreground mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground/70">
                      Nyra Tours & Travels
                    </p>
                  </div>

                  {/* BACK */}
                  <div
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-xl"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
                    <div className="relative h-full flex flex-col justify-end p-6 text-white">
                      <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                      <p className="text-sm text-white/85 leading-relaxed mb-4">
                        {service.back}
                      </p>
                      <button
                        type="button"
                        className={`self-start text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full ${c.bg} ${c.icon} ring-1 ${c.ring} backdrop-blur`}
                      >
                        {service.cta}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
