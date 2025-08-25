"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Copy } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const name = searchParams.get("name") || "Participant"
  const trackingId = searchParams.get("trackingId") || "N/A"
  const applicationLink = `https://application.example.com/apply?tracking=${trackingId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(applicationLink)
      setCopied(true)
      toast({
        title: "Link Copied!",
        description: "Application link has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Please manually copy the link below.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="font-playfair text-3xl text-green-700">Registration Successful!</CardTitle>
          <CardDescription className="text-lg">Thank you for registering, {name}!</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              Your registration has been confirmed. You'll receive a confirmation email shortly with all the event
              details.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">Your Tracking ID:</p>
              <p className="font-mono text-lg font-semibold">{trackingId}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-playfair text-xl font-semibold mb-4 text-center">Next Steps</h3>

            <div className="space-y-4">
              <p className="text-muted-foreground text-center">
                Complete your application using your personalized link below:
              </p>

              <div className="bg-gradient-to-r from-cyan-50 to-pink-50 p-4 rounded-lg border">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">Your Personal Application Link:</p>
                    <p className="text-sm font-mono text-black bg-white p-2 rounded border break-all">{applicationLink}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={copyToClipboard} className="shrink-0 bg-transparent">
                    {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-cyan-600 to-pink-600 hover:from-cyan-700 hover:to-pink-700 text-white"
                >
                  <a href={applicationLink} target="_blank" rel="noopener noreferrer">
                    Open Application Form
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                <Button variant="outline" asChild>
                  <a href="/">Return to Home</a>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground border-t pt-4">
            <p>
              Keep your tracking ID safe - you'll need it to check your application status. If you have any questions,
              please contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}