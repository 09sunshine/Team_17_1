import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Users, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto max-w-7xl px-4 relative">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-space-grotesk font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight mb-6">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Events</span> Near
            You
          </h1>
          <p className="font-dm-sans text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with like-minded people, explore new experiences, and create unforgettable memories at the most
            exciting events in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 group">
              Explore Events
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              Create Event
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-space-grotesk font-bold">500+</div>
              <div className="text-sm text-muted-foreground">Events Monthly</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div className="text-2xl font-space-grotesk font-bold">10K+</div>
              <div className="text-sm text-muted-foreground">Active Members</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="text-2xl font-space-grotesk font-bold">50+</div>
              <div className="text-sm text-muted-foreground">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
