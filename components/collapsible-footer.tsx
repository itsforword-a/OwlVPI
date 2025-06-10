"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import Footer from "./footer"

export default function CollapsibleFooter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Toggle Button - Fixed bottom right */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300" // Changed hover color
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm font-medium">Открыть подвал</span>
        {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
      </motion.button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed bottom-0 left-0 right-0 z-50"
          >
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
