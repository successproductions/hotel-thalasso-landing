import React from "react";
import Image from "next/image";

const days = [
  {
title: "Jour 1 – Arrivée & Préparation",
description: [
  "Accueil personnalisé",
  "Infusion détox",
  "Installation dans votre bungalow avec vue sur nature ou océan",
  "Bol d’Air Jacquier",
  "Accès piscine thermale",
  "🎯 Objectif : Ancrage, respiration, ouverture du corps et de l’esprit."
],
  icon: "🌅",
    image: "/images/day1.jpg", // replace with your image path
  },
  {
    title: "Jour 2 – Spa Apaisement & Relâchement",
    icon: "💆‍♀️",
    description: [
      "Bol d’Air Jacquier",
      "Piscine thermale",
      "Sauna",
      "Bain hydromassant",
      "Enveloppement aux algues",
      "Modelage sous douche à affusion",
      "🌬️ Objectif : Lâcher-prise, oxygénation cellulaire, déblocage des tensions",
    ],
    image: "/images/day2.jpg",
  },
  {
    title: "Jour 3 – Spa Régénération & Vitalité",
    icon: "⚡",
    description: [
      "Piscine thermale",
      "Douche à jet",
      "Bain au magnésium",
      "Cupping thérapie",
      "⚡ Objectif : Circulation relancée, silhouette désengorgée et boost naturel",
    ],
    image: "/images/day3.jpg",
  },
  {
    title: "Jour 4 – Spa Purification & Relaxation",
    icon: "🧘‍♀️",
    description: [
      "Bol d’Air Jacquier",
      "Piscine thermale",
      "Hammam Secret du Désert",
      "Massage relaxant",
      "🌿 Objectif : Évacuation des toxines, relâchement profond, peau régénérée",
    ],
    image: "/images/day4.jpg",
  },
];

export default function ProgramSection() {
  return (
    <section className="bg-[#f9f8f4] py-20 px-6" id="programme">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-stone-800">
            🗓️ Le Programme – 3 Jours, 3 Énergies, 3 Transformations
          </h2>
        </div>

        {days.map((day, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white rounded-xl shadow-md overflow-hidden p-6"
          >
            {/* Text Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-teal-700 flex items-center gap-2">
                <span className="text-2xl">{day.icon}</span> {day.title}
              </h3>
              <ul className="list-disc list-inside text-stone-700 space-y-1 pl-4">
                {day.description.map((item, idx) => (
                  <li key={idx} className="text-sm leading-relaxed">{item}</li>
                ))}
              </ul>
            </div>

            {/* Image Section */}
            <div className="w-full h-72 relative rounded-lg overflow-hidden shadow">
              <Image
                src={day.image}
                alt={day.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
