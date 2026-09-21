import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/nyra/Header";
import HeroSection from "@/components/nyra/HeroSection";
import ScrollJourney from "@/components/nyra/ScrollJourney";
import ServicesSection from "@/components/nyra/ServicesSection";
import DevotionalSection from "@/components/nyra/DevotionalSection";
import AuthorisedAgents from "@/components/nyra/AuthorisedAgents";
import ContactSection from "@/components/nyra/ContactSection";
import FooterSection from "@/components/nyra/FooterSection";
import WhatsAppButton from "@/components/nyra/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nyra Travels — Flights, Cargo & Pilgrimage Packages" },
      { name: "description", content: "Nyra Travels offers domestic & international flight bookings, cargo services, and curated devotional tour packages." },
      { property: "og:title", content: "Nyra Travels" },
      { property: "og:description", content: "Travel · Cargo · Pilgrimage — crafted with care." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative">
      <ScrollJourney />
      <Header />
      <div className="relative z-10">
        <HeroSection />
        <ServicesSection />
        <DevotionalSection />
        <AuthorisedAgents />
        <ContactSection />
        <FooterSection />
      </div>
      <WhatsAppButton />
    </div>
  );
}
