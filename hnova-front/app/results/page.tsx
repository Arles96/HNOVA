/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"                     // 👈 añade esto
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
// import { StarfieldBg } from "@/components/starfield-bg"
// import { PlanetVisualization } from "@/components/planet-visualization"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Archive } from "lucide-react"
import Link from "next/link"

// 👇 Cargas diferidas sin SSR
const StarfieldBg = dynamic(() => import("@/components/starfield-bg").then(m => m.StarfieldBg), { ssr: false })
const PlanetVisualization = dynamic(
  () => import("@/components/planet-visualization").then(m => m.PlanetVisualization),
  { ssr: false }
)

export default function ResultsPage() {
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("latestResult")
    if (stored) {
      setResult(JSON.parse(stored))

      // Archive (solo navegador)
      const archive = JSON.parse(localStorage.getItem("planetArchive") || "[]")
      const newResult = JSON.parse(stored)
      archive.unshift(newResult)
    }
  }, [])

  if (!result) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <StarfieldBg />
        <Nav />
        <div className="text-center space-y-4">
          <p className="text-xl text-muted-foreground">No classification results found</p>
          <Link href="/classify">
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">Classify a Planet</Button>
          </Link>
        </div>
      </div>
    )
  }

  const isHabitable = result.prediction === "Habitable"

  return (
    <div className="min-h-screen relative">
      <StarfieldBg />
      <Nav />

      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-6xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <Link href="/classify">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Classify
                </Button>
              </Link>
              <Link href="/archive">
                <Button variant="outline" className="gap-2 glass-panel border-primary/30 bg-transparent">
                  <Archive className="w-4 h-4" />
                  View Archive
                </Button>
              </Link>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Planet Visualization */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="glass-panel p-6 h-full">
                  <PlanetVisualization isHabitable={isHabitable} />
                </Card>
              </motion.div>

              {/* Results Details */}
              {/* ... resto igual ... */}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
