/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { StarfieldBg } from "@/components/starfield-bg"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import { IProject } from "@/lib/utils"
import { Loader } from "@/components/loader"

export default function ProjectPage() {
  const [archive, setArchive] = useState<IProject[]>([])
  const [filteredArchive, setFilteredArchive] = useState<IProject[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)

  const handleData = async () => {
    try {
      setLoading(true)
      const responee = await fetch('/api/planets')
      const {data}: {data: {projects: IProject[]}} = await responee.json()
      setArchive(data.projects)
      setFilteredArchive(data.projects)
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
      filtered = filtered.filter((item) => item.projectName.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    setFilteredArchive(filtered)
  }, [searchQuery, archive])


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
                  Results
                </h1>
                <p className="text-muted-foreground mt-2">
                  {filteredArchive.length} {filteredArchive.length === 1 ? "result" : "results"} found
                </p>
              </div>
            </div>

            {/* Filters */}
            <Card className="glass-panel p-6">
              <div className="grid md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by project name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 glass-panel border-primary/30 focus:border-primary"
                  />
                </div>
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
                    <div className="col-span-4">Project Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-2">Created</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                </Card>

                {/* Table Rows */}
                {filteredArchive.map((item, index) => {
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
                          <div className="col-span-4 md:col-span-4 flex items-center gap-3">
                            <div>
                              <p className="font-semibold">{item.projectName}</p>
                            </div>
                          </div>

                          {/* Star Type */}
                          <div className="hidden md:block col-span-4 text-muted-foreground">
                            {item.email || "N/A"}
                          </div>

                          {/* Created */}
                          <div className="col-span-2 md:col-span-2 text-sm text-muted-foreground">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                          </div>

                          {/* Action */}
                          <div className="col-span-1 md:col-span-1 flex justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-2 hover:text-primary"
                              onClick={() => {
                                window.location.href = `/projects/${item._id}`
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
