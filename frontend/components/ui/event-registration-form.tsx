"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  name: string
  email: string
  phone: string
  college: string
  year: string
  fieldOfStudy: string
  dietaryRestrictions: string
  emergencyContact: string
  emergencyPhone: string
  agreeToTerms: boolean
}

export function EventRegistrationForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    college: "",
    year: "",
    fieldOfStudy: "",
    dietaryRestrictions: "",
    emergencyContact: "",
    emergencyPhone: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateTrackingId = () => {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substring(2, 8)
    return `EVT-${timestamp}-${randomStr}`.toUpperCase()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Form submission started")
    console.log("[v0] Form data:", formData)

    setIsSubmitting(true)

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.college ||
      !formData.year ||
      !formData.fieldOfStudy
    ) {
      console.log("[v0] Validation failed - missing required fields")
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!formData.agreeToTerms) {
      console.log("[v0] Validation failed - terms not agreed")
      toast({
        title: "Terms Required",
        description: "Please agree to the terms and conditions.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    try {
      // Simulate API call
      console.log("[v0] Simulating API call...")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const trackingId = generateTrackingId()
      console.log("[v0] Generated tracking ID:", trackingId)

      // Store registration data (in real app, this would be saved to database)
      console.log("[v0] Registration submitted:", { ...formData, trackingId })

      // Redirect to thank you page with user data
      const params = new URLSearchParams({
        name: formData.name,
        trackingId: trackingId,
      })

      console.log("[v0] Redirecting to thank you page with params:", params.toString())
      router.push(`/thank-you?${params.toString()}`)
    } catch (error) {
      console.log("[v0] Error during submission:", error)
      toast({
        title: "Submission Error",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-playfair text-2xl">Event Registration</CardTitle>
        <CardDescription>Please fill out all required fields to complete your registration</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-foreground border-b border-border pb-2">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium">
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-foreground border-b border-border pb-2">
              Academic Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="college" className="text-sm font-medium">
                College/University *
              </Label>
              <Input
                id="college"
                type="text"
                placeholder="Enter your institution name"
                value={formData.college}
                onChange={(e) => handleInputChange("college", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium">
                  Academic Year *
                </Label>
                <Select value={formData.year} onValueChange={(value) => handleInputChange("year", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman</SelectItem>
                    <SelectItem value="sophomore">Sophomore</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate Student</SelectItem>
                    <SelectItem value="phd">PhD Student</SelectItem>
                    <SelectItem value="faculty">Faculty</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy" className="text-sm font-medium">
                  Field of Study *
                </Label>
                <Input
                  id="fieldOfStudy"
                  type="text"
                  placeholder="e.g., Computer Science, Biology"
                  value={formData.fieldOfStudy}
                  onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="space-y-4">
            <h3 className="font-playfair text-lg font-semibold text-foreground border-b border-border pb-2">
              Additional Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions" className="text-sm font-medium">
                Dietary Restrictions or Allergies
              </Label>
              <Textarea
                id="dietaryRestrictions"
                placeholder="Please list any dietary restrictions, allergies, or special accommodations needed"
                value={formData.dietaryRestrictions}
                onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="emergencyContact" className="text-sm font-medium">
                  Emergency Contact Name
                </Label>
                <Input
                  id="emergencyContact"
                  type="text"
                  placeholder="Contact person's name"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergencyPhone" className="text-sm font-medium">
                  Emergency Contact Phone
                </Label>
                <Input
                  id="emergencyPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm leading-relaxed">
                I agree to the terms and conditions and understand that this registration is binding. I consent to the
                collection and use of my personal information for event purposes.
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 cursor-pointer"
            disabled={isSubmitting}
            onClick={() => window.location.href = "/form/thank-you"}
          >
            {isSubmitting ? "Submitting Registration..." : "Complete Registration"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}