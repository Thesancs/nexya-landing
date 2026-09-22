"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check, Zap, Phone, Star } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Texto",
      price: "",
      period: "",
      description: "Atendimento automatizado por texto",
      icon: Zap,
      features: [
        "Atendimento por texto ilimitado",
        "Instagram, Facebook, WhatsApp",
        "Telegram e SMS inclusos",
        "Suporte multilíngue",
        "Coleta de dados básica",
      ],
      popular: false,
    },
    {
      name: "Voz",
      price: "",
      period: "",
      description: "300 minutos de ligações automatizadas",
      icon: Phone,
      features: [
        "300 minutos de voz inclusos",
        "Atendimento por ligações",
        "Qualidade de áudio HD",
        "Transcrição automática",
        "Relatórios de chamadas",
      ],
      popular: false,
    },
    {
      name: "Completo",
      price: "",
      period: "",
      description: "Solução completa com suporte prioritário",
      icon: Star,
      features: [
        "1.000 minutos de voz",
        "Todos os canais de texto",
        "Suporte completo 24/7",
        "Integrações personalizadas",
        "Gerente de conta dedicado",
      ],
      popular: true,
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
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-4 block">Investimento</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Planos e Investimentos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fale com nossa equipe para encontrar a solução ideal para sua empresa.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                plan.popular ? "bg-primary/5 border-primary" : "bg-card border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Mais Popular
                </div>
              )}

              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <plan.icon className="w-6 h-6 text-primary" />
              </div>

              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button asChild className="w-full" variant={plan.popular ? "default" : "outline"}>
                <a href="https://wa.me/5519991829978" target="_blank" rel="noreferrer">
                  Escolher Plano
                </a>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
