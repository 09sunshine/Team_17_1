import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EventsSection } from "@/components/events-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <EventsSection />
      </main>
      <Footer />
    </div>
  )
}
