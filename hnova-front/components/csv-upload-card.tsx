"use client"

import type React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState, useCallback } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, FileText, X, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { CSV_FIELD_CATEGORIES, IExoplanetData, IProject } from "@/lib/utils"
import { resultsCsv } from "@/lib/csv"
import {v4 as uuidv4 } from 'uuid'

interface CsvUploadCardProps {
  onSubmit: (data: IProject) => Promise<void>
}

interface IformData {
  projectName: string
  email: string
}

export function CsvUploadCard({ onSubmit }: CsvUploadCardProps) {
  // const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<IExoplanetData[]>([])
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [formData, setFormData] = useState<IformData>({
    projectName: "",
    email: ""
  })
  const [showSchema, setShowSchema] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.projectName.trim()) newErrors.projectName = "Planet name is required"
    if (!formData.email.trim()) newErrors.email = "Planet name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(category)) {
      newExpanded.delete(category)
    } else {
      newExpanded.add(category)
    }
    setExpandedCategories(newExpanded)
  }

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
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter((line) => line.trim())
      const headers = lines[0].split(",")
      const previewData = resultsCsv(lines, headers)
      setPreview(previewData)
    }
    reader.readAsText(file)
  }

  const handleProcess = async () => {
    if (!file) return

    if (!validateForm()) {
      /* toast({
        title: "Validation Error",
        description: "Please fill in all fields correctly",
        variant: "destructive",
      }) */
      return
    }

    setLoading(true)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 2500))

    // Mock results
    const results = preview.map((item, i) => ({
      ...item,
    }))

    /* toast({
      title: "Processing Complete",
      description: `Classified ${results.length} planets`,
    }) */
   

    // For now, just show the first result
    await onSubmit({
      projectName: formData.projectName,
      email: formData.email,
      results,
    })

    setLoading(false)
  }

  const clearFile = () => {
    setFile(null)
    setPreview([])
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }
  
  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="glass-panel p-8 space-y-6">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="projectName" className="text-foreground">
            Project Name
          </Label>
          <Input
            id="projectName"
            value={formData.projectName}
            onChange={(e) => handleInputChange("projectName", e.target.value)}
            placeholder="e.g., Kepler-442b"
            className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${errors.projectName ? "border-destructive" : ""
              }`}
          />
          {errors.projectName && <p className="text-sm text-destructive">{errors.projectName}</p>}
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="email" className="text-foreground">
            Email
          </Label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            type="email"
            placeholder="you@email.com"
            className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${errors.email ? "border-destructive" : ""
              }`}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        <button
          onClick={() => setShowSchema(!showSchema)}
          className="flex items-center justify-between w-full text-left group"
        >
          <h3 className="text-lg font-semibold text-primary">CSV Format Requirements</h3>
          {showSchema ? (
            <ChevronUp className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          ) : (
            <ChevronDown className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
          )}
        </button>

        {showSchema && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm">63 Required Fields (organized by category):</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (expandedCategories.size === CSV_FIELD_CATEGORIES.length) {
                      setExpandedCategories(new Set())
                    } else {
                      setExpandedCategories(new Set(CSV_FIELD_CATEGORIES.map((c) => c.category)))
                    }
                  }}
                  className="text-xs text-primary hover:text-primary/80"
                >
                  {expandedCategories.size === CSV_FIELD_CATEGORIES.length ? "Collapse All" : "Expand All"}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CSV_FIELD_CATEGORIES.map(({ category, icon, fields }) => (
                  <Card
                    key={category}
                    className="glass-panel border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{icon}</span>
                          <h5 className="font-semibold text-sm">{category}</h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">
                            {fields.length} fields
                          </span>
                          {expandedCategories.has(category) ? (
                            <ChevronUp className="w-4 h-4 text-primary" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-primary" />
                          )}
                        </div>
                      </div>

                      {expandedCategories.has(category) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-2 mt-3 pt-3 border-t border-primary/10"
                        >
                          {fields.map(({ field, description }) => (
                            <div key={field} className="space-y-1">
                              <code className="text-xs font-mono text-primary font-semibold block">{field}</code>
                              <p className="text-xs text-muted-foreground pl-2">{description}</p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Example CSV Structure:</h4>
              <div className="bg-secondary/50 p-4 rounded-lg border border-primary/20 overflow-x-auto">
                <pre className="text-xs font-mono whitespace-pre">
                  {`hostId,hostName,k2Id,kepoiName,orbitalPeriod,orbitalPeriodMin,orbitalPeriodMax,transitDuration,transitDurationMin,transitDurationMax,transitDepth,transitDepthMin,transitDepthMax,impactParameter,impactParameterMin,impactParameterMax,planetRadiusEarth,planetRadiusEarthMin,planetRadiusEarthMax,planetRadiusJupiter,planetRadiusJupiterMin,planetRadiusJupiterMax,planetMassEarth,planetMassEarthMin,planetMassEarthMax,planetMassJupiter,planetMassJupiterMin,planetMassJupiterMax,planetDensity,planetDensityMin,planetDensityMax,equilibriumTemperature,equilibriumTemperatureMin,equilibriumTemperatureMax,insolationFlux,insolationFluxMin,insolationFluxMax,stellarEffectiveTemperature,stellarEffectiveTemperatureMin,stellarEffectiveTemperatureMax,stellarSurfaceGravity,stellarSurfaceGravityMin,stellarSurfaceGravityMax,stellarRadius,stellarRadiusMin,stellarRadiusMax,stellarMass,stellarMassMin,stellarMassMax,stellarMetallicity,stellarMetallicityMin,stellarMetallicityMax,stellarAge,stellarAgeMin,stellarAgeMax,rightAscension,declination,magnitude,dispositionScore,modelSnr,tcePlanetNumber
10811496,Kepler-442,,,112.3053,112.3023,112.3083,5.2,5.1,5.3,0.00082,0.00078,0.00086,0.45,0.40,0.50,1.34,1.28,1.40,0.119,0.114,0.124,2.36,2.10,2.62,0.0074,0.0066,0.0082,5.2,4.8,5.6,233,225,241,0.86,0.80,0.92,4402,4350,4454,4.52,4.48,4.56,0.60,0.58,0.62,0.61,0.59,0.63,-0.37,-0.42,-0.32,2.9,2.5,3.3,297.352,39.341,13.06,0.98,45.2,01
10854555,Kepler-186,,,129.9441,129.9401,129.9481,4.8,4.7,4.9,0.00051,0.00048,0.00054,0.38,0.33,0.43,1.17,1.12,1.22,0.104,0.100,0.108,1.71,1.55,1.87,0.0054,0.0049,0.0059,4.8,4.4,5.2,188,182,194,0.29,0.26,0.32,3755,3710,3800,4.68,4.64,4.72,0.47,0.45,0.49,0.48,0.46,0.50,-0.08,-0.13,-0.03,4.0,3.6,4.4,291.934,44.567,14.62,0.92,38.7,05`}
                </pre>
              </div>
            </div>

            <div className="text-xs text-muted-foreground space-y-1 bg-secondary/30 p-3 rounded-lg border border-primary/10">
              <p className="font-semibold text-foreground mb-1">Important Notes:</p>
              <p>• All column names must match exactly (case-sensitive)</p>
              <p>• Numeric values should be provided without units</p>
              <p>• Min/Max values represent uncertainty ranges for measurements</p>
              <p>• Empty values are allowed but may affect classification accuracy</p>
              <p>• Ensure proper CSV formatting with commas as delimiters</p>
            </div>
          </motion.div>
        )}

        {/* Upload Area */}
        {!file ? (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-all ${dragActive ? "border-primary bg-primary/10" : "border-primary/30 hover:border-primary/50"
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
