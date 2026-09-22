"use client"

import { Users, MoreVertical } from "lucide-react"

export function EmployeesCard() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Funcionários</h3>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-8 py-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Ativos</p>
          <p className="text-4xl font-bold text-foreground">15</p>
          <p className="text-xs text-muted-foreground mt-1">Operando</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Inativos</p>
          <p className="text-4xl font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground mt-1">Férias</p>
        </div>
      </div>
    </div>
  )
}
