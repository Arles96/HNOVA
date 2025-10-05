"use client"

import { useEffect, useRef, Suspense } from "react"
import Globe, { GlobeMethods } from "react-globe.gl"

interface PlanetVisualizationProps {
  isHabitable: boolean
}

export function PlanetVisualization({ isHabitable }: PlanetVisualizationProps) {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();
    if (controls) {
      // Rotación automática
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;

      // Desactivar interacción del mouse
      controls.enableZoom = false;
      controls.enableRotate = true;
      controls.enablePan = false;
    }
  }, [])

  // Generar una textura roja
  const redTexture = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#D53C37"; // rojo
    ctx.fillRect(0, 0, 64, 64);
    return canvas.toDataURL();
  })();

  const grennTexture = (() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#96D9BD"; // verde
    ctx.fillRect(0, 0, 64, 64);
    return canvas.toDataURL();
  })(); 

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
              ? grennTexture
              : redTexture
          }
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          atmosphereColor={isHabitable ? "#96D9BD" : "#D53C37"}
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
