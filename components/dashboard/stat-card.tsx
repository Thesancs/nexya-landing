"use client"

import { CircularProgress } from "./circular-progress"
import { type LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: LucideIcon
  title: string
  highlight?: string
  value: number
  total: number
  percentage: number
  progressColor?: string
}

export function StatCard({ 
  icon: Icon, 
  title, 
  highlight,
  value, 
  total, 
  percentage,
  progressColor = "#22d3ee"
}: StatCardProps) {
  return (
    <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-5 border border-border/50 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">
              {title}
              {highlight && <span className="text-foreground font-medium">-{highlight}</span>}
            </p>
          </div>
        </div>
        <CircularProgress percentage={percentage} color={progressColor} />
      </div>
      <div className="mt-4">
        <p className="text-4xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">de {total} total</p>
      </div>
    </div>
  )
}
