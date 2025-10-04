"use client"

import { useEffect, useRef } from "react"

export function RotatingPlanet() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rotation = 0
    let animationId: number

    function drawPlanet() {
      if (!ctx || !canvas) return

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = Math.min(canvas.width, canvas.height) * 0.35

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Glow effect
      const gradient = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 1.5)
      gradient.addColorStop(0, "rgba(99, 102, 241, 0.3)")
      gradient.addColorStop(0.5, "rgba(99, 102, 241, 0.1)")
      gradient.addColorStop(1, "rgba(99, 102, 241, 0)")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Planet body
      const planetGradient = ctx.createRadialGradient(
        centerX - radius * 0.3,
        centerY - radius * 0.3,
        radius * 0.1,
        centerX,
        centerY,
        radius,
      )
      planetGradient.addColorStop(0, "#6366f1")
      planetGradient.addColorStop(0.5, "#4f46e5")
      planetGradient.addColorStop(1, "#312e81")

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.fillStyle = planetGradient
      ctx.fill()

      // Rotating stripes
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(rotation)

      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4
        ctx.beginPath()
        ctx.arc(0, 0, radius, angle, angle + Math.PI / 8)
        ctx.lineTo(0, 0)
        ctx.fillStyle = "rgba(139, 92, 246, 0.3)"
        ctx.fill()
      }

      ctx.restore()

      rotation += 0.005
      animationId = requestAnimationFrame(drawPlanet)
    }

    drawPlanet()

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
}
