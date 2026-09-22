"use client"

import { Wallet, MoreVertical, Hourglass } from "lucide-react"

export function WalletCard() {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Minha Carteira</h3>
        </div>
        <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="flex flex-col items-center py-4">
        <Hourglass className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-5xl font-bold text-foreground">99</p>
        <p className="text-sm text-muted-foreground mt-2">minutos disponíveis</p>
      </div>
    </div>
  )
}
