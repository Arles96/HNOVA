"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, RotateCw, Archive, ThumbsUp, ThumbsDown, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { IExoplanetData, IProject } from "@/lib/utils"
import dynamic from "next/dynamic"

interface ResultsPageProps {
  params: Promise<{ id: string, idProject: string }>
}

const PlanetVisualization = dynamic(
  () => import("@/components/planet-visualization").then(m => m.PlanetVisualization),
  { ssr: false }
)

export default function ResultsPage({params}: ResultsPageProps) {
  const [result, setResult] = useState<IExoplanetData | null>(null)
  const [project, setProject] = useState<IProject | null>(null)
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const { id, idProject } = React.use(params);

  const handleData = async () => {
    try {
      const search = new URLSearchParams()
      search.append('projectId', idProject)
      search.append('planetId', id)
      const response = await fetch(`/api/planets?${search}`)
      const {data}: {data: {projects: IProject[], exoplanets: IExoplanetData[]}} = await response.json()
      const [project2] = data.projects
      const [planet] = data.exoplanets
      if (planet.feedbackIsPlanet === true) {
        setFeedback('correct')
      } else if (planet.feedbackIsPlanet === false) {
        setFeedback('incorrect')
      }
      setProject(project2)
      setResult(planet)
    } catch (error) {
      toastr.error('Error to get data.')
    }
  }

  useEffect(() => {
    handleData()
  }, [])

  const handleFeedback = async (isCorrect: boolean) => {
    try {
      setFeedback(isCorrect ? "correct" : "incorrect")
      const search = new URLSearchParams()
      search.append('planetId', result?._id || '')
      await fetch(`/api/planets?${search}`, {
        method: 'PATCH',
        body: {
          // @ts-ignore
          feedbackIsPlanet: isCorrect,
        }
      })
      toastr.success('Success')
      handleData()
    } catch (error) {
      toastr.error('Error to send feedback.')
    }
  }

  if (!result || !project) {
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

  const isHabitable = result.isExoplanet

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
              <Link href={`/projects/${project?._id}`}>
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to projects
                </Button>
              </Link>
              <Link href="/projects">
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
                <Card className="glass-panel p-6 h-full" style={{overflowX: 'hidden'}}>
                  <PlanetVisualization isHabitable={isHabitable || false} />
                </Card>
              </motion.div>

              {/* Results Details */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6 lg:h-[600px] lg:overflow-y-auto"
              >
                {/* Summary */}
                <Card className="glass-panel p-6 space-y-4">
                  <h2 className="text-2xl font-bold">{result.kepoiName || 'Unknow'}</h2>

                  <div className="flex flex-wrap gap-3">
                    <Badge
                      className={`text-lg px-4 py-2 ${
                        isHabitable
                          ? "bg-accent-green/20 text-accent-green border-accent-green/50"
                          : "bg-destructive/20 text-destructive border-destructive/50"
                      }`}
                      variant="outline"
                    >
                      {result.isExoplanet ? 'Exoplanet' : 'Not Exoplanet'}
                    </Badge>
                    <Badge className="text-lg px-4 py-2 bg-primary/20 text-primary border-primary/50" variant="outline">
                      {result.percentage?.toFixed(2)}% Confidence
                    </Badge>
                  </div>

                  {/* <div className="pt-4 space-y-2">
                    <h3 className="font-semibold text-muted-foreground">Classification Summary</h3>
                    <p className="text-sm leading-relaxed">
                      {isHabitable
                        ? `Based on the planetary parameters, ${result.kepoiName || 'Unknow'} shows strong indicators of potential habitability. The equilibrium temperature, stellar flux, and orbital characteristics fall within the habitable zone parameters.`
                        : `Analysis indicates ${result.kepoiName || 'Unknow'} does not meet the criteria for habitability. Key factors such as temperature, stellar flux, or orbital parameters fall outside the habitable zone range.`}
                    </p>
                  </div> */}
                </Card>

                {/* Feedback Section */}
                <Card className="glass-panel p-6 space-y-4">
                  <h3 className="text-xl font-bold">Is this result correct?</h3>
                  <p className="text-sm text-muted-foreground">Your feedback helps improve our classification model</p>

                  {feedback === null ? (
                    <div className="flex gap-4">
                      <Button
                        onClick={() => handleFeedback(true)}
                        className="flex-1 bg-accent-green/20 hover:bg-accent-green/30 text-accent-green border border-accent-green/50 gap-2"
                        variant="outline"
                      >
                        <ThumbsUp className="w-5 h-5" />
                        Correct
                      </Button>
                      <Button
                        onClick={() => handleFeedback(false)}
                        className="flex-1 bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/50 gap-2"
                        variant="outline"
                      >
                        <ThumbsDown className="w-5 h-5" />
                        Incorrect
                      </Button>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary/30"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-semibold">Thank you for your feedback!</p>
                        <p className="text-sm text-muted-foreground">
                          Your response has been recorded and will help improve our model.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </Card>

                {/* Input Parameters */}
                <Card className="glass-panel p-6 space-y-4">
                  <h3 className="text-xl font-bold">Input Parameters</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {result &&
                      Object.entries(result).map(([key, value]: [string, any]) => {
                        if (key === "kepoiName") return null
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
                {/* <Card className="glass-panel p-6 space-y-4">
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
                </Card> */}

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
