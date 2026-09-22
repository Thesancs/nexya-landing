"use client"

import { motion } from "framer-motion"
import { Sparkles, Globe, Layers, Award } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Sparkles,
      title: "Automação Completa",
      description: "Automatize todo o seu atendimento ao cliente de ponta a ponta.",
    },
    {
      icon: Globe,
      title: "Suporte Multilíngue",
      description: "Atenda clientes em qualquer idioma, em qualquer lugar do mundo.",
    },
    {
      icon: Layers,
      title: "Integração Multicanal",
      description: "Conecte-se com seus clientes onde eles estiverem, em qualquer plataforma.",
    },
    {
      icon: Award,
      title: "Excelência Contínua",
      description: "Melhoria constante através de aprendizado de máquina avançado.",
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
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">Diferenciais</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Por Que Escolher a Nexya?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nexya é a escolha ideal para elevar o atendimento ao próximo nível
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex gap-6 p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
