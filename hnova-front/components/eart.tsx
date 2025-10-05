"use client"

import { useIsMobile } from "@/hooks/use-mobile";
import { useEffect, useRef, Suspense } from "react"
import Globe, { GlobeMethods } from "react-globe.gl";


export function Earth() {
  const globeEl = useRef<GlobeMethods | undefined>(undefined);

  const isMobile = useIsMobile()

  useEffect(() => {
    if (!globeEl.current) return;

    const controls = globeEl.current.controls();
    if (controls) {
      // Rotación automática
      controls.autoRotate = true;
      controls.autoRotateSpeed = 2;

      // Desactivar interacción del mouse
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
    }
  }, [])
  const isHabitable = true;
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
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          backgroundColor="rgba(0,0,0,0)"
          enablePointerInteraction
          width={isMobile ? 400 :600}
          height={isMobile ? 400 : 600}
          pointsData={[
            {
              lat: 14.0818,
              lng: -87.20681,
              size: 2,
              color: 'rgb(255, 255, 255)'
            },
            {
              lat: 38.8858,
              lng: -77.0070,
              size: 2,
              color: 'rgb(11, 61, 145)'
            }
          ]}
          pointAltitude="size"
          pointColor="color"
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
