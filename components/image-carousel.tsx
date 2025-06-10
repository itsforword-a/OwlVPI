"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

const images = [
  { src: "/images/ice-lore.jpg", alt: "Ледяные приключения" },
  { src: "/images/nether-lore.jpg", alt: "Исследование Нижнего мира" },
  { src: "/images/lore-gray.jpeg", alt: "Уютные постройки" },
  { src: "/images/night-camp.png", alt: "Ночной лагерь" },
  { src: "/images/nether-adventure.png", alt: "Приключения в аду" },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-2xl mx-auto h-80 rounded-lg overflow-hidden">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, x: 100 }}
          animate={{
            opacity: index === currentIndex ? 1 : 0,
            x: index === currentIndex ? 0 : index < currentIndex ? -100 : 100,
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-lg font-semibold">{image.alt}</p>
          </div>
        </motion.div>
      ))}

      {/* Dots indicator */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
