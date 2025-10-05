"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { CsvUploadCard } from "@/components/csv-upload-card"
import { IProject } from "@/lib/utils"
import toastr from "toastr"

export default function ClassifyPage() {
  const router = useRouter()

  const handleClassificationComplete = async (data: IProject) => {
    // Store result and navigate to results page
    try {
      const response = await fetch('/api/planets', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      const dataServer: {data: IProject} = await response.json()
      router.push(`/projects/${dataServer.data._id}`)
      toastr.success('The planet was successfully analyzed, here you can see the results.')
      return
    } catch (error) {
      toastr.error('Error to classify exoplanet')
    }
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
