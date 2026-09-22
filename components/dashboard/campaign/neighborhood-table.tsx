"use client"

import { MapPin } from "lucide-react"
import {
  type City,
  PROBLEM_COLORS,
  PROBLEM_LABELS,
  REJECTION_COLOR,
  neighborhoodMainProblem,
} from "@/lib/campaign-data"

interface NeighborhoodTableProps {
  city: City
}

export function NeighborhoodTable({ city }: NeighborhoodTableProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <MapPin className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Detalhe por Bairro</h3>
          <p className="text-sm text-muted-foreground">{city.name}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th className="pb-3 font-medium">Bairro</th>
              <th className="pb-3 font-medium">Ligações</th>
              <th className="pb-3 font-medium">Principal problema</th>
              <th className="pb-3 font-medium">Aprovação</th>
              <th className="pb-3 font-medium">Rejeição</th>
            </tr>
          </thead>
          <tbody>
            {city.neighborhoods.map((n) => {
              const problem = neighborhoodMainProblem(n)
              const aprovaPct = Math.round((n.aprova / n.ligacoes) * 100)
              const rejeitaPct = Math.round((n.rejeita / n.ligacoes) * 100)
              return (
                <tr key={n.name} className="border-b border-border/50 last:border-0 hover:bg-secondary/40 transition-colors">
                  <td className="py-3 font-medium text-foreground">{n.name}</td>
                  <td className="py-3 text-muted-foreground">{n.ligacoes}</td>
                  <td className="py-3">
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
                      style={{
                        backgroundColor: `${PROBLEM_COLORS[problem]}1a`,
                        color: PROBLEM_COLORS[problem],
                      }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PROBLEM_COLORS[problem] }} />
                      {PROBLEM_LABELS[problem]}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${aprovaPct}%` }} />
                      </div>
                      <span className="text-foreground">{aprovaPct}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-20 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${rejeitaPct}%`, backgroundColor: REJECTION_COLOR }} />
                      </div>
                      <span className="text-foreground">{rejeitaPct}%</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
