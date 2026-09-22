"use client"

import { motion } from "framer-motion"
import { Pencil, Copy, Trash2, MoreVertical } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChannelIcon } from "./channel-icon"
import type { Agent } from "./types"

interface AgentCardProps {
  agent: Agent
  onEdit: (agent: Agent) => void
  onDuplicate: (agent: Agent) => void
  onDelete: (agent: Agent) => void
}

export function AgentCard({ agent, onEdit, onDuplicate, onDelete }: AgentCardProps) {
  const connected = agent.channels.filter((c) => c.connected)
  const initials = agent.name
    .replace("Agente ", "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border border-border">
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-base font-bold text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{agent.name}</h3>
            <p className="text-sm text-muted-foreground">{agent.role}</p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground"
            >
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Mais opções</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(agent)}>
              <Pencil className="mr-2 h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDuplicate(agent)}>
              <Copy className="mr-2 h-4 w-4" /> Duplicar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(agent)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`h-2 w-2 rounded-full ${
            agent.status === "active" ? "bg-green-500" : "bg-muted-foreground"
          }`}
        />
        <span className="text-sm font-medium text-foreground">
          {agent.status === "active" ? "Ativo" : "Inativo"}
        </span>
      </div>

      {/* Description */}
      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {agent.description || "Sem descrição."}
      </p>

      {/* Connected channels */}
      <div className="mt-4 flex items-center gap-2">
        {connected.length > 0 ? (
          connected.map((c) => (
            <div
              key={c.id}
              title={c.name}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-primary"
            >
              <ChannelIcon id={c.id} className="h-4 w-4" />
            </div>
          ))
        ) : (
          <span className="text-xs text-muted-foreground">Nenhum canal conectado</span>
        )}
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-2">
        <Button
          onClick={() => onEdit(agent)}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Pencil className="mr-2 h-4 w-4" /> Editar
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDuplicate(agent)}
          className="bg-transparent"
          title="Duplicar"
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onDelete(agent)}
          className="bg-transparent text-destructive hover:text-destructive"
          title="Excluir"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}
