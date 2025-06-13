'use client'
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Droplets, Waves, Sparkles, Leaf, ArrowRight, Star } from 'lucide-react';
import Image from 'next/image';

interface ProgramDay {
  day: number;
  title: string;
  subtitle: string;
  description: string;
  activities: string[];
  objective: string;
  icon: React.ReactNode;
  gradient: string;
  image: string;
  ctaText: string;
}

const programData: ProgramDay[] = [
  {
    day: 1,
    title: "Arrivée & Préparation",
    subtitle: "Ancrage et Ouverture",
    description: "Accueil personnalisé, infusion détox, installation dans votre bungalow avec vue sur la nature ou l'océan. En fin d'après-midi : Bol d'Air Jacquier + accès piscine thermale pour initier le lâcher-prise.",
    activities: ["Accueil personnalisé", "Infusion détox", "Installation bungalow", "Bol d'Air Jacquier", "Piscine thermale"],
    objective: "Ancrage, respiration, ouverture du corps et de l'esprit.",
    icon: <Leaf className="w-6 h-6" />,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    image: "/images/Piscine_thermale.jpeg",
    ctaText: "JE CHOISIS DE ME RÉGÉNÉRER "
  },
  {
    day: 2,
    title: "Apaisement & Relâchement",
    subtitle: "Lâcher-prise Profond",
    description: "Une journée complète dédiée au relâchement profond avec une combinaison de soins aquatiques et de thérapies naturelles.",
    activities: ["Bol d'Air Jacquier", "Piscine thermale", "Sauna purifiant", "Bain hydromassant", "Enveloppement aux algues", "Modelage sous affusion"],
    objective: "Lâcher-prise profond, oxygénation cellulaire, relâchement musculaire.",
    icon: <Waves className="w-6 h-6" />,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ctaText: "ENTRER DANS L’UNIVERS "
  },
  {
    day: 3,
    title: "Régénération & Vitalité",
    subtitle: "Recharge Énergétique",
    description: "Focus sur la régénération cellulaire et le boost d'énergie avec des soins ciblés pour relancer votre vitalité naturelle.",
    activities: ["Piscine thermale", "Douche à jet", "Bain au magnésium", "Cupping thérapie"],
    objective: "Relancer la circulation, affiner la silhouette, recharge énergétique.",
    icon: <Sparkles className="w-6 h-6" />,
    gradient: "from-violet-500 via-pink-500 to-rose-500",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ctaText: "JE VEUX VIVRE L'EXPÉRIENCE"
  },
  {
    day: 4,
    title: "Purification & Clôture",
    subtitle: "Régénération Finale",
    description: "La journée de clôture parfaite pour éliminer les dernières toxines et repartir avec une peau rayonnante et un esprit apaisé.",
    activities: ["Bol d'Air Jacquier", "Piscine thermale", "Hammam Secret du Désert", "Massage relaxant"],
    objective: "Évacuation des toxines, apaisement mental, peau régénérée.",
    icon: <Droplets className="w-6 h-6" />,
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    image: "/images/sauna_ritual.png",
    ctaText: "J'ACCÈDE À MON SÉJOUR "
  }
];



export default function HotelProgram() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-br dark:bg-[#080b12] transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h2 className="text-5xl md:text-6xl  text-gray-900 dark:text-gray-100 ">
              LE PROGRAMME
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-2xl font-montserrat text-primary">
              3 Jours, 3 Énergies, 3 Transformations
            </p>
            <p className="text-lg text-muted-foreground font-montserrat">
              Un voyage holistique vers votre bien-être complet dans l'univers unique de Dakhla
            </p>
          </div>
        </div>

        {/* Program Cards Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-16">
          {programData.map((program, index) => (
            <Card
              key={program.day}
              className={`relative group cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border-0 overflow-hidden bg-white/10 backdrop-blur-sm ${
                hoveredCard === program.day ? 'scale-105 z-10' : ''
              } ${
                selectedDay === program.day ? 'ring-2 ring-white ring-offset-4 ring-offset-transparent' : ''
              }`}
              onMouseEnter={() => setHoveredCard(program.day)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedDay(selectedDay === program.day ? null : program.day)}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Background Image with Enhanced Overlay */}    
              <div className="absolute inset-0 z-0">
                <img 
                  src={program.image} 
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />
              </div>
              
              {/* Enhanced Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-60 group-hover:opacity-75 transition-all duration-500 z-10 mix-blend-overlay`} />
              
              {/* Content */}
              <div className="relative z-20 h-full flex flex-col">
                <CardHeader className="text-white pb-4 flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="bg-white/25 text-white border-white/40 font-bold text-sm backdrop-blur-md px-3 py-1">
                      Jour {program.day}
                    </Badge>
                    <div className="p-3 bg-white/25 rounded-full backdrop-blur-md border border-white/30">
                      {program.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold leading-tight mb-2">
                    {program.title}
                  </CardTitle>
                  <p className="text-white/95 text-sm font-semibold mb-3">
                    {program.subtitle}
                  </p>
                  <p className="text-sm text-white/90 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                    {program.description}
                  </p>

                  {/* Activities List - Enhanced visibility */}
                  <div className={`space-y-3 mt-4 transition-all duration-500 ${
                    hoveredCard === program.day || selectedDay === program.day 
                      ? 'opacity-100 max-h-96' 
                      : 'opacity-0 max-h-0 overflow-hidden'
                  }`}>
                    <h4 className="font-bold text-sm text-white/95 border-b border-white/30 pb-1">Activités incluses :</h4>
                    <ul className="space-y-2">
                      {program.activities.map((activity, idx) => (
                        <li 
                          key={idx} 
                          className="text-xs text-white/85 flex items-center gap-2"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <Star className="w-3 h-3 text-yellow-300 fill-current" />
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Objective */}
                  <div className="mt-4 pt-3 border-t border-white/30">
                    <p className="text-xs text-white/90 font-medium italic">
                      🎯 {program.objective}
                    </p>
                  </div>
                </CardHeader>

                {/* CTA Button */}
                <CardContent className="pt-0 pb-6">
                  <Button 
                    className="w-full bg-white/20 p-0 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-gray-900 font-trajan"
                    size="sm"
                  >
                    {program.ctaText}
                    <ArrowRight className="w-4 h-4 ml-0 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </div>

              {/* Enhanced Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}