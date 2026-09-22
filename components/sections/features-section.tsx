"use client"

import { motion } from "framer-motion"
import { MessageSquare, Phone, Globe, Database, Instagram, Facebook, Send, MessageCircle } from "lucide-react"

export function FeaturesSection() {
  const channels = [
    { icon: Instagram, name: "Instagram" },
    { icon: Facebook, name: "Facebook" },
    { icon: MessageCircle, name: "WhatsApp" },
    { icon: Send, name: "Telegram" },
    { icon: MessageSquare, name: "SMS" },
    { icon: Phone, name: "Ligações" },
  ]

  const capabilities = [
    {
      icon: MessageSquare,
      title: "Atendimento por Texto",
      description: "Instagram, Facebook, WhatsApp, Telegram e SMS integrados em uma única plataforma inteligente.",
    },
    {
      icon: Phone,
      title: "Atendimento por Voz",
      description: "Realize e receba ligações automatizadas com naturalidade e eficiência incomparáveis.",
    },
    {
      icon: Database,
      title: "Coleta e Envio de Dados",
      description: "Capture informações importantes e integre com seus sistemas existentes em tempo real.",
    },
    {
      icon: Globe,
      title: "Suporte Multilíngue",
      description: "Opere em qualquer idioma, garantindo flexibilidade total para clientes globais.",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/30 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">
            Funcionalidades
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">O Que a Nexya Faz</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Atendimento automatizado completo em múltiplos canais e idiomas
          </p>
        </motion.div>

        {/* Channel Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {channels.map((channel, index) => (
            <motion.div
              key={channel.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all cursor-default"
            >
              <channel.icon className="w-6 h-6 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">{channel.name}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <cap.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{cap.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
