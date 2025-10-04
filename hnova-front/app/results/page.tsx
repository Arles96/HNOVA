"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { PlanetVisualization } from "@/components/planet-visualization"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCw, Archive } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  const router = useRouter()
  const [result, setResult] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("latestResult")
      if (stored) {
        setResult(JSON.parse(stored))

        // Save to archive
        const archive = JSON.parse(localStorage.getItem("planetArchive") || "[]")
        const newResult = JSON.parse(stored)
        archive.unshift(newResult)
        localStorage.setItem("planetArchive", JSON.stringify(archive.slice(0, 50))) // Keep last 50
      }
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
            <Button className="bg-primary hover:bg-primary/90">Classify a Planet</Button>
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
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Summary */}
                <Card className="glass-panel p-6 space-y-4">
                  <h2 className="text-2xl font-bold">{result.planetName}</h2>

                  <div className="flex flex-wrap gap-3">
                    <Badge
                      className={`text-lg px-4 py-2 ${
                        isHabitable
                          ? "bg-accent-green/20 text-accent-green border-accent-green/50"
                          : "bg-destructive/20 text-destructive border-destructive/50"
                      }`}
                      variant="outline"
                    >
                      {result.prediction}
                    </Badge>
                    <Badge className="text-lg px-4 py-2 bg-primary/20 text-primary border-primary/50" variant="outline">
                      {result.confidence}% Confidence
                    </Badge>
                  </div>

                  <div className="pt-4 space-y-2">
                    <h3 className="font-semibold text-muted-foreground">Classification Summary</h3>
                    <p className="text-sm leading-relaxed">
                      {isHabitable
                        ? `Based on the planetary parameters, ${result.planetName} shows strong indicators of potential habitability. The equilibrium temperature, stellar flux, and orbital characteristics fall within the habitable zone parameters.`
                        : `Analysis indicates ${result.planetName} does not meet the criteria for habitability. Key factors such as temperature, stellar flux, or orbital parameters fall outside the habitable zone range.`}
                    </p>
                  </div>
                </Card>

                {/* Input Parameters */}
                <Card className="glass-panel p-6 space-y-4">
                  <h3 className="text-xl font-bold">Input Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {result.inputs &&
                      Object.entries(result.inputs).map(([key, value]: [string, any]) => {
                        if (key === "planetName") return null
                        return (
                          <div key={key} className="space-y-1">
                            <p className="text-sm text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </p>
                            <p className="font-semibold">{value}</p>
                          </div>
                        )
                      })}
                  </div>
                </Card>

                {/* Explainability */}
                <Card className="glass-panel p-6 space-y-4">
                  <h3 className="text-xl font-bold">Key Factors</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Temperature:</strong> Equilibrium temperature is a critical factor in determining
                        surface conditions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Stellar Flux:</strong> Amount of radiation received affects atmospheric stability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Orbital Parameters:</strong> Distance from star and orbital period influence climate
                        patterns
                      </span>
                    </li>
                  </ul>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                  <Link href="/classify" className="flex-1">
                    <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
                      <RotateCw className="w-4 h-4" />
                      Classify Another
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
