'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Settings,
  Menu
} from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
      {/* Sidebar */}
      <div className={cn(
        "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 h-screen px-6 pt-8 pb-6 border-r-2 border-slate-700/70 relative flex flex-col shadow-2xl transition-all duration-300 ease-in-out backdrop-blur-lg",
        collapsed ? "w-20" : "w-72"
      )}>
        <div className="flex items-center justify-between mb-10 p-3 rounded-xl bg-slate-800/30 border border-slate-600/50">
          {!collapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white">Admin Panel</span>
                <p className="text-xs text-slate-300 mt-1">Event Management</p>
              </div>
            </div>
          )}
          <Button 
            variant="ghost" 
            className={cn(
              "p-2 hover:bg-slate-700/60 transition-all duration-200 rounded-xl border border-slate-600/30 hover:border-slate-500 text-white hover:text-indigo-200",
              collapsed ? "mx-auto" : "ml-auto"
            )}
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1">
          <nav className="space-y-3">
            <Link href="/admin">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-purple-600/30 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/40 text-white hover:text-indigo-200 h-12 shadow-sm hover:shadow-lg"
              >
                <LayoutDashboard className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-4"
                )}/>
                {!collapsed && <span className="font-medium">Dashboard</span>}
              </Button>
            </Link>
            <Link href="/admin/events">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-purple-600/30 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/40 text-white hover:text-indigo-200 h-12 shadow-sm hover:shadow-lg"
              >
                <Calendar className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-4"
                )}/>
                {!collapsed && <span className="font-medium">Events</span>}
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-purple-600/30 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/40 text-white hover:text-indigo-200 h-12 shadow-sm hover:shadow-lg"
              >
                <Users className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-4"
                )}/>
                {!collapsed && <span className="font-medium">Users</span>}
              </Button>
            </Link>
            <Link href="/admin/settings">
              <Button 
                variant="ghost" 
                className="w-full justify-start hover:bg-gradient-to-r hover:from-indigo-600/30 hover:to-purple-600/30 transition-all duration-200 rounded-xl border border-transparent hover:border-indigo-500/40 text-white hover:text-indigo-200 h-12 shadow-sm hover:shadow-lg"
              >
                <Settings className={cn(
                  "h-5 w-5",
                  collapsed ? "mx-auto" : "mr-4"
                )}/>
                {!collapsed && <span className="font-medium">Settings</span>}
              </Button>
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t-2 border-slate-700/70">
          <div className="flex items-center p-4 rounded-xl bg-slate-800/40 hover:bg-slate-700/40 transition-all duration-200 border border-slate-600/40 hover:border-slate-500/60 cursor-pointer group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-200">
              <Users className="h-6 w-6 text-white" />
            </div>
            {!collapsed && (
              <div className="ml-4 flex-1">
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">Admin User</p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">admin@example.com</p>
              </div>
            )}
            {!collapsed && (
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}