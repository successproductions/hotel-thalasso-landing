"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const days = [
  {
    title: "Jour 1 – Arrivée & Préparation",
    icon: "🌅",
    image: "/images/Arrival.png",
    description: [
      "Accueil personnalisé",
      "Infusion détox",
      "Installation dans votre bungalow avec vue sur nature ou océan",
      "Bol d’Air Jacquier",
      "Accès piscine thermale",
      "🎯 Objectif : Ancrage, respiration, ouverture du corps et de l’esprit."
    ],
  },
  {
    title: "Jour 2 – Spa Apaisement & Relâchement",
    icon: "💆‍♀️",
    image: "/images/day2.jpg",
    description: [
      "Bol d’Air Jacquier",
      "Piscine thermale",
      "Sauna",
      "Bain hydromassant",
      "Enveloppement aux algues",
      "Modelage sous douche à affusion",
      "🌬️ Objectif : Lâcher-prise, oxygénation cellulaire, déblocage des tensions"
    ],
  },
  {
    title: "Jour 3 – Spa Régénération & Vitalité",
    icon: "⚡",
    image: "/images/day3.jpg",
    description: [
      "Piscine thermale",
      "Douche à jet",
      "Bain au magnésium",
      "Cupping thérapie",
      "⚡ Objectif : Circulation relancée, silhouette désengorgée et boost naturel"
    ],
  },
  {
    title: "Jour 4 – Spa Purification & Relaxation",
    icon: "🧘‍♀️",
    image: "/images/day4.jpg",
    description: [
      "Bol d’Air Jacquier",
      "Piscine thermale",
      "Hammam Secret du Désert",
      "Massage relaxant",
      "🌿 Objectif : Évacuation des toxines, relâchement profond, peau régénérée"
    ],
  },
];

export default function ProgramSection() {
  return (
    <section className="bg-[#f9f8f4] py-24 px-6" id="programme">
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="text-center">
          <motion.h2
            className="text-4xl font-trajan text-green-900 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            🗓️ Le Programme – 3 Jours, 3 Énergies, 3 Transformations
          </motion.h2>
        </div>

        {days.map((day, i) => (
          <motion.div
            key={i}
            className={`flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center group ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div className="space-y-5 md:pr-6">
              <h3 className="text-2xl font-semibold text-green-800 flex items-center gap-3">
                <span className="text-3xl">{day.icon}</span>
                {day.title}
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 text-base pl-2">
                {day.description.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="w-full h-80 relative rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={day.image}
                alt={day.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
