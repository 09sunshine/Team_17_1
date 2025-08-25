import { EventCard } from "@/components/event-card"

const events = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "San Francisco, CA",
    description:
      "Join industry leaders and innovators for a day of cutting-edge technology discussions, networking, and breakthrough announcements.",
    image: "/tech-conference-modern-stage.png",
    category: "Technology",
    attendees: 250,
  },
  {
    id: 2,
    title: "Creative Design Workshop",
    date: "2024-03-18",
    time: "02:00 PM",
    location: "New York, NY",
    description:
      "Hands-on workshop covering the latest design trends, tools, and techniques. Perfect for designers looking to enhance their skills.",
    image: "/creative-design-workshop-colorful.png",
    category: "Design",
    attendees: 80,
  },
  {
    id: 3,
    title: "Startup Pitch Competition",
    date: "2024-03-22",
    time: "06:00 PM",
    location: "Austin, TX",
    description:
      "Watch promising startups pitch their ideas to investors and industry experts. Network with entrepreneurs and potential collaborators.",
    image: "/placeholder-23ml6.png",
    category: "Business",
    attendees: 180,
  },
  {
    id: 4,
    title: "Music Festival: Spring Vibes",
    date: "2024-03-25",
    time: "04:00 PM",
    location: "Los Angeles, CA",
    description:
      "Experience an unforgettable evening of live music featuring local and international artists across multiple genres.",
    image: "/placeholder-o00z3.png",
    category: "Music",
    attendees: 500,
  },
  {
    id: 5,
    title: "Culinary Arts Masterclass",
    date: "2024-03-28",
    time: "11:00 AM",
    location: "Chicago, IL",
    description:
      "Learn from renowned chefs in this intensive cooking masterclass. Discover new techniques and create amazing dishes.",
    image: "/placeholder-e9ue2.png",
    category: "Food",
    attendees: 40,
  },
  {
    id: 6,
    title: "Digital Marketing Conference",
    date: "2024-04-02",
    time: "09:30 AM",
    location: "Miami, FL",
    description:
      "Stay ahead of digital marketing trends with expert insights, case studies, and networking opportunities with industry professionals.",
    image: "/placeholder-5psms.png",
    category: "Marketing",
    attendees: 320,
  },
]

export function EventsSection() {
  return (
    <section className="py-20 bg-muted/30" id="events">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="font-space-grotesk font-bold text-3xl sm:text-4xl lg:text-5xl mb-4">Upcoming Events</h2>
          <p className="font-dm-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover exciting events happening near you. From tech conferences to creative workshops, find your next
            adventure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
