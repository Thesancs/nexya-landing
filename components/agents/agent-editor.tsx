"use client"

import { useEffect, useState } from "react"
import {
  Upload,
  Mic,
  Target,
  Info,
  Plug,
  BookOpen,
  Clock,
  ShieldCheck,
  Brain,
  Check,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChannelIcon } from "./channel-icon"
import {
  STYLE_OPTIONS,
  WEEK_DAYS,
  type Agent,
  type AgentPermissions,
} from "./types"

interface AgentEditorProps {
  agent: Agent | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (agent: Agent) => void
}

const PERMISSION_LABELS: { key: keyof AgentPermissions; label: string }[] = [
  { key: "canSell", label: "Pode vender" },
  { key: "canQuote", label: "Pode gerar orçamento" },
  { key: "canSchedule", label: "Pode agendar reuniões" },
  { key: "canCheckStock", label: "Pode consultar estoque" },
  { key: "canAnswer", label: "Pode responder dúvidas" },
  { key: "canTransfer", label: "Pode transferir para humano" },
  { key: "canFinish", label: "Pode finalizar atendimento" },
]

const LANGUAGES = ["Português", "Inglês", "Espanhol", "Francês", "Alemão", "Italiano"]

function SectionTitle({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Target
  title: string
  description?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div>
        <h4 className="font-semibold text-foreground">{title}</h4>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    </div>
  )
}

