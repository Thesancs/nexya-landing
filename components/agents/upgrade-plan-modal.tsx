"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface UpgradePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: (extra: number) => void
}

const OPTIONS = [
  { extra: 1, label: "+1 agente", note: "Ideal para crescer aos poucos" },
  {
    extra: 5,
    label: "+5 agentes",
    note: "Mais popular",
    popular: true,
  },
  { extra: 10, label: "+10 agentes", note: "Melhor custo por agente" },
]

export function UpgradePlanModal({ open, onOpenChange, onConfirm }: UpgradePlanModalProps) {
  const [selected, setSelected] = useState(5)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Contratar mais agentes</DialogTitle>
          <DialogDescription>
            Expanda sua capacidade de atendimento adicionando mais agentes ao seu plano.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2 sm:grid-cols-3">
          {OPTIONS.map((opt) => {
            const isActive = selected === opt.extra
            return (
              <motion.button
                key={opt.extra}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(opt.extra)}
                className={`relative flex flex-col items-center rounded-xl border p-4 text-center transition-colors ${
                  isActive
                    ? "border-primary bg-primary/5"
                    : "border-border bg-secondary/40 hover:border-primary/40"
                }`}
              >
                {opt.popular && (
                  <span className="absolute -top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground">
                    POPULAR
                  </span>
                )}
                <div
                  className={`mb-2 flex h-9 w-9 items-center justify-center rounded-full ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-primary"
                  }`}
                >
                  {isActive ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                </div>
                <p className="font-semibold text-foreground">{opt.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{opt.note}</p>
              </motion.button>
            )
          })}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              onConfirm(selected)
              onOpenChange(false)
            }}
          >
            Contratar +{selected} agente{selected > 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
