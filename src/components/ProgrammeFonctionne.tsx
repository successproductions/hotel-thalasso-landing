// components/PourquoiProgrammeFonctionne.tsx
import Image from "next/image";
import React from "react";

export function ProgrammeFonctionne() {
  const points = [
    "Synergie entre soins modernes & rituels ancestraux",
    "Enchaînement conçu sur une logique physiologique & émotionnelle",
    "Thérapeutes certifiés et attentionnés",
    "Un environnement qui soigne à lui seul",
    "Oxygénation intérieure & peau rayonnante",
    "Corps léger, tensions relâchées",
    "Détente musculaire & sommeil retrouvé",
    "Peau lissée, dégonflée, reminéralisée",
    "Silhouette affinée et drainée naturellement",
    "Clarté mentale & énergie stable"

  ];

  return (
    <section id="pourquoi" className="py-16 bg-white">
      <div className="max-w-8xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-44 ">
        {/* Image Column */}
        <div className="w-full h-64 md:h-[48rem] relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src="/images/DJI_0070.png"    
            alt="Pourquoi ce programme fonctionne"
            fill
            className="object-cover"
          />
        </div>

        {/* Text Column */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl pt-6 md:pt-14  font-semibold text-gray-800">
          Ce que vous allez vraiment ressentir
          </h2>
          <ul className="list-disc pl-5 space-y-3 text-gray-600 text-base md:text-lg leading-relaxed">
            {points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
