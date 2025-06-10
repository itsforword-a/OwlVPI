"use client"

import { motion, useScroll } from "framer-motion"

export default function ScrollIndicator() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 w-1 bg-green-500/20 z-50"
      style={{
        scaleY: scrollYProgress,
        transformOrigin: "top",
      }}
    >
      <div className="w-full h-full bg-gradient-to-b from-green-400 to-green-600 shadow-lg shadow-green-500/50" />
    </motion.div>
  )
}
