"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

const days = [
  "day1",
  "day2",
  "day3",
  "day4",
  "day5",
  "day6",
  "day7",
] as const;

export default function Program5() {
  const t = useTranslations("offer5.program");
  const [activeDay, setActiveDay] = useState<typeof days[number]>("day1");

  // pull the array out of your JSON
  const activities = t.raw(`${activeDay}.activities`) as string[];

  return (
    <section
      id="programme"
      className="py-16 px-4 bg-stone-50 text-stone-900"
    >
      <h2 className="text-3xl font-semibold text-center mb-8">
        {t("heading")}
      </h2>

      <div className="max-w-5xl mx-auto">
        {/* ─── Tab Triggers ───────────────────────── */}
        <div className="flex overflow-x-auto space-x-6 pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className="relative px-2 py-1 font-medium text-lg focus:outline-none"
            >
              {t(`${day}.label`)}
              {/* animated underline */}
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-primary-600 transition-all ${
                  activeDay === day ? "w-full" : "w-0"
                }`}
              />
            </button>
          ))}
        </div>

        {/* ─── Tab Content ───────────────────────── */}
        <div className="mt-8 min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="grid gap-2 list-disc list-inside text-base">
                {activities.map((act, i) => (
                  <li key={i}>{act}</li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
