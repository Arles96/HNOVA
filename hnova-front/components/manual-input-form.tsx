"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ManualInputFormProps {
  onSubmit: (data: any) => void
}

export function ManualInputForm({ onSubmit }: ManualInputFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    planetName: "",
    radius: "",
    mass: "",
    temperature: "",
    starType: "",
    orbitalPeriod: "",
    semiMajorAxis: "",
    stellarFlux: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.planetName.trim()) newErrors.planetName = "Planet name is required"
    if (!formData.radius || Number.parseFloat(formData.radius) <= 0) newErrors.radius = "Valid radius required"
    if (!formData.mass || Number.parseFloat(formData.mass) <= 0) newErrors.mass = "Valid mass required"
    if (!formData.temperature || Number.parseFloat(formData.temperature) <= 0)
      newErrors.temperature = "Valid temperature required"
    if (!formData.starType) newErrors.starType = "Star type is required"
    if (!formData.orbitalPeriod || Number.parseFloat(formData.orbitalPeriod) <= 0)
      newErrors.orbitalPeriod = "Valid orbital period required"
    if (!formData.semiMajorAxis || Number.parseFloat(formData.semiMajorAxis) <= 0)
      newErrors.semiMajorAxis = "Valid semi-major axis required"
    if (!formData.stellarFlux || Number.parseFloat(formData.stellarFlux) <= 0)
      newErrors.stellarFlux = "Valid stellar flux required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields correctly",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock classification result
    const isHabitable = Math.random() > 0.5
    const confidence = (Math.random() * 30 + 70).toFixed(1)

    const result = {
      planetName: formData.planetName,
      prediction: isHabitable ? "Habitable" : "Not Habitable",
      confidence: Number.parseFloat(confidence),
      inputs: formData,
      timestamp: new Date().toISOString(),
    }

    setLoading(false)

    toast({
      title: "Classification Complete",
      description: `${formData.planetName} classified as ${result.prediction}`,
    })

    onSubmit(result)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card className="glass-panel p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Planet Name */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="planetName" className="text-foreground">
                Planet Name
              </Label>
              <Input
                id="planetName"
                value={formData.planetName}
                onChange={(e) => handleChange("planetName", e.target.value)}
                placeholder="e.g., Kepler-442b"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.planetName ? "border-destructive" : ""
                }`}
              />
              {errors.planetName && <p className="text-sm text-destructive">{errors.planetName}</p>}
            </div>

            {/* Radius */}
            <div className="space-y-2">
              <Label htmlFor="radius" className="text-foreground">
                Radius (Earth radii)
              </Label>
              <Input
                id="radius"
                type="number"
                step="0.01"
                value={formData.radius}
                onChange={(e) => handleChange("radius", e.target.value)}
                placeholder="e.g., 1.34"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.radius ? "border-destructive" : ""
                }`}
              />
              {errors.radius && <p className="text-sm text-destructive">{errors.radius}</p>}
            </div>

            {/* Mass */}
            <div className="space-y-2">
              <Label htmlFor="mass" className="text-foreground">
                Mass (Earth masses)
              </Label>
              <Input
                id="mass"
                type="number"
                step="0.01"
                value={formData.mass}
                onChange={(e) => handleChange("mass", e.target.value)}
                placeholder="e.g., 2.36"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.mass ? "border-destructive" : ""
                }`}
              />
              {errors.mass && <p className="text-sm text-destructive">{errors.mass}</p>}
            </div>

            {/* Temperature */}
            <div className="space-y-2">
              <Label htmlFor="temperature" className="text-foreground">
                Equilibrium Temperature (K)
              </Label>
              <Input
                id="temperature"
                type="number"
                step="1"
                value={formData.temperature}
                onChange={(e) => handleChange("temperature", e.target.value)}
                placeholder="e.g., 233"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.temperature ? "border-destructive" : ""
                }`}
              />
              {errors.temperature && <p className="text-sm text-destructive">{errors.temperature}</p>}
            </div>

            {/* Star Type */}
            <div className="space-y-2">
              <Label htmlFor="starType" className="text-foreground">
                Star Type
              </Label>
              <Select value={formData.starType} onValueChange={(value) => handleChange("starType", value)}>
                <SelectTrigger
                  className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                    errors.starType ? "border-destructive" : ""
                  }`}
                >
                  <SelectValue placeholder="Select star type" />
                </SelectTrigger>
                <SelectContent className="glass-panel border-primary/30">
                  <SelectItem value="O">O - Blue</SelectItem>
                  <SelectItem value="B">B - Blue-white</SelectItem>
                  <SelectItem value="A">A - White</SelectItem>
                  <SelectItem value="F">F - Yellow-white</SelectItem>
                  <SelectItem value="G">G - Yellow</SelectItem>
                  <SelectItem value="K">K - Orange</SelectItem>
                  <SelectItem value="M">M - Red</SelectItem>
                </SelectContent>
              </Select>
              {errors.starType && <p className="text-sm text-destructive">{errors.starType}</p>}
            </div>

            {/* Orbital Period */}
            <div className="space-y-2">
              <Label htmlFor="orbitalPeriod" className="text-foreground">
                Orbital Period (days)
              </Label>
              <Input
                id="orbitalPeriod"
                type="number"
                step="0.1"
                value={formData.orbitalPeriod}
                onChange={(e) => handleChange("orbitalPeriod", e.target.value)}
                placeholder="e.g., 112.3"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.orbitalPeriod ? "border-destructive" : ""
                }`}
              />
              {errors.orbitalPeriod && <p className="text-sm text-destructive">{errors.orbitalPeriod}</p>}
            </div>

            {/* Semi-major Axis */}
            <div className="space-y-2">
              <Label htmlFor="semiMajorAxis" className="text-foreground">
                Semi-major Axis (AU)
              </Label>
              <Input
                id="semiMajorAxis"
                type="number"
                step="0.01"
                value={formData.semiMajorAxis}
                onChange={(e) => handleChange("semiMajorAxis", e.target.value)}
                placeholder="e.g., 0.4"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.semiMajorAxis ? "border-destructive" : ""
                }`}
              />
              {errors.semiMajorAxis && <p className="text-sm text-destructive">{errors.semiMajorAxis}</p>}
            </div>

            {/* Stellar Flux */}
            <div className="space-y-2">
              <Label htmlFor="stellarFlux" className="text-foreground">
                Stellar Flux (relative to Earth)
              </Label>
              <Input
                id="stellarFlux"
                type="number"
                step="0.01"
                value={formData.stellarFlux}
                onChange={(e) => handleChange("stellarFlux", e.target.value)}
                placeholder="e.g., 0.86"
                className={`glass-panel border-primary/30 focus:border-primary focus:ring-primary ${
                  errors.stellarFlux ? "border-destructive" : ""
                }`}
              />
              {errors.stellarFlux && <p className="text-sm text-destructive">{errors.stellarFlux}</p>}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Classifying...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Classify Planet
              </>
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  )
}
