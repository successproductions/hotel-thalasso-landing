'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Testimonial {
  id: number;
  title: string;
  subtitle: string;
  videoUrl: string;
  thumbnail: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    title: 'MY KAMALAYA EXPERIENCE',
    subtitle: 'WHY I KEEP COMING BACK TO KAMALAYA',
    videoUrl: '/videos/video1.mp4',
    thumbnail: '/images/offer-3/Carousel1.jpeg',
  },
  {
    id: 2,
    title: 'SERENITY RETREAT',
    subtitle: 'FINDING PEACE AT KAMALAYA',
    videoUrl: '/videos/video4.mp4',
    thumbnail: '/images/offer-3/Carousel2.jpeg',
  },
  {
    id: 3,
    title: 'MINDFUL HEALING STORY',
    subtitle: 'A JOURNEY TOWARDS WELLNESS',
    videoUrl: '/videos/video3.mp4',
    thumbnail: '/images/offer-3/Carousel3.jpeg',
  },
  {
    id: 4,
    title: "LORNA MAY WADSWORTH'S JOURNEY",
    subtitle: 'ARTISTIC WELLNESS AT KAMALAYA',
    videoUrl: '/videos/video2.mp4',
    thumbnail: '/images/offer-3/Carousel4.jpeg',
  },
  {
    id: 5,
    title: 'TRANSFORMATION TALE',
    subtitle: 'A HOLISTIC EXPERIENCE',
    videoUrl: '/videos/video5.mp4',
    thumbnail: '/images/offer-3/Carousel5.jpeg',
  },
];

export default function TestimonialsCarouselV2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);

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
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visible);
  const t = useTranslations('clientsCarousel');

  const nextSlide = () => setCurrentIndex((i) => (i === maxIndex ? 0 : i + 1));
  const prevSlide = () => setCurrentIndex((i) => (i === 0 ? maxIndex : i - 1));
  const goToSlide = (i: number) => setCurrentIndex(Math.max(0, Math.min(i, maxIndex)));

  const handlePlayVideo = (id: number) => {
    setPlayingVideo(id);
  };

  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden">
      {/* Solid color background instead of YouTube video */}
      <div className="absolute inset-0 h-full w-full" style={{ backgroundColor: '#faf9f5' }} />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-1 md:px-2 py-4 md:py-6">
        <div className="mb-4 md:mb-10 text-center">
          <h2 className="text-3xl font-medium text-gray-900 md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
        </div>

        <div className="relative">
          {/* Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-gray-300 bg-[#faf9f5] text-gray-800 shadow-md hover:bg-gray-200"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 h-12 w-12 -translate-y-1/2 rounded-full border-gray-300 bg-[#faf9f5] text-gray-800 shadow-md hover:bg-gray-200"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel track */}
          <div className="mx-16 overflow-hidden">
            <div
              className="flex  md:gap-5 transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(100 / visible) * currentIndex}%)`,
              }}
            >
              {testimonials.map((item) => (
                <div key={item.id} className="flex-shrink-0" style={{ width: `${100 / visible}%` }}>
                  <Card className="overflow-hidden border-0 bg-transparent shadow-2xl">
                    <div className="relative h-[60vh] bg-black md:h-[75vh] lg:h-[52vh] xl:h-[50vh]">
                      {playingVideo === item.id ? (
                        // Show video player when playing
                        <video
                          src={item.videoUrl}
                          className="h-full w-full object-cover"
                          controls
                          autoPlay
                        />
                      ) : (
                        // Show thumbnail with play icon
                        <div
                          className="group relative h-full w-full cursor-pointer"
                          onClick={() => handlePlayVideo(item.id)}
                        >
                          <Image
                            src={item.thumbnail}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                          {/* Play Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all group-hover:bg-black/30">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform group-hover:scale-110 md:h-20 md:w-20">
                              <Play className="h-8 w-8 fill-gray-800 text-gray-800 md:h-10 md:w-10" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`h-3 w-3 rounded-full transition-all duration-300 ${
                  i >= currentIndex && i < currentIndex + visible
                    ? 'bg-white'
                    : 'bg-white/90 hover:bg-white/90'
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
