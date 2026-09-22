"use client"

import { motion } from "framer-motion"
import { Clock, Users, TrendingUp, Headphones } from "lucide-react"

export function AvailabilitySection() {
  const benefits = [
    {
      icon: Clock,
      title: "Atendimento 24/7",
      description: "Nunca perca uma oportunidade. Estamos sempre online.",
    },
    {
      icon: Users,
      title: "Substitui Múltiplos Atendentes",
      description: "Uma IA que faz o trabalho de uma equipe inteira.",
    },
    {
      icon: TrendingUp,
      title: "Escala Sem Esforço",
      description: "Demanda cresceu? A Nexya acompanha automaticamente.",
    },
    {
      icon: Headphones,
      title: "Suporte Exclusivo",
      description: "Suporte 24/7 dedicado para nossos clientes.",
    },
  ]

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
              Disponibilidade
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Nexya: Sua Equipe 24/7</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Nexya oferece atendimento 24/7, substituindo múltiplos atendentes e lidando com múltiplas solicitações
              simultâneas. Se sua demanda crescer, a Nexya escala sem esforço.
            </p>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-semibold">Suporte Exclusivo 24/7</div>
                <div className="text-sm text-muted-foreground">Dedicado para todos os clientes Nexya</div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1 text-sm">{benefit.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
