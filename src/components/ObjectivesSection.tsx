
import Image from "next/image";
import React from "react";

export function ObjectivesSection() {
  const cards = [
    {
      image: "/images/objectif-1.jpg",
      alt: "Objectif 1",
      text:
        "Renforcement du processus de purification du corps en combinant deux approches majeures : obtenir un poids idéal de manière saine et, en même temps, mener à bien un processus de nettoyage et de détoxification de l’organisme afin d’atteindre un état de santé optimal.",
    },
    {
      image: "/images/objectif-2.jpg", 
      alt: "Objectif 2",
      text:
        "Analyse de divers indicateurs du métabolisme et détoxification, ainsi que la mise en œuvre des mesures pour enrayer tout déséquilibre métabolique.",
    },
  ];

  return (
    <section id="objectifs" className="py-16 bg-gray-50">
      {/* Section Title */}
      <h2 className="text-4xl font-serif font-semibold text-gray-800 text-center">
        Objectifs
      </h2>

      {/* Cards Container */}
      <div className="mt-12 flex flex-col md:flex-row justify-center items-stretch gap-8 px-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden max-w-md mx-auto"
          >
            <div className="relative h-48 w-full">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-base leading-relaxed text-center">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
