"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, X, Loader2, Info } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CsvUploadCardProps {
  onSubmit: (data: unknown) => void
}

export function CsvUploadCard({ onSubmit }: CsvUploadCardProps) {
  // const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<{planet_name: string, prediction: string, confidence: string,}[]>([])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.name.endsWith(".csv")) {
      /* toast({
        title: "Invalid File",
        description: "Please upload a CSV file",
        variant: "destructive",
      }) */
      return
    }

    setFile(file)

    // Parse CSV for preview
    const reader = new FileReader()
    // reader.onload = (e) => {
      // const text = e.target?.result as string
      // const lines = text.split("\n").filter((line) => line.trim())
      // const headers = lines[0].split(",")

      /* const previewData = lines.slice(1, 6).map((line) => {
        const values = line.split(",")
        return headers.reduce(
          (obj, header, index) => {
            obj[header.trim()] = values[index]?.trim() || ""
            return obj
          },
          {} as Record<string, string>,
        )
      }) */

      // setPreview(previewData)
    // }
    reader.readAsText(file)
  }

  const handleProcess = async () => {
    if (!file) return

    setLoading(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock results
    const results = preview.map((row) => ({
      planetName: row.planet_name || "Unknown",
      prediction: Math.random() > 0.5 ? "Habitable" : "Not Habitable",
      confidence: (Math.random() * 30 + 70).toFixed(1),
    }))

    setLoading(false)

    /* toast({
      title: "Processing Complete",
      description: `Classified ${results.length} planets`,
    }) */

    // For now, just show the first result
    onSubmit({
      ...results[0],
      timestamp: new Date().toISOString(),
      batchResults: results,
    })
  }

  const clearFile = () => {
    setFile(null)
    setPreview([])
  }

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="glass-panel p-8 space-y-6">
        {/* Upload Area */}
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${
              dragActive ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/50"
            }`}
          >
            <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Drop your CSV file here</h3>
            <p className="text-muted-foreground mb-4">or click to browse</p>
            <input type="file" accept=".csv" onChange={handleChange} className="hidden" id="csv-upload" />
            <label htmlFor="csv-upload">
              <Button type="button" variant="outline" className="glass-panel border-primary/30 bg-transparent" asChild>
                <span>Select File</span>
              </Button>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            {/* File Info */}
            <div className="flex items-center justify-between p-4 glass-panel rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={clearFile}
                className="hover:bg-destructive/20 hover:text-destructive"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview */}
            {preview.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Preview (first 5 rows)</h4>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="text-primary">
                        <Info className="w-4 h-4 mr-2" />
                        View Schema
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-panel border-primary/30">
                      <DialogHeader>
                        <DialogTitle>CSV Schema Example</DialogTitle>
                        <DialogDescription>Your CSV should include the following columns:</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-2">
                        <pre className="bg-secondary/50 p-4 rounded-lg text-xs overflow-x-auto">
                          {`planet_name,radius_earth,mass_earth,eq_temp_k,star_type,orbital_period_days,semi_major_axis_au,stellar_flux_rel
Kepler-442b,1.34,2.36,233,K,112.3,0.4,0.86
HN-001,1.00,1.00,288,G,365.2,1.0,1.00`}
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        {Object.keys(preview[0]).map((header) => (
                          <th key={header} className="text-left p-2 text-muted-foreground font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, index) => (
                        <tr key={index} className="border-b border-border/50">
                          {Object.values(row).map((value, i) => (
                            <td key={i} className="p-2">
                              {value}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Process Button */}
            <Button
              onClick={handleProcess}
              disabled={loading}
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing CSV...
                </>
              ) : (
                <>Process CSV</>
              )}
            </Button>
          </div>
        )}

        {/* Schema Info */}
        <div className="text-sm text-muted-foreground text-center">
          Need help? View the schema example to see the required CSV format
        </div>
      </Card>
    </motion.div>
  )
}
