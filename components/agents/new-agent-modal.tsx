"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { TEMPLATE_OPTIONS, type TemplateType } from "./types"

interface NewAgentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (name: string, role: string, template: TemplateType) => void
}

export function NewAgentModal({ open, onOpenChange, onCreate }: NewAgentModalProps) {
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [template, setTemplate] = useState<TemplateType>("comercial")

  function handleSubmit() {
    if (!name.trim()) return
    onCreate(name.trim(), role.trim() || "Atendimento", template)
    setName("")
    setRole("")
    setTemplate("comercial")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Agente</DialogTitle>
          <DialogDescription>
            Configure as informações iniciais do seu novo agente de atendimento.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="agent-name">Nome do agente</Label>
            <Input
              id="agent-name"
              placeholder="Ex: Agente Comercial"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agent-role">Função</Label>
            <Input
              id="agent-role"
              placeholder="Ex: Vendas e Conversão"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Template inicial</Label>
            <Select
              value={template}
              onValueChange={(v) => setTemplate(v as TemplateType)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TEMPLATE_OPTIONS.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
            onClick={handleSubmit}
            disabled={!name.trim()}
          >
            Criar agente
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
