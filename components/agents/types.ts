export type AgentStatus = "active" | "inactive"

export type ChannelId =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "telegram"
  | "site"
  | "widget"
  | "email"
  | "api"

export interface Channel {
  id: ChannelId
  name: string
  connected: boolean
}

export interface KnowledgeSource {
  id: string
  label: string
  count: number
}

export interface DaySchedule {
  enabled: boolean
  start: string
  end: string
}

export interface AgentPermissions {
  canSell: boolean
  canQuote: boolean
  canSchedule: boolean
  canCheckStock: boolean
  canAnswer: boolean
  canTransfer: boolean
  canFinish: boolean
}

export type TemplateType =
  | "comercial"
  | "suporte"
  | "financeiro"
  | "agendamento"
  | "recepcao"
  | "cobranca"
  | "personalizado"

export interface Agent {
  id: string
  name: string
  role: string
  status: AgentStatus
  description: string
  // Personality
  style: string
  creativity: number
  objectivity: number
  emojis: number
  languages: string[]
  // Voice
  useVoice: boolean
  voice: string
  voiceSpeed: number
  voiceTone: string
  voiceGender: string
  // Objective
  objective: string
  importantInfo: string
  // Channels
  channels: Channel[]
  // Knowledge
  knowledge: KnowledgeSource[]
  // Schedule
  schedule: Record<string, DaySchedule>
  offHoursMessage: string
  // Permissions
  permissions: AgentPermissions
  // Memory
  keepHistory: boolean
  retention: string
}

export const WEEK_DAYS = [
  { key: "seg", label: "Segunda" },
  { key: "ter", label: "Terça" },
  { key: "qua", label: "Quarta" },
  { key: "qui", label: "Quinta" },
  { key: "sex", label: "Sexta" },
  { key: "sab", label: "Sábado" },
  { key: "dom", label: "Domingo" },
]

export const ALL_CHANNELS: { id: ChannelId; name: string }[] = [
  { id: "whatsapp", name: "WhatsApp" },
  { id: "instagram", name: "Instagram" },
  { id: "messenger", name: "Facebook Messenger" },
  { id: "telegram", name: "Telegram" },
  { id: "site", name: "Site" },
  { id: "widget", name: "Widget" },
  { id: "email", name: "Email" },
  { id: "api", name: "API" },
]

export const STYLE_OPTIONS = [
  "Formal",
  "Profissional",
  "Humanizado",
  "Premium",
  "Descontraído",
]

export const TEMPLATE_OPTIONS: { value: TemplateType; label: string }[] = [
  { value: "comercial", label: "Comercial" },
  { value: "suporte", label: "Suporte" },
  { value: "financeiro", label: "Financeiro" },
  { value: "agendamento", label: "Agendamento" },
  { value: "recepcao", label: "Recepção" },
  { value: "cobranca", label: "Cobrança" },
  { value: "personalizado", label: "Personalizado" },
]

function defaultChannels(connected: ChannelId[] = []): Channel[] {
  return ALL_CHANNELS.map((c) => ({
    ...c,
    connected: connected.includes(c.id),
  }))
}

function defaultSchedule(): Record<string, DaySchedule> {
  return WEEK_DAYS.reduce(
    (acc, d) => {
      acc[d.key] = {
        enabled: d.key !== "sab" && d.key !== "dom",
        start: "09:00",
        end: "18:00",
      }
      return acc
    },
    {} as Record<string, DaySchedule>,
  )
}

export function createAgent(
  name: string,
  role: string,
  template: TemplateType,
  connected: ChannelId[] = [],
): Agent {
  return {
    id: crypto.randomUUID(),
    name,
    role,
    status: "active",
    description: "",
    style: "Profissional",
    creativity: 50,
    objectivity: 60,
    emojis: 20,
    languages: ["Português"],
    useVoice: false,
    voice: "Nexya Neural",
    voiceSpeed: 50,
    voiceTone: "Neutro",
    voiceGender: "Feminino",
    objective: "",
    importantInfo: "",
    channels: defaultChannels(connected),
    knowledge: [
      { id: "pdf", label: "PDF", count: 0 },
      { id: "docx", label: "DOCX", count: 0 },
      { id: "txt", label: "TXT", count: 0 },
      { id: "links", label: "Links do site", count: 0 },
      { id: "faq", label: "FAQ", count: 0 },
      { id: "manual", label: "Manual interno", count: 0 },
    ],
    schedule: defaultSchedule(),
    offHoursMessage:
      "Olá! No momento estamos fora do horário de atendimento. Retornaremos assim que possível.",
    permissions: {
      canSell: template === "comercial",
      canQuote: template === "comercial",
      canSchedule: template === "agendamento",
      canCheckStock: false,
      canAnswer: true,
      canTransfer: true,
      canFinish: true,
    },
    keepHistory: true,
    retention: "90",
  }
}

export const INITIAL_AGENTS: Agent[] = [
  {
    ...createAgent("Agente Comercial", "Vendas e Conversão", "comercial", [
      "whatsapp",
      "instagram",
    ]),
    description: "Responsável por converter leads em clientes nos canais de vendas.",
    objective:
      "Seu objetivo é converter novos clientes interessados em planos empresariais.",
    style: "Premium",
  },
  {
    ...createAgent("Agente Suporte", "Atendimento ao Cliente", "suporte", [
      "site",
      "telegram",
    ]),
    description: "Cuida das dúvidas e do suporte técnico dos clientes.",
    objective:
      "Seu objetivo é resolver dúvidas rapidamente e garantir a satisfação do cliente.",
    style: "Humanizado",
  },
  {
    ...createAgent("Agente Financeiro", "Cobrança e Faturas", "financeiro", [
      "whatsapp",
    ]),
    status: "inactive",
    description: "Auxilia em cobranças, segunda via e questões financeiras.",
    objective: "Seu objetivo é organizar cobranças e esclarecer dúvidas financeiras.",
    style: "Formal",
  },
]
