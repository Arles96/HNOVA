"use client"

import { useEffect, useRef } from "react"

interface MiniPlanetProps {
  isHabitable: boolean
}

export function MiniPlanet({ isHabitable }: MiniPlanetProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rotation = 0
    let animationId: number

    function drawMiniPlanet() {
      if (!ctx || !canvas) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = canvas.width * 0.35

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Glow
      const glowColor = isHabitable ? "74, 222, 128" : "239, 68, 68"
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.5, centerX, centerY, radius * 1.5)
      gradient.addColorStop(0, `rgba(${glowColor}, 0.3)`)
      gradient.addColorStop(1, `rgba(${glowColor}, 0)`)
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Planet
      const planetGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius,
      )

      if (isHabitable) {
        planetGradient.addColorStop(0, "#60a5fa")
        planetGradient.addColorStop(0.5, "#3b82f6")
        planetGradient.addColorStop(1, "#1e40af")
      } else {
        planetGradient.addColorStop(0, "#f87171")
        planetGradient.addColorStop(0.5, "#ef4444")
        planetGradient.addColorStop(1, "#991b1b")
      }

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = planetGradient
      ctx.fill()

      // Stripes
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2
        ctx.beginPath()
        ctx.arc(0, 0, radius, angle, angle + Math.PI / 6)
        ctx.lineTo(0, 0)
        ctx.fillStyle = isHabitable ? "rgba(34, 197, 94, 0.3)" : "rgba(220, 38, 38, 0.3)"
        ctx.fill()
      }

      ctx.restore()

      rotation += 0.01
      animationId = requestAnimationFrame(drawMiniPlanet)
    }

    drawMiniPlanet()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isHabitable])

  return <canvas ref={canvasRef} width={48} height={48} className="w-full h-full" />
}
