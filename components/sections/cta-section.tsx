"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center p-12 md:p-16 rounded-3xl bg-primary/5 border border-primary/20 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(20,184,166,0.1),transparent_50%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
              Pronto para transformar seu atendimento?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
              Entre em contato hoje e descubra como a Nexya pode revolucionar a experiência dos seus clientes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group text-base px-8">
                <a href="https://wa.me/5519991829978" target="_blank" rel="noreferrer">
                  Falar com Especialista
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 bg-transparent">
                Agendar Demonstração
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
