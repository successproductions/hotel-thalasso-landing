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
import { Star, Quote } from 'lucide-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

interface Client {
  id: number;
  name: string;
  title: string;
  company: string;
  image: string;
  testimonial: string;
  rating: number;
}

const clientsData: Client[] = [
  {
    id: 1,
    name: "Sophie Dubois",
    title: "Directrice Marketing",
    company: "Wellness Corp",
    image: "/images/Sophie.jpeg",
    testimonial: "Une expérience transformatrice au Dakhla Club. Les soins sont exceptionnels et l&apos;équipe est d&apos;une bienveillance remarquable.",
    rating: 5
  },
  {
    id: 2,
    name: "Marc Lefebvre",
    title: "CEO",
    company: "TechVision",
    image: "/images/Marc.jpeg",
    testimonial: "Le programme de régénération m'a permis de retrouver un équilibre parfait entre corps et esprit. Absolument recommandé !",
    rating: 5
  },
  {
    id: 3,
    name: "Isabelle Martin",
    title: "Consultante",
    company: "Harmony Solutions",
    image: "/images/Isabelle.jpeg",
    testimonial: "Les 4 jours à Dakhla ont été magiques. Chaque soin était pensé pour mon bien-être. Une parenthèse de pur bonheur.",
    rating: 5
  },
  {
    id: 4,
    name: "Pierre Rousseau",
    title: "Architecte",
    company: "Design Studio",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    testimonial: "L'équipe du Dakhla Club comprend vraiment les besoins de détente et de ressourcement. Service impeccable !",
    rating: 5
  },
  {
    id: 5,
    name: "Caroline Blanc",
    title: "Journaliste",
    company: "Lifestyle Magazine",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    testimonial: "Dakhla offre un cadre unique pour se reconnecter avec soi-même. Les soins holistiques sont d'une qualité exceptionnelle.",
    rating: 5
  },
  {
    id: 6,
    name: "Thomas Moreau",
    title: "Consultant Senior",
    company: "Business Partners",
    image: "/images/Thomas.jpeg",
    testimonial: "Une expérience inoubliable ! L'approche holistique du bien-être m'a permis de repartir complètement régénéré.",
    rating: 5
  }
];

export default function ClientsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
<Star
  key={index}
  className={`w-4 h-4 ${
    index < rating
      ? 'text-yellow-400 fill-yellow-400'
      : 'text-gray-300 dark:text-gray-600'
  }`}
/>

    ));
  };

  return (
    <section className="py-20 px-4  dark:bg-[#090b11] ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Quote className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-trajan dark:text-gray-200 text-gray-950">
              NOS CLIENTS T&Eacute;MOIGNENT
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez les expériences exceptionnelles vécues par nos clients au Dakhla Club
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            plugins={[plugin.current]}
            className="w-full max-w-6xl mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {clientsData.map((client) => (
                <CarouselItem key={client.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="group relative overflow-hidden 
  bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-2xl 
  transition-all duration-500 hover:-translate-y-2 
  dark:bg-[#1c1c1c]/90 dark:backdrop-blur-md">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="relative z-10 p-8">
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-4">
                        {renderStars(client.rating)}
                      </div>

                      {/* Testimonial */}
                      <div className="relative mb-6">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary/20" />
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic pl-6 text-sm">
  &quot;{client.testimonial}&quot;
</p>

                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <Image
                            src={client.image}
                            alt={client.name}
                            width={64}
                            height={64}
                            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-primary transition-colors duration-300">
  {client.name}
</h4>
<p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
  {client.title}
</p>


                        </div>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-125" />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Navigation Buttons */}
<CarouselPrevious
  className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 
  z-10 dark:bg-[#1c1c1c] dark:hover:bg-[#2a2a2a] 
  border-2 border-primary/20 hover:border-primary/40 
  text-black dark:text-white hover:text-primary 
  shadow-lg transition-all duration-300 
  w-9 h-9 rounded-full flex items-center justify-center"
/>

<CarouselNext
  className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 
  z-10 dark:bg-[#1c1c1c] dark:hover:bg-[#2a2a2a]
  border-2 border-primary/20 hover:border-primary/40 
   text-black dark:text-white hover:text-primary 
  shadow-lg transition-all duration-300 
  w-9 h-9 rounded-full flex items-center justify-center"
/>


          </Carousel>
        </div>

      </div>
    </section>
  );
}