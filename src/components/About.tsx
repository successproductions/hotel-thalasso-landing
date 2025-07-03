'use client'
import Image from "next/image";

export function About() {
  return (
    <section id="about" className="  bg-white">
      <div className="mx-auto  grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Text Column */}
        <div className="space-y-4 px-28">
          <p className="text-sm uppercase tracking-widest text-gray-500">
            À PROPOS DE SHA
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-semibold text-gray-800">
            Le bien-être scientifique pour transformer la vie
          </h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">
            Découvrez la méthode la plus intégrative et la plus axée sur les
            résultats pour atteindre une santé durable dans les destinations
            les plus idylliques.
          </p>
        </div>

        {/* Image Column */}
        <div className="relative w-full h-64 md:h-auto md:min-h-[60vh]">
          <Image
            src="/images/hydro_massage.png"   
            alt="Illustration scientifique"
            fill
            className="object-cover"
          />
          
        </div>
      </div>
    </section>
  );
}
