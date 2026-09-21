import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";

const locations = ["Shirdi", "Tirupati", "Srisailam", "Annavaram", "Sabarimala"];

const DevotionalSection = () => {
  return (
    <section id="devotional" className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-devotional via-background to-devotional" />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-highlight mb-3">Sacred Journeys</p>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="gradient-text">Devotional Tours</span>
          </h2>
          <p className="text-foreground/70 text-lg">Pilgrimage to India's most revered destinations.</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 perspective-1000">
          {locations.map((loc, i) => (
            <motion.div
              key={loc}
              initial={{ opacity: 0, y: 30, rotateY: -20 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, rotateY: 8, scale: 1.05 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass-card rounded-3xl p-6 text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-highlight/30 to-accent/30 flex items-center justify-center ring-1 ring-highlight/40">
                <MapPin className="w-7 h-7 text-highlight" />
              </div>
              <h3 className="font-bold text-lg text-foreground">{loc}</h3>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-center gap-6 text-center"
        >
          {[
            "All Darshanam tickets & accommodation",
            "All Sevas & lodging booking available",
          ].map((t) => (
            <div key={t} className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl glass-card">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span className="text-foreground/90 font-medium">{t}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DevotionalSection;
