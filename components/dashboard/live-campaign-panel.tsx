"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import { Activity, Check, CheckCircle2, MessageSquare, PhoneCall, Target, ThumbsDown, Users } from "lucide-react"

const initialMetrics = [
  { key: "realizadas", label: "Ligações realizadas", value: 12847, icon: PhoneCall, color: "#078ed1", tone: "bg-[#078ed1]/10 text-[#05699a]" },
  { key: "atendidas", label: "Ligações atendidas", value: 8462, icon: PhoneCall, color: "#ffcf00", tone: "bg-[#ffcf00]/20 text-[#806600]" },
  { key: "rejeitadas", label: "Ofertas rejeitadas", value: 1189, icon: ThumbsDown, color: "#f50072", tone: "bg-[#f50072]/10 text-[#b00052]" },
  { key: "aceitas", label: "Mensagens aceitas", value: 5273, icon: CheckCircle2, color: "#078ed1", tone: "bg-[#078ed1]/10 text-[#05699a]" },
]

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const motionValue = useMotionValue(value)
  const formattedValue = useTransform(motionValue, (current) => `${Math.round(current).toLocaleString("pt-BR")}${suffix}`)

  useEffect(() => {
    const controls = animate(motionValue, value, { duration: 0.9, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [motionValue, value])

  return <motion.span aria-live="polite">{formattedValue}</motion.span>
}

const events = [
  "Nova ligação atendida em Rio Claro",
  "Mensagem aceita por eleitor da região central",
  "Oferta rejeitada — motivo registrado",
  "Novo contato qualificado para retorno",
  "Ligação concluída com sucesso",
]

const CALL_MULTIPLIERS = [10, 8, 7, 6, 5] as const
const INCREMENT_STEP_MS = 100
const UPDATE_INTERVAL_MS = 2200

function createRandomMultiplierRound() {
  return [...CALL_MULTIPLIERS].sort(() => Math.random() - 0.5)
}

export function LiveCampaignPanel() {
  const [metrics, setMetrics] = useState(initialMetrics)
  const [eventIndex, setEventIndex] = useState(0)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const multiplierRound = useRef<number[]>(createRandomMultiplierRound())

  useEffect(() => {
    const gradualUpdates = new Set<number>()

    const interval = window.setInterval(() => {
      if (multiplierRound.current.length === 0) {
        multiplierRound.current = createRandomMultiplierRound()
      }

      const callMultiplier = multiplierRound.current.pop() ?? CALL_MULTIPLIERS[CALL_MULTIPLIERS.length - 1]
      let completedSteps = 0

      const gradualUpdate = window.setInterval(() => {
        setMetrics((current) =>
          current.map((metric, index) => ({
            ...metric,
            value: metric.value + (index === 2 ? 0 : 1),
          })),
        )

        completedSteps += 1

        if (completedSteps === callMultiplier) {
          window.clearInterval(gradualUpdate)
          gradualUpdates.delete(gradualUpdate)
          setLastUpdate(new Date())
        }
      }, INCREMENT_STEP_MS)

      gradualUpdates.add(gradualUpdate)
      setEventIndex((current) => (current + 1) % events.length)
    }, UPDATE_INTERVAL_MS)

    return () => {
      window.clearInterval(interval)
      gradualUpdates.forEach((update) => window.clearInterval(update))
    }
  }, [])

  const conversion = useMemo(() => Math.round((metrics[3].value / metrics[0].value) * 100), [metrics])

  return (
    <div className="min-h-screen bg-[#f8fbfd] text-[#073b5c]">
      <div className="grid h-2 grid-cols-3" aria-hidden="true"><span className="bg-[#ffcf00]" /><span className="bg-[#078ed1]" /><span className="bg-[#f50072]" /></div>
      <header className="border-b border-[#078ed1]/15 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f50072]">Monitoramento de campanha</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Central de atualizações ao vivo</h1>
            <p className="mt-1 text-sm text-[#416579]">Acompanhe a operação em tempo real, com dados atualizados automaticamente.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#078ed1]/20 bg-[#078ed1]/10 px-3 py-2 text-xs font-bold text-[#05699a]">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#f50072]" /> AO VIVO
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.article key={metric.key} layout className={`rounded-2xl border border-[#078ed1]/15 bg-white p-5 shadow-sm ${index === 0 ? "border-t-4 border-t-[#ffcf00]" : index === 1 ? "border-t-4 border-t-[#078ed1]" : index === 2 ? "border-t-4 border-t-[#f50072]" : "border-t-4 border-t-[#078ed1]"}`} whileHover={{ y: -3 }}>
                <div className="flex items-center justify-between">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${metric.tone}`}><Icon className="h-5 w-5" /></div>
                  <span className="text-xs font-bold text-[#078ed1]">+{index + 2}% hoje</span>
                </div>
                <p className="mt-5 text-sm font-semibold text-[#416579]">{metric.label}</p>
                <p className="mt-1 text-4xl font-black tracking-tight text-[#073b5c]"><AnimatedNumber value={metric.value} /></p>
              </motion.article>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.8fr]">
<section className="rounded-2xl border border-[#078ed1]/15 border-t-4 border-t-[#ffcf00] bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div><h2 className="text-xl font-black">Fluxo da operação</h2><p className="mt-1 text-sm text-[#416579]">Volume acumulado nas últimas 24 horas</p></div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#078ed1]"><Activity className="h-4 w-4" /> Sincronização automática</div>
            </div>
            <div className="mt-8 flex h-56 items-end gap-2 sm:gap-3">
              {[42, 55, 48, 72, 61, 78, 69, 88, 74, 96, 82, 91, 100, 86, 94, 76, 89, 98].map((height, index) => (
                <motion.div key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ delay: index * 0.025 }} className="group relative flex-1 rounded-t-lg bg-gradient-to-t from-[#078ed1] to-[#11b2e8]" style={{ minWidth: 8 }}>
                  <div className="absolute inset-x-0 bottom-0 h-1/3 rounded-t-lg bg-[#ffcf00]/70 opacity-0 transition-opacity group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
            <div className="mt-3 flex justify-between text-xs font-medium text-[#6b8796]"><span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>Agora</span></div>
          </section>

          <section className="rounded-2xl border border-[#f50072]/20 bg-[#f50072] p-5 text-white shadow-sm sm:p-6">
            <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20"><Target className="h-5 w-5" /></div><div><p className="text-sm font-bold text-white/80">Conversão atual</p><p className="text-3xl font-black"><AnimatedNumber value={conversion} suffix="%" /></p></div></div>
            <div className="mt-7 space-y-4 text-sm"><div className="flex justify-between border-b border-white/20 pb-3"><span>Contatos alcançados</span><strong><AnimatedNumber value={metrics[1].value} /></strong></div><div className="flex justify-between border-b border-white/20 pb-3"><span>Taxa de atendimento</span><strong><AnimatedNumber value={Math.round((metrics[1].value / metrics[0].value) * 100)} suffix="%" /></strong></div><div className="flex justify-between"><span>Última atualização</span><strong>{lastUpdate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</strong></div></div>
          </section>
        </div>

        <section className="rounded-2xl border border-[#f50072]/20 border-t-4 border-t-[#f50072] bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-black">Atividade recente</h2><p className="mt-1 text-sm text-[#416579]">Eventos recebidos em tempo real</p></div><div className="flex items-center gap-2 rounded-full bg-[#ffcf00]/20 px-3 py-1.5 text-xs font-bold text-[#806600]"><Users className="h-4 w-4" /> 3.421 contatos ativos</div></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {events.map((event, index) => <motion.div key={`${event}-${eventIndex}-${index}`} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="rounded-xl border border-[#078ed1]/10 bg-[#f8fbfd] p-3"><div className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#078ed1]" /><p className="text-sm font-semibold leading-snug text-[#174d6a]">{index === 0 ? events[eventIndex] : event}</p></div><p className="mt-2 text-xs text-[#6b8796]">agora mesmo</p></motion.div>)}
          </div>
        </section>

        <div className="flex items-center gap-2 text-sm text-[#416579]"><MessageSquare className="h-4 w-4 text-[#f50072]" /> Os indicadores são atualizados automaticamente a cada poucos segundos para simular o acompanhamento da operação.</div>
      </main>
    </div>
  )
}
