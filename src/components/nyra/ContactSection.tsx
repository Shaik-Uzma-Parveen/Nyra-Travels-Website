import { motion } from "framer-motion";
import { Phone, MapPin, User, Instagram } from "lucide-react";

const contactItems = [
  { icon: User, label: "Proprietor", value: "Pulikonda Ravi Santosh", bg: "bg-primary/15 ring-primary/40", icon_color: "text-primary" },
  { icon: Phone, label: "WhatsApp", value: "+91 99127 77717", bg: "bg-success/15 ring-success/40", icon_color: "text-success", href: "https://wa.me/919912777717" },
  { icon: Phone, label: "Alternate Phone", value: "+91 90323 07260", bg: "bg-accent/15 ring-accent/40", icon_color: "text-accent", href: "tel:+919032307260" },
  { icon: MapPin, label: "Address", value: "Near Guntur NTR Bus Stand, beside Ranjith Tyres", bg: "bg-primary/15 ring-primary/40", icon_color: "text-primary" },
  { icon: Instagram, label: "Instagram", value: "@nyra_tours_and_travels", bg: "bg-accent/15 ring-accent/40", icon_color: "text-accent", href: "https://www.instagram.com/nyra_tours_and_travels" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-accent mb-3">Get in touch</p>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Contact Us</span>
          </h2>
          <p className="text-muted-foreground text-lg">We'd love to plan your next journey with you.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 perspective-1000">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 space-y-5"
          >
            {contactItems.map((item) => {
              const Wrapper: any = item.href ? "a" : "div";
              return (
                <Wrapper
                  key={item.label}
                  {...(item.href ? { href: item.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-5 hover:translate-x-1 transition-transform"
                >
                  <div className={`w-12 h-12 shrink-0 rounded-2xl ${item.bg} ring-1 flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 ${item.icon_color}`} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-bold text-foreground">{item.value}</p>
                  </div>
                </Wrapper>
              );
            })}

            <motion.a
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ y: 1, scale: 0.99 }}
              href="https://wa.me/919912777717"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d block w-full py-4 text-lg font-bold rounded-2xl text-center"
            >
              <Phone className="w-5 h-5 inline mr-2" /> Chat on WhatsApp
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl overflow-hidden min-h-[400px] flex flex-col"
          >
            <iframe
              src="https://www.google.com/maps?q=Guntur+NTR+Bus+Stand&output=embed"
              width="100%"
              className="flex-1"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nyra Tours and Travels Location"
            />
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <motion.a
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ y: 1, scale: 0.98 }}
            href="https://www.google.com/maps/search/?api=1&query=Nyra+Tours+and+Travels+Guntur+NTR+Bus+Stand"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d inline-flex items-center gap-2 px-10 py-4 rounded-2xl font-bold"
          >
            <MapPin className="w-5 h-5" /> Get Directions
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
