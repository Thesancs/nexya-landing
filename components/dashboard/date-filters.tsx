"use client"

import { ChevronDown } from "lucide-react"

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Sep", "Out", "Nov", "Dez"]
const years = ["2023", "2024", "2025", "2026"]

export function DateFilters() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Start Date */}
      <div className="flex items-center gap-2">
        <select className="bg-secondary text-foreground rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-secondary/80 transition-colors border border-border">
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select className="bg-primary text-primary-foreground rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-primary/90 transition-colors">
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {/* Filter Button */}
      <button className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors">
        Filtrar
      </button>

      {/* End Date */}
      <div className="flex items-center gap-2">
        <select className="bg-secondary text-foreground rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-secondary/80 transition-colors border border-border">
          {months.map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <select className="bg-primary text-primary-foreground rounded-lg px-4 py-2 pr-8 appearance-none cursor-pointer hover:bg-primary/90 transition-colors">
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
