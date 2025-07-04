

import Image from "next/image";
import React from "react";

export function ObjectivesSection() {
  const cards = [
    {
      image: "https://shawellness.com/wp-content/uploads/2023/10/lopff2.png",
      alt: "Objectif 1",
      text:
        "You are exposed to a high degree of activity, effort, stress, decision-making, continuous travel, etc., and seek to monitor and care for your health, improving your overall performance and productivity.",
    },
    {
      image: "https://shawellness.com/wp-content/uploads/2023/10/lpobj1.png", 
      alt: "Objectif 2",
      text:
        "Achieve and maintain optimal health in the face of high levels of activity, exertion, and stress, with substantial improvement in both your performance and productive capacity.",
    },
  ];

  return (
    <section id="objectifs" className="py-16 bg-gray-50">
      {/* Section Title */}
      <h2 className="text-4xl font-semibold text-gray-800 text-center mb-12">
        Objectifs
      </h2>

      {/* Cards Container */}
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 px-4 max-w-6xl mx-auto">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-md overflow-hidden flex-1 max-w-2xl"
          >
            {/* Golden/Beige Background Section */}
            <div className="relative h-48 w-full">
              <Image
                src={card.image}
                alt={card.alt}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Content Section */}
            <div className="p-8">
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
