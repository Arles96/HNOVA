import { motion } from "framer-motion"

export const Loader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-[60vh]"
    >
      <div className="text-center space-y-6">
        <div className="relative w-32 h-32 mx-auto">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute inset-4 rounded-full border-4 border-accent-green/20 border-t-accent-green"
          />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Loading data</h2>
        </div>
      </div>
    </motion.div>
  )
}