"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCard } from "@/components/dashboard/stat-card"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { SalesProfile } from "@/components/dashboard/sales-profile"
import { WalletCard } from "@/components/dashboard/wallet-card"
import { EmployeesCard } from "@/components/dashboard/employees-card"
import { DateFilters } from "@/components/dashboard/date-filters"
import { MessageSquare, Phone, Target, XCircle } from "lucide-react"

const stats = [
  {
    icon: MessageSquare,
    title: "Leads",
    highlight: "Whatsapp",
    value: 29,
    total: 37,
    percentage: 80,
    progressColor: "#22d3ee"
  },
  {
    icon: Phone,
    title: "Leads",
    highlight: "Ligação",
    value: 29,
    total: 37,
    percentage: 80,
    progressColor: "#22d3ee"
  },
  {
    icon: Target,
    title: "Oportunidades",
    value: 29,
    total: 37,
    percentage: 80,
    progressColor: "#22d3ee"
  },
  {
    icon: XCircle,
    title: "Falhas",
    highlight: "Comunicação",
    value: 20,
    total: 1000,
    percentage: 2,
    progressColor: "#f472b6"
  },
]

export default function PainelPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      
      <div className="lg:ml-64 transition-all duration-300">
        <DashboardHeader />
        
        <main className="p-4 sm:p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">
              Painel de <span className="text-muted-foreground font-normal">Controle</span>
            </h1>
          </div>

          {/* Date Filters */}
          <div className="mb-8">
            <DateFilters />
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                highlight={stat.highlight}
                value={stat.value}
                total={stat.total}
                percentage={stat.percentage}
                progressColor={stat.progressColor}
              />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <SalesChart />
            </div>
            <div>
              <SalesProfile />
            </div>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WalletCard />
            <EmployeesCard />
          </div>
        </main>
      </div>
    </div>
  )
}
