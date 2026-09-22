"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus, Bot, Sparkles } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { Button } from "@/components/ui/button"
import { AgentCard } from "@/components/agents/agent-card"
import { AgentEditor } from "@/components/agents/agent-editor"
import { NewAgentModal } from "@/components/agents/new-agent-modal"
import { UpgradePlanModal } from "@/components/agents/upgrade-plan-modal"
import {
  INITIAL_AGENTS,
  createAgent,
  type Agent,
  type TemplateType,
} from "@/components/agents/types"
import { toast } from "sonner"

export default function AgentesPage() {
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS)
  const [planLimit, setPlanLimit] = useState(3)
  const [editing, setEditing] = useState<Agent | null>(null)
  const [editorOpen, setEditorOpen] = useState(false)
  const [newOpen, setNewOpen] = useState(false)
  const [upgradeOpen, setUpgradeOpen] = useState(false)

  const used = agents.length
  const limitReached = used >= planLimit

  function handleEdit(agent: Agent) {
    setEditing(agent)
    setEditorOpen(true)
  }

  function handleSave(updated: Agent) {
    setAgents((prev) => prev.map((a) => (a.id === updated.id ? updated : a)))
    toast.success("Alterações salvas", { description: `${updated.name} foi atualizado.` })
  }

  function handleDuplicate(agent: Agent) {
    if (limitReached) {
      toast.error("Limite atingido", {
        description: "Contrate mais agentes para duplicar.",
      })
      return
    }
    const copy: Agent = {
      ...agent,
      id: crypto.randomUUID(),
      name: `${agent.name} (cópia)`,
    }
    setAgents((prev) => [...prev, copy])
    toast.success("Agente duplicado", { description: copy.name })
  }

  function handleDelete(agent: Agent) {
    setAgents((prev) => prev.filter((a) => a.id !== agent.id))
    toast.success("Agente excluído", { description: agent.name })
  }

  function handleCreate(name: string, role: string, template: TemplateType) {
    const agent = createAgent(name, role, template)
    setAgents((prev) => [...prev, agent])
    toast.success("Agente criado", { description: name })
    handleEdit(agent)
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="lg:ml-64 transition-all duration-300">
        <DashboardHeader />

        <main className="p-4 sm:p-6">
          {/* Page header */}
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-3xl font-bold text-foreground">
                Agentes de <span className="text-primary">Atendimento</span>
              </h1>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Crie, personalize e gerencie os agentes responsáveis pelos seus canais
                de atendimento.
              </p>
            </motion.div>

            {/* Plan widget */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="w-full max-w-xs rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Plano Atual</span>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
                  Starter
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {used} <span className="text-muted-foreground">/ {planLimit}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Agentes utilizados</p>
                </div>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500"
                  style={{ width: `${Math.min((used / planLimit) * 100, 100)}%` }}
                />
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full bg-transparent"
                onClick={() => setUpgradeOpen(true)}
              >
                Contratar mais agentes
              </Button>
            </motion.div>
          </div>

          {/* New agent button */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mb-6"
          >
            <Button
              size="lg"
              className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              onClick={() => setNewOpen(true)}
              disabled={limitReached}
            >
              <Plus className="mr-2 h-5 w-5" /> Novo Agente
            </Button>
            {limitReached && (
              <span className="ml-3 text-sm text-muted-foreground">
                Limite do plano atingido. Contrate mais agentes para continuar.
              </span>
            )}
          </motion.div>

          {/* Agents grid */}
          {agents.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                <Bot className="h-7 w-7" />
              </div>
              <p className="font-medium text-foreground">Nenhum agente ainda</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Crie seu primeiro agente para começar a atender.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {agents.map((agent) => (
                  <AgentCard
                    key={agent.id}
                    agent={agent}
                    onEdit={handleEdit}
                    onDuplicate={handleDuplicate}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>

      <AgentEditor
        agent={editing}
        open={editorOpen}
        onOpenChange={setEditorOpen}
        onSave={handleSave}
      />
      <NewAgentModal open={newOpen} onOpenChange={setNewOpen} onCreate={handleCreate} />
      <UpgradePlanModal
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        onConfirm={(extra) => {
          setPlanLimit((prev) => prev + extra)
          toast.success("Plano atualizado", {
            description: `Adicionados ${extra} agente(s) ao seu plano.`,
          })
        }}
      />
    </div>
  )
}
