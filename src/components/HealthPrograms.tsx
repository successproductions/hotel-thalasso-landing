import React from "react";

export function HealthPrograms() {
  return (
    <section id="programs" className="py-16 bg-white">
      <div className="mx-auto max-w-4xl px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-serif font-semibold text-gray-800">
          Health programs
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-base md:text-lg leading-relaxed">
          Each health program has been created to achieve an optimal level of
          physical and mental well-being.
        </p>

        {/* Note */}
        <p className="mt-2 text-gray-500 text-sm md:text-base italic leading-snug">
          * You must include a health program in your first booking. You can
          also add additional treatments during your stay with a consultant
          through your Agenda Planner.
        </p>
      </div>
    </section>
  );
}
