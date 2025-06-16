"use client";

import React, { useState }                             from 'react';
import { Card, CardContent, CardHeader, CardTitle }     from '@/components/ui/card';
import { Badge }                                        from '@/components/ui/badge';
import { Button }                                       from '@/components/ui/button';
import { Droplets, Waves, Sparkles, Leaf, ArrowRight, Star } from 'lucide-react';
import Image                                           from 'next/image';
import { useTranslations, useMessages }                from 'next-intl';

interface ProgramMeta {
  day: number;
  icon: React.ReactNode;
  gradient: string;
  image: string;
}

const programMeta: ProgramMeta[] = [
  { day: 1, icon: <Leaf className="w-6 h-6"/>,        gradient: 'from-emerald-500 via-teal-500 to-cyan-500', image: '/images/Piscine_thermale.jpeg' },
  { day: 2, icon: <Waves className="w-6 h-6"/>,       gradient: 'from-blue-500 via-indigo-500 to-purple-500',  image: '/images/sauna_ritual.png' },
  { day: 3, icon: <Sparkles className="w-6 h-6"/>,    gradient: 'from-violet-500 via-pink-500 to-rose-500',  image: '/images/modelage.jpg' },
  { day: 4, icon: <Droplets className="w-6 h-6"/>,    gradient: 'from-orange-500 via-amber-500 to-yellow-500', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?...' }
];

export default function ProgramSection() {
  const t        = useTranslations('programSection');
  const messages = useMessages();

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 px-4 bg-gradient-to-br dark:bg-[#080b12] transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl text-gray-900 dark:text-gray-100 mb-6">
            {t('header.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('header.subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {programMeta.map((meta, idx) => {
            const dayKey    = String(meta.day);
            const title     = t(`days.${dayKey}.title`);
            const subtitle  = t(`days.${dayKey}.subtitle`);
            const desc      = t(`days.${dayKey}.description`);
            const activities= messages.programSection.days[dayKey].activities;
            const objective = t(`days.${dayKey}.objective`);
            const ctaText   = t(`days.${dayKey}.ctaText`);

            return (
              <Card
                key={meta.day}
                className="relative group cursor-pointer transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 border-0 overflow-hidden bg-white/10 backdrop-blur-sm"
                onMouseEnter={() => setHoveredCard(meta.day)}
                onMouseLeave={() => setHoveredCard(null)}
                // onClick={() => setSelectedDay(selectedDay === meta.day ? null : meta.day)}
                            onClick={() => {
             const el = document.getElementById('contact-form');
             el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
           }}
                
                style={{ animationDelay: `${idx * 200}ms` }}
                
              >
                <div className="absolute inset-0 z-0">
                  <Image src={meta.image} alt={title} fill className="object-cover transition-transform duration-1000 group-hover:scale-125" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br ${meta.gradient} opacity-60 group-hover:opacity-75 transition-all duration-500 z-10 mix-blend-overlay" />

                <div className="relative z-20 h-full flex flex-col">
                  <CardHeader className="text-white pb-4 flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-white/25 text-white border-white/40 font-bold text-sm backdrop-blur-md px-3 py-1">
                        {t('header.jour')} {meta.day}
                      </Badge>
                      <div className="p-3 bg-white/25 rounded-full backdrop-blur-md border border-white/30">
                        {meta.icon}
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight mb-2">{title}</CardTitle>
                    <p className="text-white/95 text-sm font-semibold mb-3">{subtitle}</p>
                    <p className="text-sm text-white/90 leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{desc}</p>

                    <div className={`space-y-3 mt-4 transition-all duration-500 ${hoveredCard===meta.day||selectedDay===meta.day ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>  
                      <h4 className="font-bold text-sm text-white/95 border-b border-white/30 pb-1">
                        {t('header.activitiesTitle')}
                      </h4>
                      <ul className="space-y-2">
                        {activities.map((act: string, i: number) => (
                          <li key={i} className="text-xs text-white/85 flex items-center gap-2" style={{ animationDelay: `${i*100}ms` }}>
                            <Star className="w-3 h-3 text-yellow-300 fill-current" />
                            {act}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/30">
                      <p className="text-xs text-white/90 font-medium italic">🎯 {objective}</p>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 pb-6">
                    <Button
            
                     className="w-full bg-white/20 p-0 hover:bg-white/30 text-white border border-white/40 backdrop-blur-md transition-all duration-300 group-hover:bg-white group-hover:text-gray-900 font-trajan" size="sm">
                      {ctaText} <ArrowRight className="w-4 h-4 ml-0 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </CardContent>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-30" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
