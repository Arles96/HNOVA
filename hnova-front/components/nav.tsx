"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Orbit } from "lucide-react"

export function Nav() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Orbit className="w-8 h-8 text-primary group-hover:animate-rotate-slow transition-all" />
            <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all" />
          </div>
          <span className="text-2xl font-bold text-foreground">HNOVA</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Home
          </Link>
          <Link href="/classify" className="text-muted-foreground hover:text-foreground transition-colors">
            Classify
          </Link>
          <Link href="/results" className="text-muted-foreground hover:text-foreground transition-colors">
            Results
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
