// components/ProgramsSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Program {
  title: string;
  description: string;
  image: string;
}

export function ProgramsSection() {
  const programs: Program[] = [
    {
      title: "Programme Détox",
      description:
        "Reprenez le contrôle de votre énergie grâce à des traitements ciblés et un plan nutritionnel sur mesure.",
      image: "/images/program-detox.jpg",
    },
    {
      title: "Programme Sérénité",
      description:
        "Apprenez des techniques de relaxation profonde et profitez de soins apaisants pour l’esprit et le corps.",
      image: "/images/program-serenite.jpg",
    },
    {
      title: "Programme Forme",
      description:
        "Boostez votre performance physique avec des séances de coaching sportif et des massages dynamiques.",
      image: "/images/program-forme.jpg",
    },
    {
      title: "Programme Beauté",
      description:
        "Restaurez l’éclat de votre peau et revitalisez vos sens avec des rituels exclusifs SPA.",
      image: "/images/program-beaute.jpg",
    },
  ];

  // Fade + slide up each text block
  const textAnim = {
    hidden: { opacity: 0, y: 20 },
    show:  { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
  };

  // Background slide variants
  const bgVariant = (fromLeft: boolean) => ({
    hidden: { x: fromLeft ? "-100%" : "100%" },
    show:  { 
      x: "0%", 
      transition: { duration: 3, ease: "easeOut" } 
    },
  });

  return (
    <section className="overflow-hidden">
      {programs.map((p, i) => {
        const fromLeft = i % 2 === 0;   
        const isOdd    = i % 2 === 1;

        return (
          <div key={p.title} className="relative py-24">
            {/* full-width, pale-green bg sliding in */}
            <motion.div
              className="absolute inset-x-0 inset-y-0 bg-[#f4f4f4]"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={bgVariant(fromLeft)}
            />

            {/* content sits above the bg */}
            <div
              className={`
                relative z-10
                max-w-6xl mx-auto px-4
                grid gap-8 items-center
                ${isOdd
                  ? "md:grid-cols-2 md:grid-flow-col-dense"
                  : "md:grid-cols-2"}
              `}
            >
              {/* Image */}
              <div className={isOdd ? "md:col-start-2" : ""}>
                <Image
                  src={p.image}
                  alt={p.title}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full shadow-lg"
                />
              </div>

              {/* Text */}
              <motion.div
                className={isOdd ? "md:col-start-1" : ""}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={textAnim}
              >
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  {p.title}
                </h3>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {p.description}
                </p>
              </motion.div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
