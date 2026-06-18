import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StoryImpact } from "@/components/StoryImpact";
import { ArtistLineUp } from "@/components/ArtistLineUp";
import { VipProgram } from "@/components/VipProgram";
import { TimelineGallery } from "@/components/TimelineGallery";
import { RegistrationPortal } from "@/components/RegistrationPortal";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-green selection:bg-brand-gold selection:text-brand-green overflow-hidden">
      <Navbar />
      <Hero />
      <StoryImpact />
      <ArtistLineUp />
      <VipProgram />
      <TimelineGallery />
      <RegistrationPortal />
      <ContactForm />
    </main>
  );
}
