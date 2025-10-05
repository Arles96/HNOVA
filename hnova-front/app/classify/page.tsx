"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { CsvUploadCard } from "@/components/csv-upload-card"
import { IProject } from "@/lib/utils"
import { v4 as uuidv4 } from 'uuid'

export default function ClassifyPage() {
  const router = useRouter()

  const handleClassificationComplete = (data: IProject) => {
    // Store result and navigate to results page
    if (typeof window !== "undefined") {
      let local = localStorage.getItem('planetArchive')
      let array = []
      if (local) {
        array = JSON.parse(local)
      }
      data._id = uuidv4()
      array.push(data)
      localStorage.setItem("planetArchive", JSON.stringify(array))
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
