"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ThumbsUp, MoreVertical } from "lucide-react"
import { cities, aggregate, APPROVAL_COLOR, REJECTION_COLOR } from "@/lib/campaign-data"

const data = cities.map((city) => {
  const stats = aggregate(city.neighborhoods)
  return {
    city: city.name,
    aprovacao: stats.aprovaPct,
    rejeicao: stats.rejeitaPct,
  }
})

export function ApprovalCityChart() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <ThumbsUp className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Aprovação x Rejeição por Cidade</h3>
            <p className="text-sm text-muted-foreground">Percentual sobre o total de ligações</p>
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
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                color: "#1f2937",
              }}
              formatter={(value: number, name: string) => [`${value}%`, name === "aprovacao" ? "Aprovação" : "Rejeição"]}
            />
            <Legend formatter={(value) => <span style={{ color: "#475569" }}>{value === "aprovacao" ? "Aprovação" : "Rejeição"}</span>} />
            <Bar dataKey="aprovacao" fill={APPROVAL_COLOR} radius={[4, 4, 0, 0]} />
            <Bar dataKey="rejeicao" fill={REJECTION_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
