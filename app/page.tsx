import Hero from "@/components/home/hero"
import VideoShowcase from "@/components/home/video-showcase"
import AboutSection from "@/components/home/about-section"
import EventHighlights from "@/components/home/event-highlights"
import ContactSection from "@/components/contact-section"
import type { Metadata } from "next"
import TeanSection from "@/components/team/team-section"
import SpeakersSection from "@/components/speakers/speakers-section"

export const metadata: Metadata = {
  title: "TEDxBeixinqiao - Innovation Illustrated",
  description:
    "TEDxBeixinqiao is an independently organized TED event that took place in Beijing, bringing people together to share ideas worth spreading.",
}

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <AboutSection />
      <VideoShowcase />
      <EventHighlights />
      <TeanSection />
      <SpeakersSection />
      <ContactSection />
    </div>
  )
}
