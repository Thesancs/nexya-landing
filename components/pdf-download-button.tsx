"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download, Loader2 } from "lucide-react"

const colorOverrides = `
  :root, .dark, * {
    --background: #1a1a24 !important;
    --foreground: #fafafa !important;
    --card: #22222e !important;
    --card-foreground: #fafafa !important;
    --popover: #22222e !important;
    --popover-foreground: #fafafa !important;
    --primary: #22d3ee !important;
    --primary-foreground: #1a1a24 !important;
    --secondary: #2e2e3a !important;
    --secondary-foreground: #fafafa !important;
    --muted: #2e2e3a !important;
    --muted-foreground: #9ca3af !important;
    --accent: #14b8a6 !important;
    --accent-foreground: #1a1a24 !important;
    --destructive: #ef4444 !important;
    --destructive-foreground: #ef4444 !important;
    --border: #3f3f50 !important;
    --input: #2e2e3a !important;
    --ring: #22d3ee !important;
    --chart-1: #22d3ee !important;
    --chart-2: #14b8a6 !important;
    --chart-3: #6366f1 !important;
    --chart-4: #2dd4bf !important;
    --chart-5: #0ea5e9 !important;
    --sidebar: #22222e !important;
    --sidebar-foreground: #fafafa !important;
    --sidebar-primary: #22d3ee !important;
    --sidebar-primary-foreground: #1a1a24 !important;
    --sidebar-accent: #2e2e3a !important;
    --sidebar-accent-foreground: #fafafa !important;
    --sidebar-border: #3f3f50 !important;
    --sidebar-ring: #22d3ee !important;
  }
`

export function PDFDownloadButton() {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownload = async () => {
    setIsGenerating(true)

    try {
      const html2pdf = (await import("html2pdf.js")).default

      const element = document.querySelector("main")

      if (!element) {
        console.error("Main element not found")
        return
      }

      const styleElement = document.createElement("style")
      styleElement.id = "pdf-color-overrides"
      styleElement.textContent = colorOverrides
      document.head.appendChild(styleElement)

      const opt = {
        margin: 0,
        filename: "Nexya-AI-Solutions.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#1a1a24",
          scrollY: 0,
          windowHeight: element.scrollHeight,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      }

      await html2pdf().set(opt).from(element).save()

      document.head.removeChild(styleElement)
    } catch (error) {
      console.error("Error generating PDF:", error)
      // Clean up style element if it exists
      const styleElement = document.getElementById("pdf-color-overrides")
      if (styleElement) {
        document.head.removeChild(styleElement)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={isGenerating}
      variant="outline"
      size="sm"
      className="fixed bottom-6 right-6 z-50 bg-[#22222e]/80 backdrop-blur-sm border-[#22d3ee]/30 hover:bg-[#22d3ee]/10 hover:border-[#22d3ee]/50 transition-all duration-300 text-[#fafafa]"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Baixar PDF
        </>
      )}
    </Button>
  )
}
