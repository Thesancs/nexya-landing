"use client"

import { motion } from "framer-motion"
import { Brain, Cpu, Lightbulb, Network } from "lucide-react"

export function BrainSection() {
  const features = [
    {
      icon: Brain,
      title: "Raciocínio Avançado",
      description: "Pensa e formula soluções como um especialista",
    },
    {
      icon: Network,
      title: "Hub Central",
      description: "Integra todos os canais em uma única inteligência",
    },
    {
      icon: Lightbulb,
      title: "Adaptação Contínua",
      description: "Aprende e evolui com cada interação",
    },
    {
      icon: Cpu,
      title: "Processamento Inteligente",
      description: "Vai além de comandos simples",
    },
  ]

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Tecnologia Exclusiva
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Nexya: O Cérebro da Sua Operação</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A Nexya é o cérebro do seu atendimento. Ela pensa, formula e encontra soluções, atuando como um hub central
            que raciocina e se adapta, não apenas seguindo comandos, mas realmente pensando.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
