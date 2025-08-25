import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  category: string
  attendees: number
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            width={400}
            height={200}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
              {event.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <h3 className="font-space-grotesk font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            <span>
              {formatDate(event.date)} at {event.time}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2 text-primary" />
            <span>{event.attendees} attendees</span>
          </div>
        </div>

        <p className="font-dm-sans text-sm text-muted-foreground line-clamp-3 leading-relaxed">{event.description}</p>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button className="w-full group/btn">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
