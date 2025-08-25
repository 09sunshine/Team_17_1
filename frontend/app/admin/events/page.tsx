"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Eye, 
  Download,
  Search,
  Filter,
  User,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  CreditCard,
  UserCheck,
  UserX,
  Upload
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Member {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  avatar?: string;
  status: "confirmed" | "pending" | "cancelled" | "waitlist";
  checkInStatus: "checked-in" | "not-checked-in";
  lastActivity: string;
}

interface Event {
  id: string;
  eventName: string;
  domain: string;
  date: string;
  location: string;
  description: string;
  color: string;
  members: Member[];
  totalRegistrations: number;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockEvents: Event[] = [
      {
        id: "evt_1",
        eventName: "AI Innovation Summit",
        domain: "Technology",
        date: "2025-09-15",
        location: "Tech Hub, Building A",
        description: "Exploring the future of artificial intelligence",
        color: "#6366f1",
        totalRegistrations: 45,
        members: [
          {
            id: "mem_1",
            name: "John Doe",
            email: "john@example.com",
            registeredAt: "2025-08-20T10:30:00Z",
            status: "confirmed",
            checkInStatus: "checked-in",
            lastActivity: "2025-08-25T09:15:00Z"
          },
          {
            id: "mem_2",
            name: "Jane Smith",
            email: "jane@example.com",
            registeredAt: "2025-08-21T14:15:00Z",
            status: "pending",
            checkInStatus: "not-checked-in",
            lastActivity: "2025-08-24T16:45:00Z"
          },
          {
            id: "mem_3",
            name: "Alex Johnson",
            email: "alex@example.com",
            registeredAt: "2025-08-22T09:45:00Z",
            status: "confirmed",
            checkInStatus: "not-checked-in",
            lastActivity: "2025-08-25T08:30:00Z"
          }
        ]
      },
      {
        id: "evt_2",
        eventName: "Robotics Workshop",
        domain: "Engineering",
        date: "2025-09-22",
        location: "Lab 101, Engineering Block",
        description: "Hands-on robotics programming session",
        color: "#10b981",
        totalRegistrations: 28,
        members: [
          {
            id: "mem_4",
            name: "Sarah Wilson",
            email: "sarah@example.com",
            registeredAt: "2025-08-23T11:20:00Z",
            status: "confirmed",
            checkInStatus: "not-checked-in",
            lastActivity: "2025-08-25T07:45:00Z"
          },
          {
            id: "mem_5",
            name: "Mike Brown",
            email: "mike@example.com",
            registeredAt: "2025-08-24T16:30:00Z",
            status: "waitlist",
            checkInStatus: "not-checked-in",
            lastActivity: "2025-08-24T18:20:00Z"
          }
        ]
      },
      {
        id: "evt_3",
        eventName: "Data Science Bootcamp",
        domain: "Computer Science",
        date: "2025-10-05",
        location: "Conference Hall B",
        description: "Comprehensive data science training program",
        color: "#f59e0b",
        totalRegistrations: 67,
        members: [
          {
            id: "mem_6",
            name: "Emily Davis",
            email: "emily@example.com",
            registeredAt: "2025-08-25T08:15:00Z",
            status: "confirmed",
            checkInStatus: "not-checked-in",
            lastActivity: "2025-08-25T10:30:00Z"
          }
        ]
      }
    ];
    setEvents(mockEvents);
  }, []);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = selectedDomain === "all" || event.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  const domains = ["all", "Technology", "Engineering", "Computer Science", "Science", "Mathematics", "Robotics"];

  const toggleEventExpansion = (eventId: string) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const getStatusBadge = (status: Member['status']) => {
    const statusConfig = {
      confirmed: { icon: CheckCircle, color: "bg-green-600", text: "Confirmed" },
      pending: { icon: Clock, color: "bg-yellow-600", text: "Pending" },
      cancelled: { icon: XCircle, color: "bg-red-600", text: "Cancelled" },
      waitlist: { icon: AlertCircle, color: "bg-blue-600", text: "Waitlist" }
    };
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        <IconComponent className="h-3 w-3" />
        {config.text}
      </span>
    );
  };

  const getCheckInBadge = (status: Member['checkInStatus']) => {
    const statusConfig = {
      "checked-in": { icon: UserCheck, color: "bg-green-600", text: "Checked In" },
      "not-checked-in": { icon: UserX, color: "bg-gray-600", text: "Not Checked In" }
    };
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${config.color}`}>
        <IconComponent className="h-3 w-3" />
        {config.text}
      </span>
    );
  };

  const getEventStats = (event: Event) => {
    const confirmed = event.members.filter(m => m.status === 'confirmed').length;
    const pending = event.members.filter(m => m.status === 'pending').length;
    const checkedIn = event.members.filter(m => m.checkInStatus === 'checked-in').length;
    
    return { confirmed, pending, checkedIn };
  };

  const exportMembersList = (event: Event) => {
    const csvContent = [
      "Name,Email,Registration Date",
      ...event.members.map(member => 
        `${member.name},${member.email},${new Date(member.registeredAt).toLocaleDateString()}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.eventName.replace(/\s+/g, '_')}_members.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Events Management</h1>
            <p className="text-slate-400 mt-1">View and manage all events and registrations</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="bg-slate-700 text-white">
              {filteredEvents.length} Events
            </Badge>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="border-2 border-slate-600 bg-slate-800/50 backdrop-blur-lg">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-900 border-2 border-slate-600 !text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-slate-400 h-4 w-4" />
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-slate-900 border-2 border-slate-600 text-white rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
                >
                  {domains.map(domain => (
                    <option key={domain} value={domain}>
                      {domain === "all" ? "All Domains" : domain}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events List */}
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="border-2 border-slate-600 bg-slate-800/50 backdrop-blur-lg shadow-xl">
              <CardHeader className="border-b-2 border-slate-600">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: event.color }}
                      />
                      <CardTitle className="text-xl font-bold text-white">
                        {event.eventName}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className="border-slate-500 text-slate-300"
                      >
                        {event.domain}
                      </Badge>
                    </div>
                    <p className="text-slate-400 text-sm">{event.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportMembersList(event)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Attendance
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportMembersList(event)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleEventExpansion(event.id)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      {expandedEvent === event.id ? "Hide" : "View"} Members
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                {/* Event Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{event.totalRegistrations} Registrations</span>
                  </div>
                </div>

                {/* Event Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-slate-900/30 rounded-lg border border-slate-600">
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">{getEventStats(event).confirmed}</div>
                    <div className="text-xs text-slate-400">Confirmed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">{getEventStats(event).pending}</div>
                    <div className="text-xs text-slate-400">Pending</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-400">{getEventStats(event).checkedIn}</div>
                    <div className="text-xs text-slate-400">Checked In</div>
                  </div>
                </div>

                {/* Members List */}
                {expandedEvent === event.id && (
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-white border-b border-slate-600 pb-2">
                      Registered Members ({event.members.length})
                    </h4>
                    {event.members.length > 0 ? (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {event.members.map((member) => (
                          <div 
                            key={member.id}
                            className="p-4 bg-slate-900/50 rounded-lg border border-slate-600 space-y-3"
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {member.name}
                                </p>
                                <p className="text-xs text-slate-400 truncate">
                                  {member.email}
                                </p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex flex-wrap gap-2">
                                {getStatusBadge(member.status)}
                                {getCheckInBadge(member.checkInStatus)}
                              </div>
                              
                              <div className="text-xs text-slate-500 space-y-1">
                                <div>Registered: {new Date(member.registeredAt).toLocaleDateString()}</div>
                                <div>Last Activity: {new Date(member.lastActivity).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-400 text-center py-8">
                        No members registered yet
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <Card className="border-2 border-slate-600 bg-slate-800/50 backdrop-blur-lg">
            <CardContent className="pt-8 pb-8">
              <div className="text-center">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No events found</p>
                <p className="text-slate-500 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}