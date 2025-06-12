"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const images = [
  {
    src: "/placeholder.svg?height=600&width=1200",
    alt: "Vue panoramique de l'hôtel thalasso face à la mer",
    title: "Vue sur l'océan",
  },
  {
    src: "/images/Piscine_thermale.jpeg",
    alt: "Piscine thermale avec vue sur mer",
    title: "Piscine thermale",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    alt: "Salle de massage et soins thalasso",
    title: "Espace soins",
  },
  {
    src: "/placeholder.svg?height=600&width=1200",
    alt: "Sauna et hammam de l'hôtel",
    title: "Espace détente",
  },
  {
    src: "/images/Restaurant.jpg?height=600&width=1200",
    alt: "Restaurant gastronomique de l'hôtel",
    title: "Restaurant",
  },
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    setIsAutoPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gray-900">
      {/* Images */}
      <div className="relative h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white animate-fade-in-up">
          <h3 className="text-3xl md:text-5xl font-bold mb-4">{images[currentIndex].title}</h3>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
            Découvrez nos espaces d'exception dédiés à votre bien-être et à votre détente
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 w-12 h-12"
        onClick={goToNext}
      >
        <ChevronRight className="w-6 h-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button onClick={() => setIsAutoPlaying(!isAutoPlaying)} className="text-white/70 hover:text-white text-sm">
          {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
        </button>
      </div>
    </section>
  )
}
