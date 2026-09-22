"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import { PieChart as PieIcon } from "lucide-react"
import { PROBLEM_COLORS, PROBLEM_LABELS, type AggregatedStats } from "@/lib/campaign-data"

interface ProblemDonutProps {
  stats: AggregatedStats
  scopeLabel: string
}

export function ProblemDonut({ stats, scopeLabel }: ProblemDonutProps) {
  const data = [
    { key: "saude", name: PROBLEM_LABELS.saude, value: stats.saude },
    { key: "seguranca", name: PROBLEM_LABELS.seguranca, value: stats.seguranca },
    { key: "educacao", name: PROBLEM_LABELS.educacao, value: stats.educacao },
  ]
  const total = data.reduce((a, b) => a + b.value, 0) || 1

  return (
    <div className="bg-card rounded-2xl p-6 border border-border h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
          <PieIcon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Demandas</h3>
          <p className="text-sm text-muted-foreground">{scopeLabel}</p>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={75} paddingAngle={3} stroke="none">
              {data.map((entry) => (
                <Cell key={entry.key} fill={PROBLEM_COLORS[entry.key as keyof typeof PROBLEM_COLORS]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "8px",
                color: "#1f2937",
              }}
              formatter={(value: number, name: string) => [`${value} (${Math.round((value / total) * 100)}%)`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-2">
        {data.map((entry) => (
          <div key={entry.key} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: PROBLEM_COLORS[entry.key as keyof typeof PROBLEM_COLORS] }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </div>
            <span className="font-medium text-foreground">{Math.round((entry.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
