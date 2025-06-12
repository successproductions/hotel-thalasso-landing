
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";

export function Hero() {

const services = [
    {
      name: "MASSAGE THERAPY",
      icon: "🌿",
    },
    {
      name: "SPECIAL BATH",
      icon: "🛁",
    },
    {
      name: "FACIAL TREATMENTS",
      icon: "✨",
    },
    {
      name: "HYDROTHERAPY",
      icon: "💧",
    },
    {
      name: "GROUP TREATMENTS",
      icon: "👥",
    },
    {
      name: "REFLEXOLOGY",
      icon: "🦶",
    },
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-[700px] md:h-[600px] lg:h-[800px] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-full">
          {/* Left Image */}
          <div className="hidden md:block relative">
            <Image src="/images/hydro_massage.png" alt="Spa oil treatment" fill className="object-cover" />
          </div>

          {/* Center Content */}
          <div className="flex flex-col items-center justify-center px-6 py-12 bg-[#eeede7] text-center">
            <div className="max-w-md space-y-6">
              <div className="space-y-2">
<p className="text-sm font-trajan tracking-widest text-stone-600 uppercase">
  🌿 Évasion Holistique
</p>
<h1 className="text-3xl md:text-4xl lg:text-5xl font-trajan text-stone-800 leading-tight">
  3 Jours pour Ressourcer Corps & Esprit 
</h1>
              </div>
<p className="text-stone-600 leading-relaxed text-sm md:text-base mt-4">
  Dakhla is calling… Êtes-vous prêt(e) à recharger vos batteries ?
</p>

              <Button
                className="bg-green-900 hover:bg-green-800 text-white px-8 py-3 rounded-none font-medium tracking-wide"
                size="lg"
              >
                Book An Appointment
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="hidden md:block relative">
            <Image src="/images/Piscine_thermale.jpeg" alt="Hot stone therapy" fill className="object-cover" />
          </div>
        </div>

        {/* Mobile Hero Image */}
        <div className="md:hidden absolute inset-0 -z-10">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Spa treatment"
            fill
            className="object-cover opacity-20"
          />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-stone-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
            {services.map((service, index) => (
              <div key={index} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <span className="text-2xl md:text-3xl opacity-60">{service.icon}</span>
                </div>
                <h3 className="text-xs md:text-sm font-medium text-stone-700 tracking-wide uppercase">
                  {service.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
    }