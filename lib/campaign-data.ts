export type ProblemKey = "saude" | "seguranca" | "educacao"

export interface Neighborhood {
  name: string
  ligacoes: number
  // distribuição de respostas por principal problema (soma = ligacoes atendidas)
  saude: number
  seguranca: number
  educacao: number
  // quantidade de pessoas que aprovam / rejeitam o candidato
  aprova: number
  rejeita: number
}

export interface City {
  name: string
  neighborhoods: Neighborhood[]
}

export const PROBLEM_LABELS: Record<ProblemKey, string> = {
  saude: "Saúde",
  seguranca: "Segurança",
  educacao: "Educação",
}

// Paleta: teal primário + grafite escuro + cinza médio
export const PROBLEM_COLORS: Record<ProblemKey, string> = {
  saude: "#14b8a6", // teal (primary)
  seguranca: "#1f2937", // grafite escuro
  educacao: "#64748b", // cinza médio
}

export const APPROVAL_COLOR = "#14b8a6" // teal (primary)
export const REJECTION_COLOR = "#64748b" // cinza médio

export const cities: City[] = [
  {
    name: "Rio Claro",
    neighborhoods: [
      { name: "Centro", ligacoes: 420, saude: 180, seguranca: 150, educacao: 90, aprova: 250, rejeita: 120 },
      { name: "Cidade Nova", ligacoes: 310, saude: 90, seguranca: 160, educacao: 60, aprova: 150, rejeita: 130 },
      { name: "Jardim Novo", ligacoes: 280, saude: 130, seguranca: 80, educacao: 70, aprova: 170, rejeita: 80 },
      { name: "Vila Aparecida", ligacoes: 260, saude: 70, seguranca: 140, educacao: 50, aprova: 110, rejeita: 120 },
      { name: "Santana", ligacoes: 230, saude: 110, seguranca: 60, educacao: 60, aprova: 140, rejeita: 60 },
    ],
  },
  {
    name: "Campinas",
    neighborhoods: [
      { name: "Cambuí", ligacoes: 520, saude: 150, seguranca: 250, educacao: 120, aprova: 300, rejeita: 160 },
      { name: "Barão Geraldo", ligacoes: 480, saude: 130, seguranca: 140, educacao: 210, aprova: 290, rejeita: 130 },
      { name: "Taquaral", ligacoes: 390, saude: 180, seguranca: 130, educacao: 80, aprova: 210, rejeita: 130 },
      { name: "Jardim Chapadão", ligacoes: 350, saude: 90, seguranca: 200, educacao: 60, aprova: 150, rejeita: 160 },
      { name: "Nova Campinas", ligacoes: 300, saude: 140, seguranca: 90, educacao: 70, aprova: 180, rejeita: 80 },
    ],
  },
  {
    name: "São Paulo",
    neighborhoods: [
      { name: "Pinheiros", ligacoes: 820, saude: 220, seguranca: 360, educacao: 240, aprova: 470, rejeita: 250 },
      { name: "Mooca", ligacoes: 760, saude: 300, seguranca: 280, educacao: 180, aprova: 420, rejeita: 240 },
      { name: "Santana", ligacoes: 690, saude: 200, seguranca: 320, educacao: 170, aprova: 350, rejeita: 260 },
      { name: "Itaquera", ligacoes: 640, saude: 180, seguranca: 340, educacao: 120, aprova: 280, rejeita: 280 },
      { name: "Tatuapé", ligacoes: 580, saude: 260, seguranca: 200, educacao: 120, aprova: 340, rejeita: 160 },
    ],
  },
  {
    name: "Limeira",
    neighborhoods: [
      { name: "Centro", ligacoes: 360, saude: 160, seguranca: 120, educacao: 80, aprova: 210, rejeita: 100 },
      { name: "Vila Cláudia", ligacoes: 290, saude: 80, seguranca: 150, educacao: 60, aprova: 140, rejeita: 110 },
      { name: "Jardim Glória", ligacoes: 270, saude: 120, seguranca: 90, educacao: 60, aprova: 160, rejeita: 70 },
      { name: "Nova Suíça", ligacoes: 240, saude: 70, seguranca: 130, educacao: 40, aprova: 100, rejeita: 100 },
      { name: "Boa Vista", ligacoes: 210, saude: 100, seguranca: 60, educacao: 50, aprova: 130, rejeita: 50 },
    ],
  },
  {
    name: "Santa Gertrudes",
    neighborhoods: [
      { name: "Centro", ligacoes: 180, saude: 80, seguranca: 60, educacao: 40, aprova: 110, rejeita: 45 },
      { name: "Jardim Luísa", ligacoes: 140, saude: 40, seguranca: 70, educacao: 30, aprova: 70, rejeita: 55 },
      { name: "Vila Vitória", ligacoes: 120, saude: 55, seguranca: 40, educacao: 25, aprova: 75, rejeita: 30 },
      { name: "Recanto Feliz", ligacoes: 100, saude: 30, seguranca: 50, educacao: 20, aprova: 45, rejeita: 40 },
    ],
  },
]

export interface AggregatedStats {
  ligacoes: number
  saude: number
  seguranca: number
  educacao: number
  aprova: number
  rejeita: number
  mainProblem: ProblemKey
  aprovaPct: number
  rejeitaPct: number
  indecisoPct: number
}

export function aggregate(neighborhoods: Neighborhood[]): AggregatedStats {
  const sum = neighborhoods.reduce(
    (acc, n) => ({
      ligacoes: acc.ligacoes + n.ligacoes,
      saude: acc.saude + n.saude,
      seguranca: acc.seguranca + n.seguranca,
      educacao: acc.educacao + n.educacao,
      aprova: acc.aprova + n.aprova,
      rejeita: acc.rejeita + n.rejeita,
    }),
    { ligacoes: 0, saude: 0, seguranca: 0, educacao: 0, aprova: 0, rejeita: 0 },
  )

  const problems: [ProblemKey, number][] = [
    ["saude", sum.saude],
    ["seguranca", sum.seguranca],
    ["educacao", sum.educacao],
  ]
  const mainProblem = problems.sort((a, b) => b[1] - a[1])[0][0]

  const total = sum.ligacoes || 1
  return {
    ...sum,
    mainProblem,
    aprovaPct: Math.round((sum.aprova / total) * 100),
    rejeitaPct: Math.round((sum.rejeita / total) * 100),
    indecisoPct: Math.round(((sum.ligacoes - sum.aprova - sum.rejeita) / total) * 100),
  }
}

export function neighborhoodMainProblem(n: Neighborhood): ProblemKey {
  const problems: [ProblemKey, number][] = [
    ["saude", n.saude],
    ["seguranca", n.seguranca],
    ["educacao", n.educacao],
  ]
  return problems.sort((a, b) => b[1] - a[1])[0][0]
}
