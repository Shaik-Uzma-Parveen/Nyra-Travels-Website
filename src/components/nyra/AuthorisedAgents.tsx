import { motion } from "framer-motion";
import { Bus, ShieldCheck } from "lucide-react";

const agents = [
  { name: "Skyline Express", icon: Bus },
  { name: "Intercity Smart Bus", icon: Bus },
  { name: "Royal Travels", icon: Bus },
];

const AuthorisedAgents = () => {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-success mb-3">Trusted Partners</p>
        <h2 className="text-4xl md:text-5xl font-black mb-12">
          <span className="gradient-text">Authorised Agents</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-6 perspective-1000">
          {agents.map((agent, i) => (
            <motion.div
              key={agent.name}
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, rotateY: 8, scale: 1.05 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass-card rounded-2xl px-8 py-6 flex items-center gap-4 min-w-[240px]"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-foreground text-lg">{agent.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuthorisedAgents;
