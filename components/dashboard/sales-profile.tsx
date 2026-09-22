"use client"

import { BarChart3, MoreVertical } from "lucide-react"
import { CircularProgress } from "./circular-progress"

const metrics = [
  { 
    label: "Em Processamento", 
    value: 150, 
    percentage: 15, 
    description: "sendo processadas",
    color: "#22d3ee"
  },
  { 
    label: "Concluídas", 
    value: 300, 
    percentage: 80, 
    description: "sendo processadas",
    color: "#22d3ee"
  },
  { 
    label: "Falhas", 
    value: 30, 
    percentage: 5, 
    description: "Falhas nas Vendas",
    color: "#f472b6"
  },
]

export function SalesProfile() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Perfil de Vendas</h3>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-6">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <p className="text-sm text-muted-foreground mb-2">
              {metric.label.split(' ')[0]} <span className="text-foreground">{metric.label.split(' ').slice(1).join(' ')}</span>
            </p>
            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-foreground">{metric.value}</p>
              <CircularProgress percentage={metric.percentage} size={40} color={metric.color} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
