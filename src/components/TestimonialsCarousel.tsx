"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface Testimonial {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: "MY KAMALAYA EXPERIENCE",
    subtitle: "WHY I KEEP COMING BACK TO KAMALAYA",
    videoUrl: "/videos/video1.mp4",
  },
  {
    id: 2,
    title: "SERENITY RETREAT",
    subtitle: "FINDING PEACE AT KAMALAYA",
    videoUrl: "/videos/video4.mp4",
  },
  {
    id: 3,
    title: "MINDFUL HEALING STORY",
    subtitle: "A JOURNEY TOWARDS WELLNESS",
    videoUrl: "/videos/video3.mp4",
  },
  {
    id: 4,
    title: "LORNA MAY WADSWORTH'S JOURNEY",
    subtitle: "ARTISTIC WELLNESS AT KAMALAYA",
    videoUrl: "/videos/video2.mp4",
  },
  {
    id: 5,
    title: "TRANSFORMATION TALE",
    subtitle: "A HOLISTIC EXPERIENCE",
    videoUrl: "/videos/video5.mp4",
  },
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(3);

  // Update visible count on mount and resize
  useEffect(() => {
    const updateVisible = () => {
      const v = window.innerWidth < 768 ? 1 : 3;
      setVisible(v);
      setCurrentIndex((i) => {
        const max = testimonials.length - v;
        return Math.min(i, Math.max(0, max));
      });
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visible);
  const t = useTranslations("clientsCarousel");

  const nextSlide = () =>
    setCurrentIndex((i) => (i === maxIndex ? 0 : i + 1));
  const prevSlide = () =>
    setCurrentIndex((i) => (i === 0 ? maxIndex : i - 1));
  const goToSlide = (i: number) =>
    setCurrentIndex(Math.max(0, Math.min(i, maxIndex)));

  return (
    <section className="relative flex items-center justify-center overflow-hidden min-h-[50vh]">
      {/* Solid color background instead of YouTube video */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{ backgroundColor: "#faf9f5" }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-4 md:py-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-gray-900">
            {t("title")}
          </h2>
        </div>

        <div className="relative">
          {/* Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#faf9f5] text-gray-800 border-gray-300 shadow-md rounded-full w-12 h-12 hover:bg-gray-200"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#faf9f5] text-gray-800 border-gray-300 shadow-md rounded-full w-12 h-12 hover:bg-gray-200"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Carousel track */}
          <div className="overflow-hidden mx-16">
            <div
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{
                transform: `translateX(-${(100 / visible) * currentIndex}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0"
                  style={{ width: `${100 / visible}%` }}
                >
                  <Card className="overflow-hidden bg-transparent border-0 shadow-2xl">
                    <div className="relative aspect-[4/3] bg-black">
                      <video
                        src={item.videoUrl}
                        className="w-full md:h-[72vh] object-cover"
                        controls
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        {/* Uncomment to show title/subtitle */}
                        {/* <h3 className="text-lg font-semibold mb-1 tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-90 tracking-wide">
                          {item.subtitle}
                        </p> */}
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i >= currentIndex && i < currentIndex + visible
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/60"
                }`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
