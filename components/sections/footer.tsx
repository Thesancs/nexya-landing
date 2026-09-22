"use client"

import { motion } from "framer-motion"
import { NexyaLogo } from "@/components/nexya-logo"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-3">
            <NexyaLogo className="h-8 w-auto text-foreground" />
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Funcionalidades
            </a>
            <a
              href="https://wa.me/5519991829978"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Preços
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contato
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
          </nav>

          <p className="text-sm text-muted-foreground">© 2026 Nexya AI Solution. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  )
}
