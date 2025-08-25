import { EventRegistrationForm } from "@/components/ui/event-registration-form";


export default function Home() {
  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold text-foreground mb-4">Future Tech Conference</h1>
          <p className="text-muted-foreground text-lg">Event Id: 68ac122b6455a8cd5a528f2</p>
        </div>
        <EventRegistrationForm />
      </div>
    </main>
  )
}