export function AgentEditor({ agent, open, onOpenChange, onSave }: AgentEditorProps) {
  const [draft, setDraft] = useState<Agent | null>(agent)

  useEffect(() => {
    setDraft(agent)
  }, [agent])

  if (!draft) return null

  const update = (patch: Partial<Agent>) => setDraft({ ...draft, ...patch })
  const initials = draft.name
    .replace("Agente ", "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  function toggleLanguage(lang: string) {
    if (!draft) return
    const has = draft.languages.includes(lang)
    update({
      languages: has
        ? draft.languages.filter((l) => l !== lang)
        : [...draft.languages, lang],
    })
  }

  function toggleChannel(id: string) {
    if (!draft) return
    update({
      channels: draft.channels.map((c) =>
        c.id === id ? { ...c, connected: !c.connected } : c,
      ),
    })
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-2xl">
        <SheetHeader className="border-b border-border p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border border-border">
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent font-bold text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <SheetTitle>{draft.name}</SheetTitle>
              <SheetDescription>{draft.role}</SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <Tabs defaultValue="perfil" className="flex flex-1 flex-col overflow-hidden">
          <TabsList className="mx-6 mt-4 grid w-auto grid-cols-5">
            <TabsTrigger value="perfil">Perfil</TabsTrigger>
            <TabsTrigger value="personalidade">Estilo</TabsTrigger>
            <TabsTrigger value="canais">Canais</TabsTrigger>
            <TabsTrigger value="conhecimento">Base</TabsTrigger>
            <TabsTrigger value="config">Config</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto p-6">
            {/* PERFIL */}
            <TabsContent value="perfil" className="mt-0 space-y-8">
              <div className="space-y-4">
                <SectionTitle icon={Info} title="Informações básicas" />
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border border-border">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-lg font-bold text-primary-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" className="bg-transparent">
                    <Upload className="mr-2 h-4 w-4" /> Enviar foto / avatar
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Nome do agente</Label>
                  <Input
                    value={draft.name}
                    onChange={(e) => update({ name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cargo / Função</Label>
                  <Input
                    value={draft.role}
                    onChange={(e) => update({ role: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Descrição interna</Label>
                  <Textarea
                    rows={3}
                    value={draft.description}
                    onChange={(e) => update({ description: e.target.value })}
                    placeholder="Descreva a função deste agente para sua equipe."
                  />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
                  <div>
                    <p className="font-medium text-foreground">Status do agente</p>
                    <p className="text-sm text-muted-foreground">
                      {draft.status === "active" ? "Ativo e atendendo" : "Inativo"}
                    </p>
                  </div>
                  <Switch
                    checked={draft.status === "active"}
                    onCheckedChange={(v) =>
                      update({ status: v ? "active" : "inactive" })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4">
                <SectionTitle
                  icon={Target}
                  title="Objetivo do agente"
                  description="O que este agente deve alcançar em cada atendimento."
                />
                <Textarea
                  rows={4}
                  value={draft.objective}
                  onChange={(e) => update({ objective: e.target.value })}
                  placeholder="Ex: Seu objetivo é converter novos clientes interessados em planos empresariais."
                />
              </div>

              <div className="space-y-4">
                <SectionTitle
                  icon={Info}
                  title="Informações importantes"
                  description="Dados críticos que a IA sempre deve considerar."
                />
                <Textarea
                  rows={5}
                  value={draft.importantInfo}
                  onChange={(e) => update({ importantInfo: e.target.value })}
                  placeholder={
                    "Horário de funcionamento, políticas da empresa, produtos, valores, restrições..."
                  }
                />
              </div>
            </TabsContent>

            {/* PERSONALIDADE */}
            <TabsContent value="personalidade" className="mt-0 space-y-8">
              <div className="space-y-4">
                <SectionTitle icon={Brain} title="Personalidade" />
                <div className="space-y-2">
                  <Label>Estilo de atendimento</Label>
                  <div className="flex flex-wrap gap-2">
                    {STYLE_OPTIONS.map((style) => (
                      <button
                        key={style}
                        onClick={() => update({ style })}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                          draft.style === style
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                <SliderField
                  label="Nível de criatividade"
                  value={draft.creativity}
                  onChange={(v) => update({ creativity: v })}
                />
                <SliderField
                  label="Nível de objetividade"
                  value={draft.objectivity}
                  onChange={(v) => update({ objectivity: v })}
                />
                <SliderField
                  label="Quantidade de emojis"
                  value={draft.emojis}
                  onChange={(v) => update({ emojis: v })}
                />

                <div className="space-y-2">
                  <Label>Idiomas</Label>
                  <div className="flex flex-wrap gap-2">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => toggleLanguage(lang)}
                        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                          draft.languages.includes(lang)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <SectionTitle icon={Mic} title="Voz" description="Configure a voz do agente." />
                  <Switch
                    checked={draft.useVoice}
                    onCheckedChange={(v) => update({ useVoice: v })}
                  />
                </div>
                {draft.useVoice && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Voz</Label>
                      <Select
                        value={draft.voice}
                        onValueChange={(v) => update({ voice: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nexya Neural">Nexya Neural</SelectItem>
                          <SelectItem value="Aurora">Aurora</SelectItem>
                          <SelectItem value="Atlas">Atlas</SelectItem>
                          <SelectItem value="Lumi">Lumi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Gênero</Label>
                      <Select
                        value={draft.voiceGender}
                        onValueChange={(v) => update({ voiceGender: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Feminino">Feminino</SelectItem>
                          <SelectItem value="Masculino">Masculino</SelectItem>
                          <SelectItem value="Neutro">Neutro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Tom</Label>
                      <Select
                        value={draft.voiceTone}
                        onValueChange={(v) => update({ voiceTone: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Neutro">Neutro</SelectItem>
                          <SelectItem value="Caloroso">Caloroso</SelectItem>
                          <SelectItem value="Enérgico">Enérgico</SelectItem>
                          <SelectItem value="Calmo">Calmo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 sm:col-span-1">
                      <SliderField
                        label="Velocidade"
                        value={draft.voiceSpeed}
                        onChange={(v) => update({ voiceSpeed: v })}
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* CANAIS */}
            <TabsContent value="canais" className="mt-0 space-y-4">
              <SectionTitle
                icon={Plug}
                title="Canais conectados"
                description="Conecte os canais nos quais este agente irá atender."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {draft.channels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card text-primary">
                        <ChannelIcon id={channel.id} className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-foreground">{channel.name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant={channel.connected ? "default" : "outline"}
                      className={
                        channel.connected
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-transparent"
                      }
                      onClick={() => toggleChannel(channel.id)}
                    >
                      {channel.connected ? (
                        <>
                          <Check className="mr-1 h-4 w-4" /> Conectado
                        </>
                      ) : (
                        "Conectar"
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* CONHECIMENTO */}
            <TabsContent value="conhecimento" className="mt-0 space-y-4">
              <SectionTitle
                icon={BookOpen}
                title="Base de conhecimento"
                description="Alimente o agente com conhecimento próprio."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {draft.knowledge.map((source) => (
                  <div
                    key={source.id}
                    className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4"
                  >
                    <div>
                      <p className="font-medium text-foreground">{source.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {source.count} {source.count === 1 ? "item enviado" : "itens enviados"}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent"
                      onClick={() =>
                        update({
                          knowledge: draft.knowledge.map((k) =>
                            k.id === source.id ? { ...k, count: k.count + 1 } : k,
                          ),
                        })
                      }
                    >
                      <Upload className="mr-1 h-4 w-4" /> Enviar
                    </Button>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* CONFIG: Horário + Permissões + Memória */}
            <TabsContent value="config" className="mt-0 space-y-8">
              <div className="space-y-4">
                <SectionTitle icon={Clock} title="Horário de funcionamento" />
                <div className="space-y-2">
                  {WEEK_DAYS.map((day) => {
                    const s = draft.schedule[day.key]
                    return (
                      <div
                        key={day.key}
                        className="flex flex-col gap-3 rounded-lg border border-border bg-secondary/40 p-3 sm:flex-row sm:items-center"
                      >
                        <div className="flex items-center gap-3">
                          <Switch
                            checked={s.enabled}
                            onCheckedChange={(v) =>
                              update({
                                schedule: {
                                  ...draft.schedule,
                                  [day.key]: { ...s, enabled: v },
                                },
                              })
                            }
                          />
                          <span className="w-20 text-sm font-medium text-foreground">
                            {day.label}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center gap-2 sm:ml-auto sm:flex-none">
                          <Input
                            type="time"
                            value={s.start}
                            disabled={!s.enabled}
                            onChange={(e) =>
                              update({
                                schedule: {
                                  ...draft.schedule,
                                  [day.key]: { ...s, start: e.target.value },
                                },
                              })
                            }
                            className="w-full sm:w-28"
                          />
                          <span className="text-muted-foreground">às</span>
                          <Input
                            type="time"
                            value={s.end}
                            disabled={!s.enabled}
                            onChange={(e) =>
                              update({
                                schedule: {
                                  ...draft.schedule,
                                  [day.key]: { ...s, end: e.target.value },
                                },
                              })
                            }
                            className="w-full sm:w-28"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="space-y-2">
                  <Label>Mensagem fora do expediente</Label>
                  <Textarea
                    rows={2}
                    value={draft.offHoursMessage}
                    onChange={(e) => update({ offHoursMessage: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <SectionTitle icon={ShieldCheck} title="Permissões" />
                <div className="grid gap-2 sm:grid-cols-2">
                  {PERMISSION_LABELS.map((perm) => (
                    <label
                      key={perm.key}
                      className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-secondary/40 p-3"
                    >
                      <Checkbox
                        checked={draft.permissions[perm.key]}
                        onCheckedChange={(v) =>
                          update({
                            permissions: {
                              ...draft.permissions,
                              [perm.key]: Boolean(v),
                            },
                          })
                        }
                      />
                      <span className="text-sm text-foreground">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <SectionTitle icon={Brain} title="Memória" />
                <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
                  <div>
                    <p className="font-medium text-foreground">Guardar histórico de conversa</p>
                    <p className="text-sm text-muted-foreground">
                      Permite continuidade nos atendimentos.
                    </p>
                  </div>
                  <Switch
                    checked={draft.keepHistory}
                    onCheckedChange={(v) => update({ keepHistory: v })}
                  />
                </div>
                {draft.keepHistory && (
                  <div className="space-y-2">
                    <Label>Tempo de retenção</Label>
                    <Select
                      value={draft.retention}
                      onValueChange={(v) => update({ retention: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 dias</SelectItem>
                        <SelectItem value="90">90 dias</SelectItem>
                        <SelectItem value="180">180 dias</SelectItem>
                        <SelectItem value="365">1 ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex items-center justify-end gap-3 border-t border-border p-6">
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
              onSave(draft)
              onOpenChange(false)
            }}
          >
            Salvar alterações
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function SliderField({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <span className="text-sm font-medium text-primary">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(v) => onChange(v[0])}
        max={100}
        step={1}
      />
    </div>
  )
}
