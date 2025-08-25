"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import QRCode from "qrcode";
import { SignedIn,UserButton } from "@clerk/nextjs";

interface EventData {
  eventName: string;
  domain: string;
  date: string;
  location: string;
  description: string;
  color: string;
}

export default function AdminDashboard() {
  const [eventData, setEventData] = useState<EventData>({
    eventName: "",
    domain: "",
    date: "",
    location: "",
    description: "",
    color: "#6366f1",
  });

  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [eventId, setEventId] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const domains = [
    "Science",
    "Technology",
    "Engineering",
    "Mathematics",
    "Computer Science",
    "Robotics",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEventId = `evt_${Date.now()}`;
    setEventId(newEventId);
    
    console.log("Event Data:", eventData);
    setEventData({
      eventName: "",
      domain: "",
      date: "",
      location: "",
      description: "",
      color: "#6366f1",
    });
  };

  const generateQRCode = async () => {
    if (!eventId) {
      alert("Please create an event first!");
      return;
    }

    try {
      // Registration form URL for the event
      const registrationUrl = `${window.location.origin}/register/${eventId}`;
      
      const canvas = canvasRef.current;
      if (canvas) {
        await QRCode.toCanvas(canvas, registrationUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        });

        const dataUrl = canvas.toDataURL();
        setQrCodeUrl(dataUrl);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.download = `event-${eventId}-qr.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-4">
      
      <div className="w-full max-w-7xl space-y-8">
        <div className="flex justify-end">
            <SignedIn>
              <UserButton />
            </SignedIn>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Event Form */}
          <Card className="border-2 border-slate-600 bg-slate-800/50 backdrop-blur-lg shadow-2xl">
            <CardHeader className="border-b-2 border-slate-600 bg-gradient-to-r from-slate-700 to-slate-800 rounded-t-xl">
              <CardTitle className="text-2xl font-bold text-white tracking-tight">Add New Event</CardTitle>
            </CardHeader>
          <CardContent className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="eventName" className="block text-sm font-medium text-slate-300">Event Name</label>
                  <Input
                    id="eventName"
                    value={eventData.eventName}
                    onChange={(e) => setEventData({ ...eventData, eventName: e.target.value })}
                    required
                    className="w-full bg-slate-900 border-2 border-slate-600 !text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg [&>input]:text-white"
                    placeholder="Enter event name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="domain" className="block text-sm font-medium text-slate-300">Domain</label>
                  <Select
                    value={eventData.domain}
                    onValueChange={(value) => setEventData({ ...eventData, domain: value })}
                  >
                    <SelectTrigger className="w-full bg-slate-900 border-2 border-slate-600 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg [&>span]:text-white">
                      <SelectValue placeholder="Select a domain" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-2 border-slate-600 text-white">
                      {domains.map((domain) => (
                        <SelectItem 
                          key={domain} 
                          value={domain}
                          className="hover:bg-slate-700 cursor-pointer text-white"
                        >
                          {domain}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="date" className="block text-sm font-medium text-slate-300">Date</label>
                  <Input
                    id="date"
                    type="date"
                    value={eventData.date}
                    onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                    required
                    className="w-full bg-slate-900 border-2 border-slate-600 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-datetime-edit]:text-white [&::-webkit-datetime-edit-text]:text-white [&::-webkit-datetime-edit-day-field]:text-white [&::-webkit-datetime-edit-month-field]:text-white [&::-webkit-datetime-edit-year-field]:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-slate-300">Location</label>
                  <Input
                    id="location"
                    value={eventData.location}
                    onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                    required
                    className="w-full bg-slate-900 border-2 border-slate-600 !text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg"
                    placeholder="Event location"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300">Description</label>
                  <Input
                    id="description"
                    value={eventData.description}
                    onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                    required
                    className="w-full bg-slate-900 border-2 border-slate-600 !text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 transition-all rounded-lg"
                    placeholder="Describe the event"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="color" className="block text-sm font-medium text-slate-300">Event Color</label>
                  <Input
                    id="color"
                    type="color"
                    value={eventData.color}
                    onChange={(e) => setEventData({ ...eventData, color: e.target.value })}
                    className="w-16 h-10 p-0 border-2 border-slate-600 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button 
                  type="submit" 
                  style={{ backgroundColor: eventData.color }}
                  className="w-full text-white hover:opacity-90 transition-colors shadow-lg font-semibold text-lg rounded-lg border-2 border-transparent hover:border-white/20"
                >
                  Add Event
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border-2 border-slate-600 bg-slate-800/50 backdrop-blur-lg shadow-2xl">
          <CardHeader className="border-b-2 border-slate-600 bg-gradient-to-r from-slate-700 to-slate-800 rounded-t-xl">
            <CardTitle className="text-2xl font-bold text-white tracking-tight">Event QR Code</CardTitle>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="space-y-6 text-center">
              {eventId && (
                <div className="p-4 bg-slate-900 rounded-lg border-2 border-slate-600">
                  <p className="text-sm text-slate-300 mb-2">Event ID:</p>
                  <p className="text-white font-mono text-sm break-all">{eventId}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <Button 
                  onClick={generateQRCode}
                  disabled={!eventId}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg border-2 border-transparent hover:border-white/20 transition-all disabled:opacity-50"
                >
                  Generate QR Code
                </Button>

                <div className="flex justify-center">
                  <canvas 
                    ref={canvasRef} 
                    className="border-2 border-slate-600 rounded-lg bg-white"
                    style={{ display: qrCodeUrl ? 'block' : 'none' }}
                  />
                </div>

                {qrCodeUrl && (
                  <Button 
                    onClick={downloadQRCode}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg border-2 border-transparent hover:border-white/20 transition-all"
                  >
                    Download QR Code
                  </Button>
                )}
              </div>

              {!eventId && (
                <p className="text-slate-400 text-sm">Create an event first to generate a QR code</p>
              )}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}