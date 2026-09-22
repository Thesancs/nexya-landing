"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { BarChart3, MoreVertical } from "lucide-react"
import { cities, PROBLEM_COLORS, PROBLEM_LABELS } from "@/lib/campaign-data"

const data = cities.map((city) => {
  const totals = city.neighborhoods.reduce(
    (acc, n) => ({
      saude: acc.saude + n.saude,
      seguranca: acc.seguranca + n.seguranca,
      educacao: acc.educacao + n.educacao,
    }),
    { saude: 0, seguranca: 0, educacao: 0 },
  )
  return { city: city.name, ...totals }
})

export function ProblemCityChart() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Principais Problemas por Cidade</h3>
            <p className="text-sm text-muted-foreground">Distribuição de demandas dos eleitores</p>
          </div>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" vertical={false} />
            <XAxis dataKey="city" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                color: "#1f2937",
              }}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#475569" }}>{PROBLEM_LABELS[value as keyof typeof PROBLEM_LABELS]}</span>
              )}
            />
            <Bar dataKey="saude" stackId="a" fill={PROBLEM_COLORS.saude} radius={[0, 0, 0, 0]} />
            <Bar dataKey="seguranca" stackId="a" fill={PROBLEM_COLORS.seguranca} />
            <Bar dataKey="educacao" stackId="a" fill={PROBLEM_COLORS.educacao} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
