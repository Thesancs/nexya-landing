"use client"

import { useState } from "react"
import Link from "next/link"
import { NexyaLogo } from "@/components/nexya-logo"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard, 
  Activity,
  Bot,
  Vote,
  Users, 
  UserCog, 
  Eye, 
  Headphones, 
  MessageSquare, 
  HelpCircle,
  Search,
  Mic,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  SlidersHorizontal
} from "lucide-react"

const navItems = [
  { icon: LayoutDashboard, label: "Painel", href: "/painel" },
  { icon: Bot, label: "Agentes", href: "/agentes" },
  { icon: Vote, label: "Campanhas", href: "/campanhas" },
  { icon: Activity, label: "Monitoramento", href: "/monitoramento" },
  { icon: Users, label: "SDR", href: "/sdr" },
  { icon: SlidersHorizontal, label: "Prospecção Avançada", href: "/prospeccao-avancada" },
  { icon: UserCog, label: "CRM", href: "/crm" },
  { icon: Eye, label: "VISUAL", href: "/visual" },
  { icon: Headphones, label: "CALLCENTER", href: "/callcenter" },
  { icon: MessageSquare, label: "ATENDIMENTO", href: "/atendimento" },
  { icon: HelpCircle, label: "SUPORTE", href: "/suporte" },
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile hamburger trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-card border border-border text-foreground lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside 
      className={`fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-transform duration-300 z-50 w-64 ${
        collapsed ? "lg:w-20" : "lg:w-64"
      } ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
    >
      {/* Mobile close button */}
      <button
        onClick={() => setMobileOpen(false)}
        className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground lg:hidden"
        aria-label="Fechar menu"
      >
        <X className="h-5 w-5" />
      </button>
      {/* Logo */}
      <div className="p-6 flex items-center justify-between">
        {!collapsed && <NexyaLogo className="h-8 w-auto text-primary" />}
        {collapsed && <NexyaLogo className="h-6 w-6 text-primary mx-auto" />}
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-4 mb-6">
          <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
            />
            <Mic className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                } ${collapsed ? "justify-center" : ""}`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-border">
        <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg">
              N
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
          </div>
          {!collapsed && (
            <div>
              <p className="font-medium text-foreground">Nexya</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Button (desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-primary text-primary-foreground rounded-full hidden lg:flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
    </>
  )
}
