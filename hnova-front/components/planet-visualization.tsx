"use client"

import { useEffect, useRef, Suspense } from "react"
import dynamic from "next/dynamic"

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

interface PlanetVisualizationProps {
  isHabitable: boolean
}

export function PlanetVisualization({ isHabitable }: PlanetVisualizationProps) {
  const globeEl = useRef<any>()

  useEffect(() => {
    if (globeEl.current) {
      // Auto-rotate
      globeEl.current.controls().autoRotate = true
      globeEl.current.controls().autoRotateSpeed = 0.5
    }
  }, [])

  return (
    <div className="relative w-full h-[500px] rounded-lg overflow-hidden">
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        }
      >
        <Globe
          ref={globeEl}
          globeImageUrl={
            isHabitable
              ? "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
              : "//unpkg.com/three-globe/example/img/earth-night.jpg"
          }
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor={isHabitable ? "#4ade80" : "#ef4444"}
          atmosphereAltitude={0.25}
          width={500}
          height={500}
        />
      </Suspense>

      {/* Aura Effect */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isHabitable
            ? "bg-gradient-radial from-accent-green/20 via-transparent to-transparent"
            : "bg-gradient-radial from-destructive/20 via-transparent to-transparent"
        }`}
        style={{
          background: isHabitable
            ? "radial-gradient(circle, rgba(74, 222, 128, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)",
        }}
      />
    </div>
  )
}
