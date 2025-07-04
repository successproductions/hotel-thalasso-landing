"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Testimonial {
  id: number
  title: string
  subtitle: string
  thumbnail: string
  videoUrl?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: "MY KAMALAYA EXPERIENCE",
    subtitle: "WELLNESS JOURNEY BACK TO KAMALAYA",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 2,
    title: "LORNA JANE CLARKSON'S",
    subtitle: "ARTISTIC JOURNEY AT KAMALAYA",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 3,
    title: "MY KAMALAYA EXPERIENCE",
    subtitle: "HOLISTIC HEALING HEALTH JOURNEY",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 4,
    title: "TRANSFORMATION STORY",
    subtitle: "MINDFUL WELLNESS AT KAMALAYA",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
  {
    id: 5,
    title: "HEALING JOURNEY",
    subtitle: "SPIRITUAL AWAKENING EXPERIENCE",
    thumbnail: "/placeholder.svg?height=300&width=400",
  },
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="relative min-h-1/2 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/testimonials-bg.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-[0.1em] mb-4">TESTIMONIALS</h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full w-12 h-12"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full w-12 h-12"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden mx-16">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / 3)}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-1/3">
                  <Card className="relative group cursor-pointer overflow-hidden bg-transparent border-0 shadow-2xl">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={testimonial.thumbnail || "/placeholder.svg"}
                        alt={testimonial.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 hover:border-white/70 transition-all duration-300 group-hover:scale-110"
                        >
                          <Play className="w-8 h-8 ml-1" fill="currentColor" />
                        </Button>
                      </div>

                      {/* Text Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-lg font-semibold mb-1 tracking-wide">{testimonial.title}</h3>
                        <p className="text-sm opacity-90 tracking-wide">{testimonial.subtitle}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: testimonials.length }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index >= currentIndex && index < currentIndex + 3 ? "bg-white" : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => goToSlide(Math.max(0, Math.min(index, testimonials.length - 3)))}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
