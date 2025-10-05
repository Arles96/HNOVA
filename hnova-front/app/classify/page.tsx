"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { CsvUploadCard } from "@/components/csv-upload-card"

export default function ClassifyPage() {
  const router = useRouter()

  const handleClassificationComplete = (data: unknown) => {
    // Store result and navigate to results page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("latestResult", JSON.stringify(data))
    }
    router.push("/projects")
  }

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
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Classify an <span className="text-primary">Exoplanet</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Upload a CSV file to classify habitability
              </p>
            </div>
            <CsvUploadCard onSubmit={handleClassificationComplete} />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
