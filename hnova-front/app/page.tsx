"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import dynamic from "next/dynamic"
// import { RotatingPlanet } from "@/components/rotating-planet"
import { ArrowRight, Cpu, Database, Zap, Target, TrendingUp, CheckCircle2 } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
}

// 👉 Cargas diferidas sin SSR
const StarfieldBg = dynamic(
  () => import("@/components/starfield-bg").then(m => m.StarfieldBg),
  { ssr: false }
)
const Earth = dynamic(
  () => import("@/components/eart").then(m => m.Earth),
  { ssr: false }
)

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <StarfieldBg />
      <Nav />

      <main className="relative z-10 pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-15">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-2 glass-panel rounded-full text-sm text-primary mb-4">
                Mission Briefing
              </div>
              <h1 className="text-5xl md:text-7xl sm:text-1xl font-bold text-balance leading-tight">
                HNOVA: AI-Powered <span className="text-primary">Exoplanets</span>
              </h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Harness the power of machine learning to classify and discover potential exoplanets
                across the cosmos.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/classify">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                    Classify a Planet
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/results">
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-panel border-primary/30 hover:border-primary/50 bg-transparent"
                  >
                    View Results
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[500px]"
              style={{overflowX: 'hidden', position: 'relative', overflowY: "hidden"}}
            >
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <RotatingPlanet />
              </div> */}
              <div style={{position: 'absolute', top: 0, left: 0, zIndex: 4, width: '100%', height: '100%'}} />
              <Earth />
            </motion.div>
          </div>
        </section>

        {/* How We Built It */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">How We Built It</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A systematic approach to solving exoplanet habitability classification
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Target,
                  title: "Challenge",
                  description: "Identifying habitable exoplanets from vast astronomical datasets with high accuracy",
                },
                {
                  icon: Cpu,
                  title: "Model Training",
                  description: "Training deep learning models on planetary characteristics and stellar properties",
                },
                {
                  icon: CheckCircle2,
                  title: "Validation",
                  description: "Rigorous testing and validation against known exoplanet classifications",
                },
              ].map((step, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-panel p-6 h-full hover:border-primary/50 transition-all group">
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                        <step.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Tech Stack</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Built with cutting-edge technologies for optimal performance
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Python", icon: "🐍" },
                { name: "TensorFlow", icon: "🧠" },
                { name: "Next.js", icon: "▲" },
                { name: "Tailwind CSS", icon: "🎨" },
                { name: "Framer Motion", icon: "✨" },
                { name: "React Globe", icon: "🌍" },
                { name: "Node.js", icon: "🟢" },
                { name: "PyTorch", icon: "🔥" },
              ].map((tech, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-panel p-6 text-center hover:border-primary/50 transition-all hover:scale-105">
                    <div className="text-4xl mb-2">{tech.icon}</div>
                    <div className="font-semibold">{tech.name}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Model Fidelity */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">Model Fidelity</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Industry-leading accuracy in exoplanet habitability classification
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { label: "Accuracy negative", value: "97%", icon: Target },
                { label: "Accuracy positive", value: "93%", icon: Target },
                { label: "Precision", value: "95.161%", icon: Zap },
                { label: "Recall", value: "95.624%", icon: TrendingUp },
                { label: "F1 Score", value: "93.1%", icon: Database },
              ].map((metric, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="glass-panel p-8 text-center hover:border-primary/50 transition-all group">
                    <metric.icon className="w-8 h-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                    <div className="text-muted-foreground">{metric.label}</div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-panel p-12 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50" />
              <div className="relative z-10 space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold">Ready to Explore?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Start classifying exoplanets and contribute to the search for habitable worlds
                </p>
                <Link href="/classify">
                  <Button size="lg" className="group bg-primary hover:bg-primary/90 text-primary-foreground">
                    Classify a Planet Now
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
