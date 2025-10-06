/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, Eye, Filter, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { MiniPlanet } from "@/components/mini-planet"
import {IExoplanetData, IProject} from '@/lib/utils';
import { downloadCsv, objectsToCsv } from "@/lib/csv"
import { Loader } from "@/components/loader"

interface ProjectOnePageProps {
  params: Promise<{ id: string }>
}

export default function ProjectOnePage({params}: ProjectOnePageProps) {
  const [archive, setArchive] = useState<IExoplanetData[]>([])
  const [filteredArchive, setFilteredArchive] = useState<IExoplanetData[]>([])
  const [dataProject, setDataProject] = useState<IProject | undefined>()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(false)

  const { id } = React.use(params);

  const handleData = async () => {
    try {
      setLoading(true)
      const search = new URLSearchParams()
      search.append('projectId', id)
      const response = await fetch(`/api/planets?${search}`)
      const {data}: {data: {projects: IProject[], exoplanets: IExoplanetData[]}} = await response.json()
      const [project] = data.projects
      setDataProject(project)
      setArchive(data.exoplanets)
      setFilteredArchive(data.exoplanets)
    } catch (error) {
      toastr.error('Error to get data.')
    }
    setLoading(false)
  }

  useEffect(() => {
    handleData()
  }, [])

  useEffect(() => {
    let filtered = [...archive]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter((item) => (
        item.hostName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.kepoiName?.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase())
      ))
    }

    // Status filter
    if (statusFilter !== "all") {
      let status = false;
      if (statusFilter === 'true') {
        status = true
      } else {
        status = false
      }
      filtered = filtered.filter((item) => item.isExoplanet === status)
    }

    setFilteredArchive(filtered)
  }, [searchQuery, statusFilter, archive])

  const handleDownloadCSV = () => {
    if (filteredArchive.length === 0) return
    const download = objectsToCsv(filteredArchive)
    downloadCsv(`${dataProject?.projectName}.csv`, download)
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
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Project: <span className="text-primary">{dataProject?.projectName}</span>
                </h1>
                <p className="text-muted-foreground mt-2">
                  {`${dataProject?.email} - `}
                  {filteredArchive.length} {filteredArchive.length === 1 ? "result" : "results"} found
                </p>
              </div>
              <Button
                onClick={handleDownloadCSV}
                disabled={filteredArchive.length === 0}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Download className="w-4 h-4" />
                Download CSV
              </Button>
            </div>

            {/* Filters */}
            <Card className="glass-panel p-6">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by planet name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-panel border-primary/30 focus:border-primary"
                  />
                </div>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="glass-panel border-primary/30">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="glass-panel border-primary/30">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="true">Is Exoplanet</SelectItem>
                    <SelectItem value="false">Not Exoplanet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            {/* Results */}
            {filteredArchive.length === 0 ? (
              <>
                {
                  loading ? <Loader /> : (
                    <Card className="glass-panel p-12 text-center">
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                          <Search className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold">No records yet</h3>
                        <p className="text-muted-foreground">Try classifying a planet to see results appear here</p>
                        <Link href="/classify">
                          <Button className="bg-primary hover:bg-primary/90 cursor-pointer">Classify a Planet</Button>
                        </Link>
                      </div>
                    </Card>
                  )
                }
              </>
            ) : (
              <div className="space-y-4">
                {/* Table Header */}
                <Card className="glass-panel p-4 hidden md:block">
                  <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-muted-foreground">
                    <div className="col-span-1">#</div>
                    <div className="col-span-2">Planet</div>
                    <div className="col-span-2">Prediction</div>
                    <div className="col-span-2">Confidence</div>
                    <div className="col-span-2">Star Type</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                </Card>

                {/* Table Rows */}
                {filteredArchive.map((item, index) => {
                  const isHabitable = item.isExoplanet || false
                  return (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card className="glass-panel p-4 hover:border-primary/50 transition-all group">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Index */}
                          <div className="hidden md:block col-span-1 text-muted-foreground">{index + 1}</div>

                          {/* Planet with Mini Globe */}
                          <div className="col-span-1 md:col-span-2 flex items-center gap-3">
                            <div className="w-12 h-12 flex-shrink-0">
                              <MiniPlanet isHabitable={isHabitable} />
                            </div>
                            <div>
                              <p className="font-semibold">{item.kepoiName}</p>
                              <p className="text-xs text-muted-foreground md:hidden">
                                {item.hostName || "N/A"} Star
                              </p>
                            </div>
                          </div>

                          {/* Prediction */}
                          <div className="col-span-1 md:col-span-2">
                            <Badge
                              className={`${
                                isHabitable
                                  ? "bg-accent-green/20 text-accent-green border-accent-green/50"
                                  : "bg-destructive/20 text-destructive border-destructive/50"
                              }`}
                              variant="outline"
                            >
                              {item.isExoplanet ? 'Exoplanet' : 'Not exoplanet'}
                            </Badge>
                          </div>

                          {/* Confidence */}
                          <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${item.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold">{item.percentage?.toFixed(2)}%</span>
                            </div>
                          </div>

                          {/* Star Type */}
                          <div className="hidden md:block col-span-2 text-muted-foreground">
                            {item.hostName || "N/A"}
                          </div>

                          {/* Created */}
                          <div className="col-span-1 md:col-span-2 text-sm text-muted-foreground">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                          </div>

                          {/* Action */}
                          <div className="col-span-1 md:col-span-1 flex justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-2 hover:text-primary"
                              onClick={() => {
                                sessionStorage.setItem("latestResult", JSON.stringify(item))
                                window.location.href = `/results/${item._id}/project/${item.projectId}`
                              }}
                            >
                              <Eye className="w-4 h-4" />
                              <span className="md:hidden">View</span>
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
