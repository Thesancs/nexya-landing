"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { CircularProgress } from "@/components/dashboard/circular-progress"
import { ProblemCityChart } from "@/components/dashboard/campaign/problem-city-chart"
import { ApprovalCityChart } from "@/components/dashboard/campaign/approval-city-chart"
import { ProblemDonut } from "@/components/dashboard/campaign/problem-donut"
import { NeighborhoodTable } from "@/components/dashboard/campaign/neighborhood-table"
import {
  cities,
  aggregate,
  PROBLEM_LABELS,
  PROBLEM_COLORS,
  APPROVAL_COLOR,
  REJECTION_COLOR,
} from "@/lib/campaign-data"
import { PhoneCall, AlertTriangle, ThumbsUp, ThumbsDown } from "lucide-react"

export default function CampanhasPage() {
  const [selectedCity, setSelectedCity] = useState(cities[0].name)

  const allNeighborhoods = useMemo(() => cities.flatMap((c) => c.neighborhoods), [])
  const geral = useMemo(() => aggregate(allNeighborhoods), [allNeighborhoods])

  const city = cities.find((c) => c.name === selectedCity) ?? cities[0]
  const cityStats = useMemo(() => aggregate(city.neighborhoods), [city])

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />

      <div className="campaign-light bg-background min-h-screen lg:ml-64 transition-all duration-300">
        <DashboardHeader />

        <main className="p-4 sm:p-6">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Estatísticas de <span className="text-muted-foreground font-normal">Campanha</span>
              </h1>
              <p className="text-muted-foreground mt-1">
                Análise das ligações da IA por cidade e bairro — demandas e aprovação do candidato
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-lg font-bold text-primary">
                L
              </div>
              <div className="leading-tight">
                <p className="text-lg font-bold text-foreground">Lucas</p>
                <p className="text-sm text-muted-foreground">Partido</p>
              </div>
            </div>
          </motion.div>

          {/* General Stat Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {/* Total de ligações */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-5 border border-border/50 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <PhoneCall className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Total de Ligações</p>
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold text-foreground">{geral.ligacoes.toLocaleString("pt-BR")}</p>
                <p className="text-sm text-muted-foreground">em {cities.length} cidades</p>
              </div>
            </motion.div>

            {/* Principal problema geral */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-5 border border-border/50 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Principal Demanda</p>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold" style={{ color: PROBLEM_COLORS[geral.mainProblem] }}>
                  {PROBLEM_LABELS[geral.mainProblem]}
                </p>
                <p className="text-sm text-muted-foreground">demanda mais citada</p>
              </div>
            </motion.div>

            {/* Aprovação */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-5 border border-border/50 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ThumbsUp className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Aprovação</p>
                </div>
                <CircularProgress percentage={geral.aprovaPct} color={APPROVAL_COLOR} />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold text-foreground">{geral.aprovaPct}%</p>
                <p className="text-sm text-muted-foreground">{geral.aprova.toLocaleString("pt-BR")} eleitores</p>
              </div>
            </motion.div>

            {/* Rejeição */}
            <motion.div
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-5 border border-border/50 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <ThumbsDown className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Rejeição</p>
                </div>
                <CircularProgress percentage={geral.rejeitaPct} color={REJECTION_COLOR} />
              </div>
              <div className="mt-4">
                <p className="text-4xl font-bold text-foreground">{geral.rejeitaPct}%</p>
                <p className="text-sm text-muted-foreground">{geral.rejeita.toLocaleString("pt-BR")} eleitores</p>
              </div>
            </motion.div>
          </motion.div>

          {/* City-level charts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
          >
            <ProblemCityChart />
            <ApprovalCityChart />
          </motion.div>

          {/* Drill-down header + city selector */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-foreground">Análise por Bairro</h2>
            <div className="flex flex-wrap gap-2">
              {cities.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedCity(c.name)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    selectedCity === c.name
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Drill-down content */}
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <div className="lg:col-span-1">
              <ProblemDonut stats={cityStats} scopeLabel={`Cidade de ${city.name}`} />
            </div>
            <div className="lg:col-span-2">
              <NeighborhoodTable city={city} />
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
