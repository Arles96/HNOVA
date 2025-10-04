"use client"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { ManualInputForm } from "@/components/manual-input-form"
import { CsvUploadCard } from "@/components/csv-upload-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClassifyPage() {
  const router = useRouter()

  const handleClassificationComplete = (data: any) => {
    // Store result and navigate to results page
    if (typeof window !== "undefined") {
      sessionStorage.setItem("latestResult", JSON.stringify(data))
    }
    router.push("/results")
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
                Enter planetary parameters manually or upload a CSV file to classify habitability
              </p>
            </div>

            {/* Input Methods */}
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2 glass-panel">
                <TabsTrigger value="manual">Manual Input</TabsTrigger>
                <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              </TabsList>

              <TabsContent value="manual" className="mt-6">
                <ManualInputForm onSubmit={handleClassificationComplete} />
              </TabsContent>

              <TabsContent value="csv" className="mt-6">
                <CsvUploadCard onSubmit={handleClassificationComplete} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
