
"use client";

import { useState, useEffect }            from "react";
import { ChevronLeft, ChevronRight }       from "lucide-react";
import { Button }                          from "@/components/ui/button";
import { useTranslations }                 from "next-intl";
import Image from "next/image";

const carouselImages = [
  { src: "/images/IMG_2150 (1).JPG", id: "oceanView" },
  { src: "/images/Piscine_thermale.jpeg",         id: "thermalPool" },
  { src: "/images/Salle-de-massage.png",          id: "spaRoom" },
  { src: "/images/Restaurant.jpg?height=600&width=1200", id: "restaurant" },
];

export default function ImageCarousel() {
  const t     = useTranslations("carousel");
  const tImg  = useTranslations("carousel.images");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const iv = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(iv);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentIndex((i) => (i - 1 + carouselImages.length) % carouselImages.length);
    setIsAutoPlaying(false);
  };
  const goToNext = () => {
    setCurrentIndex((i) => (i + 1) % carouselImages.length);
    setIsAutoPlaying(false);
  };
  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
    setIsAutoPlaying(false);
  };

 const { id } = carouselImages[currentIndex];

  return (
    <section className="relative h-[70vh] overflow-hidden bg-gray-900">
      {/* Images */}
      <div className="relative h-full">
        {carouselImages.map((image, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          >
            <Image

              src={carouselImages[currentIndex].src}
              alt={tImg(`${image.id}.alt`)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <h3 className="text-3xl md:text-5xl font-trajan text-white mb-4 animate-fade-in-up">
          {tImg(`${id}.title`)}
        </h3>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl animate-fade-in-up">
          {t("overlay.description")}
        </p>
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
        {carouselImages.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white/70 hover:text-white text-sm"
        >
          {isAutoPlaying ? t("overlay.pause") : t("overlay.play")}
        </button>
      </div>
    </section>
  );
}
