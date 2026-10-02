import { SEOHead } from "@/components/SEOHead";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StoryImpact } from "@/components/StoryImpact";
import { ArtistLineUp } from "@/components/ArtistLineUp";
import { VipProgramProvider, VipProgramCards, VipProgramDetails, EarlyBirdBanner } from "@/components/VipProgram";
import { TimelineGallery } from "@/components/TimelineGallery";
import { RegistrationPortal } from "@/components/RegistrationPortal";
import { IslandExodusSection } from "@/components/IslandExodusSection";
import { ContactForm } from "@/components/ContactForm";

export default function Home() {
  const homeStructuredData = {
    '@context': 'https://schema.org',
    '@type': ['TouristInformationCenter', 'Event'],
    name: 'Getting Funky in Jamaica | Jan 14-18, 2027',
    url: 'https://gettingfunkyinjamaica.com',
    description: 'Join the Trombone Shorty Foundation, Cimafunk, and Hidden Rhythms for Getting Funky in Jamaica. A curated cultural journey and high-energy musical exchange in Kingston, Jamaica.',
    startDate: '2027-01-14',
    endDate: '2027-01-18',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: 'Kingston, Jamaica',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kingston',
        addressCountry: 'JM',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Hidden Rhythms & Trombone Shorty Foundation',
      url: 'https://gettingfunkyinjamaica.com',
    },
    performer: [
      { '@type': 'MusicGroup', name: 'Trombone Shorty' },
      { '@type': 'MusicGroup', name: 'Cimafunk' },
    ],
    knowsAbout: [
      'Reggae Music',
      'Jamaican Nightlife',
      'New Orleans Funk',
      'Afro-Cuban Rhythms',
      'Youth Mentorship',
    ],
  };

  return (
    <>
      <SEOHead
        title="Getting Funky in Jamaica | Jan 14-18, 2027 - Reggae, Funk & Island Culture"
        description="Join Trombone Shorty Foundation, Cimafunk, and Hidden Rhythms for Getting Funky in Jamaica. Experience vibrant Kingston reggae, live funk jams, luxury cultural travel, and youth music exchanges."
        canonicalUrl="https://gettingfunkyinjamaica.com"
        ogImage="https://gettingfunkyinjamaica.com/card_1_star_power.png"
        structuredData={homeStructuredData}
      />
      <main className="min-h-screen bg-brand-green selection:bg-brand-gold selection:text-brand-green overflow-hidden">
        <VipProgramProvider>
          <Navbar />
          <Hero />
          <StoryImpact />
          <VipProgramCards />
          <EarlyBirdBanner isClickable={true} />
          <VipProgramDetails />
          <ArtistLineUp />
          <TimelineGallery />
          <RegistrationPortal />
          <IslandExodusSection />
          <ContactForm />
        </VipProgramProvider>
      </main>
    </>
  );
}
