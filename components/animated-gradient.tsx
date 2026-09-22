"use client"

import { useEffect, useRef } from "react"

export function AnimatedGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const animate = () => {
      time += 0.002
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create animated gradient orbs
      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time) * 100,
        canvas.height * 0.4 + Math.cos(time * 0.8) * 100,
        0,
        canvas.width * 0.3,
        canvas.height * 0.4,
        400,
      )
      gradient1.addColorStop(0, "rgba(6, 182, 212, 0.15)")
      gradient1.addColorStop(1, "rgba(6, 182, 212, 0)")

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 1.2) * 100,
        canvas.height * 0.6 + Math.sin(time * 0.6) * 100,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        350,
      )
      gradient2.addColorStop(0, "rgba(20, 184, 166, 0.12)")
      gradient2.addColorStop(1, "rgba(20, 184, 166, 0)")

      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationFrameId = requestAnimationFrame(animate)
    }

    resize()
    animate()

    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
