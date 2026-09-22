"use client"

import { Bell, MessageSquare, Settings, ChevronDown } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-end pl-16 pr-4 sm:px-6 gap-2 sm:gap-4 lg:pl-6">
      {/* Notification Icons */}
      <div className="flex items-center gap-1 bg-secondary rounded-full px-4 py-2">
        <button className="p-2 hover:bg-card rounded-full transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button className="p-2 hover:bg-card rounded-full transition-colors">
          <MessageSquare className="w-5 h-5 text-muted-foreground" />
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button className="p-2 hover:bg-card rounded-full transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* User Profile */}
      <button className="flex items-center gap-3 bg-secondary rounded-full pl-2 pr-4 py-2 hover:bg-secondary/80 transition-colors">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm">
          W
        </div>
        <span className="text-foreground font-medium">Wanderlei</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>
    </header>
  )
}
