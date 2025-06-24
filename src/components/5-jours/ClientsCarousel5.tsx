'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Star, Quote, MessageCircle, Sparkles } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface Client {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
  rating: number;
}

export default function ClientsCarousel5() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const t = useTranslations('clientsCarousel');

  const clientsData: Client[] = [
    {
      id: 2,
      name: "Marc Lefebvre",
      title: "CEO",
      company: "TechVision",
      image: "/images/Marc.jpeg",
      testimonial: t('testimonial1'),
      rating: 5
    },
    {
      id: 3,
      name: "Isabelle Martin",
      title: "Consultante",
      company: "Harmony Solutions",
      image: "/images/Isabelle.jpeg",
      testimonial: t('testimonial2'),
      rating: 5
    },
    {
      id: 4,
      name: "Sophie Dubois",
      title: "Architecte",
      company: "Design Studio",
      image: "/images/Sophie.jpeg",
      testimonial: t('testimonial3'),
      rating: 5
    },
    {
      id: 6,
      name: "Thomas Moreau",
      title: "Consultant Senior",
      company: "Business Partners",
      image: "/images/Thomas.jpeg",
      testimonial: t('testimonial5'),
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 transition-all duration-300 ${
          index < rating
            ? 'text-amber-400 fill-amber-400 drop-shadow-sm'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <section className="relative py-24 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-[#090b11] dark:via-[#090b11] dark:to-[#090b11] overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-teal-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-indigo-400/5 to-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-8 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
            <div className="relative">
              <MessageCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-trajan bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {t('title')}
            </h2>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Découvrez les expériences exceptionnelles vécues par nos clients au Dakhla Club
          </p>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-7xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-6">
              {clientsData.map((client) => (
                <CarouselItem key={client.id} className="pl-6 md:basis-1/2 lg:basis-1/3">
                  <Card className="group relative overflow-hidden h-full
     bg-white/90 dark:bg-gray-900/90
     border border-gray-200/50 dark:border-gray-700/50
     shadow-xl transition-all duration-300
     hover:shadow-2xl hover:-translate-y-1
     hover:bg-gray-100 dark:hover:bg-gray-800
     rounded-3xl">
                    
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    
                    {/* Floating Decorative Elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-r from-teal-400/20 to-emerald-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '1s' }} />
                    
                    <CardContent className="relative z-10 p-8 h-full flex flex-col">
                      {/* Enhanced Rating Section */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-1 p-2 bg-amber-50/80 dark:bg-amber-900/20 rounded-full">
                          {renderStars(client.rating)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="font-medium">Vérifié</span>
                        </div>
                      </div>

                      {/* Enhanced Testimonial */}
                      <div className="relative mb-8 flex-1 flex items-center">
                        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center opacity-60">
                          <Quote className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg font-medium italic pl-8 relative">

                          &quot;{client.testimonial}&quot;
                        </blockquote>
                      </div>

                      {/* Enhanced Client Info */}
                      <div className="flex items-center gap-4 p-4 bg-gray-50/80 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                          <Image
                            src={client.image}
                            alt={client.name}
                            width={56}
                            height={56}
                            className="relative w-14 h-14 rounded-full object-cover border-3 border-white dark:border-gray-700 shadow-lg group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-700 rounded-full"></div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-lg">
                            {client.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            {client.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            {client.company}
                          </p>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-8 h-8 bg-gradient-to-r from-green-300 to-green-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Client</span>
                        </div>
                      </div>

                      {/* Animated Border */}
                      <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Enhanced Navigation Buttons */}
            <CarouselPrevious
              className="absolute left-4 md:-left-16 top-1/2 -translate-y-1/2 
              z-10 w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
              border-2 border-blue-200/50 dark:border-blue-700/50 
              hover:border-blue-400/70 dark:hover:border-blue-400/70
              text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
              shadow-xl hover:shadow-2xl transition-all duration-300 
              rounded-full flex items-center justify-center
              hover:scale-110 hover:-translate-x-1"
            />

            <CarouselNext
              className="absolute right-4 md:-right-16 top-1/2 -translate-y-1/2 
              z-10 w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md
              border-2 border-blue-200/50 dark:border-blue-700/50 
              hover:border-blue-400/70 dark:hover:border-blue-400/70
              text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400
              shadow-xl hover:shadow-2xl transition-all duration-300 
              rounded-full flex items-center justify-center
              hover:scale-110 hover:translate-x-1"
            />
          </Carousel>
        </div>

        {/* Enhanced Bottom Decoration */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-4 p-4 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-3 h-3 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Témoignages authentiques
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}